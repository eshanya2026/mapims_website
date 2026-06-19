import { getDb } from "@/lib/mongodb";

let indexesEnsured = false;

// Atlas-compatible partial filter: matches docs where deletedAt is missing or null.
const activeSlugPartialIndex = {
  deletedAt: null,
} as const;

async function ensureActiveSlugIndex(collectionName: string) {
  const db = await getDb();
  const collection = db.collection(collectionName);
  const indexes = await collection.indexes();
  const slugIndex = indexes.find(
    (index) => index.key?.slug === 1 && index.unique === true
  );

  if (
    slugIndex?.name &&
    JSON.stringify(slugIndex.partialFilterExpression ?? null) !==
      JSON.stringify(activeSlugPartialIndex)
  ) {
    await collection.dropIndex(slugIndex.name);
  }

  await collection.createIndex(
    { slug: 1 },
    { unique: true, partialFilterExpression: activeSlugPartialIndex }
  );
}

async function ensureJobsIndexes() {
  const db = await getDb();
  const jobs = db.collection("jobs");
  const indexes = await jobs.indexes();
  const strayReferenceIdIndex = indexes.find(
    (index) => index.key?.referenceId === 1
  );

  if (strayReferenceIdIndex?.name) {
    await jobs.dropIndex(strayReferenceIdIndex.name);
  }

  await jobs.updateMany({ referenceId: null }, { $unset: { referenceId: "" } });
  await ensureActiveSlugIndex("jobs");
  await jobs.createIndex({ jobRefNo: 1 }, { unique: true, sparse: true });
}

export async function ensureDbIndexes() {
  if (indexesEnsured) return;

  const db = await getDb();

  // Sparse unique index ignores missing fields, but multiple explicit nulls violate uniqueness.
  await db
    .collection("formSubmissions")
    .updateMany({ referenceId: null }, { $unset: { referenceId: "" } });

  await Promise.all([
    db.collection("admins").createIndex({ email: 1 }, { unique: true }),
    ensureActiveSlugIndex("posts"),
    db.collection("posts").createIndex({ section: 1, sortOrder: 1 }),
    ensureJobsIndexes(),
    db
      .collection("formSubmissions")
      .createIndex({ referenceId: 1 }, { unique: true, sparse: true }),
    db.collection("formSubmissions").createIndex({ type: 1, createdAt: -1 }),
    db
      .collection("formSubmissions")
      .createIndex({ type: 1, phoneNormalized: 1, status: 1, preferredDate: 1 }),
    db
      .collection("formSubmissions")
      .createIndex({ type: 1, emailNormalized: 1, status: 1, preferredDate: 1 }),
    db
      .collection("formSubmissions")
      .createIndex({ type: 1, clientIp: 1, createdAt: -1 }),
    db
      .collection("newsletterSubscribers")
      .createIndex({ email: 1 }, { unique: true }),
    ensureActiveSlugIndex("doctors"),
    db.collection("doctors").createIndex({ departmentSlug: 1, sortOrder: 1 }),
    db.collection("doctors").createIndex({ showOnHome: 1, homeSortOrder: 1 }),
    db.collection("doctors").createIndex({ showOnAbout: 1, aboutSortOrder: 1 }),
    db
      .collection("appointmentSchedules")
      .createIndex({ departmentSlug: 1 }, { unique: true }),
  ]);

  indexesEnsured = true;
}
