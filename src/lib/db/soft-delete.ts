import { now } from "@/lib/db/utils";

export const notDeletedFilter = { deletedAt: { $exists: false } } as const;
export const deletedOnlyFilter = { deletedAt: { $exists: true } } as const;

export function mergeNotDeleted<T extends Record<string, unknown>>(query: T) {
  return { ...query, ...notDeletedFilter };
}

export function softDeleteFields() {
  return { deletedAt: now() };
}
