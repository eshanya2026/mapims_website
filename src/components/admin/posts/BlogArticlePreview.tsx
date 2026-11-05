"use client";

import { ArrowLeft, Calendar } from "lucide-react";
import BlogArticleBody from "@/components/blog/BlogArticleBody";
import VideoPlayer from "@/components/blog/VideoPlayer";
import { getEditorJsContentLength } from "@/lib/editorjs-content";
import { getBlogSection } from "@/data/blog-posts";
import type { ContentPost } from "@/lib/content";
import { BLOG_PLACEHOLDER_IMAGE } from "./types";

type BlogArticlePreviewProps = {
  post: ContentPost;
};

export default function BlogArticlePreview({ post }: BlogArticlePreviewProps) {
  const section = getBlogSection(post.section);

  return (
    <div className="min-h-full bg-slate-50 py-6 sm:py-10 md:py-14">
      <div className="container mx-auto px-4 sm:px-6">
        <article className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm sm:rounded-3xl">
          {post.video ? (
            <div className="bg-slate-950 overflow-hidden">
              <VideoPlayer
                url={post.video}
                poster={post.image || undefined}
                title={post.title}
              />
            </div>
          ) : (
            <img
              src={post.image || BLOG_PLACEHOLDER_IMAGE}
              alt={post.title}
              className="h-48 w-full object-cover sm:h-60 md:h-72 lg:h-80"
            />
          )}

          <div className="p-5 sm:p-8 md:p-10">
            <span className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-red-600 sm:mb-8">
              <ArrowLeft className="h-4 w-4 shrink-0" />
              <span>Back to {section?.label ?? "Blog"}</span>
            </span>

            <header className="space-y-3 border-b border-slate-100 pb-6 sm:space-y-4 sm:pb-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex max-w-full rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 sm:text-xs">
                  {post.category || "Category"}
                </span>
                {post.video ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white sm:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    Video Included
                  </span>
                ) : null}
              </div>

              <h1 className="text-2xl font-bold leading-snug text-slate-900 sm:text-3xl md:text-4xl">
                {post.title || "Untitled post"}
              </h1>

              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                  {post.date}
                </span>
                {post.author ? (
                  <span className="text-slate-400">· by {post.author}</span>
                ) : null}
              </p>
            </header>

            <div className="mt-6 sm:mt-8">
              {getEditorJsContentLength(post.content) > 0 ? (
                <BlogArticleBody content={post.content} />
              ) : post.video ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-4 text-center text-xs text-slate-400">
                  Video-only post · No article text required
                </div>
              ) : (
                <p className="text-slate-400">Start writing content to see the article preview.</p>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
