import {
  ACTIVE_APPOINTMENT_EXISTS_MESSAGE,
  APPOINTMENT_IP_RATE_LIMIT_MAX,
  APPOINTMENT_IP_RATE_LIMIT_WINDOW_MS,
  APPOINTMENT_RATE_LIMIT_MESSAGE,
} from "@/lib/appointment-identity-guard";
import { assignAppointmentReferenceId } from "@/lib/appointment-reference-id";
import { assignJobApplicationReferenceId } from "@/lib/job-application-reference-id";
import {
  countFormSubmissions,
  countRecentAppointmentSubmissionsByIp,
  createFormSubmissionRecord,
  findActiveAppointmentByIdentity,
  findAppointmentBookingConflict,
  findRecentDuplicateSubmission,
} from "@/lib/db/form-submissions";
import type { FormSubmissionRecord } from "@/lib/db/types";
import { getDepartmentNameBySlug } from "@/lib/department-utils";
import {
  normalizeEmailForMatch,
  normalizePhoneForMatch,
} from "@/lib/identity-normalize";
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

export type FormSubmissionContext = {
  clientIp?: string | null;
};

export async function createFormSubmission(
  data: FormSubmissionInput,
  context: FormSubmissionContext = {}
): Promise<FormSubmissionRecord> {
  const duplicate = await findRecentDuplicateSubmission(data);
  if (duplicate) {
    return ensureSubmissionReference(duplicate);
  }

  if (data.type === "appointment") {
    const clientIp = context.clientIp?.trim() || null;

    if (clientIp) {
      const since = new Date(Date.now() - APPOINTMENT_IP_RATE_LIMIT_WINDOW_MS);
      const recentCount = await countRecentAppointmentSubmissionsByIp(clientIp, since);
      if (recentCount >= APPOINTMENT_IP_RATE_LIMIT_MAX) {
        throw new Error(APPOINTMENT_RATE_LIMIT_MESSAGE);
      }
    }

    const activeAppointment = await findActiveAppointmentByIdentity({
      phone: data.phone,
      email: data.email,
    });
    if (activeAppointment) {
      throw new Error(ACTIVE_APPOINTMENT_EXISTS_MESSAGE);
    }

    const conflict = await findAppointmentBookingConflict(
      data.date,
      data.time,
      data.departmentSlug
    );
    if (conflict) {
      throw new Error(
        "This time slot was just booked by another patient. Please choose a different slot."
      );
    }

    const created = await createFormSubmissionRecord({
      type: data.type,
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      phoneNormalized: normalizePhoneForMatch(data.phone) || null,
      emailNormalized: data.email ? normalizeEmailForMatch(data.email) : null,
      clientIp,
      department: getDepartmentNameBySlug(data.departmentSlug),
      departmentSlug: data.departmentSlug,
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
      currentLocation: data.currentLocation || null,
      qualification: data.qualification,
      totalExperience: data.totalExperience,
      medicalCouncilRegistrationNo: data.medicalCouncilRegistrationNo || null,
      noticePeriod: data.noticePeriod || null,
      message: data.message || null,
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
    documentUrls: data.documentUrls ?? [],
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
