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

const IG_REGEX =
  /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/(?:reel|p|tv)\/([a-zA-Z0-9_-]+)/i;

const IG_LOCAL_REGEX =
  /\/uploads\/videos\/ig-([a-zA-Z0-9_-]+)\.mp4/i;

const YT_REGEX =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;

export function parseInstagramUrl(input: string): { id: string; embedUrl: string; cleanUrl: string } | null {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();

  // Check standard web URL
  const match = trimmed.match(IG_REGEX);
  if (match && match[1]) {
    const id = match[1];
    return {
      id,
      cleanUrl: `https://www.instagram.com/reel/${id}/`,
      embedUrl: `https://www.instagram.com/p/${id}/embed/`,
    };
  }

  // Check local cached Instagram URL
  const localMatch = trimmed.match(IG_LOCAL_REGEX);
  if (localMatch && localMatch[1]) {
    const id = localMatch[1];
    return {
      id,
      cleanUrl: `https://www.instagram.com/reel/${id}/`,
      embedUrl: `https://www.instagram.com/p/${id}/embed/`,
    };
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
