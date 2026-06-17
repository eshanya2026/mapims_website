import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

function useBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
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
  const publicPath = path.posix.join("/", ...segments, filename);
  return publicPath;
}

export async function storeUploadedFile(options: {
  buffer: Buffer;
  filename: string;
  contentType: string;
  folder: "uploads" | "uploads/resumes";
}) {
  const { buffer, filename, contentType, folder } = options;

  if (useBlobStorage()) {
    const blob = await put(`${folder}/${filename}`, buffer, {
      access: "public",
      contentType,
      addRandomSuffix: false,
    });
    return blob.url;
  }

  const segments = folder.split("/");
  return saveLocalFile(segments, buffer, filename);
}
