import { NextRequest, NextResponse } from "next/server";
import { parseInstagramUrl } from "@/lib/video-embed";
import {
  ensureInstagramVideoCached,
  isInstagramVideoCached,
  getInstagramVideoLocalUrl,
} from "@/lib/instagram-video";

export const dynamic = "force-dynamic";

function getRedirectTarget(localUrl: string, request: NextRequest): string {
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    "";
  const proto =
    request.headers.get("x-forwarded-proto") ||
    (request.url.startsWith("https") ? "https" : "http");

  if (host && !host.includes("0.0.0.0")) {
    return `${proto}://${host}${localUrl}`;
  }
  return localUrl;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let id = searchParams.get("id")?.trim();
  const rawUrl = searchParams.get("url")?.trim();

  if (!id && rawUrl) {
    const parsed = parseInstagramUrl(rawUrl);
    if (parsed) {
      id = parsed.id;
    }
  }

  if (!id) {
    return NextResponse.json({ error: "Missing video id or url" }, { status: 400 });
  }

  try {
    // If already cached, redirect immediately
    if (isInstagramVideoCached(id)) {
      const localUrl = getInstagramVideoLocalUrl(id);
      return NextResponse.redirect(getRedirectTarget(localUrl, request), 307);
    }

    // Cache it on demand
    const cachedUrl = await ensureInstagramVideoCached(id);
    if (cachedUrl) {
      return NextResponse.redirect(getRedirectTarget(cachedUrl, request), 307);
    }

    // Fallback: direct upstream stream
    return NextResponse.redirect(
      `https://www.eeinstagram.com/videos/${id}/1?audio=1`,
      307
    );
  } catch (err) {
    console.error("[api/video/stream] Error:", err);
    return NextResponse.redirect(
      `https://www.eeinstagram.com/videos/${id}/1?audio=1`,
      307
    );
  }
}
