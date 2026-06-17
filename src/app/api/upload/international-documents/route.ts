import { NextResponse } from "next/server";

import {
  getFileExtension,
  INTERNATIONAL_DOCUMENT_MAX_SIZE,
  validateInternationalDocument,
} from "@/lib/international-document-upload";
import { storeUploadedFile } from "@/lib/upload-storage";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const validationError = validateInternationalDocument(file);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (file.size > INTERNATIONAL_DOCUMENT_MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large (max 10MB per file)" },
        { status: 400 }
      );
    }

    const ext = getFileExtension(file.name);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext ? `.${ext}` : ""}`;

    const url = await storeUploadedFile({
      buffer,
      filename,
      contentType: file.type || "application/octet-stream",
      folder: "uploads/international-documents",
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("[upload/international-documents]", error);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}
