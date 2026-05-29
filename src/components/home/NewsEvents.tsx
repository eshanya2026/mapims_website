"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getPostsForSection } from "@/data/blog-posts";

export default function NewsEvents() {
  const featured = getPostsForSection("health-insights").slice(0, 3);

  return (
    <section className="section-padding bg-slate-50">
      <div className="page-container">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-red-600"></div>
              <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">
                Health Insights
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
              Expert <span className="text-red-600">Health Tips</span>
            </h2>
          </div>
          <Link
            href="/blog/health-insights"
            className="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-colors"
          >
            View All Articles <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="section-grid grid-cols-1 md:grid-cols-3 md:gap-8">
          {featured.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-red-600 shadow-sm uppercase tracking-wider">
                  {item.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-slate-500 text-sm mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {item.date}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 mb-4 line-clamp-2 text-sm">{item.excerpt}</p>
                <Link
                  href="/blog/health-insights"
                  className="inline-flex items-center text-red-600 font-medium text-sm group-hover:underline"
                >
                  Read More <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
