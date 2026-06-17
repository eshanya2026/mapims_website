import { getDb } from "@/lib/mongodb";
import { ensureDbIndexes } from "@/lib/db/indexes";
import type { NewsletterSubscriberRecord } from "@/lib/db/types";
import { isDuplicateKeyError, mapId, now } from "@/lib/db/utils";

type NewsletterSubscriberDoc = Omit<NewsletterSubscriberRecord, "id">;

async function newsletterSubscribersCollection() {
  await ensureDbIndexes();
  const db = await getDb();
  return db.collection<NewsletterSubscriberDoc>("newsletterSubscribers");
}

function toSubscriberRecord(
  doc: NewsletterSubscriberDoc & { _id: import("mongodb").ObjectId }
): NewsletterSubscriberRecord {
  return mapId(doc) as NewsletterSubscriberRecord;
}

export async function findNewsletterSubscriberByEmail(email: string) {
  const collection = await newsletterSubscribersCollection();
  const doc = await collection.findOne({ email });
  return doc ? toSubscriberRecord(doc) : null;
}

export async function subscribeToNewsletter(email: string) {
  const collection = await newsletterSubscribersCollection();
  const timestamp = now();
  const existing = await collection.findOne({ email });

  if (existing) {
    if (existing.status === "active") {
      return { subscriber: toSubscriberRecord(existing), alreadySubscribed: true };
    }

    const doc = await collection.findOneAndUpdate(
      { email },
      {
        $set: {
          status: "active",
          subscribedAt: timestamp,
          updatedAt: timestamp,
        },
      },
      { returnDocument: "after" }
    );

    if (!doc) {
      throw new Error("Failed to reactivate newsletter subscription");
    }

    return { subscriber: toSubscriberRecord(doc), alreadySubscribed: false };
  }

  try {
    const result = await collection.insertOne({
      email,
      status: "active",
      subscribedAt: timestamp,
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    const doc = await collection.findOne({ _id: result.insertedId });
    if (!doc) {
      throw new Error("Failed to create newsletter subscription");
    }

    return { subscriber: toSubscriberRecord(doc), alreadySubscribed: false };
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      const duplicate = await collection.findOne({ email });
      if (duplicate) {
        return {
          subscriber: toSubscriberRecord(duplicate),
          alreadySubscribed: duplicate.status === "active",
        };
      }
    }

    throw error;
  }
}

export async function listActiveNewsletterSubscriberEmails() {
  const collection = await newsletterSubscribersCollection();
  const docs = await collection
    .find({ status: "active" })
    .project({ email: 1 })
    .toArray();

  return docs.map((doc) => doc.email).filter(Boolean);
}
