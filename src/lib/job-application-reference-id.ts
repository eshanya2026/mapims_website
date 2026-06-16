import {
  findLatestReferenceId,
  updateFormSubmission,
} from "@/lib/db/form-submissions";
import { isDuplicateKeyError } from "@/lib/db/utils";

const TIME_ZONE = "Asia/Kolkata";

export function formatJobApplicationYearKey(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
  }).format(date);
}

export async function generateJobApplicationReferenceId(date = new Date()) {
  const year = formatJobApplicationYearKey(date);
  const prefix = `JOB-${year}-`;

  const latestReferenceId = await findLatestReferenceId(prefix);

  let next = 1;
  if (latestReferenceId) {
    const sequence = Number.parseInt(latestReferenceId.slice(-5), 10);
    if (!Number.isNaN(sequence)) {
      next = sequence + 1;
    }
  }

  return `${prefix}${String(next).padStart(5, "0")}`;
}

export async function assignJobApplicationReferenceId(
  submissionId: string,
  createdAt: Date
) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const referenceId = await generateJobApplicationReferenceId(createdAt);

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

  throw new Error("Unable to generate a unique job application reference ID");
}
