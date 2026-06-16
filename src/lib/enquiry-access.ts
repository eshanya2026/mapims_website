import {
  enquiryTypesForRole,
  resolveEnquiryFilterForRole,
  type AdminRole,
  type EnquiryFilter,
} from "@/lib/admin-roles";
import { listFormSubmissions } from "@/lib/db/form-submissions";

export async function listEnquiriesForRole(
  role: AdminRole,
  filter: EnquiryFilter
) {
  const types = enquiryTypesForRole(role, filter);
  if (types?.length === 0) return [];
  if (types) {
    return listFormSubmissions({ types });
  }
  return listFormSubmissions();
}

export function resolveEnquiryListParams(
  role: AdminRole,
  typeParam?: string | null
) {
  const filter = resolveEnquiryFilterForRole(role, typeParam);
  return { filter, types: enquiryTypesForRole(role, filter) };
}
