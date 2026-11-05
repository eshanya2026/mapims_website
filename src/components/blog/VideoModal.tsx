"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight, Calendar } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import type { ContentPost } from "@/lib/content";

type VideoModalProps = {
  post: ContentPost | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function VideoModal({ post, isOpen, onClose }: VideoModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !post || !post.video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-lg max-h-[92vh] overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-900/80">
          <div className="flex items-center gap-2 overflow-hidden pr-2">
            <span className="rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shrink-0">
              {post.category || "Video"}
            </span>
            <span className="truncate text-xs font-semibold text-white">
              {post.title}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Video Player */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 flex items-center justify-center bg-black">
          <VideoPlayer
            url={post.video}
            poster={post.image}
            title={post.title}
            autoPlay
            className="w-full"
          />
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {post.date}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            onClick={onClose}
            className="inline-flex items-center gap-1 font-semibold text-red-400 hover:text-red-300 hover:underline"
          >
            <span>Read full story</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

