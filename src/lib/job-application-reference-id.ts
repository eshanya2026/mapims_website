import {
  findLatestReferenceId,
  updateFormSubmission,
} from "@/lib/db/form-submissions";
import { isDuplicateKeyError } from "@/lib/db/utils";

export async function generateJobApplicationReferenceId(date = new Date()) {
  void date;
  const prefix = "APP-";

  const latestReferenceId = await findLatestReferenceId(prefix);

  let next = 1;
  if (latestReferenceId) {
    const sequence = Number.parseInt(latestReferenceId.slice(prefix.length), 10);
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
