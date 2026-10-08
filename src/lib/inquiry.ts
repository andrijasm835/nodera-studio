import { z } from "zod";

export const inquiryTypes = [
  "new-website",
  "e-commerce",
  "improve-existing",
  "custom-development",
  "maintenance",
  "something-else",
] as const;

export const inquiryTypeLabels: Record<(typeof inquiryTypes)[number], string> = {
  "new-website": "New website",
  "e-commerce": "E-commerce",
  "improve-existing": "Improve an existing website",
  "custom-development": "Custom feature / development",
  maintenance: "Maintenance / ongoing support",
  "something-else": "Something else",
};

export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100, "Name must be 100 characters or fewer."),
  email: z.string().trim().min(1, "Please enter your email.").email("Please enter a valid email address.").max(254, "Email must be 254 characters or fewer."),
  company: z.string().trim().max(120, "Company or brand must be 120 characters or fewer.").optional().default(""),
  inquiryType: z.enum(inquiryTypes, { message: "Please choose what you need." }),
  message: z.string().trim().max(4000, "Project details must be 4,000 characters or fewer.").optional().default(""),
  website: z.string().max(200).optional().default(""),
  requestId: z.string().uuid(),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type InquiryField = Exclude<keyof InquiryInput, "website" | "requestId">;
