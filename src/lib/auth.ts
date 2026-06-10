import { SignJWT } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import type { AdminRole } from "@/lib/admin-roles";
import { isAdminRole } from "@/lib/admin-roles";
import { readAdminSessionToken } from "@/lib/admin-session";
import { findAdminByEmail, updateAdmin } from "@/lib/db/admins";

const COOKIE_NAME = "mapims_admin_session";

export type AdminSession = {
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

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(admin: {
  id: string;
  email: string;
  name: string | null;
  role: string;
}) {
  if (!isAdminRole(admin.role)) {
    throw new Error("Invalid admin role");
  }

  const token = await new SignJWT({
    adminId: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  return readAdminSessionToken(token);
}

export async function verifySessionToken(
  token: string
): Promise<AdminSession | null> {
  return readAdminSessionToken(token);
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

function normalizeAdminEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function authenticateAdmin(email: string, password: string) {
  const normalizedEmail = normalizeAdminEmail(email);
  const admin = await findAdminByEmail(normalizedEmail);
  if (!admin) return null;

  if (!isAdminRole(admin.role)) {
    const repaired = await updateAdmin(admin.id, { role: "super_admin" });
    return repaired && (await verifyPassword(password, repaired.passwordHash))
      ? repaired
      : null;
  }

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) return null;

  return admin;
}
