"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, FileText, Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import type { BlogSection } from "@/data/blog-posts";
import type { ContentPost } from "@/lib/content";
import { cn } from "@/lib/utils";
import BlogListPreview from "./BlogListPreview";
import BlogArticlePreview from "./BlogArticlePreview";
import PostEditorPanel from "./PostEditorPanel";
import {
  BLOG_PLACEHOLDER_IMAGE,
  createEmptyPost,
  formatPreviewDate,
  sortAdminPosts,
  type AdminPostRecord,
  type PostFormData,
} from "./types";

type PostsCmsWorkspaceProps = {
  posts: AdminPostRecord[];
};

type PreviewMode = "list" | "article";

function toContentPost(
  data: PostFormData,
  options?: { id?: string; date?: string }
): ContentPost {
  return {
    id: options?.id ?? data.id ?? "draft",
    slug: data.slug || "preview",
    title: data.title || "Untitled post",
    date: options?.date ?? formatPreviewDate(),
    author: data.author || undefined,
    category: data.category || "Category",
    section: data.section,
    image: data.image || BLOG_PLACEHOLDER_IMAGE,
    excerpt: data.excerpt || "Add an excerpt to see it in the listing preview.",
    content: data.content,
    featured: data.featured,
  };
}

function recordToForm(post: AdminPostRecord): PostFormData {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    image: post.image,
    author: post.author,
    category: post.category,
    section: post.section,
    published: post.published,
    featured: post.featured,
  };
}

