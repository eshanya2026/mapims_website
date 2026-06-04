"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Phone,
  Heart,
  HandHeart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type PatientCarePillar = {
  title: string;
  description: string;
};

type DepartmentPatientCareSectionProps = {
  heading: string;
  body: string;
  pillars: PatientCarePillar[];
  ctaHeading: string;
  ctaBody: string;
};

const pillarIcons: LucideIcon[] = [HandHeart, Sparkles, Heart];

export default function DepartmentPatientCareSection({
  heading,
  body,
  pillars,
  ctaHeading,
  ctaBody,
}: DepartmentPatientCareSectionProps) {
  return (
    <section
      id="patient-care"
      className="scroll-mt-28 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50 via-white to-slate-50/80 px-6 py-10 md:px-10 md:py-12">
        <div className="mb-8 flex items-center gap-2">
          <div className="h-0.5 w-10 bg-red-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">
            Patient Care Journey
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-10">
          <h2 className="text-2xl font-bold leading-tight text-slate-900 md:text-3xl lg:text-4xl">
            {heading}
          </h2>
          <p className="leading-relaxed text-slate-600">{body}</p>
        </div>

        <ol className="mt-10 grid list-none gap-5 md:grid-cols-3 md:gap-4">
          {pillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? Heart;
            const step = String(index + 1).padStart(2, "0");

            return (
              <motion.li
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative flex flex-col border-l-4 border-red-600 bg-white p-5 shadow-sm transition-shadow hover:shadow-md md:rounded-2xl md:border md:border-slate-100 md:border-l-4 md:p-6"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <span
                    className="text-4xl font-black leading-none text-red-600/15"
                    aria-hidden
                  >
                    {step}
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-600/20">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="font-bold text-slate-900">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {pillar.description}
                </p>
              </motion.li>
            );
          })}
        </ol>
      </div>

      <div className="bg-slate-900 px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-wider text-red-400">
              Ready to begin?
            </p>
            <h3 className="mt-2 text-xl font-bold text-white md:text-2xl">
              {ctaHeading}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300 md:text-base">
              {ctaBody}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Link
              href="/#book-appointment"
              className="inline-flex h-12 items-center justify-center rounded-full bg-red-600 px-8 font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:-translate-y-0.5 hover:bg-red-700"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Consultation
            </Link>
            <a
              href="tel:+919499059966"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <Phone className="mr-2 h-5 w-5" />
              +91 94990 59966
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
