import { NextResponse } from "next/server";
import { createReadStream, existsSync, statSync } from "fs";
import path from "path";
import { Readable } from "stream";

export const dynamic = "force-dynamic";

const MIME_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".txt": "text/plain",
  ".mp4": "video/mp4",
  ".m4v": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".ogg": "video/ogg",
};

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { path: segments } = await context.params;

  if (!segments || segments.length === 0) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // Prevent directory traversal attacks
  const safeSegments = segments.filter((s) => !s.includes("..") && !s.includes("/") && !s.includes("\\"));
  if (safeSegments.length !== segments.length) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Check in public/uploads/...
  const possiblePaths = [
    path.join(process.cwd(), "public", "uploads", ...safeSegments),
    path.join(process.cwd(), "uploads", ...safeSegments),
    path.join("/app", "public", "uploads", ...safeSegments),
  ];

  let targetPath: string | null = null;
  for (const p of possiblePaths) {
    if (existsSync(p)) {
      targetPath = p;
      break;
    }
  }

  if (!targetPath) {
    return new NextResponse("File Not Found", { status: 404 });
  }

  try {
    const stat = statSync(targetPath);
    if (!stat.isFile()) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const ext = path.extname(targetPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    // Handle HTTP Range requests for video/audio streaming
    const rangeHeader = request.headers.get("range");
    if (rangeHeader && rangeHeader.startsWith("bytes=")) {
      const parts = rangeHeader.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;

      if (start >= stat.size || end >= stat.size || start > end) {
        return new NextResponse("Requested Range Not Satisfiable", {
          status: 416,
          headers: {
            "Content-Range": `bytes */${stat.size}`,
          },
        });
      }

      const chunkSize = end - start + 1;
      const nodeStream = createReadStream(targetPath, { start, end });
      const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

      return new NextResponse(webStream, {
        status: 206,
        headers: {
          "Content-Type": contentType,
          "Content-Range": `bytes ${start}-${end}/${stat.size}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize.toString(),
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    // Standard Full File Response
    const nodeStream = createReadStream(targetPath);
    const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

    return new NextResponse(webStream, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Accept-Ranges": "bytes",
        "Content-Length": stat.size.toString(),
        "Content-Disposition": `inline; filename="${path.basename(targetPath)}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("[uploads route error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
