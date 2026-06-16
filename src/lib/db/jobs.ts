import { getDb } from "@/lib/mongodb";
import { ensureDbIndexes } from "@/lib/db/indexes";
import { deletedOnlyFilter, mergeNotDeleted, notDeletedFilter, softDeleteFields } from "@/lib/db/soft-delete";
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

export async function listJobs(options?: {
  sort?: Record<string, 1 | -1>;
  trashed?: boolean;
}) {
  const collection = await jobsCollection();
  const query = options?.trashed ? deletedOnlyFilter : notDeletedFilter;
  const docs = await collection
    .find(query)
    .sort(options?.sort ?? { updatedAt: -1 })
    .toArray();
  return docs.map(toJobRecord);
}

export async function findJobById(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await jobsCollection();
  const doc = await collection.findOne(mergeNotDeleted({ _id: objectId }));
  return doc ? toJobRecord(doc) : null;
}

export async function findJobBySlug(slug: string, published?: boolean) {
  const collection = await jobsCollection();
  const doc = await collection.findOne(
    mergeNotDeleted({
      slug,
      ...(published === undefined ? {} : { published }),
    })
  );
  return doc ? toJobRecord(doc) : null;
}

export async function ensureUniqueJobSlug(baseSlug: string, excludeId?: string) {
  const collection = await jobsCollection();
  let slug = baseSlug;
  let suffix = 2;

  while (true) {
    const query = mergeNotDeleted({ slug });
    if (excludeId) {
      const objectId = toObjectId(excludeId);
      if (objectId) {
        const existing = await collection.findOne({ ...query, _id: { $ne: objectId } });
        if (!existing) return slug;
        slug = `${baseSlug}-${suffix}`;
        suffix += 1;
        continue;
      }
    }

    const existing = await collection.findOne(query);
    if (!existing) return slug;

    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

export async function findJobs(filter?: { published?: boolean }) {
  const collection = await jobsCollection();
  const docs = await collection
    .find(mergeNotDeleted(filter ?? {}))
    .sort({ postedAt: -1 })
    .toArray();
  return docs.map(toJobRecord);
}

export async function countJobs(filter?: { published?: boolean; trashed?: boolean }) {
  const collection = await jobsCollection();
  const query = filter?.trashed
    ? deletedOnlyFilter
    : mergeNotDeleted(filter?.published !== undefined ? { published: filter.published } : {});
  return collection.countDocuments(query);
}

export async function createJob(data: Omit<JobDoc, "createdAt" | "updatedAt">) {
  const collection = await jobsCollection();
  const timestamp = now();
  const { jobRefNo, ...rest } = data;
  const insertDoc: JobDoc = {
    ...rest,
    jobRefNo: jobRefNo ?? null,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  if (!jobRefNo) {
    delete (insertDoc as { jobRefNo?: string | null }).jobRefNo;
  }

  const result = await collection.insertOne(insertDoc);

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
  const { jobRefNo, ...rest } = data;
  const update: Partial<JobDoc> = { ...rest, updatedAt: now() };

  if (jobRefNo !== undefined) {
    if (jobRefNo) {
      update.jobRefNo = jobRefNo;
    }
  }

  const updateDoc =
    jobRefNo !== undefined && !jobRefNo
      ? { $set: update, $unset: { jobRefNo: "" as const } }
      : { $set: update };

  const doc = await collection.findOneAndUpdate(mergeNotDeleted({ _id: objectId }), updateDoc, {
    returnDocument: "after",
  });

  return doc ? toJobRecord(doc) : null;
}

export async function deleteJob(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return false;

  const collection = await jobsCollection();
  const result = await collection.updateOne(mergeNotDeleted({ _id: objectId }), {
    $set: { ...softDeleteFields(), published: false, updatedAt: now() },
  });
  return result.matchedCount === 1;
}

export async function restoreJob(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await jobsCollection();
  const doc = await collection.findOneAndUpdate(
    { _id: objectId, ...deletedOnlyFilter },
    { $unset: { deletedAt: "" }, $set: { updatedAt: now() } },
    { returnDocument: "after" }
  );
  return doc ? toJobRecord(doc) : null;
}

export async function purgeJob(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return false;

  const collection = await jobsCollection();
  const result = await collection.deleteOne({ _id: objectId, ...deletedOnlyFilter });
  return result.deletedCount === 1;
}
