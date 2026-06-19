import { departments } from "@/data/departments";

export const DEFAULT_APPOINTMENT_DEPARTMENT_SLUG = "general-medicine";

export function getDepartmentNameBySlug(slug: string) {
  return departments.find((department) => department.slug === slug)?.name ?? slug;
}

export function getDepartmentSlugByName(name: string | null | undefined) {
  if (!name) return null;
  return departments.find((department) => department.name === name)?.slug ?? null;
}

export function isKnownDepartmentSlug(slug: string) {
  return departments.some((department) => department.slug === slug);
}
