"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type HeroBackgroundProps = {
  imageSrc?: string;
  videoSrc?: string;
  videoWebmSrc?: string;
  className?: string;
  overlayClassName?: string;
  imageClassName?: string;
  videoClassName?: string;
  /** Keeps photo sharp by not stretching beyond native width (1024px) on the right */
  imageLayout?: "full" | "split-right";
};

export default function HeroBackground({
  imageSrc,
  videoSrc,
  videoWebmSrc,
  className,
  overlayClassName,
  imageClassName,
  videoClassName,
  imageLayout = "full",
}: HeroBackgroundProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const showImage = Boolean(imageSrc) && !imageFailed;
  const hasVideo = (Boolean(videoSrc) || Boolean(videoWebmSrc)) && !videoFailed;
  const splitRight = imageLayout === "split-right";

  useEffect(() => {
    if (!videoRef.current) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        className
      )}
    >
      {/* Video Background with Poster Image */}
      {hasVideo ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={imageSrc}
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-center pointer-events-none transition-opacity duration-700",
            videoClassName
          )}
        >
          {videoWebmSrc && <source src={videoWebmSrc} type="video/webm" />}
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
          {showImage && (
            <img
              src={imageSrc}
              alt=""
              aria-hidden
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-center",
                imageClassName
              )}
            />
          )}
        </video>
      ) : showImage &&
        (splitRight ? (
          <img
            src={imageSrc}
            alt=""
            aria-hidden
            className={cn(
              "absolute top-0 right-0 h-full w-[min(58%,920px)] max-w-[1024px] object-cover object-right",
              imageClassName
            )}
            fetchPriority="high"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <img
            src={imageSrc}
            alt=""
            aria-hidden
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-center",
              imageClassName
            )}
            fetchPriority="high"
            onError={() => setImageFailed(true)}
          />
        ))}

      {/* Contrast Overlay */}
      <div
        className={cn(
          "absolute inset-0 z-10",
          splitRight
            ? "bg-gradient-to-r from-slate-900 from-35% via-slate-900/85 via-50% to-transparent"
            : "bg-gradient-to-r from-slate-950/92 via-slate-900/80 to-slate-900/40",
          overlayClassName
        )}
      />
    </div>
  );
}
