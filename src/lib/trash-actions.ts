import { revalidatePath } from "next/cache";
import {
  hasPermission,
  type AdminPermission,
  type AdminRole,
} from "@/lib/admin-roles";
import { restoreDoctor, purgeDoctor } from "@/lib/db/doctors";
import { restoreFormSubmission, purgeFormSubmission } from "@/lib/db/form-submissions";
import { restoreJob, purgeJob } from "@/lib/db/jobs";
import { restorePost, purgePost } from "@/lib/db/posts";
import type { DoctorRecord, FormSubmissionRecord, JobRecord, PostRecord } from "@/lib/db/types";
import type { TrashResource } from "@/lib/db/trash";

const resourcePermissions: Record<TrashResource, AdminPermission> = {
  posts: "posts",
  jobs: "jobs",
  doctors: "doctors",
  inquiries: "inquiries",
};

export function getTrashResourcesForRole(role: AdminRole): TrashResource[] {
  return (Object.keys(resourcePermissions) as TrashResource[]).filter((resource) =>
    hasPermission(role, resourcePermissions[resource])
  );
}

export function canManageTrashItem(role: AdminRole, resource: TrashResource) {
  return hasPermission(role, resourcePermissions[resource]);
}

export function revalidateAfterTrashRestore(
  resource: TrashResource,
  item: PostRecord | JobRecord | DoctorRecord | FormSubmissionRecord
) {
  switch (resource) {
    case "posts": {
      const post = item as PostRecord;
      revalidatePath("/");
      revalidatePath(`/blog/${post.section}`);
      revalidatePath("/blog");
      if (post.slug) revalidatePath(`/blog/${post.slug}`);
      break;
    }
    case "jobs": {
      const job = item as JobRecord;
      revalidatePath("/careers");
      if (job.slug) revalidatePath(`/careers/${job.slug}`);
      break;
    }
    case "doctors":
      revalidatePath("/");
      revalidatePath("/about");
      revalidatePath("/departments");
      break;
    case "inquiries":
      break;
  }
}

export async function restoreTrashItem(resource: TrashResource, id: string) {
  switch (resource) {
    case "posts":
      return restorePost(id);
    case "jobs":
      return restoreJob(id);
    case "doctors":
      return restoreDoctor(id);
    case "inquiries":
      return restoreFormSubmission(id);
    default:
      return null;
  }
}

export async function purgeTrashItem(resource: TrashResource, id: string) {
  switch (resource) {
    case "posts":
      return purgePost(id);
    case "jobs":
      return purgeJob(id);
    case "doctors":
      return purgeDoctor(id);
    case "inquiries":
      return purgeFormSubmission(id);
    default:
      return false;
  }
}
