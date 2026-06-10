import { ObjectId } from "mongodb";

export function isDuplicateKeyError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: number }).code === 11000
  );
}

export function toObjectId(id: string) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return new ObjectId(id);
}

export function mapId<T extends Record<string, unknown>>(doc: T & { _id: ObjectId }) {
  const { _id, ...rest } = doc;
  return {
    ...rest,
    id: _id.toString(),
  };
}

export function now() {
  return new Date();
}
