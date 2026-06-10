import { getDb } from "@/lib/mongodb";
import { ensureDbIndexes } from "@/lib/db/indexes";
import type { AdminRecord } from "@/lib/db/types";
import { mapId, now, toObjectId } from "@/lib/db/utils";

type AdminDoc = Omit<AdminRecord, "id">;

async function adminsCollection() {
  await ensureDbIndexes();
  const db = await getDb();
  return db.collection<AdminDoc>("admins");
}

function toAdminRecord(doc: AdminDoc & { _id: import("mongodb").ObjectId }): AdminRecord {
  return mapId(doc) as AdminRecord;
}

export async function findAdminByEmail(email: string) {
  const collection = await adminsCollection();
  const doc = await collection.findOne({ email });
  return doc ? toAdminRecord(doc) : null;
}

export async function findAdminById(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await adminsCollection();
  const doc = await collection.findOne({ _id: objectId });
  return doc ? toAdminRecord(doc) : null;
}

export async function listAdmins() {
  const collection = await adminsCollection();
  const docs = await collection.find().sort({ createdAt: 1 }).toArray();
  return docs.map(toAdminRecord);
}

export async function countAdminsByRole(role: string) {
  const collection = await adminsCollection();
  return collection.countDocuments({ role });
}

export async function createAdmin(data: {
  email: string;
  passwordHash: string;
  name: string | null;
  role: string;
}) {
  const collection = await adminsCollection();
  const timestamp = now();
  const result = await collection.insertOne({
    ...data,
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  const doc = await collection.findOne({ _id: result.insertedId });
  if (!doc) {
    throw new Error("Failed to create admin user");
  }

  return toAdminRecord(doc);
}

export async function updateAdmin(
  id: string,
  data: Partial<Pick<AdminRecord, "name" | "role" | "passwordHash">>
) {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await adminsCollection();
  const update: Partial<AdminDoc> = { updatedAt: now() };

  if (data.name !== undefined) update.name = data.name;
  if (data.role !== undefined) update.role = data.role;
  if (data.passwordHash !== undefined) update.passwordHash = data.passwordHash;

  const doc = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: update },
    { returnDocument: "after" }
  );

  return doc ? toAdminRecord(doc) : null;
}

export async function deleteAdmin(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return false;

  const collection = await adminsCollection();
  const result = await collection.deleteOne({ _id: objectId });
  return result.deletedCount === 1;
}

export async function upsertAdmin(data: {
  email: string;
  passwordHash: string;
  name: string;
  role: string;
}) {
  const collection = await adminsCollection();
  const timestamp = now();

  await collection.updateOne(
    { email: data.email },
    {
      $set: {
        passwordHash: data.passwordHash,
        name: data.name,
        role: data.role,
        updatedAt: timestamp,
      },
      $setOnInsert: {
        email: data.email,
        createdAt: timestamp,
      },
    },
    { upsert: true }
  );

  const doc = await collection.findOne({ email: data.email });
  if (!doc) {
    throw new Error(`Failed to upsert admin ${data.email}`);
  }

  return toAdminRecord(doc);
}
