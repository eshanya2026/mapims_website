"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ContentPost } from "@/lib/content";
import { blogSections } from "@/data/blog-posts";

type NewsEventsProps = {
  posts: ContentPost[];
};

export default function NewsEvents({ posts }: NewsEventsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="section-padding bg-slate-50">
      <div className="page-container">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-12 md:flex-row md:items-end md:gap-6">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-[2px] w-12 bg-red-600"></div>
              <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
                News & Events
              </span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
              Latest from <span className="text-red-600">MAPIMS</span>
            </h2>
          </div>
          <Link
            href="/blog/hospital-news"
            className="inline-flex items-center font-medium text-red-600 transition-colors hover:text-red-700"
          >
            View All Updates <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((item, index) => {
            const section = blogSections.find((s) => s.slug === item.section);

            return (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-600 shadow-sm backdrop-blur-sm">
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center text-sm text-slate-500">
                    <Calendar className="mr-2 h-4 w-4" />
                    {item.date}
                  </div>
                  <h3 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-red-600">
                    {item.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm text-slate-600">{item.excerpt}</p>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="inline-flex items-center text-sm font-medium text-red-600 group-hover:underline"
                  >
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                  {section ? (
                    <p className="mt-3 text-xs text-slate-400">{section.label}</p>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
