"use client";

import { useEffect, useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { ArrowRight, Calendar, GripVertical } from "lucide-react";
import BlogHero from "@/components/blog/BlogHero";
import { blogSections, type BlogSection } from "@/data/blog-posts";
import type { ContentPost } from "@/lib/content";
import { cn } from "@/lib/utils";
import { BLOG_PLACEHOLDER_IMAGE } from "./types";

type PreviewPost = {
  content: ContentPost;
  published: boolean;
};

type SortableGridItem = {
  id: string;
  post: ContentPost;
  isUnpublished: boolean;
};

type BlogListPreviewProps = {
  section: BlogSection;
  posts: PreviewPost[];
  draftPost?: ContentPost | null;
  selectedSlug?: string;
  onSelectPost: (slug: string) => void;
  onSectionChange: (section: BlogSection) => void;
  onReorder: (section: BlogSection, orderedIds: string[]) => void;
};

function PostPreviewCard({
  post,
  isDraft,
  isUnpublished,
  isSelected,
  onSelect,
  dragHandle,
}: {
  post: ContentPost;
  isDraft?: boolean;
  isUnpublished?: boolean;
  isSelected?: boolean;
  onSelect: () => void;
  dragHandle?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border bg-white text-left shadow-sm transition-all duration-300 hover:shadow-xl sm:rounded-2xl",
        isSelected
          ? "border-red-400 ring-2 ring-red-200"
          : "border-slate-100 hover:border-red-100"
      )}
    >
      {dragHandle}

      <button type="button" onClick={onSelect} className="flex flex-1 flex-col text-left">
        <div className="relative h-44 overflow-hidden sm:h-52">
          <img
            src={post.image || BLOG_PLACEHOLDER_IMAGE}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2 sm:left-4 sm:top-4">
            {isDraft ? (
              <span className="rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white sm:text-xs">
                Draft preview
              </span>
            ) : null}
            {isUnpublished ? (
              <span className="rounded-full bg-slate-700 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white sm:text-xs">
                Unpublished
              </span>
            ) : null}
            <span className="max-w-[calc(100%-1.5rem)] rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 backdrop-blur-sm sm:px-3 sm:text-xs">
              {post.category}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-6">
          <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 sm:mb-3 sm:text-sm">
            <span className="inline-flex items-center">
              <Calendar className="mr-1.5 h-3.5 w-3.5 shrink-0 sm:mr-2 sm:h-4 sm:w-4" />
              {post.date}
            </span>
            {post.author ? <span className="text-slate-400">· {post.author}</span> : null}
          </div>
          <h2 className="mb-2 line-clamp-3 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-red-600 sm:mb-3 sm:line-clamp-2 sm:text-xl">
            {post.title}
          </h2>
          <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600 sm:mb-5">
            {post.excerpt}
          </p>
          <span className="inline-flex min-h-11 items-center text-sm font-semibold text-red-600 sm:min-h-0">
            {isDraft ? "Editing" : "Edit post"}
            <ArrowRight className="ml-1 h-4 w-4" />
          </span>
        </div>
      </button>
    </div>
  );
}

function SortablePostCard({
  item,
  isSelected,
  onSelectPost,
}: {
  item: SortableGridItem;
  isSelected: boolean;
  onSelectPost: (slug: string) => void;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      className="list-none"
    >
      <PostPreviewCard
        post={item.post}
        isUnpublished={item.isUnpublished}
        isSelected={isSelected}
        onSelect={() => onSelectPost(item.post.slug)}
        dragHandle={
          <button
            type="button"
            aria-label="Drag to reorder"
            className="absolute right-3 top-3 z-10 cursor-grab rounded-lg bg-white/95 p-1.5 shadow-md transition-colors hover:bg-white active:cursor-grabbing"
            onPointerDown={(event) => {
              event.stopPropagation();
              controls.start(event);
            }}
          >
            <GripVertical className="h-4 w-4 text-slate-500" />
          </button>
        }
      />
    </Reorder.Item>
  );
}

export default function BlogListPreview({
  section,
  posts,
  draftPost,
  selectedSlug,
  onSelectPost,
  onSectionChange,
  onReorder,
}: BlogListPreviewProps) {
  const sectionPosts = posts.filter((post) => post.content.section === section);
  const showDraft =
    draftPost &&
    draftPost.section === section &&
    !sectionPosts.some((post) => post.content.slug === draftPost.slug);

  const [sortableItems, setSortableItems] = useState<SortableGridItem[]>(() =>
    sectionPosts.map((item) => ({
      id: item.content.id,
      post: item.content,
      isUnpublished: !item.published,
    }))
  );

  const sectionOrderKey = sectionPosts.map((item) => item.content.id).join("|");

  useEffect(() => {
    setSortableItems(
      posts
        .filter((post) => post.content.section === section)
        .map((item) => ({
          id: item.content.id,
          post: item.content,
          isUnpublished: !item.published,
        }))
    );
  }, [posts, section, sectionOrderKey]);

  function handleReorder(nextItems: SortableGridItem[]) {
    setSortableItems(nextItems);
    onReorder(
      section,
      nextItems.map((item) => item.id)
    );
  }

  return (
    <div className="min-h-full bg-white">
      <div className="pointer-events-none select-none">
        <BlogHero section={section} />
      </div>

      <section className="border-b border-slate-100 bg-white">
        <div className="container mx-auto px-4 py-3 sm:px-6 sm:py-4">
          <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {blogSections.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => onSectionChange(item.slug)}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors sm:px-4 sm:text-sm",
                  section === item.slug
                    ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-red-200 hover:text-red-600"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      <section className="bg-slate-50 py-10 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          {sortableItems.length === 0 && !showDraft ? (
            <p className="py-12 text-center text-slate-500">No articles in this section yet.</p>
          ) : (
            <>
              {sortableItems.length > 0 ? (
                <p className="mb-4 text-center text-xs text-slate-500 sm:text-sm">
                  Drag posts using the handle to set display order on the website.
                </p>
              ) : null}

              <div className="space-y-5 sm:space-y-6">
                {showDraft ? (
                  <PostPreviewCard
                    post={draftPost}
                    isDraft
                    isSelected={selectedSlug === draftPost.slug}
                    onSelect={() => onSelectPost(draftPost.slug)}
                  />
                ) : null}

                {sortableItems.length > 0 ? (
                  <Reorder.Group
                    axis="y"
                    values={sortableItems}
                    onReorder={handleReorder}
                    className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
                  >
                    {sortableItems.map((item) => (
                      <SortablePostCard
                        key={item.id}
                        item={item}
                        isSelected={selectedSlug === item.post.slug}
                        onSelectPost={onSelectPost}
                      />
                    ))}
                  </Reorder.Group>
                ) : null}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
