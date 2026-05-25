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
    <section className="relative min-h-[45vh] md:min-h-[50vh] flex items-center overflow-hidden">
      <HeroBackground imageSrc="https://images.unsplash.com/photo-1504711434966-e338fb48f529?q=80&w=2070&auto=format&fit=crop" />

      <div className="container mx-auto px-4 z-20 relative py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
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

          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-red-600/20 text-red-400 font-semibold text-sm mb-6 backdrop-blur-md border border-red-600/30">
            {activeSection?.slug === "health-insights" ? (
              <Sparkles className="w-4 h-4" />
            ) : (
              <Newspaper className="w-4 h-4" />
            )}
            {activeSection ? activeSection.label : "News & Updates"}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
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
          <p className="text-lg text-slate-300 mt-4 max-w-2xl leading-relaxed">
            {activeSection
              ? activeSection.description
              : "Stay informed with hospital events, news, and expert health guidance from Adhiparasakthi Hospitals, Melmaruvathur."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
