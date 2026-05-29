"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { getPostsForSection, type BlogSection } from "@/data/blog-posts";

type BlogGridProps = {
  section: BlogSection;
};

export default function BlogGrid({ section }: BlogGridProps) {
  const posts = getPostsForSection(section);

  return (
    <section className="section-padding bg-slate-50">
      <div className="page-container">
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl sm:rounded-2xl"
            >
              <div className="relative h-44 overflow-hidden sm:h-52">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 backdrop-blur-sm sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
                  {post.category}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 sm:mb-3 sm:text-sm">
                  <span className="inline-flex items-center">
                    <Calendar className="mr-1.5 h-3.5 w-3.5 shrink-0 sm:mr-2 sm:h-4 sm:w-4" />
                    {post.date}
                  </span>
                  {post.author ? (
                    <span className="text-slate-400">· {post.author}</span>
                  ) : null}
                </div>
                <h2 className="mb-2 line-clamp-3 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-red-600 sm:mb-3 sm:line-clamp-2 sm:text-xl">
                  {post.title}
                </h2>
                <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600 sm:mb-5">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-red-600 hover:underline sm:min-h-0"
                >
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-slate-500 py-12">No articles published yet.</p>
        )}
      </div>

    </section>
  );
}
