"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Video, Play } from "lucide-react";
import VideoModal from "./VideoModal";
import type { ContentPost } from "@/lib/content";

type BlogGridProps = {
  posts: ContentPost[];
};

export default function BlogGrid({ posts }: BlogGridProps) {
  const [selectedVideoPost, setSelectedVideoPost] = useState<ContentPost | null>(null);

  return (
    <>
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => {
              const hasVideo = Boolean(post.video);

              return (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl flex flex-col"
                >
                  {/* Card Media Header */}
                  <div className="relative h-56 overflow-hidden bg-slate-900">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badges */}
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2 z-10 pointer-events-none">
                      {post.isIncoming ? (
                        <span className="flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                          </span>
                          Incoming Event
                        </span>
                      ) : null}
                      {hasVideo ? (
                        <span className="flex items-center gap-1.5 rounded-full bg-slate-900/90 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-sm">
                          <Video className="h-3 w-3 text-red-400" />
                          Video
                        </span>
                      ) : null}
                      <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-600 shadow-sm backdrop-blur-sm">
                        {post.category}
                      </div>
                    </div>

                    {/* Interactive Play Button for Video Posts */}
                    {hasVideo ? (
                      <button
                        type="button"
                        onClick={() => setSelectedVideoPost(post)}
                        aria-label={`Play video for ${post.title}`}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors cursor-pointer group/btn"
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl transition-all duration-300 group-hover/btn:scale-115 group-hover/btn:bg-red-500 ring-4 ring-white/30">
                          <Play className="h-6 w-6 fill-white translate-x-0.5" />
                        </div>
                      </button>
                    ) : (
                      <Link
                        href={`/blog/${post.slug}`}
                        className="absolute inset-0"
                        aria-label={post.title}
                      />
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-1 flex-col justify-between">
                    <div>
                      <div className="mb-3 flex items-center text-sm text-slate-500">
                        <Calendar className="mr-2 h-4 w-4 shrink-0" />
                        {post.date}
                      </div>
                      <h2 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-red-600">
                        <Link href={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="mb-4 line-clamp-2 text-sm text-slate-600">{post.excerpt}</p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      {hasVideo ? (
                        <button
                          type="button"
                          onClick={() => setSelectedVideoPost(post)}
                          className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
                        >
                          <Play className="mr-1.5 h-3.5 w-3.5 fill-red-600" />
                          Watch Video
                        </button>
                      ) : (
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                        >
                          Read More <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      )}

                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs text-slate-400 hover:text-slate-600 hover:underline"
                      >
                        Full details &rarr;
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {posts.length === 0 ? (
            <p className="py-12 text-center text-slate-500">No articles published yet.</p>
          ) : null}
        </div>
      </section>

      {/* Video Lightbox Modal */}
      <VideoModal
        post={selectedVideoPost}
        isOpen={Boolean(selectedVideoPost)}
        onClose={() => setSelectedVideoPost(null)}
      />
    </>
  );
}
