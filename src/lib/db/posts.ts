import { getDb } from "@/lib/mongodb";
import { ensureDbIndexes } from "@/lib/db/indexes";
import type { PostRecord } from "@/lib/db/types";
import { mapId, now, toObjectId } from "@/lib/db/utils";

type PostDoc = Omit<PostRecord, "id">;

async function postsCollection() {
  await ensureDbIndexes();
  const db = await getDb();
  return db.collection<PostDoc>("posts");
}

function toPostRecord(doc: PostDoc & { _id: import("mongodb").ObjectId }): PostRecord {
  return mapId(doc) as PostRecord;
}

export async function listPosts(sort?: Record<string, 1 | -1>) {
  const collection = await postsCollection();
  const docs = await collection
    .find()
    .sort(sort ?? { section: 1, sortOrder: 1, publishedAt: -1 })
    .toArray();
  return docs.map(toPostRecord);
}

export async function findPostById(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await postsCollection();
  const doc = await collection.findOne({ _id: objectId });
  return doc ? toPostRecord(doc) : null;
}

export async function findPostBySlug(slug: string, published?: boolean) {
  const collection = await postsCollection();
  const doc = await collection.findOne({
    slug,
    ...(published === undefined ? {} : { published }),
  });
  return doc ? toPostRecord(doc) : null;
}

export async function findPosts(filter: {
  published?: boolean;
  section?: string;
  sections?: string[];
  limit?: number;
}) {
  const collection = await postsCollection();
  const query: Record<string, unknown> = {};

  if (filter.published !== undefined) query.published = filter.published;
  if (filter.section) query.section = filter.section;
  if (filter.sections) query.section = { $in: filter.sections };

  let cursor = collection
    .find(query)
    .sort({ sortOrder: 1, publishedAt: -1 });

  if (filter.limit) {
    cursor = cursor.limit(filter.limit);
  }

  const docs = await cursor.toArray();
  return docs.map(toPostRecord);
}

export async function countPosts(filter?: { published?: boolean }) {
  const collection = await postsCollection();
  return collection.countDocuments(filter ?? {});
}

export async function getMaxSortOrderInSection(section: string) {
  const collection = await postsCollection();
  const doc = await collection
    .find({ section })
    .sort({ sortOrder: -1 })
    .limit(1)
    .next();
  return doc?.sortOrder ?? -1;
}

export async function createPost(
  data: Omit<PostDoc, "createdAt" | "updatedAt">
) {
  const collection = await postsCollection();
  const timestamp = now();
  const result = await collection.insertOne({
    ...data,
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  const doc = await collection.findOne({ _id: result.insertedId });
  if (!doc) {
    throw new Error("Failed to create post");
  }

  return toPostRecord(doc);
}

export async function updatePost(
  id: string,
  data: Partial<Omit<PostDoc, "createdAt">>
) {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await postsCollection();
  const doc = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: { ...data, updatedAt: now() } },
    { returnDocument: "after" }
  );

  return doc ? toPostRecord(doc) : null;
}

export async function deletePost(id: string) {
  const objectId = toObjectId(id);
  if (!objectId) return false;

  const collection = await postsCollection();
  const result = await collection.deleteOne({ _id: objectId });
  return result.deletedCount === 1;
}

export async function reorderPostsInSection(section: string, orderedIds: string[]) {
  const collection = await postsCollection();
  const sectionPosts = await collection.find({ section }, { projection: { _id: 1 } }).toArray();
  const sectionIds = new Set(sectionPosts.map((post) => post._id.toString()));

  const updates = orderedIds
    .map((id, index) => ({ id, index }))
    .filter(({ id }) => sectionIds.has(id));

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

export async function upsertPostBySlug(
  slug: string,
  data: Omit<PostDoc, "createdAt" | "updatedAt">
) {
  const collection = await postsCollection();
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
    throw new Error(`Failed to upsert post ${slug}`);
  }

  return toPostRecord(doc);
}
