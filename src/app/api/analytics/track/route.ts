import { NextRequest, NextResponse } from "next/server";
import { recordPageView } from "@/lib/db/analytics";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const path = typeof body?.path === "string" ? body.path : "";

    if (!path) {
      return NextResponse.json({ ok: false, error: "Missing path" }, { status: 400 });
    }

    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0]?.trim() : request.headers.get("x-real-ip");
    const userAgent = request.headers.get("user-agent");
    const referrer = typeof body?.referrer === "string" ? body.referrer : request.headers.get("referer");

    // Process asynchronously without blocking
    void recordPageView({
      path,
      ip,
      userAgent,
      referrer,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

