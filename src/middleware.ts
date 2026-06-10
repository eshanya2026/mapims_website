import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  canAccessAdminApi,
  canAccessAdminPath,
  getDefaultAdminPath,
} from "@/lib/admin-roles";
import { readAdminSessionToken } from "@/lib/admin-session";

const COOKIE_NAME = "mapims_admin_session";

async function getSession(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return readAdminSessionToken(token);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSession(request);

  if (pathname.startsWith("/admin/login")) {
    if (session) {
      return NextResponse.redirect(
        new URL(getDefaultAdminPath(session.role), request.url)
      );
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!session) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (!canAccessAdminPath(session.role, pathname)) {
      return NextResponse.redirect(
        new URL(getDefaultAdminPath(session.role), request.url)
      );
    }
  }

  if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth")) {
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!canAccessAdminApi(session.role, pathname)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
