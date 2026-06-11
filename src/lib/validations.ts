import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const adminRoleSchema = z.enum([
  "super_admin",
  "hr",
  "marketing",
  "front_office",
]);

export const createAdminUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().trim().min(1).optional(),
  role: adminRoleSchema,
});

export const updateAdminUserSchema = z.object({
  name: z.string().trim().min(1).optional(),
  role: adminRoleSchema.optional(),
  password: z.string().min(6).optional(),
});

export const postSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  image: z.string().min(1),
  author: z.string().optional(),
  category: z.string().min(2),
  section: z.enum(["hospital-events", "hospital-news", "health-insights"]),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
});

const phoneField = z
  .string()
  .min(7, "Please enter a valid phone number")
  .regex(/^[0-9+() -]{7,}$/, "Please enter a valid phone number");

const optionalPhoneField = z
  .string()
  .optional()
  .transform((value) => value?.trim() ?? "")
  .pipe(
    z.union([
      z.literal(""),
      z.string().regex(/^[0-9+() -]{7,}$/, "Please enter a valid phone number"),
    ])
  );

const optionalEmailField = z
  .string()
  .optional()
  .transform((value) => value?.trim() ?? "")
  .pipe(z.union([z.literal(""), z.string().email("Please enter a valid email")]));

export const appointmentFormSchema = z.object({
  type: z.literal("appointment"),
  name: z.string().trim().min(2),
  phone: phoneField,
  email: optionalEmailField,
  department: z.string().trim().min(1),
  date: z.string().min(1),
  time: z.string().trim().min(1),
  message: z.string().optional().transform((value) => value?.trim() ?? ""),
});

export const contactFormSchema = z.object({
  type: z.literal("contact"),
  name: z.string().trim().min(2),
  phone: optionalPhoneField,
  email: optionalEmailField,
  message: z.string().trim().min(10),
});

export const internationalFormSchema = z.object({
  type: z.literal("international"),
  name: z.string().trim().min(2),
  country: z.string().optional().transform((value) => value?.trim() ?? ""),
  email: optionalEmailField,
  phone: phoneField,
  medicalCondition: z.string().optional().transform((value) => value?.trim() ?? ""),
  message: z.string().trim().min(10),
});

export const formSubmissionSchema = z.discriminatedUnion("type", [
  appointmentFormSchema,
  contactFormSchema,
  internationalFormSchema,
]);

export const inquiryStatusSchema = z.enum([
  "new",
  "contacted",
  "confirmed",
  "completed",
  "cancelled",
]);

/** @deprecated Use inquiryStatusSchema */
export const appointmentInquiryStatusSchema = inquiryStatusSchema;

export const newsletterSubscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address")
    .email("Please enter a valid email address")
    .transform((value) => value.toLowerCase()),
});

export const doctorSchema = z.object({
  name: z.string().trim().min(2),
  slug: z.string().trim().min(2),
  designation: z.string().trim().min(2),
  specialty: z.string().trim().min(2),
  departmentSlug: z.string().optional().default(""),
  degree: z.string().optional().default(""),
  experience: z.string().optional().default(""),
  bio: z.string().optional().default(""),
  image: z.string().min(1),
  accent: z.enum(["primary", "deep"]).default("primary"),
  showOnHome: z.boolean().default(false),
  showOnAbout: z.boolean().default(false),
  sortOrder: z.coerce.number().int().min(0).optional(),
  published: z.boolean().default(false),
});

export const doctorReorderSchema = z.object({
  placement: z.enum(["home", "about", "all"]).default("all"),
  orderedIds: z.array(z.string().min(1)).min(1),
});

export const postReorderSchema = z.object({
  section: z.enum(["hospital-events", "hospital-news", "health-insights"]),
  orderedIds: z.array(z.string().min(1)).min(1),
});

function optionalUrl(value: string | undefined) {
  if (!value || value === "https://" || value === "http://") return "";
  return value;
}

export function deriveJobSummary(description: string): string {
  const firstLine =
    description
      .split("\n")
      .map((line) => line.trim())
      .find(Boolean) ?? description.trim();
  return firstLine.length > 280 ? `${firstLine.slice(0, 277)}...` : firstLine;
}

export const jobSchema = z
  .object({
    title: z.string().min(3),
    slug: z.string().min(3),
    department: z.string().min(2),
    location: z.string().min(2),
    employmentType: z.string().min(2),
    vacancy: z.coerce.number().int().min(1).optional().default(1),
    description: z.string().min(20),
    requirements: z.string().min(10),
    qualifications: z.string().optional().default(""),
    applyEmail: z.string().email().optional().or(z.literal("")),
    applyUrl: z
      .string()
      .transform(optionalUrl)
      .pipe(z.union([z.literal(""), z.string().url()])),
    published: z.boolean().default(false),
    closingDate: z.string().optional().or(z.literal("")),
  })
  .transform((data) => ({
    ...data,
    summary: deriveJobSummary(data.description),
  }));
