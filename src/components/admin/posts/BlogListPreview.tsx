"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
  isOverlay,
}: {
  post: ContentPost;
  isDraft?: boolean;
  isUnpublished?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  dragHandle?: React.ReactNode;
  isOverlay?: boolean;
}) {
  const content = (
    <>
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
          <span className="whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 backdrop-blur-sm sm:px-3 sm:text-xs">
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
    </>
  );

  return (
    <div
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-xl border bg-white text-left shadow-sm transition-shadow duration-300 hover:shadow-xl sm:rounded-2xl",
        isSelected
          ? "border-red-400 ring-2 ring-red-200"
          : "border-slate-100 hover:border-red-100",
        isOverlay && "cursor-grabbing shadow-2xl ring-2 ring-red-200"
      )}
    >
      {dragHandle}
      {onSelect ? (
        <button type="button" onClick={onSelect} className="flex flex-1 flex-col text-left">
          {content}
        </button>
      ) : (
        <div className="flex flex-1 flex-col">{content}</div>
      )}
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("h-full touch-none", isDragging && "opacity-40")}
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
            {...attributes}
            {...listeners}
            onClick={(event) => event.stopPropagation()}
          >
            <GripVertical className="h-4 w-4 text-slate-500" />
          </button>
        }
      />
    </div>
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
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeWidth, setActiveWidth] = useState<number | null>(null);

  const sectionOrderKey = sectionPosts.map((item) => item.content.id).join("|");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
    const width = event.active.rect.current.initial?.width;
    setActiveWidth(width ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    setActiveWidth(null);

    if (!over || active.id === over.id) return;

    setSortableItems((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const nextItems = arrayMove(items, oldIndex, newIndex);

      onReorder(
        section,
        nextItems.map((item) => item.id)
      );

      return nextItems;
    });
  }

  function handleDragCancel() {
    setActiveId(null);
    setActiveWidth(null);
  }

  const activeItem = sortableItems.find((item) => item.id === activeId) ?? null;

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
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}
                  >
                    <SortableContext
                      items={sortableItems.map((item) => item.id)}
                      strategy={rectSortingStrategy}
                    >
                      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                        {sortableItems.map((item) => (
                          <SortablePostCard
                            key={item.id}
                            item={item}
                            isSelected={selectedSlug === item.post.slug}
                            onSelectPost={onSelectPost}
                          />
                        ))}
                      </div>
                    </SortableContext>

                    <DragOverlay adjustScale={false} dropAnimation={null}>
                      {activeItem ? (
                        <div style={activeWidth ? { width: activeWidth } : undefined}>
                          <PostPreviewCard
                            post={activeItem.post}
                            isUnpublished={activeItem.isUnpublished}
                            isOverlay
                            dragHandle={
                              <div className="absolute right-3 top-3 z-10 rounded-lg bg-white/95 p-1.5 shadow-md">
                                <GripVertical className="h-4 w-4 text-slate-500" />
                              </div>
                            }
                          />
                        </div>
                      ) : null}
                    </DragOverlay>
                  </DndContext>
                ) : null}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
