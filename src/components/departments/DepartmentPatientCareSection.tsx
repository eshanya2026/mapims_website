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
import DepartmentSection from "@/components/departments/design/DepartmentSection";
import DepartmentSectionLabel from "@/components/departments/design/DepartmentSectionLabel";

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
    <DepartmentSection id="patient-care" variant="inset" className="!p-0">
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-md">
        <div className="border-b border-slate-100 bg-gradient-to-br from-white via-slate-50/50 to-white px-6 py-10 md:px-10 md:py-12">
          <DepartmentSectionLabel>Patient Care Journey</DepartmentSectionLabel>

          <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-10">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 md:text-3xl lg:text-4xl">
              {heading}
            </h2>
            <p className="leading-relaxed text-slate-600">{body}</p>
          </div>

          <ol className="mt-10 grid list-none gap-4 md:grid-cols-3">
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
                  className="relative flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span
                      className="text-3xl font-black leading-none text-red-600/15"
                      aria-hidden
                    >
                      {step}
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-600/25">
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

        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 px-6 py-8 md:px-10 md:py-10">
          <div
            className="pointer-events-none absolute -right-6 top-0 h-32 w-32 rounded-full bg-red-500/20 blur-3xl"
            aria-hidden
          />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-red-300">
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
                className="inline-flex h-12 items-center justify-center rounded-xl bg-red-600 px-8 font-semibold text-white shadow-lg shadow-red-900/40 transition-all hover:-translate-y-0.5 hover:bg-red-700"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Link>
              <a
                href="tel:+919499059966"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-8 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15"
              >
                <Phone className="mr-2 h-5 w-5" />
                +91 94990 59966
              </a>
            </div>
          </div>
        </div>
      </div>
    </DepartmentSection>
  );
}
