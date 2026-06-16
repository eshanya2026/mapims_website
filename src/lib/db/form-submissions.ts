import { getDb } from "@/lib/mongodb";
import { ensureDbIndexes } from "@/lib/db/indexes";
import { deletedOnlyFilter, mergeNotDeleted, notDeletedFilter, softDeleteFields } from "@/lib/db/soft-delete";
import type { FormSubmissionRecord } from "@/lib/db/types";
import { mapId, now, toObjectId } from "@/lib/db/utils";
import type { z } from "zod";
import type {
  appointmentFormSchema,
  careerApplicationFormSchema,
  contactFormSchema,
  internationalFormSchema,
  jobApplicationFormSchema,
} from "@/lib/validations";

type FormSubmissionInput =
  | z.infer<typeof appointmentFormSchema>
  | z.infer<typeof contactFormSchema>
  | z.infer<typeof internationalFormSchema>
  | z.infer<typeof careerApplicationFormSchema>
  | z.infer<typeof jobApplicationFormSchema>;

type FormSubmissionDoc = Omit<FormSubmissionRecord, "id">;

async function formSubmissionsCollection() {
  await ensureDbIndexes();
  const db = await getDb();
  return db.collection<FormSubmissionDoc>("formSubmissions");
}

function toFormSubmissionRecord(
  doc: FormSubmissionDoc & { _id: import("mongodb").ObjectId }
): FormSubmissionRecord {
  const record = mapId(doc) as FormSubmissionRecord;
  return {
    ...record,
    address: record.address ?? null,
    currentLocation: record.currentLocation ?? null,
    qualification: record.qualification ?? null,
    totalExperience: record.totalExperience ?? null,
    medicalCouncilRegistrationNo: record.medicalCouncilRegistrationNo ?? null,
    noticePeriod: record.noticePeriod ?? null,
    resumeUrl: record.resumeUrl ?? null,
    jobSlug: record.jobSlug ?? null,
    jobTitle: record.jobTitle ?? null,
    interviewDate: record.interviewDate ?? null,
    interviewTime: record.interviewTime ?? null,
    interviewInterviewer: record.interviewInterviewer ?? null,
    interviewMode: record.interviewMode ?? null,
    interviewAddress: record.interviewAddress ?? null,
    deletedAt: record.deletedAt ?? null,
  };
}

export async function findFormSubmissionById(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await formSubmissionsCollection();
  const doc = await collection.findOne(mergeNotDeleted({ _id: objectId }));
  return doc ? toFormSubmissionRecord(doc) : null;
}

export async function listFormSubmissions(filter?: {
  type?: string;
  types?: string[];
  trashed?: boolean;
}) {
  const collection = await formSubmissionsCollection();
  const baseQuery = filter?.types?.length
    ? { type: { $in: filter.types } }
    : filter?.type === "career"
      ? { type: { $in: ["career", "job_application"] } }
      : filter?.type
        ? { type: filter.type }
        : {};
  const query = filter?.trashed
    ? { ...baseQuery, ...deletedOnlyFilter }
    : mergeNotDeleted(baseQuery);
  const docs = await collection.find(query).sort({ createdAt: -1 }).toArray();
  return docs.map(toFormSubmissionRecord);
}

export async function countFormSubmissions(filter?: {
  status?: string;
  types?: string[];
  trashed?: boolean;
}) {
  const collection = await formSubmissionsCollection();
  const baseQuery = filter?.types?.length
    ? {
        type: { $in: filter.types },
        ...(filter.status ? { status: filter.status } : {}),
      }
    : filter?.status
      ? { status: filter.status }
      : {};
  const query = filter?.trashed ? { ...baseQuery, ...deletedOnlyFilter } : mergeNotDeleted(baseQuery);
  return collection.countDocuments(query);
}

export async function createFormSubmissionRecord(data: {
  type: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  department?: string | null;
  preferredDate?: Date | null;
  preferredTime?: string | null;
  country?: string | null;
  medicalCondition?: string | null;
  address?: string | null;
  currentLocation?: string | null;
  qualification?: string | null;
  totalExperience?: string | null;
  medicalCouncilRegistrationNo?: string | null;
  noticePeriod?: string | null;
  resumeUrl?: string | null;
  jobSlug?: string | null;
  jobTitle?: string | null;
  interviewDate?: Date | null;
  interviewTime?: string | null;
  interviewInterviewer?: string | null;
  interviewMode?: "online" | "offline" | null;
  interviewAddress?: string | null;
  status?: string;
  referenceId?: string | null;
}) {
  const collection = await formSubmissionsCollection();
  const timestamp = now();
  const insertDoc: FormSubmissionDoc = {
    type: data.type,
    name: data.name,
    email: data.email ?? null,
    phone: data.phone ?? null,
    message: data.message ?? null,
    department: data.department ?? null,
    preferredDate: data.preferredDate ?? null,
    preferredTime: data.preferredTime ?? null,
    country: data.country ?? null,
    medicalCondition: data.medicalCondition ?? null,
    address: data.address ?? null,
    currentLocation: data.currentLocation ?? null,
    qualification: data.qualification ?? null,
    totalExperience: data.totalExperience ?? null,
    medicalCouncilRegistrationNo: data.medicalCouncilRegistrationNo ?? null,
    noticePeriod: data.noticePeriod ?? null,
    resumeUrl: data.resumeUrl ?? null,
    jobSlug: data.jobSlug ?? null,
    jobTitle: data.jobTitle ?? null,
    interviewDate: data.interviewDate ?? null,
    interviewTime: data.interviewTime ?? null,
    interviewInterviewer: data.interviewInterviewer ?? null,
    interviewMode: data.interviewMode ?? null,
    interviewAddress: data.interviewAddress ?? null,
    status: data.status ?? "new",
    referenceId: null,
    createdAt: timestamp,
  };

  if (data.referenceId) {
    insertDoc.referenceId = data.referenceId;
  } else {
    delete (insertDoc as { referenceId?: string | null }).referenceId;
  }

  const result = await collection.insertOne(insertDoc);

  const doc = await collection.findOne({ _id: result.insertedId });
  if (!doc) {
    throw new Error("Failed to create form submission");
  }

  return toFormSubmissionRecord(doc);
}

