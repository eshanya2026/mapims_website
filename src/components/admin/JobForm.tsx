"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/slug";

type JobFormData = {
  id?: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  vacancy: number;
  description: string;
  requirements: string;
  qualifications: string;
  applyEmail: string;
  applyUrl: string;
  published: boolean;
  closingDate: string;
};

type JobFormProps = {
  initial?: Partial<JobFormData>;
  mode: "create" | "edit";
};

export default function JobForm({ initial, mode }: JobFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<JobFormData>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    department: initial?.department ?? "",
    location: initial?.location ?? "Melmaruvathur, Tamil Nadu",
    employmentType: initial?.employmentType ?? "Full-time",
    vacancy: initial?.vacancy ?? 1,
    description: initial?.description ?? "",
    requirements: initial?.requirements ?? "",
    qualifications: initial?.qualifications ?? "",
    applyEmail: initial?.applyEmail ?? "",
    applyUrl: initial?.applyUrl ?? "",
    published: initial?.published ?? false,
    closingDate: initial?.closingDate ?? "",
  });

  function updateField<K extends keyof JobFormData>(key: K, value: JobFormData[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && mode === "create") {
        next.slug = slugify(String(value));
      }
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const url = mode === "create" ? "/api/admin/jobs" : `/api/admin/jobs/${initial?.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        applyUrl:
          form.applyUrl === "https://" || form.applyUrl === "http://" ? "" : form.applyUrl,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? "Failed to save job");
      setLoading(false);
      return;
    }

    router.push("/admin/jobs");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {mode === "create" ? "New Career Opening" : "Edit Career Opening"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Job listings appear on the public careers page.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">Job title</label>
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
          <label className="mb-1.5 block text-sm font-medium">Department</label>
          <Input
            value={form.department}
            onChange={(e) => updateField("department", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Location</label>
          <Input
            value={form.location}
            onChange={(e) => updateField("location", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Employment type</label>
          <Input
            value={form.employmentType}
            onChange={(e) => updateField("employmentType", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Vacancy</label>
          <Input
            type="number"
            min={1}
            value={form.vacancy}
            onChange={(e) =>
              updateField("vacancy", Math.max(1, Number.parseInt(e.target.value, 10) || 1))
            }
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Closing date</label>
          <Input
            type="date"
            value={form.closingDate}
            onChange={(e) => updateField("closingDate", e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">Description</label>
          <Textarea
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            required
            className="min-h-[160px]"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">Qualifications</label>
          <Textarea
            value={form.qualifications}
            onChange={(e) => updateField("qualifications", e.target.value)}
            className="min-h-[120px]"
            placeholder="e.g. MBBS, MD, B.Sc Nursing — one per line"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">Requirements</label>
          <Textarea
            value={form.requirements}
            onChange={(e) => updateField("requirements", e.target.value)}
            required
            className="min-h-[120px]"
            placeholder="One requirement per line"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Apply email</label>
          <Input
            type="email"
            value={form.applyEmail}
            onChange={(e) => updateField("applyEmail", e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Apply URL</label>
          <Input
            value={form.applyUrl}
            onChange={(e) => updateField("applyUrl", e.target.value)}
            placeholder="Optional — full URL including https://"
          />
        </div>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => updateField("published", e.target.checked)}
          />
          Publish on careers page
        </label>
      </div>

      {error ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      ) : null}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700">
          {loading ? "Saving..." : mode === "create" ? "Create job" : "Save changes"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
