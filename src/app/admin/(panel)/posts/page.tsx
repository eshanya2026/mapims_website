import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { buttonVariants } from "@/components/ui/button";
import DeleteButton from "@/components/admin/DeleteButton";
import { Plus } from "lucide-react";

const sectionLabels: Record<string, string> = {
  "hospital-news": "Hospital News",
  "hospital-events": "Hospital Events",
  "health-insights": "Health Insights",
};

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Posts</h1>
          <p className="mt-1 text-sm text-slate-500">
            News, events, and health insights for the public blog.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className={buttonVariants({ variant: "default" })}
        >
          <Plus className="mr-2 h-4 w-4" />
          New post
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Section</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Updated</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">{post.title}</td>
                <td className="px-4 py-3 text-slate-600">
                  {sectionLabels[post.section] ?? post.section}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      post.published
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">
                  {post.updatedAt.toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                      Edit
                    </Link>
                    <DeleteButton endpoint={`/api/admin/posts/${post.id}`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 ? (
          <p className="px-4 py-12 text-center text-slate-500">No posts yet.</p>
        ) : null}
      </div>
    </div>
  );
}
