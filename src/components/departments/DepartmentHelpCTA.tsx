"use client";

import Link from "next/link";
import { CircleHelp, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function DepartmentHelpCTA() {
  return (
    <section className="relative overflow-hidden py-4 sm:py-5">
      <div className="absolute inset-0 z-0 bg-red-600" />
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

      <div className="container relative z-10 mx-auto px-4">
        <ScrollReveal>
        <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-md transition-shadow duration-300 hover:shadow-lg sm:min-h-[120px] sm:max-h-[150px] sm:flex-row sm:gap-4 sm:overflow-hidden md:px-8">
          <div className="min-w-0 flex-1 text-center md:text-left">
            <h2 className="inline-flex items-center gap-2 text-base font-bold leading-snug text-white sm:text-lg md:text-xl">
              <CircleHelp
                className="h-5 w-5 shrink-0 text-amber-300 sm:h-6 sm:w-6"
                aria-hidden
              />
              Need Help Choosing the Right Department?
            </h2>
            <p className="mt-1 text-sm leading-snug text-white/80">
              Our patient care coordinators can guide you to the right specialist.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-center gap-2 sm:gap-3">
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-red-600 shadow-md transition-shadow hover:shadow-lg"
            >
              Talk to Our Team
            </Link>
            <a
              href="tel:+919499059966"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-red-600 shadow-md transition-shadow hover:shadow-lg"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden />
              +91 94990 59966
            </a>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
