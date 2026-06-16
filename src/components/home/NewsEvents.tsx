"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ContentPost } from "@/lib/content";

const BLOG_PLACEHOLDER_IMAGE =
  "/images/blog/579502f2-f668-42e9-be7a-995936f42cfa.png";

const MotionLink = motion(Link);

type NewsEventsProps = {
  posts: ContentPost[];
};

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-600 shadow-sm backdrop-blur-sm sm:text-xs">
      {category}
    </span>
  );
}

function NewsCard({
  item,
  index,
}: {
  item: ContentPost;
  index: number;
}) {
  return (
    <MotionLink
      href={`/blog/${item.slug}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <div className="relative h-36 overflow-hidden bg-slate-50 sm:h-40">
        <img
          src={item.image || BLOG_PLACEHOLDER_IMAGE}
          alt={item.title}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute left-2.5 top-2.5">
          <CategoryBadge category={item.category} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-red-600">
          {item.title}
        </h3>
        <span className="mt-auto inline-flex items-center text-sm font-medium text-red-600 group-hover:underline">
          Read Full Story <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </span>
      </div>
    </MotionLink>
  );
}

export default function NewsEvents({ posts }: NewsEventsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="section-padding bg-slate-50">
      <div className="page-container">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-[2px] w-12 bg-red-600" />
              <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
                News & Events
              </span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Latest from <span className="text-red-600">MAPIMS</span>
            </h2>
          </div>
          <Link
            href="/blog/hospital-news"
            className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700"
          >
            View All Updates <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((item, index) => (
            <NewsCard key={item.slug} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
