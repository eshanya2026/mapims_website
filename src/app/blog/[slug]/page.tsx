import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import {
  blogPosts,
  blogSections,
  getPostBySlug,
} from "@/data/blog-posts";

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

function BlogArticleBody({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/).filter(Boolean);

  return (
    <div className="space-y-4 text-slate-700 leading-relaxed">
      {blocks.map((block, index) =>
        isSectionHeading(block) ? (
          <h2 key={index} className="pt-3 text-lg font-bold text-slate-900 first:pt-0">
            {block.trim()}
          </h2>
        ) : (
          <p key={index}>{block.trim()}</p>
        )
      )}
    </div>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Adhiparasakthi Hospital Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const section = blogSections.find((item) => item.slug === post.section);

  return (
    <main className="min-h-screen bg-slate-50 py-10 sm:py-14">
      <div className="container mx-auto px-4">
        <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          <img
            src={post.image}
            alt={post.title}
            className="h-60 w-full object-cover sm:h-72 md:h-80"
          />

          <div className="p-6 sm:p-8 md:p-10">
            <Link
              href={section?.href ?? "/blog/health-insights"}
              className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {section?.label ?? "Blog"}
            </Link>

            <div className="mt-5 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-600">
              {post.category}
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              {post.title}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="h-4 w-4" />
              {post.date}
              {post.author ? <span className="text-slate-400">· by {post.author}</span> : null}
            </p>

            <div className="mt-8">
              <BlogArticleBody content={post.content} />
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

