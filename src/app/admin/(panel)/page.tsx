import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Newspaper, Briefcase, Plus } from "lucide-react";

export default async function AdminDashboardPage() {
  const [postCount, publishedPosts, jobCount, publishedJobs] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.job.count(),
    prisma.job.count({ where: { published: true } }),
  ]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage hospital news, events, health insights, and career openings.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">{postCount}</p>
            <p className="mt-1 text-xs text-slate-500">{publishedPosts} published</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Career openings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">{jobCount}</p>
            <p className="mt-1 text-xs text-slate-500">{publishedJobs} published</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Newspaper className="h-5 w-5 text-red-600" />
              Posts
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link
              href="/admin/posts/new"
              className={buttonVariants({ variant: "default" })}
            >
              <Plus className="mr-2 h-4 w-4" />
              New post
            </Link>
            <Link href="/admin/posts" className={buttonVariants({ variant: "outline" })}>
              View all posts
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="h-5 w-5 text-red-600" />
              Careers
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link
              href="/admin/jobs/new"
              className={buttonVariants({ variant: "default" })}
            >
              <Plus className="mr-2 h-4 w-4" />
              New job
            </Link>
            <Link href="/admin/jobs" className={buttonVariants({ variant: "outline" })}>
              View all jobs
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
