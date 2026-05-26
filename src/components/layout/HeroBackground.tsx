"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type HeroBackgroundProps = {
  imageSrc?: string;
  className?: string;
  overlayClassName?: string;
  imageClassName?: string;
  /** Keeps photo sharp by not stretching beyond native width (1024px) on the right */
  imageLayout?: "full" | "split-right";
};

export default function HeroBackground({
  imageSrc,
  className,
  overlayClassName,
  imageClassName,
  imageLayout = "full",
}: HeroBackgroundProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(imageSrc) && !imageFailed;
  const splitRight = imageLayout === "split-right";

  return (
    <div
      className={cn(
        "absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        className
      )}
    >
      {showImage &&
        (splitRight ? (
          <img
            src={imageSrc}
            alt=""
            aria-hidden
            width={1024}
            height={683}
            className={cn(
              "absolute top-0 right-0 h-full w-[min(62%,1024px)] max-w-[1024px] object-cover object-center",
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
      <div
        className={cn(
          "absolute inset-0 z-10",
          splitRight
            ? "bg-gradient-to-r from-slate-900 from-35% via-slate-900/85 via-50% to-transparent"
            : "bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/50",
          overlayClassName
        )}
      />
    </div>
  );
}
