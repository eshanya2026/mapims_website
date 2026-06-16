import {
  findLatestReferenceId,
  updateFormSubmission,
} from "@/lib/db/form-submissions";
import { isDuplicateKeyError } from "@/lib/db/utils";
import type { FormSubmissionRecord } from "@/lib/db/types";
import { assignJobApplicationReferenceId } from "@/lib/job-application-reference-id";

const TIME_ZONE = "Asia/Kolkata";

export function formatAppointmentDateKey(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replace(/-/g, "");
}

export async function generateAppointmentReferenceId(date = new Date()) {
  const dateKey = formatAppointmentDateKey(date);
  const prefix = `APT-${dateKey}-`;

  const latestReferenceId = await findLatestReferenceId(prefix);

  let next = 1;
  if (latestReferenceId) {
    const sequence = Number.parseInt(latestReferenceId.slice(-3), 10);
    if (!Number.isNaN(sequence)) {
      next = sequence + 1;
    }
  }

  return `${prefix}${String(next).padStart(3, "0")}`;
}

export async function assignAppointmentReferenceId(
  submissionId: string,
  createdAt: Date
) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const referenceId = await generateAppointmentReferenceId(createdAt);

    try {
      const updated = await updateFormSubmission(submissionId, { referenceId });
      if (!updated) {
        throw new Error("Form submission not found");
      }
      return updated;
    } catch (error) {
      if (!isDuplicateKeyError(error)) {
        throw error;
      }
    }
  }

  throw new Error("Unable to generate a unique appointment reference ID");
}

export async function hydrateMissingSubmissionReferences<
  T extends Pick<FormSubmissionRecord, "id" | "type" | "referenceId" | "createdAt">,
>(submissions: T[]) {
  const hydrated: T[] = [];

  for (const submission of submissions) {
    if (submission.referenceId) {
      hydrated.push(submission);
      continue;
    }

    if (submission.type === "appointment") {
      const updated = await assignAppointmentReferenceId(
        submission.id,
        submission.createdAt
      );
      hydrated.push({ ...submission, ...updated });
      continue;
    }

    if (submission.type === "job_application") {
      const updated = await assignJobApplicationReferenceId(
        submission.id,
        submission.createdAt
      );
      hydrated.push({ ...submission, ...updated });
      continue;
    }

    hydrated.push(submission);
  }

  return hydrated;
}

/** @deprecated Use hydrateMissingSubmissionReferences */
export async function hydrateMissingAppointmentReferences<
  T extends Pick<FormSubmissionRecord, "id" | "type" | "referenceId" | "createdAt">,
>(submissions: T[]) {
  return hydrateMissingSubmissionReferences(submissions);
}
