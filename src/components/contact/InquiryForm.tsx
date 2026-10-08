"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { inquirySchema, inquiryTypeLabels, inquiryTypes, type InquiryField } from "@/lib/inquiry";
import { siteConfig } from "@/content/site";

type FormValues = Record<InquiryField, string> & { website: string };
type FieldErrors = Partial<Record<InquiryField, string>>;
type SubmitState = "idle" | "submitting" | "success" | "error";

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  inquiryType: "",
  message: "",
  website: "",
};

const controlClass = "mt-2 w-full border-0 border-b border-black/30 bg-transparent px-0 py-3 text-base text-[#090907] outline-none transition-colors placeholder:text-black/38 focus:border-[#56631f] focus:ring-0";

export function InquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const requestIdRef = useRef<string | null>(null);
  const submittingRef = useRef(false);
  const [values, setValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    let fallbackTimer = 0;
    const focusName = () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("scrollend", focusName);
      document.getElementById("inquiry-name")?.focus({ preventScroll: true });
    };
    const handleFocusRequest = () => {
      const contact = document.getElementById("contact");
      if (contact && contact.getBoundingClientRect().top < window.innerHeight * 0.3) {
        requestAnimationFrame(focusName);
        return;
      }
      window.addEventListener("scrollend", focusName, { once: true });
      fallbackTimer = window.setTimeout(focusName, 1400);
    };

    window.addEventListener("nodera:focus-inquiry", handleFocusRequest);
    return () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("scrollend", focusName);
      window.removeEventListener("nodera:focus-inquiry", handleFocusRequest);
    };
  }, []);

  const updateValue = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (field !== "website" && fieldErrors[field]) {
      setFieldErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (submitState === "error") setSubmitState("idle");
  };

  const focusFirstError = (errors: FieldErrors) => {
    const firstField = (Object.keys(errors) as InquiryField[])[0];
    if (!firstField) return;
    requestAnimationFrame(() => {
      const control = formRef.current?.elements.namedItem(firstField);
      if (control instanceof HTMLElement) control.focus();
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const requestId = requestIdRef.current ?? crypto.randomUUID();
    requestIdRef.current = requestId;
    const payload = { ...values, requestId };
    const parsed = inquirySchema.safeParse(payload);
    if (!parsed.success) {
      const errors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as InquiryField;
        if (field in initialValues && !errors[field]) errors[field] = issue.message;
      }
      setFieldErrors(errors);
      setStatusMessage("Please check the highlighted fields.");
      setSubmitState("error");
      focusFirstError(errors);
      return;
    }

    submittingRef.current = true;
    setSubmitState("submitting");
    setStatusMessage("Sending your inquiry…");
    setFieldErrors({});

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json() as { ok?: boolean; message?: string; fieldErrors?: FieldErrors };

      if (!response.ok || !result.ok) {
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
          focusFirstError(result.fieldErrors);
        }
        throw new Error(result.message || "The inquiry could not be sent.");
      }

      requestIdRef.current = null;
      setSubmitState("success");
      setStatusMessage("Thanks — your inquiry is on its way. I’ll get back to you as soon as possible.");
    } catch (error) {
      setSubmitState("error");
      setStatusMessage(error instanceof Error ? error.message : "Something went wrong while sending your inquiry.");
    } finally {
      submittingRef.current = false;
    }
  };

  if (submitState === "success") {
    return (
      <div className="border-y border-black py-8" role="status" aria-live="polite">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#56631f]">Inquiry sent</p>
        <p className="mt-5 max-w-xl text-2xl leading-9">{statusMessage}</p>
        <button
          type="button"
          className="mt-8 border-b border-black pb-1 font-mono text-xs uppercase tracking-[0.2em]"
          onClick={() => {
            setValues(initialValues);
            setSubmitState("idle");
            setStatusMessage("");
            requestAnimationFrame(() => document.getElementById("inquiry-name")?.focus());
          }}
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form id="inquiry-form" ref={formRef} onSubmit={handleSubmit} noValidate className="border-t border-black" aria-describedby="inquiry-status">
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="inquiry-website">Website</label>
        <input id="inquiry-website" name="website" value={values.website} onChange={(event) => updateValue("website", event.target.value)} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-x-8 md:grid-cols-2">
        <Field label="Name" name="name" error={fieldErrors.name} required>
          <input id="inquiry-name" name="name" value={values.name} onChange={(event) => updateValue("name", event.target.value)} className={controlClass} maxLength={100} autoComplete="name" required aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "inquiry-name-error" : undefined} />
        </Field>
        <Field label="Email" name="email" error={fieldErrors.email} required>
          <input id="inquiry-email" name="email" type="email" inputMode="email" value={values.email} onChange={(event) => updateValue("email", event.target.value)} className={controlClass} maxLength={254} autoComplete="email" required aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "inquiry-email-error" : undefined} />
        </Field>
        <Field label="Company / Brand" name="company" error={fieldErrors.company}>
          <input id="inquiry-company" name="company" value={values.company} onChange={(event) => updateValue("company", event.target.value)} className={controlClass} maxLength={120} autoComplete="organization" aria-invalid={Boolean(fieldErrors.company)} aria-describedby={fieldErrors.company ? "inquiry-company-error" : undefined} />
        </Field>
        <Field label="What do you need?" name="inquiryType" error={fieldErrors.inquiryType} required>
          <select id="inquiry-inquiryType" name="inquiryType" value={values.inquiryType} onChange={(event) => updateValue("inquiryType", event.target.value)} className={`${controlClass} cursor-pointer`} required aria-invalid={Boolean(fieldErrors.inquiryType)} aria-describedby={fieldErrors.inquiryType ? "inquiry-inquiryType-error" : undefined}>
            <option value="" disabled>Select an option</option>
            {inquiryTypes.map((type) => <option value={type} key={type}>{inquiryTypeLabels[type]}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Tell me about the project" name="message" error={fieldErrors.message}>
        <textarea id="inquiry-message" name="message" value={values.message} onChange={(event) => updateValue("message", event.target.value)} className={`${controlClass} min-h-36 resize-y leading-7`} maxLength={4000} placeholder="Tell me what you’re building, what already exists, and what you’d like to improve." aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? "inquiry-message-error" : undefined} />
      </Field>

      <div className="flex flex-col gap-4 border-t border-black/20 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p id="inquiry-status" className="max-w-md text-sm leading-6 text-black/60" aria-live="polite">
          {submitState === "error" ? <>{statusMessage} You can also <a className="underline underline-offset-4" href={`mailto:${siteConfig.email}`}>email me directly</a>.</> : statusMessage}
        </p>
        <button type="submit" disabled={submitState === "submitting"} className="inline-flex min-h-12 shrink-0 items-center justify-between gap-8 bg-[#090907] px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#f1eee5] disabled:cursor-wait disabled:opacity-60">
          <span>{submitState === "submitting" ? "Sending…" : "Send inquiry"}</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}

function Field({ label, name, error, required, children }: { label: string; name: InquiryField; error?: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="border-b border-black/12 py-5">
      <label htmlFor={`inquiry-${name}`} className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/65">
        {label}{required ? " *" : ""}
      </label>
      {children}
      {error ? <p id={`inquiry-${name}-error`} className="mt-2 text-sm text-[#7d1f2d]">{error}</p> : null}
    </div>
  );
}
