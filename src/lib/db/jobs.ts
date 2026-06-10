import { getDb } from "@/lib/mongodb";
import { ensureDbIndexes } from "@/lib/db/indexes";
import type { JobRecord } from "@/lib/db/types";
import { mapId, now, toObjectId } from "@/lib/db/utils";

type JobDoc = Omit<JobRecord, "id">;

async function jobsCollection() {
  await ensureDbIndexes();
  const db = await getDb();
  return db.collection<JobDoc>("jobs");
}

function toJobRecord(doc: JobDoc & { _id: import("mongodb").ObjectId }): JobRecord {
  return mapId(doc) as JobRecord;
}

export async function listJobs(sort?: Record<string, 1 | -1>) {
  const collection = await jobsCollection();
  const docs = await collection
    .find()
    .sort(sort ?? { updatedAt: -1 })
    .toArray();
  return docs.map(toJobRecord);
}

export async function findJobById(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await jobsCollection();
  const doc = await collection.findOne({ _id: objectId });
  return doc ? toJobRecord(doc) : null;
}

export async function findJobBySlug(slug: string, published?: boolean) {
  const collection = await jobsCollection();
  const doc = await collection.findOne({
    slug,
    ...(published === undefined ? {} : { published }),
  });
  return doc ? toJobRecord(doc) : null;
}

export async function findJobs(filter?: { published?: boolean }) {
  const collection = await jobsCollection();
  const docs = await collection
    .find(filter ?? {})
    .sort({ postedAt: -1 })
    .toArray();
  return docs.map(toJobRecord);
}

export async function countJobs(filter?: { published?: boolean }) {
  const collection = await jobsCollection();
  return collection.countDocuments(filter ?? {});
}

export async function createJob(data: Omit<JobDoc, "createdAt" | "updatedAt">) {
  const collection = await jobsCollection();
  const timestamp = now();
  const result = await collection.insertOne({
    ...data,
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  const doc = await collection.findOne({ _id: result.insertedId });
  if (!doc) {
    throw new Error("Failed to create job");
  }

  return toJobRecord(doc);
}

export async function updateJob(
  id: string,
  data: Partial<Omit<JobDoc, "createdAt">>
) {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await jobsCollection();
  const doc = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: { ...data, updatedAt: now() } },
    { returnDocument: "after" }
  );

  return doc ? toJobRecord(doc) : null;
}

export async function deleteJob(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return false;

  const collection = await jobsCollection();
  const result = await collection.deleteOne({ _id: objectId });
  return result.deletedCount === 1;
}
