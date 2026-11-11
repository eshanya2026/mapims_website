import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import { readAdminSessionToken } from "@/lib/admin-session";
import {
  ensureInstagramThumbnailCached,
  getInstagramPostDate,
  getInstagramThumbnailLocalUrl,
} from "@/lib/instagram-video";
import { extractInstagramShortcode, parseYouTubeUrl } from "@/lib/video-embed";

export const dynamic = "force-dynamic";

const COOKIE_NAME = "mapims_admin_session";

async function verifyAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const session = await readAdminSessionToken(token);
  return Boolean(session);
}

export async function POST(request: NextRequest) {
  try {
    const isAuthed = await verifyAdminAuth();
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const rawUrl = typeof body?.url === "string" ? body.url.trim() : "";

    if (!rawUrl) {
      return NextResponse.json(
        { error: "Please provide an Instagram post or reel URL" },
        { status: 400 }
      );
    }

    // 1. Check Instagram
    const shortcode = extractInstagramShortcode(rawUrl);
    if (shortcode) {
      const thumbUrl = await ensureInstagramThumbnailCached(shortcode);
      if (!thumbUrl) {
        return NextResponse.json(
          {
            error:
              "Unable to fetch Instagram cover image. Please check the link or upload the image manually.",
          },
          { status: 422 }
        );
      }

      const postDate = getInstagramPostDate(shortcode);
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
        shortcode,
        url: thumbUrl,
        publishedDate: postDate ? postDate.toISOString() : null,
        formattedDate,
        dateInput,
      });
    }

    // 2. Bonus: Check YouTube
    const yt = parseYouTubeUrl(rawUrl);
    if (yt?.id) {
      const dir = path.join(process.cwd(), "public", "uploads", "videos");
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      const targetFile = path.join(dir, `yt-${yt.id}-thumb.jpg`);
      const localUrl = `/uploads/videos/yt-${yt.id}-thumb.jpg`;

      if (!fs.existsSync(targetFile)) {
        for (const quality of ["maxresdefault.jpg", "hqdefault.jpg"]) {
          try {
            const res = await fetch(`https://img.youtube.com/vi/${yt.id}/${quality}`);
            if (res.ok) {
              const buf = Buffer.from(await res.arrayBuffer());
              if (buf.length > 1000) {
                fs.writeFileSync(targetFile, buf);
                break;
              }
            }
          } catch {
            // continue
          }
        }
      }

      if (fs.existsSync(targetFile)) {
        return NextResponse.json({
          success: true,
          platform: "youtube",
          id: yt.id,
          url: localUrl,
        });
      }
    }

    return NextResponse.json(
      {
        error:
          "Invalid link. Please paste a valid Instagram post or reel link (e.g. https://www.instagram.com/reel/...)",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("[api/admin/instagram-thumbnail] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch thumbnail from Instagram." },
      { status: 500 }
    );
  }
}

