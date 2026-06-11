import { getDb } from "@/lib/mongodb";
import { ensureDbIndexes } from "@/lib/db/indexes";
import type { DoctorRecord } from "@/lib/db/types";
import { mapId, now, toObjectId } from "@/lib/db/utils";

type DoctorDoc = Omit<DoctorRecord, "id">;

async function doctorsCollection() {
  await ensureDbIndexes();
  const db = await getDb();
  return db.collection<DoctorDoc>("doctors");
}

function toDoctorRecord(
  doc: DoctorDoc & { _id: import("mongodb").ObjectId }
): DoctorRecord {
  return mapId(doc) as DoctorRecord;
}

export type DoctorSortField = "sortOrder" | "homeSortOrder" | "aboutSortOrder";

export async function listDoctors(
  filter?: {
    published?: boolean;
    showOnHome?: boolean;
    showOnAbout?: boolean;
    departmentSlug?: string;
  },
  options?: { sortBy?: DoctorSortField }
) {
  const collection = await doctorsCollection();
  const query: Record<string, unknown> = {};

  if (filter?.published !== undefined) query.published = filter.published;
  if (filter?.showOnHome !== undefined) query.showOnHome = filter.showOnHome;
  if (filter?.showOnAbout !== undefined) query.showOnAbout = filter.showOnAbout;
  if (filter?.departmentSlug) query.departmentSlug = filter.departmentSlug;

  const sortBy = options?.sortBy ?? "sortOrder";
  const docs = await collection.find(query).sort({ [sortBy]: 1, name: 1 }).toArray();
  return docs.map(toDoctorRecord);
}

export async function findDoctorById(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await doctorsCollection();
  const doc = await collection.findOne({ _id: objectId });
  return doc ? toDoctorRecord(doc) : null;
}

export async function findDoctorBySlug(slug: string) {
  const collection = await doctorsCollection();
  const doc = await collection.findOne({ slug });
  return doc ? toDoctorRecord(doc) : null;
}

export async function countDoctors(filter?: { published?: boolean }) {
  const collection = await doctorsCollection();
  return collection.countDocuments(filter ?? {});
}

export async function getMaxDoctorSortOrder(field: DoctorSortField = "sortOrder") {
  const collection = await doctorsCollection();
  const doc = await collection.find().sort({ [field]: -1 }).limit(1).next();
  return doc?.[field] ?? -1;
}

export async function ensureDoctorPlacementSortOrders() {
  const collection = await doctorsCollection();
  const needsMigration = await collection.findOne({
    $or: [
      { showOnHome: true, homeSortOrder: { $exists: false } },
      { showOnAbout: true, aboutSortOrder: { $exists: false } },
    ],
  });

  if (!needsMigration) return;

  const docs = await collection.find().sort({ sortOrder: 1, name: 1 }).toArray();
  let homeIndex = 0;
  let aboutIndex = 0;

  for (const doc of docs) {
    const updates: Partial<DoctorDoc> = {};

    if (doc.showOnHome && doc.homeSortOrder === undefined) {
      updates.homeSortOrder = homeIndex;
      homeIndex += 1;
    } else if (doc.showOnHome) {
      homeIndex += 1;
    }

    if (doc.showOnAbout && doc.aboutSortOrder === undefined) {
      updates.aboutSortOrder = aboutIndex;
      aboutIndex += 1;
    } else if (doc.showOnAbout) {
      aboutIndex += 1;
    }

    if (Object.keys(updates).length === 0) continue;

    await collection.updateOne(
      { _id: doc._id },
      { $set: { ...updates, updatedAt: now() } }
    );
  }
}

export async function createDoctor(data: Omit<DoctorDoc, "createdAt" | "updatedAt">) {
  const collection = await doctorsCollection();
  const timestamp = now();
  const result = await collection.insertOne({
    ...data,
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  const doc = await collection.findOne({ _id: result.insertedId });
  if (!doc) {
    throw new Error("Failed to create doctor");
  }

  return toDoctorRecord(doc);
}

export async function updateDoctor(
  id: string,
  data: Partial<Omit<DoctorDoc, "createdAt">>
) {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await doctorsCollection();
  const doc = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: { ...data, updatedAt: now() } },
    { returnDocument: "after" }
  );

  return doc ? toDoctorRecord(doc) : null;
}

export async function deleteDoctor(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return false;

  const collection = await doctorsCollection();
  const result = await collection.deleteOne({ _id: objectId });
  return result.deletedCount === 1;
}

export async function reorderDoctors(orderedIds: string[]) {
  const collection = await doctorsCollection();
  const allDoctors = await collection.find({}, { projection: { _id: 1 } }).toArray();
  const doctorIds = new Set(allDoctors.map((doc) => doc._id.toString()));

  const updates = orderedIds
    .map((id, index) => ({ id, index }))
    .filter(({ id }) => doctorIds.has(id));

  await Promise.all(
    updates.map(({ id, index }) => {
      const objectId = toObjectId(id);
      if (!objectId) return Promise.resolve();
      return collection.updateOne(
        { _id: objectId },
        { $set: { sortOrder: index, updatedAt: now() } }
      );
    })
  );
}

export async function reorderDoctorsByPlacement(
  placement: "home" | "about",
  orderedIds: string[]
) {
  const collection = await doctorsCollection();
  const field = placement === "home" ? "homeSortOrder" : "aboutSortOrder";
  const flag = placement === "home" ? "showOnHome" : "showOnAbout";

  const placementDoctors = await collection
    .find({ [flag]: true }, { projection: { _id: 1 } })
    .toArray();
  const placementIds = new Set(placementDoctors.map((doc) => doc._id.toString()));

  const updates = orderedIds
    .map((id, index) => ({ id, index }))
    .filter(({ id }) => placementIds.has(id));

  await Promise.all(
    updates.map(({ id, index }) => {
      const objectId = toObjectId(id);
      if (!objectId) return Promise.resolve();
      return collection.updateOne(
        { _id: objectId },
        { $set: { [field]: index, updatedAt: now() } }
      );
    })
  );
}

export async function upsertDoctorBySlug(
  slug: string,
  data: Omit<DoctorDoc, "createdAt" | "updatedAt">
) {
  const collection = await doctorsCollection();
  const timestamp = now();

  await collection.updateOne(
    { slug },
    {
      $set: {
        ...data,
        slug,
        updatedAt: timestamp,
      },
      $setOnInsert: {
        createdAt: timestamp,
      },
    },
    { upsert: true }
  );

  const doc = await collection.findOne({ slug });
  if (!doc) {
    throw new Error(`Failed to upsert doctor ${slug}`);
  }

  return toDoctorRecord(doc);
}
