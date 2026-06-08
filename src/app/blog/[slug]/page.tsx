import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { blogSections } from "@/data/blog-posts";
import {
  getAllPublishedPostSlugs,
  getPublishedPostBySlug,
} from "@/lib/content";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function isSectionHeading(block: string) {
  const trimmed = block.trim();
  return (
    /^\d+\.\s/.test(trimmed) ||
    trimmed === "Conclusion" ||
    (trimmed.length < 80 && !trimmed.includes("."))
  );
}

function isListBlock(block: string) {
  const lines = block.split("\n").filter(Boolean);
  return lines.length > 1 && lines.every((line) => line.trim().length < 120);
}

function BlogArticleBody({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/).filter(Boolean);

  return (
    <div className="space-y-4 break-words text-[15px] leading-relaxed text-slate-700 sm:text-base">
      {blocks.map((block, index) => {
        const trimmed = block.trim();

        if (isSectionHeading(trimmed)) {
          return (
            <h2
              key={index}
              className="pt-2 text-base font-bold leading-snug text-slate-900 first:pt-0 sm:pt-3 sm:text-lg"
            >
              {trimmed}
            </h2>
          );
        }

        if (isListBlock(trimmed)) {
          return (
            <ul key={index} className="list-disc space-y-2 pl-5 sm:pl-6">
              {trimmed.split("\n").map((line, lineIndex) => (
                <li key={lineIndex}>{line.trim()}</li>
              ))}
            </ul>
          );
        }

        return <p key={index}>{trimmed}</p>;
      })}
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllPublishedPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Adhiparasakthi Hospital Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const section = blogSections.find((item) => item.slug === post.section);

  return (
    <main className="min-h-screen bg-slate-50 py-6 sm:py-10 md:py-14">
      <div className="container mx-auto px-4 sm:px-6">
        <article className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm sm:rounded-3xl">
          <img
            src={post.image}
            alt={post.title}
            className="h-48 w-full object-cover sm:h-60 md:h-72 lg:h-80"
          />

          <div className="p-5 sm:p-8 md:p-10">
            <Link
              href={section?.href ?? "/blog/health-insights"}
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-red-600 transition-colors hover:text-red-700 hover:underline sm:mb-8"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" />
              <span>Back to {section?.label ?? "Blog"}</span>
            </Link>

            <header className="space-y-3 border-b border-slate-100 pb-6 sm:space-y-4 sm:pb-8">
              <span className="inline-flex max-w-full rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 sm:text-xs">
                {post.category}
              </span>

              <h1 className="text-2xl font-bold leading-snug text-slate-900 sm:text-3xl md:text-4xl">
                {post.title}
              </h1>

              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                  {post.date}
                </span>
                {post.author ? (
                  <span className="text-slate-400">· by {post.author}</span>
                ) : null}
              </p>
            </header>

            <div className="mt-6 sm:mt-8">
              <BlogArticleBody content={post.content} />
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
