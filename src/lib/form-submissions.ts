import { assignAppointmentReferenceId } from "@/lib/appointment-reference-id";
import { assignJobApplicationReferenceId } from "@/lib/job-application-reference-id";
import {
  countFormSubmissions,
  createFormSubmissionRecord,
  findRecentDuplicateSubmission,
} from "@/lib/db/form-submissions";
import type { FormSubmissionRecord } from "@/lib/db/types";
import { enquiryTypesForRole } from "@/lib/admin-roles";
import type { AdminRole } from "@/lib/admin-roles";
import { formTypeLabels } from "@/lib/form-type-labels";
import type { z } from "zod";
import type {
  appointmentFormSchema,
  careerApplicationFormSchema,
  contactFormSchema,
  internationalFormSchema,
  jobApplicationFormSchema,
} from "@/lib/validations";

export { formTypeLabels };

type AppointmentData = z.infer<typeof appointmentFormSchema>;
type ContactData = z.infer<typeof contactFormSchema>;
type InternationalData = z.infer<typeof internationalFormSchema>;
type CareerApplicationData = z.infer<typeof careerApplicationFormSchema>;
type JobApplicationData = z.infer<typeof jobApplicationFormSchema>;

export type FormSubmissionInput =
  | AppointmentData
  | ContactData
  | InternationalData
  | CareerApplicationData
  | JobApplicationData;

async function ensureSubmissionReference(
  submission: FormSubmissionRecord
): Promise<FormSubmissionRecord> {
  if (submission.referenceId) {
    return submission;
  }

  if (submission.type === "appointment") {
    return assignAppointmentReferenceId(submission.id, submission.createdAt);
  }

  if (submission.type === "job_application") {
    return assignJobApplicationReferenceId(submission.id, submission.createdAt);
  }

  return submission;
}

export async function createFormSubmission(
  data: FormSubmissionInput
): Promise<FormSubmissionRecord> {
  const duplicate = await findRecentDuplicateSubmission(data);
  if (duplicate) {
    return ensureSubmissionReference(duplicate);
  }

  if (data.type === "appointment") {
    const created = await createFormSubmissionRecord({
      type: data.type,
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      department: data.department,
      preferredDate: new Date(`${data.date}T00:00:00`),
      preferredTime: data.time,
      message: data.message || null,
    });

    return assignAppointmentReferenceId(created.id, created.createdAt);
  }

  if (data.type === "contact") {
    return createFormSubmissionRecord({
      type: data.type,
      name: data.name,
      phone: data.phone || null,
      email: data.email || null,
      message: data.message,
    });
  }

  if (data.type === "career") {
    return createFormSubmissionRecord({
      type: data.type,
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message,
    });
  }

  if (data.type === "job_application") {
    const created = await createFormSubmissionRecord({
      type: data.type,
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address || null,
      message: data.message,
      resumeUrl: data.resumeUrl,
      jobSlug: data.jobSlug,
      jobTitle: data.jobTitle,
    });

    return assignJobApplicationReferenceId(created.id, created.createdAt);
  }

  return createFormSubmissionRecord({
    type: data.type,
    name: data.name,
    country: data.country || null,
    email: data.email || null,
    phone: data.phone,
    medicalCondition: data.medicalCondition || null,
    message: data.message,
  });
}

export async function getInquiryCounts(role?: AdminRole) {
  try {
    const types = role ? enquiryTypesForRole(role, "all") : null;
    const scope = types?.length ? { types } : undefined;

    const [total, newCount] = await Promise.all([
      countFormSubmissions(scope),
      countFormSubmissions({ ...scope, status: "new" }),
    ]);

    return { total, new: newCount };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[form-submissions] count failed:", error);
    }
    return { total: 0, new: 0 };
  }
}
