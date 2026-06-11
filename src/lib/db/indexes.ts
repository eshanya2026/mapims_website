import { getDb } from "@/lib/mongodb";

let indexesEnsured = false;

export async function ensureDbIndexes() {
  if (indexesEnsured) return;

  const db = await getDb();

  // Sparse unique index ignores missing fields, but multiple explicit nulls violate uniqueness.
  await db
    .collection("formSubmissions")
    .updateMany({ referenceId: null }, { $unset: { referenceId: "" } });

  await Promise.all([
    db.collection("admins").createIndex({ email: 1 }, { unique: true }),
    db.collection("posts").createIndex({ slug: 1 }, { unique: true }),
    db.collection("posts").createIndex({ section: 1, sortOrder: 1 }),
    db.collection("jobs").createIndex({ slug: 1 }, { unique: true }),
    db.collection("jobs").createIndex({ jobRefNo: 1 }, { unique: true, sparse: true }),
    db
      .collection("formSubmissions")
      .createIndex({ referenceId: 1 }, { unique: true, sparse: true }),
    db.collection("formSubmissions").createIndex({ type: 1, createdAt: -1 }),
    db
      .collection("newsletterSubscribers")
      .createIndex({ email: 1 }, { unique: true }),
    db.collection("doctors").createIndex({ slug: 1 }, { unique: true }),
    db.collection("doctors").createIndex({ departmentSlug: 1, sortOrder: 1 }),
    db.collection("doctors").createIndex({ showOnHome: 1, homeSortOrder: 1 }),
    db.collection("doctors").createIndex({ showOnAbout: 1, aboutSortOrder: 1 }),
  ]);

  indexesEnsured = true;
}
