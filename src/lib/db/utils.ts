import { ObjectId } from "mongodb";

export function isDuplicateKeyError(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: number }).code === 11000
  ) {
    return true;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "cause" in error &&
    isDuplicateKeyError((error as { cause?: unknown }).cause)
  ) {
    return true;
  }

  return false;
}

export function duplicateKeyErrorMessage(
  error: unknown,
  messages: { slug?: string; jobRefNo?: string; default?: string } = {}
) {
  const keyPattern =
    typeof error === "object" && error !== null && "keyPattern" in error
      ? (error as { keyPattern?: Record<string, unknown> }).keyPattern
      : undefined;

  if (keyPattern?.jobRefNo) {
    return messages.jobRefNo ?? "A job with this reference number already exists";
  }

  if (keyPattern?.slug) {
    return (
      messages.slug ??
      "A job with this slug already exists. Try a different job title or edit the slug field."
    );
  }

  return messages.default ?? "Failed to save job";
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
