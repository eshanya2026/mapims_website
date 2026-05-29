"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Newspaper, Sparkles } from "lucide-react";
import HeroBackground from "@/components/layout/HeroBackground";
import { getBlogSection, type BlogSection } from "@/data/blog-posts";

type BlogHeroProps = {
  section?: BlogSection;
};

export default function BlogHero({ section }: BlogHeroProps) {
  const activeSection = section ? getBlogSection(section) : undefined;

  return (
    <section className="relative flex min-h-[38vh] items-center overflow-hidden sm:min-h-[42vh] md:min-h-[50vh]">
      <HeroBackground imageSrc="https://images.unsplash.com/photo-1504711434966-e338fb48f529?q=80&w=2070&auto=format&fit=crop" />

      <div className="container relative z-20 mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-white/70 sm:mb-6 sm:gap-2 sm:text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog/health-insights" className="hover:text-white transition-colors">
              Blog
            </Link>
            {activeSection && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white font-medium">{activeSection.label}</span>
              </>
            )}
          </nav>

          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-600/30 bg-red-600/20 px-3 py-1.5 text-xs font-semibold text-red-400 backdrop-blur-md sm:mb-6 sm:px-4 sm:text-sm">
            {activeSection?.slug === "health-insights" ? (
              <Sparkles className="w-4 h-4" />
            ) : (
              <Newspaper className="w-4 h-4" />
            )}
            {activeSection ? activeSection.label : "News & Updates"}
          </span>

          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {activeSection ? (
              <>
                {activeSection.label.split(" ")[0]}{" "}
                <span className="text-red-500">
                  {activeSection.label.split(" ").slice(1).join(" ") || "Blog"}
                </span>
              </>
            ) : (
              <>
                Hospital <span className="text-red-500">Blog</span>
              </>
            )}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300 sm:mt-4 sm:text-lg">
            {activeSection
              ? activeSection.description
              : "Stay informed with hospital events, news, and expert health guidance from Adhiparasakthi Hospitals, Melmaruvathur."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
