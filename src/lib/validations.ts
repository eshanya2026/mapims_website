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
  documentUrls: z
    .array(
      z
        .string()
        .trim()
        .min(1)
        .refine(
          (value) => value.startsWith("/") || /^https?:\/\//i.test(value),
          "Invalid document URL"
        )
    )
    .max(10, "You can upload up to 10 documents")
    .optional()
    .default([]),
});

export const careerApplicationFormSchema = z.object({
  type: z.literal("career"),
  name: z.string().trim().min(2),
  phone: phoneField,
  email: z.string().trim().email("Please enter a valid email"),
  message: z.string().trim().min(10, "Please add a short message"),
});

export const jobApplicationFormSchema = z.object({
  type: z.literal("job_application"),
  jobSlug: z.string().trim().min(1),
  jobTitle: z.string().trim().min(1),
  name: z.string().trim().min(2),
  phone: phoneField,
  email: z.string().trim().email("Please enter a valid email"),
  currentLocation: z.string().optional().transform((value) => value?.trim() ?? ""),
  qualification: z.string().trim().min(2, "Please enter your qualification"),
  totalExperience: z.string().trim().min(1, "Please enter your total experience"),
  medicalCouncilRegistrationNo: z
    .string()
    .optional()
    .transform((value) => value?.trim() ?? ""),
  noticePeriod: z.string().optional().transform((value) => value?.trim() ?? ""),
  message: z.string().optional().transform((value) => value?.trim() ?? ""),
  resumeUrl: z.string().trim().min(1, "Please upload your resume"),
});

export const formSubmissionSchema = z.discriminatedUnion("type", [
  appointmentFormSchema,
  contactFormSchema,
  internationalFormSchema,
  careerApplicationFormSchema,
  jobApplicationFormSchema,
]);

export const generalInquiryStatusSchema = z.enum([
  "new",
  "contacted",
  "confirmed",
  "completed",
  "cancelled",
]);

export const recruitmentStatusSchema = z.enum([
  "new",
  "interview_scheduled",
  "shortlisted",
  "selected",
  "joined",
  "rejected",
  "screening",
]);

export const recruitmentStatusWithoutInterviewSchema = z.enum([
  "new",
  "screening",
  "shortlisted",
  "selected",
  "joined",
  "rejected",
]);

export const inquiryStatusSchema = z.union([
  generalInquiryStatusSchema,
  recruitmentStatusSchema,
]);

export const scheduleInterviewSchema = z.object({
  status: z.literal("interview_scheduled"),
  reschedule: z.boolean().optional(),
  interview: z
    .object({
      date: z.string().min(1, "Please select a date"),
      time: z.string().trim().min(1, "Please select a time"),
      interviewer: z.string().trim().min(2, "Please enter the interviewer name"),
      mode: z.enum(["online", "offline"]),
      address: z.string().optional().transform((value) => value?.trim() ?? ""),
      notifyCandidate: z.boolean().default(true),
    })
    .superRefine((interview, ctx) => {
      if (interview.mode === "offline" && interview.address.length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter the interview venue address.",
          path: ["address"],
        });
      }

      if (interview.mode === "online") {
        if (!interview.address) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please enter the online meeting link.",
            path: ["address"],
          });
          return;
        }

        try {
          const url = new URL(interview.address);
          if (url.protocol !== "http:" && url.protocol !== "https:") {
            throw new Error("Invalid protocol");
          }
        } catch {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please enter a valid meeting URL.",
            path: ["address"],
          });
        }
      }
    }),
});

export const updateInquiryPatchSchema = z.union([
  scheduleInterviewSchema,
  z.object({
    status: z.union([generalInquiryStatusSchema, recruitmentStatusWithoutInterviewSchema]),
  }),
]);

/** @deprecated Use inquiryStatusSchema */
export const appointmentInquiryStatusSchema = generalInquiryStatusSchema;

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
    jobRefNo: z.string().optional().default(""),
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
    jobRefNo: data.jobRefNo.trim(),
    summary: deriveJobSummary(data.description),
  }));
