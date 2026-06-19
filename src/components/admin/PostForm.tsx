"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getEditorJsContentLength } from "@/lib/editorjs-content";
import { slugify } from "@/lib/slug";
import type { BlogSection } from "@/data/blog-posts";
import EditorJsField from "@/components/admin/posts/EditorJsField";

type PostFormData = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  section: BlogSection;
  published: boolean;
  featured: boolean;
};

type PostFormProps = {
  initial?: Partial<PostFormData>;
  mode: "create" | "edit";
};

const sections: { value: BlogSection; label: string }[] = [
  { value: "hospital-news", label: "Hospital News" },
  { value: "hospital-events", label: "Hospital Events" },
  { value: "health-insights", label: "Health Insights" },
];

export default function PostForm({ initial, mode }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<PostFormData>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
    image: initial?.image ?? "",
    author: initial?.author ?? "",
    category: initial?.category ?? "",
    section: initial?.section ?? "hospital-news",
    published: initial?.published ?? false,
    featured: initial?.featured ?? false,
  });

  function updateField<K extends keyof PostFormData>(key: K, value: PostFormData[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && mode === "create") {
        next.slug = slugify(String(value));
      }
      return next;
    });
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
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

    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {mode === "create" ? "New Post" : "Edit Post"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage hospital news, events, or health insights.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">Title</label>
          <Input
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            required
          />
        </div>
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
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">Excerpt</label>
          <Textarea
            value={form.excerpt}
            onChange={(e) => updateField("excerpt", e.target.value)}
            required
            className="min-h-[80px]"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">Content</label>
          <EditorJsField
            value={form.content}
            onChange={(content) => updateField("content", content)}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">Cover image</label>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading ? (
            <p className="mt-2 text-sm text-slate-500">Uploading...</p>
          ) : null}
          {form.image ? (
            <img
              src={form.image}
              alt="Preview"
              className="mt-3 h-40 w-full max-w-sm rounded-lg object-cover"
            />
          ) : null}
          <Input
            className="mt-3"
            value={form.image}
            onChange={(e) => updateField("image", e.target.value)}
            placeholder="/uploads/image.jpg"
            required
          />
        </div>
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

      <div className="flex gap-3">
        <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700">
          {loading ? "Saving..." : mode === "create" ? "Create post" : "Save changes"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
