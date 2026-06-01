"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Plane, ArrowRight, Calendar } from "lucide-react";
import HeroBackground from "@/components/layout/HeroBackground";
import { internationalHeroSlides } from "@/data/international-patients";
import { cn } from "@/lib/utils";

const heroImage = internationalHeroSlides[0].image;

const navButtonClass =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 hover:border-white/40 disabled:opacity-40";

export default function InternationalHero() {
  const [index, setIndex] = useState(0);
  const total = internationalHeroSlides.length;
  const slide = internationalHeroSlides[index];

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="relative flex min-h-[55vh] items-center overflow-hidden md:min-h-[60vh]">
      <HeroBackground
        imageSrc={heroImage}
        imageClassName="object-cover object-[68%_center] sm:object-[72%_center]"
        overlayClassName="bg-gradient-to-r from-slate-950/90 via-slate-900/70 via-45% to-slate-900/25"
      />

      <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-24 w-full overflow-hidden opacity-20">
        <svg
          viewBox="0 0 1000 100"
          className="h-full w-full stroke-red-600 stroke-2 fill-none"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,50 L200,50 L230,20 L260,80 L290,50 L1000,50"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="page-container relative z-20 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-3xl">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0" />
            <span className="font-medium text-white">International Patients</span>
          </nav>

          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-600/30 bg-red-600/20 px-4 py-1.5 text-sm font-semibold text-red-400 backdrop-blur-md">
            <Plane className="h-4 w-4" />
            International Patient Care
          </span>

          <div className="relative min-h-[220px] sm:min-h-[200px] md:min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                  {slide.title}{" "}
                  {slide.highlight ? (
                    <span className="text-red-500">{slide.highlight}</span>
                  ) : null}
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
                  {slide.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={slide.href}
              className="inline-flex h-12 items-center justify-center rounded-full bg-red-600 px-8 font-medium text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700"
            >
              Explore Patient Care
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/#book-appointment"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 font-medium text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Appointment
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
            <div className="flex items-center gap-2">
              {internationalHeroSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index
                      ? "w-8 bg-red-500"
                      : "w-1.5 bg-white/30 hover:bg-white/50"
                  )}
                />
              ))}
            </div>

            <span className="text-sm font-medium tabular-nums text-white/60">
              {String(index + 1).padStart(2, "0")}{" "}
              <span className="text-white/30">/</span>{" "}
              {String(total).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-2 sm:ml-auto">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous slide"
                className={navButtonClass}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next slide"
                className={navButtonClass}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
