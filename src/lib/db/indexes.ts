import { getDb } from "@/lib/mongodb";

let indexesEnsured = false;

export async function ensureDbIndexes() {
  if (indexesEnsured) return;

  const db = await getDb();

  await Promise.all([
    db.collection("admins").createIndex({ email: 1 }, { unique: true }),
    db.collection("posts").createIndex({ slug: 1 }, { unique: true }),
    db.collection("posts").createIndex({ section: 1, sortOrder: 1 }),
    db.collection("jobs").createIndex({ slug: 1 }, { unique: true }),
    db
      .collection("formSubmissions")
      .createIndex({ referenceId: 1 }, { unique: true, sparse: true }),
    db.collection("formSubmissions").createIndex({ type: 1, createdAt: -1 }),
  ]);

  indexesEnsured = true;
}
