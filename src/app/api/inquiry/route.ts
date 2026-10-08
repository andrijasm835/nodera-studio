import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { inquirySchema, inquiryTypeLabels } from "@/lib/inquiry";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MAX_REQUEST_BYTES = 24_000;
const attempts = new Map<string, number[]>();

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function requestIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? request.headers.get("x-real-ip")
    ?? "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW);
  recent.push(now);
  attempts.set(ip, recent);

  if (attempts.size > 500) {
    for (const [key, timestamps] of attempts) {
      if (timestamps.every((timestamp) => now - timestamp >= RATE_LIMIT_WINDOW)) attempts.delete(key);
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

function safeFieldErrors(error: z.ZodError) {
  const errors: Record<string, string> = {};
  const visibleFields = new Set(["name", "email", "company", "inquiryType", "message"]);
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && visibleFields.has(field) && !errors[field]) errors[field] = issue.message;
  }
  return errors;
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ ok: false, message: "The inquiry is too large to submit." }, { status: 413 });
  }

  const origin = request.headers.get("origin");
  const requestHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && requestHost) {
    try {
      if (new URL(origin).host !== requestHost) {
        return NextResponse.json({ ok: false, message: "This inquiry could not be submitted." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ ok: false, message: "This inquiry could not be submitted." }, { status: 403 });
    }
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
      return NextResponse.json({ ok: false, message: "The inquiry is too large to submit." }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ ok: false, message: "Please check the form and try again." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", fieldErrors: safeFieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  if (parsed.data.website) return NextResponse.json({ ok: true });

  const ip = requestIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many inquiries were submitted recently. Please wait a little and try again." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("Inquiry email is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL.");
    return NextResponse.json(
      { ok: false, message: "Email delivery is not configured yet. Please use the direct email link instead." },
      { status: 503 },
    );
  }

  const { name, email, company, inquiryType, message, requestId } = parsed.data;
  const service = inquiryTypeLabels[inquiryType];
  const submittedAt = new Date().toISOString();
  const subjectName = name.replace(/[\r\n]+/g, " ");
  const subject = `New Nodera inquiry — ${service} — ${subjectName}`;
  const plainText = [
    "New Nodera Studio inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company / Brand: ${company || "Not provided"}`,
    `What they need: ${service}`,
    `Submitted: ${submittedAt}`,
    "",
    "Project details:",
    message || "Not provided",
  ].join("\n");
  const html = `
    <h1 style="font-family:Arial,sans-serif;font-size:24px">New Nodera Studio inquiry</h1>
    <table role="presentation" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:15px;line-height:1.6">
      <tr><td style="padding:4px 20px 4px 0"><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding:4px 20px 4px 0"><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td style="padding:4px 20px 4px 0"><strong>Company / Brand</strong></td><td>${escapeHtml(company || "Not provided")}</td></tr>
      <tr><td style="padding:4px 20px 4px 0"><strong>What they need</strong></td><td>${escapeHtml(service)}</td></tr>
      <tr><td style="padding:4px 20px 4px 0"><strong>Submitted</strong></td><td>${escapeHtml(submittedAt)}</td></tr>
    </table>
    <h2 style="font-family:Arial,sans-serif;font-size:18px;margin-top:24px">Project details</h2>
    <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;white-space:pre-wrap">${escapeHtml(message || "Not provided")}</p>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send(
      { from, to: [to], replyTo: email, subject, text: plainText, html },
      { idempotencyKey: `nodera-inquiry/${createHash("sha256").update(requestId).digest("hex")}` },
    );

    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Inquiry email delivery failed.", error instanceof Error ? error.message : "Unknown provider error");
    return NextResponse.json(
      { ok: false, message: "Something went wrong while sending your inquiry. Please use the direct email link instead." },
      { status: 502 },
    );
  }
}
