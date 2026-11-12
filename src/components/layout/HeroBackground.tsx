"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type HeroBackgroundProps = {
  imageSrc?: string;
  videoSrc?: string;
  videoMobileSrc?: string;
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
  videoMobileSrc,
  videoWebmSrc,
  className,
  overlayClassName,
  imageClassName,
  videoClassName,
  imageLayout = "full",
}: HeroBackgroundProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const showImage = Boolean(imageSrc) && !imageFailed;
  const hasVideo = (Boolean(videoSrc) || Boolean(videoMobileSrc) || Boolean(videoWebmSrc)) && !videoFailed;
  const splitRight = imageLayout === "split-right";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict requirements for iOS Safari & Android mobile browser autoplay:
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay blocked by battery saver / browser policy until user interacts
          });
      }
    };

    playVideo();
    video.addEventListener("canplay", playVideo, { once: true });
    video.addEventListener("loadeddata", playVideo, { once: true });
    video.addEventListener("playing", () => setIsPlaying(true));

    // Mobile fallback: start playback on first touch/scroll if blocked by Low Power Mode
    const onUserInteraction = () => {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
      window.removeEventListener("touchstart", onUserInteraction);
      window.removeEventListener("scroll", onUserInteraction);
      window.removeEventListener("click", onUserInteraction);
    };

    window.addEventListener("touchstart", onUserInteraction, { passive: true, once: true });
    window.addEventListener("scroll", onUserInteraction, { passive: true, once: true });
    window.addEventListener("click", onUserInteraction, { once: true });

    return () => {
      video.removeEventListener("canplay", playVideo);
      video.removeEventListener("loadeddata", playVideo);
      window.removeEventListener("touchstart", onUserInteraction);
      window.removeEventListener("scroll", onUserInteraction);
      window.removeEventListener("click", onUserInteraction);
    };
  }, [hasVideo]);

  return (
    <div
      className={cn(
        "absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        className
      )}
    >
      {/* 1. Base Poster Image: Always rendered first for instant zero-latency paint */}
      {showImage &&
        (splitRight ? (
          <img
            src={imageSrc}
            alt=""
            aria-hidden="true"
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
            aria-hidden="true"
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-center",
              imageClassName
            )}
            fetchPriority="high"
            onError={() => setImageFailed(true)}
          />
        ))}

      {/* 2. Video Background: Layered on top, fades in once playing */}
      {hasVideo ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          poster={imageSrc}
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
          style={{ objectFit: "cover" }}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-center pointer-events-none transition-opacity duration-700",
            isPlaying ? "opacity-100" : "opacity-0 sm:opacity-80",
            videoClassName
          )}
        >
          {videoWebmSrc && <source src={videoWebmSrc} type="video/webm" />}
          {videoMobileSrc && (
            <source
              src={videoMobileSrc}
              media="(max-width: 768px)"
              type="video/mp4"
            />
          )}
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </video>
      ) : null}

      {/* 3. Contrast Overlay */}
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
