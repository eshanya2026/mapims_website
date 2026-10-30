import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { storeUploadedFile } from "@/lib/upload-storage";
import { readAdminSessionToken } from "@/lib/admin-session";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const COOKIE_NAME = "mapims_admin_session";

async function verifyAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const session = await readAdminSessionToken(token);
  return Boolean(session);
}

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-matroska",
];

function uploadErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Upload failed";
}

export async function POST(request: Request) {
  try {
    const isAuthed = await verifyAdminAuth();
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (parseError) {
      console.error("[admin/upload] FormData parsing failed:", parseError);
      return NextResponse.json(
        { error: "Failed to read upload stream. File may exceed size limits or transfer was interrupted." },
        { status: 400 }
      );
    }

    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const contentType = file.type || "application/octet-stream";
    const rawExt = file.name.split(".").pop()?.toLowerCase();
    const isVideoExtension = Boolean(rawExt && ["mp4", "webm", "ogg", "mov", "m4v", "mkv", "avi"].includes(rawExt));
    const isImageExtension = Boolean(rawExt && ["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(rawExt));

    const isImage =
      contentType.startsWith("image/") ||
      ALLOWED_IMAGE_TYPES.includes(contentType) ||
      isImageExtension;
    const isVideo =
      contentType.startsWith("video/") ||
      ALLOWED_VIDEO_TYPES.includes(contentType) ||
      isVideoExtension;

    if (!isImage && !isVideo) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Supported types: JPG, PNG, WebP, GIF, MP4, WebM, MOV, OGG.",
        },
        { status: 400 }
      );
    }

    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: `File too large (max ${isVideo ? "100MB for video" : "10MB for image"})`,
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = rawExt ?? (isVideo ? "mp4" : "jpg");
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const resolvedContentType =
      contentType !== "application/octet-stream"
        ? contentType
        : isVideo
        ? `video/${ext === "mov" ? "quicktime" : ext}`
        : `image/${ext}`;

    const url = await storeUploadedFile({
      buffer,
      filename,
      contentType: resolvedContentType,
      folder: "uploads",
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("[admin/upload]", error);
    return NextResponse.json({ error: uploadErrorMessage(error) }, { status: 500 });
  }
}
