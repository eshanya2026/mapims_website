"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/slug";
import type { BlogSection } from "@/data/blog-posts";
import { cn } from "@/lib/utils";
import DeleteButton from "@/components/admin/DeleteButton";
import { createEmptyPost, type PostFormData } from "./types";

type PostEditorPanelProps = {
  mode: "create" | "edit";
  initial?: Partial<PostFormData>;
  defaultSection: BlogSection;
  onChange: (data: PostFormData) => void;
  onClose: () => void;
  onSaved: () => void;
};

const sections: { value: BlogSection; label: string }[] = [
  { value: "hospital-news", label: "Hospital News" },
  { value: "hospital-events", label: "Hospital Events" },
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

  const [form, setForm] = useState<PostFormData>(() => ({
    ...createEmptyPost(defaultSection),
    ...initial,
    section: initial?.section ?? defaultSection,
  }));

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
      setError("Image upload failed");
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

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

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

    onSaved();
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
          <Textarea
            value={form.content}
            onChange={(e) => updateField("content", e.target.value)}
            required
            className="min-h-[200px]"
            placeholder="Write article content. Use blank lines between paragraphs."
          />
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
        </div>

        {error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 px-5 py-4">
        <Button type="submit" disabled={loading || uploading} className="bg-red-600 hover:bg-red-700">
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
