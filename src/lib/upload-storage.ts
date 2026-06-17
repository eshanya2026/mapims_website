import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

function hasBlobCredentials() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID
  );
}

function isVercelRuntime() {
  return Boolean(process.env.VERCEL);
}

function shouldUseBlobStorage() {
  return isVercelRuntime() || hasBlobCredentials();
}

function localUploadPath(...segments: string[]) {
  return path.join(process.cwd(), "public", ...segments);
}

async function saveLocalFile(
  segments: string[],
  buffer: Buffer,
  filename: string
) {
  const uploadDir = localUploadPath(...segments);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);
  return path.posix.join("/", ...segments, filename);
}

export async function storeUploadedFile(options: {
  buffer: Buffer;
  filename: string;
  contentType: string;
  folder: "uploads" | "uploads/resumes" | "uploads/international-documents";
}) {
  const { buffer, filename, contentType, folder } = options;
  const pathname = `${folder}/${filename}`;

  if (shouldUseBlobStorage()) {
    try {
      const { url } = await put(pathname, buffer, {
        access: "public",
        contentType,
      });
      return url;
    } catch (error) {
      if (isVercelRuntime()) {
        throw new Error(
          error instanceof Error
            ? `${error.message} Connect Vercel Blob: Project → Storage → Create Blob → link to this app, then redeploy.`
            : "Vercel Blob upload failed. Connect Blob storage and redeploy."
        );
      }
      throw error;
    }
  }

  const segments = folder.split("/");
  return saveLocalFile(segments, buffer, filename);
}
