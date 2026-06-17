import { NextResponse } from "next/server";
import { storeUploadedFile } from "@/lib/upload-storage";

const MAX_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function uploadErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Upload failed";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const contentType = file.type || "application/octet-stream";
    const isImage =
      contentType.startsWith("image/") || ALLOWED_TYPES.includes(contentType);

    if (!isImage) {
      return NextResponse.json(
        { error: "Invalid file type. Use JPG, PNG, WebP, or GIF." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large (max 4MB)" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const url = await storeUploadedFile({
      buffer,
      filename,
      contentType: contentType.startsWith("image/") ? contentType : `image/${ext}`,
      folder: "uploads",
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("[admin/upload]", error);
    return NextResponse.json({ error: uploadErrorMessage(error) }, { status: 500 });
  }
}
