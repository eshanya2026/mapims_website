"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/slug";
import type { BlogSection } from "@/data/blog-posts";
import { cn } from "@/lib/utils";
import DeleteButton from "@/components/admin/DeleteButton";
import { getEditorJsContentLength } from "@/lib/editorjs-content";
import EditorJsField from "./EditorJsField";
import { createEmptyPost, type PostFormData } from "./types";

type PostEditorPanelProps = {
  mode: "create" | "edit";
  initial?: Partial<PostFormData>;
  defaultSection: BlogSection;
  onChange: (data: PostFormData) => void;
  onClose: () => void;
  onSaved: (savedPost?: any) => void;
};

const sections: { value: BlogSection; label: string }[] = [
  { value: "hospitals-news", label: "Hospitals News" },
  { value: "hospitals-events", label: "Hospitals Events" },
  { value: "health-insights", label: "Health Insights" },
];

export default function PostEditorPanel({
  mode,
  initial,
  defaultSection,
  onChange,
  onClose,
  onSaved,
}: PostEditorPanelProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoDragging, setVideoDragging] = useState(false);

  const [form, setForm] = useState<PostFormData>(() => ({
    ...createEmptyPost(defaultSection),
    ...initial,
    section: initial?.section ?? defaultSection,
  }));

  useEffect(() => {
    if (initial) {
      setForm({
        ...createEmptyPost(defaultSection),
        ...initial,
        section: initial?.section ?? defaultSection,
      });
    }
  }, [
    initial?.id,
    initial?.title,
    initial?.slug,
    initial?.featured,
    initial?.published,
    initial?.section,
    initial?.category,
    initial?.image,
    initial?.video,
    initial?.excerpt,
    initial?.content,
    initial?.isIncoming,
    initial?.eventDate,
    defaultSection,
  ]);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    onChangeRef.current(form);
  }, [form]);

  const updateField = useCallback(
    <K extends keyof PostFormData>(key: K, value: PostFormData[K]) => {
      setForm((prev) => {
        const next = { ...prev, [key]: value };
        if (key === "title" && mode === "create") {
          next.slug = slugify(String(value));
        }
        return next;
      });
    },
    [mode]
  );

  async function uploadImage(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      updateField("image", data.url);
    } else {
      const data = await response.json().catch(() => ({}));
      setError(
        typeof data.error === "string" ? data.error : "Image upload failed"
      );
    }

    setUploading(false);
  }

  async function handleImageInput(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) await uploadImage(file);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) void uploadImage(file);
  }

  async function uploadVideo(file: File) {
    if (!file.type.startsWith("video/")) {
      setError("Please upload a valid video file (MP4, WebM, MOV, etc.)");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setError("Video file is too large. Maximum size is 100MB.");
      return;
    }

    setVideoUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        updateField("video", data.url);
      } else {
        const data = await response.json().catch(() => ({}));
        setError(
          typeof data.error === "string" ? data.error : "Video upload failed"
        );
      }
    } catch {
      setError("Network error while uploading video");
    } finally {
      setVideoUploading(false);
    }
  }

  async function handleVideoInput(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) await uploadVideo(file);
  }

  function handleVideoDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setVideoDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) void uploadVideo(file);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (getEditorJsContentLength(form.content) < 20) {
      setError("Content must be at least 20 characters.");
      setLoading(false);
      return;
    }

    const url =
      mode === "create" ? "/api/admin/posts" : `/api/admin/posts/${initial?.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? "Failed to save post");
      setLoading(false);
      return;
    }

    const saved = await response.json().catch(() => null);
    onSaved(saved);
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {mode === "create" ? "New post" : "Edit post"}
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Changes update the preview instantly.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close editor"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "relative overflow-hidden rounded-xl border-2 border-dashed transition-colors",
            dragging
              ? "border-red-500 bg-red-50"
              : "border-slate-200 bg-slate-50 hover:border-red-200"
          )}
        >
          {form.image ? (
            <img
              src={form.image}
              alt="Cover preview"
              className="h-40 w-full object-cover"
            />
          ) : (
            <div className="flex h-40 flex-col items-center justify-center gap-2 px-4 text-center">
              <ImagePlus className="h-8 w-8 text-slate-400" />
              <p className="text-sm font-medium text-slate-600">
                Drag & drop cover image here
              </p>
              <p className="text-xs text-slate-400">or click to browse</p>
            </div>
          )}

          <label className="absolute inset-0 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleImageInput}
            />
          </label>

          {uploading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
              <Loader2 className="h-6 w-6 animate-spin text-red-600" />
            </div>
          ) : null}
        </div>

        {/* Video Upload Section (for Events & News) */}
        <div className="space-y-2.5 rounded-xl border border-slate-200 bg-slate-50/80 p-3.5">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
              <Video className="h-4 w-4 text-red-600" />
              Event / News Video (Optional)
            </label>
            {form.video ? (
              <button
                type="button"
                onClick={() => updateField("video", "")}
                className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700 hover:underline"
              >
                <Trash2 className="h-3 w-3" />
                Remove video
              </button>
            ) : null}
          </div>

          {form.video ? (
            <div className="space-y-2">
              <div className="relative overflow-hidden rounded-lg bg-black aspect-video flex items-center justify-center border border-slate-200 shadow-inner">
                <video
                  src={form.video}
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center gap-2">
                <Input
                  value={form.video}
                  onChange={(e) => updateField("video", e.target.value)}
                  placeholder="https://... or /uploads/..."
                  className="h-8 text-xs bg-white font-mono"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setVideoDragging(true);
                }}
                onDragLeave={() => setVideoDragging(false)}
                onDrop={handleVideoDrop}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed p-4 text-center transition-colors",
                  videoDragging
                    ? "border-red-500 bg-red-50"
                    : "border-slate-300 bg-white hover:border-red-300"
                )}
              >
                <Video className="h-6 w-6 text-slate-400" />
                <p className="text-xs font-medium text-slate-700">
                  {videoUploading ? "Uploading video..." : "Upload event / news video"}
                </p>
                <p className="text-[11px] text-slate-400">
                  Drag & drop or click to browse (MP4, WebM, MOV, max 100MB)
                </p>

                <label className="absolute inset-0 cursor-pointer">
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/ogg,video/quicktime,video/*"
                    className="sr-only"
                    disabled={videoUploading}
                    onChange={handleVideoInput}
                  />
                </label>

                {videoUploading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-lg">
                    <Loader2 className="h-6 w-6 animate-spin text-red-600" />
                    <span className="text-xs font-semibold text-slate-800">
                      Uploading video... Please wait
                    </span>
                    <span className="text-[10px] text-slate-500">
                      (Larger files may take a few moments)
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-medium shrink-0">
                  Or enter video URL:
                </span>
                <Input
                  value={form.video || ""}
                  onChange={(e) => updateField("video", e.target.value)}
                  placeholder="https://example.com/video.mp4"
                  className="h-8 text-xs bg-white"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Title</label>
          <Input
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Slug</label>
            <Input
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Section</label>
            <select
              value={form.section}
              onChange={(e) => updateField("section", e.target.value as BlogSection)}
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
            >
              {sections.map((section) => (
                <option key={section.value} value={section.value}>
                  {section.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Category</label>
            <Input
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Author</label>
            <Input
              value={form.author}
              onChange={(e) => updateField("author", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Excerpt</label>
          <Textarea
            value={form.excerpt}
            onChange={(e) => updateField("excerpt", e.target.value)}
            required
            className="min-h-[80px]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Content</label>
          <EditorJsField
            value={form.content}
            onChange={(content) => updateField("content", content)}
          />
          <p className="mt-1.5 text-xs text-slate-500">
            Use blocks for headings, lists, quotes, images, and paragraphs.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => updateField("published", e.target.checked)}
            />
            Publish immediately
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => updateField("featured", e.target.checked)}
            />
            Feature on homepage
          </label>
          {form.section === "hospitals-events" ? (
            <label className="flex items-center gap-2 text-sm font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(form.isIncoming)}
                onChange={(e) => updateField("isIncoming", e.target.checked)}
                className="accent-emerald-600 rounded"
              />
              Mark as Incoming Event (Shown first)
            </label>
          ) : null}
        </div>

        {form.section === "hospitals-events" && form.isIncoming ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 space-y-1.5">
            <label className="block text-xs font-semibold text-emerald-900">
              Event Completion / End Date (Optional)
            </label>
            <Input
              type="date"
              value={form.eventDate || ""}
              onChange={(e) => updateField("eventDate", e.target.value)}
              className="bg-white border-emerald-300 text-slate-800"
            />
            <p className="text-xs text-emerald-700 leading-relaxed">
              Once this date passes, the event will automatically move to <strong>Past Events</strong> without requiring manual changes.
            </p>
          </div>
        ) : null}

        {error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 px-5 py-4">
        <Button
          type="submit"
          disabled={loading || uploading || videoUploading}
          className="bg-red-600 hover:bg-red-700"
        >
          {loading ? "Saving..." : mode === "create" ? "Create post" : "Save changes"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        {mode === "edit" && initial?.id ? (
          <DeleteButton
            endpoint={`/api/admin/posts/${initial.id}`}
            onDeleted={onSaved}
          />
        ) : null}
      </div>
    </form>
  );
}
