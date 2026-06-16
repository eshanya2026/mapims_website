import { listDoctors } from "@/lib/db/doctors";
import { listFormSubmissions } from "@/lib/db/form-submissions";
import { listJobs } from "@/lib/db/jobs";
import { listPosts } from "@/lib/db/posts";
import { formTypeLabels } from "@/lib/form-type-labels";

export type TrashResource = "posts" | "jobs" | "doctors" | "inquiries";

export type TrashItem = {
  id: string;
  resource: TrashResource;
  title: string;
  subtitle: string | null;
  deletedAt: string;
};

function sortTrashItems(items: TrashItem[]) {
  return items.sort(
    (a, b) => new Date(b.deletedAt).getTime() - new Date(a.deletedAt).getTime()
  );
}

export async function listTrashItems(resources: TrashResource[]) {
  const items: TrashItem[] = [];
  const include = new Set(resources);

  if (include.has("posts")) {
    const posts = await listPosts({ trashed: true });
    for (const post of posts) {
      if (!post.deletedAt) continue;
      items.push({
        id: post.id,
        resource: "posts",
        title: post.title,
        subtitle: post.section.replace(/-/g, " "),
        deletedAt: post.deletedAt.toISOString(),
      });
    }
  }

  if (include.has("jobs")) {
    const jobs = await listJobs({ trashed: true });
    for (const job of jobs) {
      if (!job.deletedAt) continue;
      items.push({
        id: job.id,
        resource: "jobs",
        title: job.title,
        subtitle: job.department,
        deletedAt: job.deletedAt.toISOString(),
      });
    }
  }

  if (include.has("doctors")) {
    const doctors = await listDoctors({ trashed: true });
    for (const doctor of doctors) {
      if (!doctor.deletedAt) continue;
      items.push({
        id: doctor.id,
        resource: "doctors",
        title: doctor.name,
        subtitle: doctor.designation,
        deletedAt: doctor.deletedAt.toISOString(),
      });
    }
  }

  if (include.has("inquiries")) {
    const inquiries = await listFormSubmissions({ trashed: true });
    for (const inquiry of inquiries) {
      if (!inquiry.deletedAt) continue;
      items.push({
        id: inquiry.id,
        resource: "inquiries",
        title: inquiry.name,
        subtitle:
          inquiry.jobTitle ??
          formTypeLabels[inquiry.type as keyof typeof formTypeLabels] ??
          inquiry.type,
        deletedAt: inquiry.deletedAt.toISOString(),
      });
    }
  }

  return sortTrashItems(items);
}
