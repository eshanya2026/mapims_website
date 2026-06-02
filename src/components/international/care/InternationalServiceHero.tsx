"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Ambulance } from "lucide-react";
import HeroBackground from "@/components/layout/HeroBackground";
import ContactInternationalDeskButton from "@/components/international/ContactInternationalDeskButton";
import BookAppointmentLink from "@/components/layout/BookAppointmentLink";

type InternationalServiceHeroProps = {
  badge: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  image: string;
  breadcrumbs: { label: string; href?: string }[];
};

export default function InternationalServiceHero({
  badge,
  title,
  titleHighlight,
  subtitle,
  image,
  breadcrumbs,
}: InternationalServiceHeroProps) {
  return (
    <section  className="relative min-h-[45vh] md:min-h-[50vh] flex items-center overflow-hidden">
      <HeroBackground
        imageSrc={image}
        imageClassName={`object-cover ${image.includes("casualty") ? "object-[center_bottom]" : `"object-center"`}`}
        overlayClassName="bg-gradient-to-r from-slate-900/95 via-slate-900/75 to-slate-800/40"
      />

      <div className="container mx-auto px-4 z-20 relative py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="w-4 h-4 shrink-0" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>

          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-red-600/20 text-red-400 font-semibold text-sm mb-6 backdrop-blur-md border border-red-600/30">
            <Ambulance className="w-4 h-4" />
            {badge}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            {title}{" "}
            {titleHighlight && (
              <span className="text-red-500">{titleHighlight}</span>
            )}
          </h1>
          {subtitle && (
            <p className="text-lg text-slate-300 mt-4 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <ContactInternationalDeskButton variant="primary" />
            <BookAppointmentLink className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 font-medium text-white backdrop-blur-md transition hover:bg-white/20">
              Book Appointment
            </BookAppointmentLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
