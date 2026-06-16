export const ADMIN_ROLES = {
  super_admin: "Super Admin / IT Team",
  hr: "HR Team",
  marketing: "Marketing Team",
  front_office: "Front Office / Admin Staff",
} as const;

export type AdminRole = keyof typeof ADMIN_ROLES;

export type AdminPermission =
  | "dashboard"
  | "posts"
  | "jobs"
  | "doctors"
  | "inquiries"
  | "users"
  | "settings";

export type EnquiryFilter = "all" | "appointment" | "contact" | "international" | "career";

export const ENQUIRY_TYPES_BY_FILTER: Record<
  Exclude<EnquiryFilter, "all">,
  readonly string[]
> = {
  appointment: ["appointment"],
  contact: ["contact"],
  international: ["international"],
  career: ["career", "job_application"],
};

export const ROLE_PERMISSIONS: Record<AdminRole, readonly AdminPermission[]> = {
  super_admin: [
    "dashboard",
    "posts",
    "jobs",
    "doctors",
    "inquiries",
    "users",
    "settings",
  ],
  hr: ["dashboard", "jobs", "inquiries"],
  marketing: ["dashboard", "posts"],
  front_office: ["dashboard", "inquiries"],
};

/** Which enquiry tabs each role may use in the admin panel. */
export const ROLE_ENQUIRY_FILTERS: Record<AdminRole, readonly EnquiryFilter[]> = {
  super_admin: ["all", "appointment", "contact", "international", "career"],
  hr: ["career"],
  marketing: [],
  front_office: ["all", "appointment", "contact", "international"],
};

export function isAdminRole(value: string): value is AdminRole {
  return value in ADMIN_ROLES;
}

export function hasPermission(role: AdminRole, permission: AdminPermission) {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function hasAnyPermission(role: AdminRole, permissions: AdminPermission[]) {
  return permissions.some((permission) => hasPermission(role, permission));
}

export function getAllowedEnquiryFilters(role: AdminRole) {
  return ROLE_ENQUIRY_FILTERS[role];
}

export function canAccessEnquiryType(role: AdminRole, type: string) {
  if (role === "super_admin") return true;
  if (role === "hr") {
    return type === "career" || type === "job_application";
  }
  if (role === "front_office") {
    return type === "appointment" || type === "contact" || type === "international";
  }
  return false;
}

export function resolveEnquiryFilterForRole(
  role: AdminRole,
  filter?: string | null
): EnquiryFilter {
  const allowed = getAllowedEnquiryFilters(role);
  if (allowed.length === 0) return "all";
  if (filter && allowed.includes(filter as EnquiryFilter)) {
    return filter as EnquiryFilter;
  }
  return allowed[0];
}

export function enquiryTypesForFilter(filter: EnquiryFilter): string[] | null {
  if (filter === "all") return null;
  return [...ENQUIRY_TYPES_BY_FILTER[filter]];
}

export function enquiryTypesForRole(role: AdminRole, filter: EnquiryFilter): string[] | null {
  if (role === "super_admin") {
    return enquiryTypesForFilter(filter);
  }

  if (role === "hr") {
    return ["career", "job_application"];
  }

  if (role === "front_office") {
    if (filter === "all") {
      return ["appointment", "contact", "international"];
    }
    if (filter === "career") return [];
    return enquiryTypesForFilter(filter);
  }

  return [];
}

export function getDefaultAdminPath(role: AdminRole) {
  switch (role) {
    case "hr":
      return "/admin/inquiries?type=career";
    case "marketing":
      return "/admin/posts";
    case "front_office":
      return "/admin/inquiries";
    default:
      return "/admin";
  }
}

export function canAccessTrash(role: AdminRole) {
  return hasAnyPermission(role, ["posts", "jobs", "doctors", "inquiries"]);
}

export function getPathPermission(pathname: string): AdminPermission | null {
  if (pathname === "/admin" || pathname === "/admin/") return "dashboard";
  if (pathname.startsWith("/admin/posts")) return "posts";
  if (pathname.startsWith("/admin/jobs")) return "jobs";
  if (pathname.startsWith("/admin/doctors")) return "doctors";
  if (pathname.startsWith("/admin/inquiries")) return "inquiries";
  if (pathname.startsWith("/admin/users")) return "users";
  if (pathname.startsWith("/admin/settings")) return "settings";
  return null;
}

export function getApiPermission(pathname: string): AdminPermission | null {
  if (pathname.startsWith("/api/admin/posts")) return "posts";
  if (pathname.startsWith("/api/admin/jobs")) return "jobs";
  if (pathname.startsWith("/api/admin/doctors")) return "doctors";
  if (pathname.startsWith("/api/admin/inquiries")) return "inquiries";
  if (pathname.startsWith("/api/admin/users")) return "users";
  if (pathname.startsWith("/api/admin/upload")) return null;
  return null;
}

export function canAccessAdminPath(role: AdminRole, pathname: string) {
  if (pathname.startsWith("/admin/trash")) {
    return canAccessTrash(role);
  }

  const permission = getPathPermission(pathname);
  if (!permission) return true;
  return hasPermission(role, permission);
}

export function canAccessAdminApi(role: AdminRole, pathname: string) {
  if (pathname.startsWith("/api/admin/upload")) {
    return hasAnyPermission(role, ["posts", "jobs", "doctors"]);
  }

  if (pathname.startsWith("/api/admin/trash")) {
    return canAccessTrash(role);
  }

  const permission = getApiPermission(pathname);
  if (!permission) return true;
  return hasPermission(role, permission);
}
