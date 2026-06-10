import { NextResponse } from "next/server";
import { getSession, type AdminSession } from "@/lib/auth";
import {
  canAccessAdminApi,
  hasPermission,
  type AdminPermission,
} from "@/lib/admin-roles";

type GuardResult =
  | { session: AdminSession; error?: undefined }
  | { session?: undefined; error: NextResponse };

export async function requireApiPermission(
  permission: AdminPermission
): Promise<GuardResult> {
  const session = await getSession();
  if (!session) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (!hasPermission(session.role, permission)) {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { session };
}

export async function requireApiPath(pathname: string): Promise<GuardResult> {
  const session = await getSession();
  if (!session) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (!canAccessAdminApi(session.role, pathname)) {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { session };
}