export async function updateFormSubmission(
  id: string,
  data: Partial<
    Pick<
      FormSubmissionRecord,
      | "status"
      | "referenceId"
      | "interviewDate"
      | "interviewTime"
      | "interviewInterviewer"
      | "interviewMode"
      | "interviewAddress"
    >
  >
) {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await formSubmissionsCollection();
  const doc = await collection.findOneAndUpdate(
    mergeNotDeleted({ _id: objectId }),
    { $set: data },
    { returnDocument: "after" }
  );

  return doc ? toFormSubmissionRecord(doc) : null;
}

export async function deleteFormSubmission(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return false;

  const collection = await formSubmissionsCollection();
  const result = await collection.updateOne(mergeNotDeleted({ _id: objectId }), {
    $set: softDeleteFields(),
  });
  return result.matchedCount === 1;
}

export async function restoreFormSubmission(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await formSubmissionsCollection();
  const doc = await collection.findOneAndUpdate(
    { _id: objectId, ...deletedOnlyFilter },
    { $unset: { deletedAt: "" } },
    { returnDocument: "after" }
  );
  return doc ? toFormSubmissionRecord(doc) : null;
}

export async function purgeFormSubmission(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return false;

  const collection = await formSubmissionsCollection();
  const result = await collection.deleteOne({ _id: objectId, ...deletedOnlyFilter });
  return result.deletedCount === 1;
}

export async function findRecentDuplicateSubmission(data: FormSubmissionInput) {
  const since = new Date(Date.now() - 2 * 60 * 1000);
  const collection = await formSubmissionsCollection();
  const name = data.name.trim();

  if (data.type === "appointment") {
    const doc = await collection.findOne(
      mergeNotDeleted({
        type: data.type,
        name,
        phone: data.phone.trim(),
        email: data.email?.trim() || null,
        department: data.department,
        preferredTime: data.time,
        preferredDate: new Date(`${data.date}T00:00:00`),
        createdAt: { $gte: since },
      }),
      { sort: { createdAt: -1 } }
    );
    return doc ? toFormSubmissionRecord(doc) : null;
  }

  if (data.type === "contact") {
    const doc = await collection.findOne(
      mergeNotDeleted({
        type: data.type,
        name,
        phone: data.phone ? data.phone.trim() : null,
        email: data.email?.trim() || null,
        message: data.message,
        createdAt: { $gte: since },
      }),
      { sort: { createdAt: -1 } }
    );
    return doc ? toFormSubmissionRecord(doc) : null;
  }

  if (data.type === "career") {
    const doc = await collection.findOne(
      mergeNotDeleted({
        type: data.type,
        name,
        phone: data.phone.trim(),
        email: data.email.trim(),
        message: data.message,
        createdAt: { $gte: since },
      }),
      { sort: { createdAt: -1 } }
    );
    return doc ? toFormSubmissionRecord(doc) : null;
  }

  if (data.type === "job_application") {
    const doc = await collection.findOne(
      mergeNotDeleted({
        type: data.type,
        name,
        phone: data.phone.trim(),
        email: data.email.trim(),
        jobSlug: data.jobSlug,
        resumeUrl: data.resumeUrl,
        createdAt: { $gte: since },
      }),
      { sort: { createdAt: -1 } }
    );
    return doc ? toFormSubmissionRecord(doc) : null;
  }

  const doc = await collection.findOne(
    mergeNotDeleted({
      type: data.type,
      name,
      email: data.email?.trim() || null,
      phone: data.phone.trim(),
      country: data.country || null,
      medicalCondition: data.medicalCondition || null,
      message: data.message,
      createdAt: { $gte: since },
    }),
    { sort: { createdAt: -1 } }
  );

  return doc ? toFormSubmissionRecord(doc) : null;
}

export async function findLatestReferenceId(prefix: string) {
  const collection = await formSubmissionsCollection();
  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const doc = await collection.findOne(
    {
      referenceId: { $regex: `^${escapedPrefix}` },
    },
    {
      sort: { referenceId: -1 },
      projection: { referenceId: 1 },
    }
  );

  return doc?.referenceId ?? null;
}

/** @deprecated Use findLatestReferenceId */
export async function findLatestAppointmentReferenceId(prefix: string) {
  return findLatestReferenceId(prefix);
}
