"use client";

import { getVideoInfo } from "@/lib/video-embed";

type VideoPlayerProps = {
  url?: string | null;
  poster?: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
};

export default function VideoPlayer({
  url,
  poster,
  title,
  className = "",
  autoPlay = false,
}: VideoPlayerProps) {
  const info = getVideoInfo(url);

  if (info.platform === "none") {
    return null;
  }

  if (info.platform === "instagram") {
    const videoSrc = info.streamUrl || `/api/video/stream?id=${info.id}`;

    return (
      <div className={`flex flex-col items-center justify-center w-full py-2 ${className}`}>
        {/* Clean Video Player Box */}
        <div className="relative w-full max-w-[420px] rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-850">
          <div className="relative aspect-[9/16] max-h-[660px] w-full flex items-center justify-center bg-black">
            <video
              key={videoSrc}
              src={videoSrc}
              controls
              playsInline
              autoPlay={autoPlay}
              preload="metadata"
              poster={poster || undefined}
              className="w-full h-full object-contain"
            >
              Your browser does not support HTML5 video.
            </video>
          </div>
        </div>
      </div>
    );
  }

  if (info.platform === "youtube") {
    return (
      <div
        className={`relative w-full overflow-hidden bg-slate-950 aspect-video rounded-2xl shadow-inner ${className}`}
      >
        <iframe
          src={info.embedUrl ? `${info.embedUrl}${autoPlay ? "?autoplay=1" : ""}` : ""}
          title={title || "YouTube Video"}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Direct video file (MP4, WebM, local /uploads/...)
  return (
    <div
      className={`relative w-full overflow-hidden bg-slate-950 rounded-2xl flex items-center justify-center shadow-inner ${className}`}
    >
      <video
        key={info.streamUrl || info.rawUrl}
        src={info.streamUrl || info.rawUrl}
        controls
        playsInline
        autoPlay={autoPlay}
        preload="metadata"
        poster={poster || undefined}
        className="w-full max-h-[600px] object-contain rounded-2xl"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
