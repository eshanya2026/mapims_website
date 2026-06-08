import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, MapPin, Mail, ExternalLink } from "lucide-react";
import {
  getAllPublishedJobSlugs,
  getPublishedJobBySlug,
} from "@/lib/content";

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
    description: job.summary,
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

  const applyHref = job.applyUrl
    ? job.applyUrl
    : job.applyEmail
      ? `mailto:${job.applyEmail}?subject=${encodeURIComponent(`Application: ${job.title}`)}`
      : null;

  return (
    <main className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <article className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm sm:rounded-3xl">
          <div className="p-6 sm:p-10">
            <Link
              href="/careers"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to careers
            </Link>

            <header className="border-b border-slate-100 pb-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
                {job.department}
              </p>
              <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
                {job.title}
              </h1>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4" />
                  {job.employmentType}
                </span>
                <span>Posted {job.postedAt}</span>
                {job.closingDate ? <span>Closes {job.closingDate}</span> : null}
              </div>
            </header>

            <div className="prose prose-slate mt-8 max-w-none">
              <h2 className="text-lg font-bold text-slate-900">About the role</h2>
              <p className="mt-3 whitespace-pre-line text-slate-700">{job.description}</p>

              <h2 className="mt-8 text-lg font-bold text-slate-900">Requirements</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                {requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {applyHref ? (
              <div className="mt-10 border-t border-slate-100 pt-8">
                <a
                  href={applyHref}
                  target={job.applyUrl ? "_blank" : undefined}
                  rel={job.applyUrl ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  {job.applyUrl ? (
                    <>
                      Apply now <ExternalLink className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Apply via email <Mail className="ml-2 h-4 w-4" />
                    </>
                  )}
                </a>
              </div>
            ) : null}
          </div>
        </article>
      </div>
    </main>
  );
}
