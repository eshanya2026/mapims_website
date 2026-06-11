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
  hr: ["dashboard", "jobs"],
  marketing: ["dashboard", "posts", "doctors"],
  front_office: ["dashboard", "inquiries"],
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

export function getDefaultAdminPath(role: AdminRole) {
  switch (role) {
    case "hr":
      return "/admin/jobs";
    case "marketing":
      return "/admin/posts";
    case "front_office":
      return "/admin/inquiries";
    default:
      return "/admin";
  }
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
  const permission = getPathPermission(pathname);
  if (!permission) return true;
  return hasPermission(role, permission);
}

export function canAccessAdminApi(role: AdminRole, pathname: string) {
  if (pathname.startsWith("/api/admin/upload")) {
    return hasAnyPermission(role, ["posts", "jobs", "doctors"]);
  }

  const permission = getApiPermission(pathname);
  if (!permission) return true;
  return hasPermission(role, permission);
}
