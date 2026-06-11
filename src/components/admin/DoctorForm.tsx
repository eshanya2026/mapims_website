"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { departments } from "@/data/departments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/slug";

type DoctorFormData = {
  id?: string;
  name: string;
  slug: string;
  designation: string;
  specialty: string;
  departmentSlug: string;
  degree: string;
  experience: string;
  bio: string;
  image: string;
  accent: "primary" | "deep";
  showOnHome: boolean;
  showOnAbout: boolean;
  sortOrder: number;
  published: boolean;
};

type DoctorFormProps = {
  initial?: Partial<DoctorFormData>;
  mode: "create" | "edit";
};

export default function DoctorForm({ initial, mode }: DoctorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<DoctorFormData>({
    name: initial?.name ?? "",
    slug: initial?.slug ?? "",
    designation: initial?.designation ?? "",
    specialty: initial?.specialty ?? "",
    departmentSlug: initial?.departmentSlug ?? "",
    degree: initial?.degree ?? "",
    experience: initial?.experience ?? "",
    bio: initial?.bio ?? "",
    image: initial?.image ?? "",
    accent: initial?.accent ?? "primary",
    showOnHome: initial?.showOnHome ?? false,
    showOnAbout: initial?.showOnAbout ?? false,
    sortOrder: initial?.sortOrder ?? 0,
    published: initial?.published ?? false,
  });

  function updateField<K extends keyof DoctorFormData>(key: K, value: DoctorFormData[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "name" && mode === "create") {
        next.slug = slugify(String(value));
      }
      return next;
    });
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
    setUploading(false);

    if (!response.ok) {
      setError("Image upload failed");
      return;
    }

    const data = (await response.json()) as { url: string };
    updateField("image", data.url);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const url =
      mode === "create" ? "/api/admin/doctors" : `/api/admin/doctors/${initial?.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? "Failed to save doctor");
      setLoading(false);
      return;
    }

    router.push("/admin/doctors");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {mode === "create" ? "New Doctor" : "Edit Doctor"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage specialist profiles shown on the home page, about page, and department pages.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">Full name</label>
          <Input
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
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
          <label className="mb-1.5 block text-sm font-medium">Sort order</label>
          <Input
            type="number"
            min={0}
            value={form.sortOrder}
            onChange={(e) => updateField("sortOrder", Number(e.target.value))}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Designation</label>
          <Input
            value={form.designation}
            onChange={(e) => updateField("designation", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Specialty</label>
          <Input
            value={form.specialty}
            onChange={(e) => updateField("specialty", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Department</label>
          <select
            value={form.departmentSlug}
            onChange={(e) => updateField("departmentSlug", e.target.value)}
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
          >
            <option value="">General / Leadership</option>
            {departments.map((dept) => (
              <option key={dept.slug} value={dept.slug}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Card accent</label>
          <select
            value={form.accent}
            onChange={(e) => updateField("accent", e.target.value as "primary" | "deep")}
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
          >
            <option value="primary">Primary red</option>
            <option value="deep">Deep red</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Degree / qualification</label>
          <Input
            value={form.degree}
            onChange={(e) => updateField("degree", e.target.value)}
            placeholder="MD, DM (Neurology)"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Experience</label>
          <Input
            value={form.experience}
            onChange={(e) => updateField("experience", e.target.value)}
            placeholder="15+ Yrs"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">Bio</label>
          <Textarea
            value={form.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            className="min-h-[100px]"
            placeholder="Short profile shown on the home page carousel"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">Photo</label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <Input
              value={form.image}
              onChange={(e) => updateField("image", e.target.value)}
              required
              placeholder="/images/doctor/photo.jpg"
            />
            <label className="inline-flex cursor-pointer items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              {uploading ? "Uploading..." : "Upload image"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          {form.image ? (
            <img
              src={form.image}
              alt="Doctor preview"
              className="mt-3 h-32 w-28 rounded-2xl object-cover object-top"
            />
          ) : null}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.showOnHome}
            onChange={(e) => updateField("showOnHome", e.target.checked)}
          />
          Show on home page
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.showOnAbout}
            onChange={(e) => updateField("showOnAbout", e.target.checked)}
          />
          Show on about page
        </label>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => updateField("published", e.target.checked)}
          />
          Published on website
        </label>
      </div>

      {error ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      ) : null}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading || uploading} className="bg-red-600 hover:bg-red-700">
          {loading ? "Saving..." : mode === "create" ? "Create doctor" : "Save changes"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
