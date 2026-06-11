import { getDb } from "@/lib/mongodb";
import { ensureDbIndexes } from "@/lib/db/indexes";
import type { FormSubmissionRecord } from "@/lib/db/types";
import { mapId, now, toObjectId } from "@/lib/db/utils";
import type { z } from "zod";
import type {
  appointmentFormSchema,
  contactFormSchema,
  internationalFormSchema,
} from "@/lib/validations";

type FormSubmissionInput =
  | z.infer<typeof appointmentFormSchema>
  | z.infer<typeof contactFormSchema>
  | z.infer<typeof internationalFormSchema>;

type FormSubmissionDoc = Omit<FormSubmissionRecord, "id">;

async function formSubmissionsCollection() {
  await ensureDbIndexes();
  const db = await getDb();
  return db.collection<FormSubmissionDoc>("formSubmissions");
}

function toFormSubmissionRecord(
  doc: FormSubmissionDoc & { _id: import("mongodb").ObjectId }
): FormSubmissionRecord {
  return mapId(doc) as FormSubmissionRecord;
}

export async function findFormSubmissionById(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await formSubmissionsCollection();
  const doc = await collection.findOne({ _id: objectId });
  return doc ? toFormSubmissionRecord(doc) : null;
}

export async function listFormSubmissions(filter?: { type?: string }) {
  const collection = await formSubmissionsCollection();
  const docs = await collection
    .find(filter?.type ? { type: filter.type } : {})
    .sort({ createdAt: -1 })
    .toArray();
  return docs.map(toFormSubmissionRecord);
}

export async function countFormSubmissions(filter?: { status?: string }) {
  const collection = await formSubmissionsCollection();
  return collection.countDocuments(filter ?? {});
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
  data: Partial<Pick<FormSubmissionRecord, "status" | "referenceId">>
) {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await formSubmissionsCollection();
  const doc = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: data },
    { returnDocument: "after" }
  );

  return doc ? toFormSubmissionRecord(doc) : null;
}

export async function deleteFormSubmission(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return false;

  const collection = await formSubmissionsCollection();
  const result = await collection.deleteOne({ _id: objectId });
  return result.deletedCount === 1;
}

export async function findRecentDuplicateSubmission(data: FormSubmissionInput) {
  const since = new Date(Date.now() - 2 * 60 * 1000);
  const collection = await formSubmissionsCollection();
  const name = data.name.trim();

  if (data.type === "appointment") {
    const doc = await collection.findOne(
      {
        type: data.type,
        name,
        phone: data.phone.trim(),
        email: data.email?.trim() || null,
        department: data.department,
        preferredTime: data.time,
        preferredDate: new Date(`${data.date}T00:00:00`),
        createdAt: { $gte: since },
      },
      { sort: { createdAt: -1 } }
    );
    return doc ? toFormSubmissionRecord(doc) : null;
  }

  if (data.type === "contact") {
    const doc = await collection.findOne(
      {
        type: data.type,
        name,
        phone: data.phone ? data.phone.trim() : null,
        email: data.email?.trim() || null,
        message: data.message,
        createdAt: { $gte: since },
      },
      { sort: { createdAt: -1 } }
    );
    return doc ? toFormSubmissionRecord(doc) : null;
  }

  const doc = await collection.findOne(
    {
      type: data.type,
      name,
      email: data.email?.trim() || null,
      phone: data.phone.trim(),
      country: data.country || null,
      medicalCondition: data.medicalCondition || null,
      message: data.message,
      createdAt: { $gte: since },
    },
    { sort: { createdAt: -1 } }
  );

  return doc ? toFormSubmissionRecord(doc) : null;
}

export async function findLatestAppointmentReferenceId(prefix: string) {
  const collection = await formSubmissionsCollection();
  const doc = await collection.findOne(
    {
      type: "appointment",
      referenceId: { $regex: `^${prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}` },
    },
    {
      sort: { referenceId: -1 },
      projection: { referenceId: 1 },
    }
  );

  return doc?.referenceId ?? null;
}
