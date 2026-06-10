import { assignAppointmentReferenceId } from "@/lib/appointment-reference-id";
import {
  countFormSubmissions,
  createFormSubmissionRecord,
  findRecentDuplicateSubmission,
} from "@/lib/db/form-submissions";
import { formTypeLabels } from "@/lib/form-type-labels";
import type { z } from "zod";
import type {
  appointmentFormSchema,
  contactFormSchema,
  internationalFormSchema,
} from "@/lib/validations";

export { formTypeLabels };

type AppointmentData = z.infer<typeof appointmentFormSchema>;
type ContactData = z.infer<typeof contactFormSchema>;
type InternationalData = z.infer<typeof internationalFormSchema>;

export type FormSubmissionInput =
  | AppointmentData
  | ContactData
  | InternationalData;

async function ensureAppointmentReference(submission: {
  id: string;
  type: string;
  referenceId: string | null;
  createdAt: Date;
}) {
  if (submission.type !== "appointment" || submission.referenceId) {
    return submission;
  }

  return assignAppointmentReferenceId(submission.id, submission.createdAt);
}

export async function createFormSubmission(data: FormSubmissionInput) {
  const duplicate = await findRecentDuplicateSubmission(data);
  if (duplicate) {
    return ensureAppointmentReference(duplicate);
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

  return createFormSubmissionRecord({
    type: data.type,
    name: data.name,
    country: data.country || null,
    email: data.email,
    phone: data.phone,
    medicalCondition: data.medicalCondition || null,
    message: data.message,
  });
}

export async function getInquiryCounts() {
  try {
    const [total, newCount] = await Promise.all([
      countFormSubmissions(),
      countFormSubmissions({ status: "new" }),
    ]);

    return { total, new: newCount };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[form-submissions] count failed:", error);
    }
    return { total: 0, new: 0 };
  }
}
