export type VideoPlatform = "instagram" | "youtube" | "direct" | "none";

export interface VideoInfo {
  platform: VideoPlatform;
  rawUrl: string;
  cleanUrl?: string;
  embedUrl?: string;
  streamUrl?: string;
  id?: string;
  isPortrait?: boolean;
}

const IG_PATTERNS = [
  // Web URLs with optional username, share prefix, etc.:
  // e.g. instagram.com/adhiparasakthihospitals/reel/ABC, instagram.com/reel/ABC, instagram.com/share/reel/ABC
  /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/(?:(?:[a-zA-Z0-9_.]+\/)?(?:reels?|p|tv)|share(?:\/(?:reels?|p|tv))?)\/([a-zA-Z0-9_-]+)/i,
  // Any Instagram URL containing /(?:reel|reels|p|tv)/<shortcode> anywhere in path
  /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/.*?[\/?](?:reels?|p|tv)\/([a-zA-Z0-9_-]+)/i,
  // Direct local file match: /uploads/videos/ig-<shortcode>.mp4 or -thumb.jpg
  /\/uploads\/videos\/ig-([a-zA-Z0-9_-]+)(?:\.mp4|-thumb\.jpg)/i,
];

const YT_REGEX =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;

export function parseInstagramUrl(input: string): { id: string; embedUrl: string; cleanUrl: string } | null {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();

  for (const re of IG_PATTERNS) {
    const match = trimmed.match(re);
    if (match && match[1]) {
      const id = match[1];
      return {
        id,
        cleanUrl: `https://www.instagram.com/reel/${id}/`,
        embedUrl: `https://www.instagram.com/p/${id}/embed/`,
      };
    }
  }

  // Bare shortcode check (typical Instagram shortcodes are 9-15 chars, alphanumeric with _ and -)
  if (/^[a-zA-Z0-9_-]{9,15}$/.test(trimmed)) {
    return {
      id: trimmed,
      cleanUrl: `https://www.instagram.com/reel/${trimmed}/`,
      embedUrl: `https://www.instagram.com/p/${trimmed}/embed/`,
    };
  }

  return null;
}

export function extractInstagramShortcode(input: string): string | null {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();
  const parsed = parseInstagramUrl(trimmed);
  if (parsed?.id) return parsed.id;
  const thumbMatch = trimmed.match(/\/uploads\/videos\/ig-([a-zA-Z0-9_-]+)-thumb\.jpg/i);
  if (thumbMatch && thumbMatch[1]) return thumbMatch[1];
  const videoMatch = trimmed.match(/\/uploads\/videos\/ig-([a-zA-Z0-9_-]+)\.mp4/i);
  if (videoMatch && videoMatch[1]) return videoMatch[1];
  if (/^[a-zA-Z0-9_-]{9,15}$/.test(trimmed)) {
    return trimmed;
  }
  return null;
}

export function parseYouTubeUrl(input: string): { id: string; embedUrl: string } | null {
  if (!input || typeof input !== "string") return null;
  const match = input.trim().match(YT_REGEX);
  if (!match || !match[1]) return null;
  const id = match[1];
  return {
    id,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
  };
}

export function getVideoInfo(url?: string | null): VideoInfo {
  if (!url || typeof url !== "string" || !url.trim()) {
    return { platform: "none", rawUrl: "" };
  }

  const clean = url.trim();

  const ig = parseInstagramUrl(clean);
  if (ig) {
    // If it's already a local path, use it directly; otherwise use the stream route
    const streamUrl = clean.startsWith("/uploads/")
      ? clean
      : `/api/video/stream?id=${ig.id}`;

    return {
      platform: "instagram",
      rawUrl: clean,
      cleanUrl: ig.cleanUrl,
      embedUrl: ig.embedUrl,
      streamUrl,
      id: ig.id,
      isPortrait: true,
    };
  }

  const yt = parseYouTubeUrl(clean);
  if (yt) {
    return {
      platform: "youtube",
      rawUrl: clean,
      embedUrl: yt.embedUrl,
      streamUrl: yt.embedUrl,
      id: yt.id,
      isPortrait: false,
    };
  }

  return {
    platform: "direct",
    rawUrl: clean,
    embedUrl: clean,
    streamUrl: clean,
    isPortrait: false,
  };
}