export default function PostsCmsWorkspace({ posts }: PostsCmsWorkspaceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeSection, setActiveSection] = useState<BlogSection>("hospital-news");
  const [previewMode, setPreviewMode] = useState<PreviewMode>("list");
  const [panelOpen, setPanelOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<string | undefined>();
  const [draft, setDraft] = useState<PostFormData>(() => createEmptyPost("hospital-news"));
  const [localPosts, setLocalPosts] = useState<AdminPostRecord[]>(() => sortAdminPosts(posts));
  const [reordering, setReordering] = useState(false);
  const reorderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalPosts(sortAdminPosts(posts));
  }, [posts]);

  useEffect(() => {
    return () => {
      if (reorderTimeoutRef.current) clearTimeout(reorderTimeoutRef.current);
    };
  }, []);

  const previewPosts = useMemo(
    () =>
      localPosts.map((post) => ({
        content: toContentPost(recordToForm(post), {
          id: post.id,
          date: formatPreviewDate(new Date(post.publishedAt)),
        }),
        published: post.published,
      })),
    [localPosts]
  );

  const handleReorder = useCallback(
    async (section: BlogSection, orderedIds: string[]) => {
      setLocalPosts((prev) => {
        const updated = prev.map((post) => {
          if (post.section !== section) return post;
          const index = orderedIds.indexOf(post.id);
          if (index === -1) return post;
          return { ...post, sortOrder: index };
        });
        return sortAdminPosts(updated);
      });

      if (reorderTimeoutRef.current) clearTimeout(reorderTimeoutRef.current);

      reorderTimeoutRef.current = setTimeout(async () => {
        setReordering(true);
        const response = await fetch("/api/admin/posts/reorder", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ section, orderedIds }),
        });
        setReordering(false);

        if (response.ok) {
          router.refresh();
        }
      }, 450);
    },
    [router]
  );

  const openNewPost = useCallback(
    (section: BlogSection = activeSection) => {
      const empty = createEmptyPost(section);
      setEditorMode("create");
      setEditingId(undefined);
      setDraft(empty);
      setActiveSection(section);
      setPanelOpen(true);
      setPreviewMode("list");
    },
    [activeSection]
  );

  const openEditPost = useCallback(
    (postId: string) => {
      const post = localPosts.find((item) => item.id === postId);
      if (!post) return;

      const form = recordToForm(post);
      setEditorMode("edit");
      setEditingId(post.id);
      setDraft(form);
      setActiveSection(form.section);
      setPanelOpen(true);
    },
    [localPosts]
  );

  const openEditBySlug = useCallback(
    (slug: string) => {
      const post = localPosts.find((item) => item.slug === slug);
      if (post) {
        openEditPost(post.id);
        return;
      }

      if (slug === draft.slug || slug === "preview") {
        setPanelOpen(true);
      }
    },
    [draft.slug, localPosts, openEditPost]
  );

  useEffect(() => {
    const editId = searchParams.get("edit");
    const isNew = searchParams.get("new");

    if (editId) {
      openEditPost(editId);
      return;
    }

    if (isNew) {
      const section = searchParams.get("section") as BlogSection | null;
      openNewPost(
        section === "hospital-events" ||
          section === "hospital-news" ||
          section === "health-insights"
          ? section
          : "hospital-news"
      );
    }
  }, [openEditPost, openNewPost, searchParams]);

  function closePanel() {
    setPanelOpen(false);
    router.replace("/admin/posts");
  }

  function handleSaved() {
    setPanelOpen(false);
    router.replace("/admin/posts");
    router.refresh();
  }

  const draftPreview = useMemo(() => toContentPost(draft, { id: "draft" }), [draft]);

  const articlePreviewPost = useMemo(() => {
    if (editorMode === "edit" && editingId) {
      const post = localPosts.find((item) => item.id === editingId);
      if (post) {
        return toContentPost(draft, {
          id: post.id,
          date: formatPreviewDate(new Date(post.publishedAt)),
        });
      }
    }
    return draftPreview;
  }, [draft, draftPreview, editorMode, editingId, localPosts]);

  const handleDraftChange = useCallback((data: PostFormData) => {
    setDraft(data);
    setActiveSection(data.section);
  }, []);

  return (
    <div className="flex h-[calc(100vh)] flex-col overflow-hidden">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
        <div>
          <h1 className="text-lg font-bold text-slate-900 sm:text-xl">Posts</h1>
          <p className="text-xs text-slate-500 sm:text-sm">
            Live website preview — drag posts to reorder, edit side by side.
            {reordering ? " Saving order..." : ""}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg border border-slate-200 p-0.5">
            <button
              type="button"
              onClick={() => setPreviewMode("list")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium sm:text-sm",
                previewMode === "list"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Section
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode("article")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium sm:text-sm",
                previewMode === "article"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <FileText className="h-3.5 w-3.5" />
              Article
            </button>
          </div>

          <button
            type="button"
            onClick={() => openNewPost(activeSection)}
            className={buttonVariants({ variant: "default" })}
          >
            <Plus className="mr-2 h-4 w-4" />
            New post
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        <div
          className={cn(
            "min-w-0 overflow-y-auto bg-slate-100 transition-[width] duration-300",
            panelOpen ? "w-[58%]" : "w-full"
          )}
        >
          <div className="mx-auto max-w-[1400px] shadow-sm">
            {previewMode === "list" ? (
              <BlogListPreview
                section={activeSection}
                posts={previewPosts}
                draftPost={panelOpen ? draftPreview : null}
                selectedSlug={draft.slug || undefined}
                onSelectPost={openEditBySlug}
                onSectionChange={setActiveSection}
                onReorder={handleReorder}
              />
            ) : (
              <BlogArticlePreview post={articlePreviewPost} />
            )}
          </div>
        </div>

        {panelOpen ? (
          <aside className="w-[42%] min-w-[360px] max-w-[520px] shrink-0 border-l border-slate-200 bg-white shadow-xl">
            <PostEditorPanel
              key={editingId ?? "new"}
              mode={editorMode}
              initial={editorMode === "edit" ? draft : undefined}
              defaultSection={activeSection}
              onChange={handleDraftChange}
              onClose={closePanel}
              onSaved={handleSaved}
            />
          </aside>
        ) : null}
      </div>
    </div>
  );
}
