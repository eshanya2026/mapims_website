import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { getAuthSecretKey } from "@/lib/auth-secret";

const COOKIE_NAME = "mapims_admin_session";

export type AdminSession = {
  adminId: string;
  email: string;
  name: string | null;
};

export type AdminUser = {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string;
  createdAt: Date;
};

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
}) {
  const token = await new SignJWT({
    adminId: admin.id,
    email: admin.email,
    name: admin.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getAuthSecretKey());

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

  try {
    const { payload } = await jwtVerify(token, getAuthSecretKey());
    return {
      adminId: payload.adminId as string,
      email: payload.email as string,
      name: (payload.name as string | null) ?? null,
    };
  } catch {
    return null;
  }
}

export async function verifySessionToken(
  token: string
): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getAuthSecretKey());
    return {
      adminId: payload.adminId as string,
      email: payload.email as string,
      name: (payload.name as string | null) ?? null,
    };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

function authenticateFromEnv(email: string, password: string): AdminUser | null {
  const envEmail = process.env.ADMIN_EMAIL?.trim();
  const envPassword = process.env.ADMIN_PASSWORD;

  if (!envEmail || !envPassword) return null;
  if (email !== envEmail || password !== envPassword) return null;

  return {
    id: "env-admin",
    email: envEmail,
    name: "MAPIMS Admin",
    passwordHash: "",
    createdAt: new Date(),
  };
}

async function authenticateFromDatabase(
  email: string,
  password: string
): Promise<AdminUser | null> {
  const { prisma } = await import("@/lib/prisma");
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return null;

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) return null;

  return admin;
}

export async function authenticateAdmin(email: string, password: string) {
  const envAdmin = authenticateFromEnv(email, password);
  if (envAdmin) return envAdmin;

  try {
    return await authenticateFromDatabase(email, password);
  } catch (error) {
    console.error("[auth] Database authentication failed:", error);
    return null;
  }
}
