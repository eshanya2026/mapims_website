import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import {
  ensureInstagramThumbnailCached,
  getInstagramThumbnailFilePath,
} from "@/lib/instagram-video";
import { extractInstagramShortcode } from "@/lib/video-embed";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get("id") || searchParams.get("url");
  const shortcode = idParam ? extractInstagramShortcode(idParam) : null;

  if (!shortcode) {
    return NextResponse.json({ error: "Invalid Instagram ID" }, { status: 400 });
  }

  const filePath = getInstagramThumbnailFilePath(shortcode);

  if (fs.existsSync(filePath)) {
    try {
      const stat = fs.statSync(filePath);
      if (stat.size > 1000) {
        const buffer = fs.readFileSync(filePath);
        return new NextResponse(buffer, {
          headers: {
            "Content-Type": "image/jpeg",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    } catch (e) {
      console.warn("[api/video/thumbnail] Error reading cached file:", e);
    }
  }

  // Not cached yet - fetch and cache on demand
  try {
    const localUrl = await ensureInstagramThumbnailCached(shortcode);
    if (localUrl && fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  } catch (err) {
    console.warn("[api/video/thumbnail] On-demand fetch failed:", err);
  }

  // Fallback: 307 temporary redirect to upstream
  return NextResponse.redirect(
    `https://www.eeinstagram.com/images/${shortcode}/1`,
    307
  );
}

