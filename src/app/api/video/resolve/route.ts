import { NextRequest, NextResponse } from "next/server";
import { getVideoInfo } from "@/lib/video-embed";
import {
  ensureInstagramVideoCached,
  ensureInstagramThumbnailCached,
  isInstagramVideoCached,
  getInstagramVideoLocalUrl,
  getInstagramThumbnailLocalUrl,
  getInstagramPostDate,
} from "@/lib/instagram-video";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const url = typeof body?.url === "string" ? body.url.trim() : "";

    if (!url) {
      return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    const info = getVideoInfo(url);

    if (info.platform === "instagram" && info.id) {
      const isCached = isInstagramVideoCached(info.id);
      let localUrl = isCached ? getInstagramVideoLocalUrl(info.id) : null;

      if (!isCached) {
        localUrl = await ensureInstagramVideoCached(info.id);
      }

      const thumbUrl = await ensureInstagramThumbnailCached(info.id);
      const postDate = getInstagramPostDate(info.id);
      const dateInput = postDate ? postDate.toISOString().split("T")[0] : null;
      const formattedDate = postDate
        ? postDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : null;

      return NextResponse.json({
        success: true,
        platform: "instagram",
        id: info.id,
        cleanUrl: info.cleanUrl,
        localUrl: localUrl || `/uploads/videos/ig-${info.id}.mp4`,
        streamUrl: `/api/video/stream?id=${info.id}`,
        thumbnailUrl: thumbUrl || `/uploads/videos/ig-${info.id}-thumb.jpg`,
        publishedDate: postDate ? postDate.toISOString() : null,
        formattedDate,
        dateInput,
        cached: isCached || !!localUrl,
      });
    }

    if (info.platform === "youtube") {
      return NextResponse.json({
        success: true,
        platform: "youtube",
        id: info.id,
        embedUrl: info.embedUrl,
        streamUrl: info.embedUrl,
      });
    }

    // Direct video
    return NextResponse.json({
      success: true,
      platform: "direct",
      localUrl: info.rawUrl,
      streamUrl: info.rawUrl,
    });
  } catch (error) {
    console.error("[api/video/resolve] Error:", error);
    return NextResponse.json(
      { error: "Failed to resolve video" },
      { status: 500 }
    );
  }
}

