import { jwtVerify } from "jose";
import type { AdminRole } from "@/lib/admin-roles";
import { isAdminRole } from "@/lib/admin-roles";

export type AdminSessionPayload = {
  adminId: string;
  email: string;
  name: string | null;
  role: AdminRole;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function readAdminSessionToken(
  token: string
): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const role = payload.role;

    if (typeof role !== "string" || !isAdminRole(role)) {
      return null;
    }

    return {
      adminId: payload.adminId as string,
      email: payload.email as string,
      name: (payload.name as string | null) ?? null,
      role,
    };
  } catch {
    return null;
  }
}
