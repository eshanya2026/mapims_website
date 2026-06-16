import Link from "next/link";
import { redirect } from "next/navigation";
import { countDoctors } from "@/lib/db/doctors";
import { countJobs } from "@/lib/db/jobs";
import { countPosts } from "@/lib/db/posts";
import { getInquiryCounts } from "@/lib/form-submissions";
import { getSession } from "@/lib/auth";
import { ADMIN_ROLES, hasPermission } from "@/lib/admin-roles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Newspaper, Briefcase, Inbox, Plus, Stethoscope } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const canPosts = hasPermission(session.role, "posts");
  const canDoctors = hasPermission(session.role, "doctors");
  const canJobs = hasPermission(session.role, "jobs");
  const canInquiries = hasPermission(session.role, "inquiries");

  const [postCount, publishedPosts, doctorCount, publishedDoctors, jobCount, publishedJobs, inquiryCounts] =
    await Promise.all([
      canPosts ? countPosts() : Promise.resolve(0),
      canPosts ? countPosts({ published: true }) : Promise.resolve(0),
      canDoctors ? countDoctors() : Promise.resolve(0),
      canDoctors ? countDoctors({ published: true }) : Promise.resolve(0),
      canJobs ? countJobs() : Promise.resolve(0),
      canJobs ? countJobs({ published: true }) : Promise.resolve(0),
      canInquiries ? getInquiryCounts(session.role) : Promise.resolve({ total: 0, new: 0 }),
    ]);

  const { total: inquiryCount, new: newInquiries } = inquiryCounts;

  const enquiriesHref =
    session.role === "hr"
      ? "/admin/inquiries?type=career"
      : "/admin/inquiries";

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Signed in as {ADMIN_ROLES[session.role]}.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {canPosts ? (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Total posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900">{postCount}</p>
              <p className="mt-1 text-xs text-slate-500">{publishedPosts} published</p>
            </CardContent>
          </Card>
        ) : null}

        {canDoctors ? (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Doctors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900">{doctorCount}</p>
              <p className="mt-1 text-xs text-slate-500">{publishedDoctors} published</p>
            </CardContent>
          </Card>
        ) : null}

        {canJobs ? (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Career openings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900">{jobCount}</p>
              <p className="mt-1 text-xs text-slate-500">{publishedJobs} published</p>
            </CardContent>
          </Card>
        ) : null}

        {canInquiries ? (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Enquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900">{inquiryCount}</p>
              <p className="mt-1 text-xs text-slate-500">{newInquiries} new</p>
            </CardContent>
          </Card>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {canPosts ? (
          <Link
            href="/admin/posts/new"
            className={buttonVariants({ variant: "default" })}
          >
            <Plus className="mr-2 h-4 w-4" />
            New post
          </Link>
        ) : null}
        {canDoctors ? (
          <Link
            href="/admin/doctors/new"
            className={buttonVariants({ variant: "default" })}
          >
            <Stethoscope className="mr-2 h-4 w-4" />
            New doctor
          </Link>
        ) : null}
        {canJobs ? (
          <Link
            href="/admin/jobs/new"
            className={buttonVariants({ variant: "default" })}
          >
            <Briefcase className="mr-2 h-4 w-4" />
            New job
          </Link>
        ) : null}
        {canInquiries ? (
          <Link
            href={enquiriesHref}
            className={buttonVariants({ variant: "outline" })}
          >
            <Inbox className="mr-2 h-4 w-4" />
            View enquiries
          </Link>
        ) : null}
        {canPosts ? (
          <Link
            href="/admin/posts"
            className={buttonVariants({ variant: "outline" })}
          >
            <Newspaper className="mr-2 h-4 w-4" />
            Manage posts
          </Link>
        ) : null}
        {canDoctors ? (
          <Link
            href="/admin/doctors"
            className={buttonVariants({ variant: "outline" })}
          >
            <Stethoscope className="mr-2 h-4 w-4" />
            Manage doctors
          </Link>
        ) : null}
      </div>
    </div>
  );
}
