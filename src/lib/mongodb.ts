import { MongoClient, type Db } from "mongodb";

function getMongoUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }
  return uri;
}

export function getMongoDbName() {
  return process.env.MONGODB_DB_NAME ?? "mapims-cms";
}

const globalForMongo = globalThis as unknown as {
  mongoClientPromise: Promise<MongoClient> | undefined;
};

function createClientPromise() {
  const client = new MongoClient(getMongoUri());
  return client.connect();
}

function getClientPromise() {
  if (!globalForMongo.mongoClientPromise) {
    globalForMongo.mongoClientPromise = createClientPromise();
  }
  return globalForMongo.mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(getMongoDbName());
}
