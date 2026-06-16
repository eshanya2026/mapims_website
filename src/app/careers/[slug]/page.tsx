import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Users,
} from "lucide-react";
import {
  getAllPublishedJobSlugs,
  getPublishedJobBySlug,
} from "@/lib/content";
import JobApplyButton from "@/components/careers/JobApplyButton";

type CareerDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPublishedJobSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CareerDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getPublishedJobBySlug(slug);
  if (!job) return {};

  return {
    title: `${job.title} | Careers at Adhiparasakthi Hospital`,
    description: job.description.slice(0, 160),
  };
}

export default async function CareerDetailPage({ params }: CareerDetailPageProps) {
  const { slug } = await params;
  const job = await getPublishedJobBySlug(slug);
  if (!job) notFound();

  const requirements = job.requirements
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const qualifications = job.qualifications
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const applyHref = job.applyUrl
    ? job.applyUrl
    : job.applyEmail
      ? `mailto:${job.applyEmail}?subject=${encodeURIComponent(`Application: ${job.title}`)}`
      : null;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Title banner */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-10">
          <Link
            href="/careers"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition-colors hover:text-red-700 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            All careers
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-600">
              {job.department}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {job.employmentType}
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-bold leading-snug text-slate-900 sm:text-3xl md:text-4xl">
            {job.title}
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:gap-12">
          {/* Main content */}
          <div className="space-y-8">
            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">About the role</h2>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-slate-700">
                {job.description}
              </p>
            </section>

            {qualifications.length > 0 ? (
              <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8">
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Qualifications</h2>
                <ul className="mt-4 space-y-3">
                  {qualifications.map((item, index) => (
                    <li key={index} className="flex gap-3 text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Requirements</h2>
              <ul className="mt-4 space-y-3">
                {requirements.map((item, index) => (
                  <li key={index} className="flex gap-3 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm sm:rounded-3xl">
              <div className="bg-gradient-to-br from-red-600 to-red-700 px-6 py-5 text-white">
                <p className="text-sm font-medium text-red-100">Ready to apply?</p>
                <p className="mt-1 text-lg font-bold">Join the MAPIMS team</p>
              </div>

              <div className="space-y-4 p-6">
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <span>{job.employmentType}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <span>
                    {job.vacancy} {job.vacancy === 1 ? "vacancy" : "vacancies"}
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <span>Posted {job.postedAt}</span>
                </div>
                {job.closingDate ? (
                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                    <span>Closes {job.closingDate}</span>
                  </div>
                ) : null}

                <JobApplyButton jobSlug={job.slug} jobTitle={job.title} />

                {applyHref ? (
                  <a
                    href={applyHref}
                    target={job.applyUrl ? "_blank" : undefined}
                    rel={job.applyUrl ? "noopener noreferrer" : undefined}
                    className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-red-600 bg-white px-6 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                  >
                    {job.applyUrl ? (
                      <>
                        External application
                        <ExternalLink className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Apply via email
                        <Mail className="h-4 w-4" />
                      </>
                    )}
                  </a>
                ) : (
                  <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    Or email HR at{" "}
                    <a href="mailto:contact@mapims.edu.in" className="font-medium text-red-600">
                      contact@mapims.edu.in
                    </a>
                  </p>
                )}

                <Link
                  href="/careers"
                  className="block text-center text-sm font-medium text-slate-500 transition-colors hover:text-red-600"
                >
                  View other openings
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
