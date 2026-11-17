import fs from "fs";
import path from "path";

/**
 * Returns the filesystem path where cached Instagram reels are stored.
 */
export function getInstagramVideoFilePath(shortcode: string): string {
  const dir = path.join(process.cwd(), "public", "uploads", "videos");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return path.join(dir, `ig-${shortcode}.mp4`);
}

/**
 * Returns the public web URL for a cached Instagram reel.
 */
export function getInstagramVideoLocalUrl(shortcode: string): string {
  return `/uploads/videos/ig-${shortcode}.mp4`;
}

/**
 * Returns the filesystem path where cached Instagram thumbnails are stored.
 */
export function getInstagramThumbnailFilePath(shortcode: string): string {
  const dir = path.join(process.cwd(), "public", "uploads", "videos");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return path.join(dir, `ig-${shortcode}-thumb.jpg`);
}

/**
 * Returns the public web URL for a cached Instagram thumbnail.
 */
export function getInstagramThumbnailLocalUrl(shortcode: string): string {
  return `/uploads/videos/ig-${shortcode}-thumb.jpg`;
}

/**
 * Decodes the exact publication date encoded mathematically inside an Instagram shortcode / snowflake ID.
 * Works 100% locally with 0ms latency and 0 network requests.
 */
export function getInstagramPostDate(shortcode: string): Date | null {
  if (!shortcode || typeof shortcode !== "string") return null;
  const clean = shortcode.trim();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

  try {
    let mediaId = BigInt(0);
    const sixtyFour = BigInt(64);
    for (const char of clean) {
      const idx = alphabet.indexOf(char);
      if (idx === -1) return null;
      mediaId = mediaId * sixtyFour + BigInt(idx);
    }
    // Instagram epoch is 1314220021721ms (August 24, 2011 15:47:01 UTC)
    const epoch = BigInt("1314220021721");
    const shift = BigInt(23);
    const timestampMs = Number((mediaId >> shift) + epoch);
    const date = new Date(timestampMs);
    if (isNaN(date.getTime()) || date.getFullYear() < 2011 || date.getFullYear() > 2035) {
      return null;
    }
    return date;
  } catch {
    return null;
  }
}

/**
 * Checks if the video is already cached on disk.
 */
export function isInstagramVideoCached(shortcode: string): boolean {
  try {
    const filePath = getInstagramVideoFilePath(shortcode);
    if (!fs.existsSync(filePath)) return false;
    const stat = fs.statSync(filePath);
    return stat.size > 10000; // valid MP4 file > 10KB
  } catch {
    return false;
  }
}

/**
 * Checks if the thumbnail is already cached on disk.
 */
export function isInstagramThumbnailCached(shortcode: string): boolean {
  try {
    const filePath = getInstagramThumbnailFilePath(shortcode);
    if (!fs.existsSync(filePath)) return false;
    const stat = fs.statSync(filePath);
    return stat.size > 1000; // valid image file > 1KB
  } catch {
    return false;
  }
}

function isValidImageBuffer(buf: Buffer): boolean {
  if (!buf || buf.length < 1000) return false;
  // JPEG: FF D8
  if (buf[0] === 0xff && buf[1] === 0xd8) return true;
  // PNG: 89 50 4E 47
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return true;
  // WebP: RIFF ... WEBP
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") return true;
  return false;
}

/**
 * Downloads and caches the Instagram reel thumbnail as a JPG file.
 */
export async function ensureInstagramThumbnailCached(
  shortcode: string
): Promise<string | null> {
  const cleanId = (shortcode || "").trim();
  if (!cleanId) return null;

  const targetFile = getInstagramThumbnailFilePath(cleanId);
  const localUrl = getInstagramThumbnailLocalUrl(cleanId);

  if (isInstagramThumbnailCached(cleanId)) {
    try {
      const existingBuf = fs.readFileSync(targetFile);
      if (isValidImageBuffer(existingBuf)) {
        return localUrl;
      }
      fs.unlinkSync(targetFile);
    } catch {
      // re-fetch
    }
  }

  const urls = [
    `https://www.instagram.com/p/${cleanId}/media/?size=l`,
    `https://www.instagram.com/reel/${cleanId}/media/?size=l`,
    `https://www.eeinstagram.com/images/${cleanId}/1`,
    `https://www.eeinstagram.com/images/${cleanId}/0`,
    `https://eeinstagram.com/images/${cleanId}/1`,
    `https://eeinstagram.com/images/${cleanId}/0`,
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        continue;
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      if (!isValidImageBuffer(buffer)) {
        continue;
      }

      const tempFile = `${targetFile}.${Date.now()}.tmp`;
      fs.writeFileSync(tempFile, buffer);
      fs.renameSync(tempFile, targetFile);

      console.log(`[instagram-thumb] Cached thumbnail for ${cleanId} (${buffer.length} bytes) via ${url}`);
      return localUrl;
    } catch (err) {
      console.warn(`[instagram-thumb] Error downloading thumbnail from ${url}:`, err);
    }
  }

  return null;
}

/**
 * Downloads and caches the Instagram reel as an MP4 file.
 * Returns the public URL (e.g. /uploads/videos/ig-XYZ.mp4) or null on failure.
 */
export async function ensureInstagramVideoCached(
  shortcode: string
): Promise<string | null> {
  const cleanId = (shortcode || "").trim();
  if (!cleanId) return null;

  const targetFile = getInstagramVideoFilePath(cleanId);
  const localUrl = getInstagramVideoLocalUrl(cleanId);

  // Also trigger thumbnail caching in background
  void ensureInstagramThumbnailCached(cleanId).catch(() => {});

  if (isInstagramVideoCached(cleanId)) {
    return localUrl;
  }

  // Attempt download from stream service
  const endpoints = [
    `https://www.eeinstagram.com/videos/${cleanId}/1?audio=1`,
  ];

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "*/*",
        },
        redirect: "follow",
        // Give 25 seconds timeout for video download
        signal: AbortSignal.timeout(25000),
      });

      if (!response.ok) {
        console.warn(`[instagram-video] Failed fetching ${url}: HTTP ${response.status}`);
        continue;
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length < 10000) {
        console.warn(`[instagram-video] Downloaded payload too small: ${buffer.length} bytes`);
        continue;
      }

      const tempFile = `${targetFile}.${Date.now()}.tmp`;
      fs.writeFileSync(tempFile, buffer);
      fs.renameSync(tempFile, targetFile);

      console.log(`[instagram-video] Successfully cached reel ${cleanId} (${buffer.length} bytes) to ${targetFile}`);
      return localUrl;
    } catch (err) {
      console.error(`[instagram-video] Error downloading reel from ${url}:`, err);
    }
  }

  return null;
}
