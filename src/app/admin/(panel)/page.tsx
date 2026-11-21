import Link from "next/link";
import { redirect } from "next/navigation";
import { countDoctors } from "@/lib/db/doctors";
import { countJobs } from "@/lib/db/jobs";
import { countPosts } from "@/lib/db/posts";
import { getInquiryCounts } from "@/lib/form-submissions";
import { getSession } from "@/lib/auth";
import { ADMIN_ROLES, hasPermission } from "@/lib/admin-roles";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Newspaper, Briefcase, Inbox, Plus, Stethoscope } from "lucide-react";
import { getAnalyticsSummary } from "@/lib/db/analytics";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const canPosts = hasPermission(session.role, "posts");
  const canDoctors = hasPermission(session.role, "doctors");
  const canJobs = hasPermission(session.role, "jobs");
  const canInquiries = hasPermission(session.role, "inquiries");
  const canAnalytics = hasPermission(session.role, "analytics");

  const [
    postCount,
    publishedPosts,
    doctorCount,
    publishedDoctors,
    jobCount,
    publishedJobs,
    inquiryCounts,
    analyticsSummary,
  ] = await Promise.all([
    canPosts ? countPosts() : Promise.resolve(0),
    canPosts ? countPosts({ published: true }) : Promise.resolve(0),
    canDoctors ? countDoctors() : Promise.resolve(0),
    canDoctors ? countDoctors({ published: true }) : Promise.resolve(0),
    canJobs ? countJobs() : Promise.resolve(0),
    canJobs ? countJobs({ published: true }) : Promise.resolve(0),
    canInquiries ? getInquiryCounts(session.role) : Promise.resolve({ total: 0, new: 0 }),
    canAnalytics ? getAnalyticsSummary(14) : Promise.resolve(null),
  ]);

  const { total: inquiryCount, new: newInquiries } = inquiryCounts;

  const enquiriesHref =
    session.role === "insurance"
      ? "/admin/inquiries?type=insurance"
      : session.role === "hr"
        ? "/admin/inquiries?type=career"
        : "/admin/inquiries";

  return (
    <div className="p-6 sm:p-8 space-y-10 max-w-7xl mx-auto">
      {/* Dashboard Top Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Signed in as {ADMIN_ROLES[session.role]}.
        </p>
      </div>

      {/* Website Traffic & Page Analytics (Admin Login Only) */}
      {canAnalytics && analyticsSummary ? (
        <section>
          <AnalyticsDashboard initialSummary={analyticsSummary} />
        </section>
      ) : null}

      {/* Hospital CMS Content & Form Overview */}
      <section className={cn("space-y-4", canAnalytics && "pt-4 border-t border-slate-200")}>
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            CMS Content & Submissions Overview
          </h2>
          <p className="text-xs text-slate-500">
            Current records, published status, and pending inquiries.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {canPosts ? (
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">{postCount}</p>
                <p className="mt-1 text-xs text-slate-500">{publishedPosts} published</p>
              </CardContent>
            </Card>
          ) : null}

          {canDoctors ? (
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Doctors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">{doctorCount}</p>
                <p className="mt-1 text-xs text-slate-500">{publishedDoctors} published</p>
              </CardContent>
            </Card>
          ) : null}

          {canJobs ? (
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Career openings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">{jobCount}</p>
                <p className="mt-1 text-xs text-slate-500">{publishedJobs} published</p>
              </CardContent>
            </Card>
          ) : null}

          {canInquiries ? (
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Enquiries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">{inquiryCount}</p>
                <p className="mt-1 text-xs text-slate-500">{newInquiries} new</p>
              </CardContent>
            </Card>
          ) : null}
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          {canPosts ? (
            <Link
              href="/admin/posts/new"
              className={buttonVariants({ variant: "default" })}
            >
              <Plus className="mr-1.5 h-4 w-4" />
              New post
            </Link>
          ) : null}
          {canDoctors ? (
            <Link
              href="/admin/doctors/new"
              className={buttonVariants({ variant: "default" })}
            >
              <Stethoscope className="mr-1.5 h-4 w-4" />
              New doctor
            </Link>
          ) : null}
          {canJobs ? (
            <Link
              href="/admin/jobs/new"
              className={buttonVariants({ variant: "default" })}
            >
              <Briefcase className="mr-1.5 h-4 w-4" />
              New job
            </Link>
          ) : null}
          {canInquiries ? (
            <Link
              href={enquiriesHref}
              className={buttonVariants({ variant: "outline" })}
            >
              <Inbox className="mr-1.5 h-4 w-4" />
              View enquiries
            </Link>
          ) : null}
          {canPosts ? (
            <Link
              href="/admin/posts"
              className={buttonVariants({ variant: "outline" })}
            >
              <Newspaper className="mr-1.5 h-4 w-4" />
              Manage posts
            </Link>
          ) : null}
          {canDoctors ? (
            <Link
              href="/admin/doctors"
              className={buttonVariants({ variant: "outline" })}
            >
              <Stethoscope className="mr-1.5 h-4 w-4" />
              Manage doctors
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}
