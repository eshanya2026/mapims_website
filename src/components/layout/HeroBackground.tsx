"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type HeroBackgroundProps = {
  imageSrc?: string;
  className?: string;
  overlayClassName?: string;
  imageClassName?: string;
};

export default function HeroBackground({
  imageSrc,
  className,
  overlayClassName,
  imageClassName,
}: HeroBackgroundProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(imageSrc) && !imageFailed;

  return (
    <div
      className={cn(
        "absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        className
      )}
    >
      {showImage && (
        <img
          src={imageSrc}
          alt=""
          aria-hidden
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-center",
            imageClassName
          )}
          onError={() => setImageFailed(true)}
        />
      )}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/50 z-10",
          overlayClassName
        )}
      />
    </div>
  );
}
