import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, MapPin, Clock } from "lucide-react";
import { getPublishedJobs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers | Adhiparasakthi Hospital",
  description:
    "Join the team at Adhiparasakthi Hospitals. Explore current career openings in Melmaruvathur and build your future in healthcare.",
};

export default async function CareersPage() {
  const jobs = await getPublishedJobs();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-red-700 via-red-600 to-red-800 py-16 text-white sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-red-100">
              Join Our Team
            </p>
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">Careers at MAPIMS</h1>
            <p className="mt-4 text-base leading-relaxed text-red-50 sm:text-lg">
              Build a meaningful career in healthcare with Adhiparasakthi Hospitals at
              Melmaruvathur. We are always looking for compassionate professionals dedicated to
              patient care.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          {jobs.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                <Briefcase className="h-7 w-7 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">No openings right now</h2>
              <p className="mt-3 text-slate-600">
                We do not have any published positions at the moment. Please check back soon or
                reach out to our HR team.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {jobs.map((job) => (
                <article
                  key={job.id}
                  className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <h2 className="text-xl font-bold text-slate-900">{job.title}</h2>
                  <p className="mt-2 text-sm font-medium text-red-600">{job.department}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                    {job.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4" />
                      {job.employmentType}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      Posted {job.postedAt}
                    </span>
                  </div>
                  <Link
                    href={`/careers/${job.slug}`}
                    className="mt-6 inline-flex items-center text-sm font-semibold text-red-600 hover:underline"
                  >
                    View details <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
