"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Phone,
  Calendar,
  CheckCircle2,
  Heart,
  Building2,
  Users,
  Shield,
  Target,
  Eye,
  Award
} from "lucide-react";
import HeroBackground from "@/components/layout/HeroBackground";
import DepartmentPageAside from "@/components/departments/DepartmentPageAside";
import DepartmentHeroBadge from "@/components/departments/DepartmentHeroBadge";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentSpecialistDoctors from "@/components/departments/DepartmentSpecialistDoctors";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { transplantHeroStats } from "@/data/department-stats";
import {
  transplantIntro,
  whyChooseTransplant,
  transplantMilestones,
  transplantExcellence,
  transplantDepartmentMetrics,
  transplantServices,
  transplantServicesIntro,
  transplantVisionMission,
  transplantProgramAchievements,
  leadDoctor,
  transplantInfrastructure,
  transplantTeamNote,
  transplantJourney,
  transplantJourneyPillars,
  transplantHeroImage,
  transplantDepartmentSpecialists,
} from "@/data/transplant-department";

const infrastructureIcons = [Building2, Shield, Users, Heart] as const;
const excellenceIcons = [Building2, Users, Heart] as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="h-0.5 w-12 bg-red-600" />
      <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
        {children}
      </span>
      <div className="h-0.5 w-12 bg-red-600" />
    </div>
  );
}

function MetricStat({
  end,
  suffix = "",
  label,
}: {
  end: number;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
      <p className="text-3xl font-bold text-red-600">
        {end}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-700">{label}</p>
    </div>
  );
}

export default function TransplantDepartmentPage() {
  return (
    <main className="min-h-screen">
      <section className="relative flex min-h-[50vh] items-center overflow-hidden md:min-h-[55vh]">
        <HeroBackground
          imageSrc={transplantHeroImage}
          imageClassName="object-cover object-[50%_40%] sm:object-[56%_38%] md:object-[60%_36%]"
          overlayClassName="bg-gradient-to-r from-slate-950/97 via-slate-900/90 via-40% to-slate-900/25"
        />
        <div className="container relative z-20 mx-auto section-padding px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/70">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                href="/departments"
                className="transition-colors hover:text-white"
              >
                Departments
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-white">Multi Organ Transplant</span>
            </nav>
            <DepartmentHeroBadge>Best multi-organ transplant in India</DepartmentHeroBadge>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              <span className="text-red-500">Multi Organ Transplant Department</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
              Liver & kidney transplant programs with government authorization,
              HOPE technology, and compassionate care at every step.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#book-appointment"
                className="inline-flex h-12 items-center justify-center rounded-full bg-red-600 px-8 font-medium text-white shadow-lg shadow-red-600/30 transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Link>
              <a
                href="tel:+919499059966"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 font-medium text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <DepartmentHeroStats stats={transplantHeroStats} />

      <div className="container mx-auto px-4 pb-12 pt-4 md:pb-16 md:pt-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14">
          <DepartmentPageAside />

          <div className="order-1 min-w-0 flex-1 lg:order-2">
            {/* Why Adhiparasakthi Hospitals */}
            <section
              id="why-choose-us"
              className="scroll-mt-28 border-b border-slate-100 py-12 md:py-16"
            >
              <div className="max-w-3xl">
                <SectionLabel>Department</SectionLabel>
                <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                  Why <span className="text-red-600">Adhiparasakthi Hospitals?</span>
                </h2>
                <div className="space-y-4 leading-relaxed text-slate-600">
                  <p>{transplantIntro.preview}</p>
                  <p>{transplantIntro.full}</p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
                {whyChooseTransplant.map((item, index) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.07 }}
                    whileHover={{ y: -6 }}
                    className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/80 p-6 text-center transition-all duration-300 hover:border-red-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60"
                  >
                    <CheckCircle2 className="mx-auto mb-4 h-8 w-8 text-red-600" />
                    <h3 className="mb-2 font-bold text-slate-900 transition-colors group-hover:text-red-600">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </motion.article>
                ))}
              </div>

              <div className="mt-10 space-y-6">
                {transplantMilestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className="rounded-2xl border border-red-100 bg-red-50/50 p-6 md:p-8"
                  >
                    <h3 className="mb-3 text-lg font-bold text-red-900">
                      {milestone.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-700 md:text-base">
                      {milestone.body}
                    </p>
                    {"detail" in milestone && milestone.detail ? (
                      <p className="mt-4 text-sm leading-relaxed text-slate-600">
                        {milestone.detail}
                      </p>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Pioneering Excellence */}
            <section
              id="excellence"
              className="scroll-mt-28 border-b border-slate-100 py-12 md:py-16"
            >
              <div className="text-center">
                <SectionLabel>Adhiparasakthi Hospitals</SectionLabel>
                <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                  Pioneering Excellence in{" "}
                  <span className="text-red-600">Multi-Organ Transplantation</span>
                </h2>
                <p className="mx-auto mb-10 max-w-3xl leading-relaxed text-slate-600">
                  {transplantExcellence.intro}
                </p>
              </div>

              <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {transplantExcellence.pillars.map((pillar, index) => {
                  const Icon = excellenceIcons[index] ?? Building2;
                  return (
                    <motion.article
                      key={pillar.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
                      whileHover={{ y: -6 }}
                      className="group rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all hover:border-red-100 hover:bg-white hover:shadow-lg"
                    >
                      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="mb-2 font-bold text-slate-900 group-hover:text-red-600">
                        {pillar.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {pillar.description}
                      </p>
                    </motion.article>
                  );
                })}
              </div>

              <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {transplantDepartmentMetrics.map((metric) => (
                  <MetricStat
                    key={metric.label}
                    end={metric.end}
                    suffix={metric.suffix}
                    label={metric.label}
                  />
                ))}
              </div>

              <p className="text-center text-slate-600 leading-relaxed">
                {transplantServicesIntro}
              </p>
            </section>

            {/* Highlight service cards */}
            <section
              id="services"
              className="scroll-mt-28 border-b border-slate-100 py-12 md:py-16"
            >
              <div className="text-center">
                <SectionLabel>Our Speciality</SectionLabel>
                <h2 className="mb-10 text-3xl font-bold text-slate-900 md:text-4xl">
                  Transplant <span className="text-red-600">Services</span>
                </h2>
              </div>
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {transplantServices.map((service, index) => (
                  <motion.article
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    whileHover={{ y: -6 }}
                    className="group flex min-h-[220px] flex-col items-center rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center shadow-sm transition-all hover:border-red-100 hover:bg-white hover:shadow-xl"
                  >
                    <h3 className="mb-6 text-lg font-bold text-slate-900 group-hover:text-red-600">
                      {service.title}
                    </h3>
                    {service.description ? (
                      <p className="text-sm leading-relaxed text-slate-600">
                        {service.description}
                      </p>
                    ) : (
                      <p className="mt-auto text-base">
                        <span className="block text-2xl font-bold text-red-600">
                          {service.highlight}
                        </span>
                        <span className="mt-1 block text-slate-500">
                          {service.subtitle}
                        </span>
                      </p>
                    )}
                  </motion.article>
                ))}
              </div>
            </section>

            {/* Vision & Mission */}
            <section
              id="vision-mission"
              className="scroll-mt-28 border-b border-slate-100 py-12 md:py-16"
            >
              <div className="mb-8 text-center">
                <SectionLabel>Our Purpose</SectionLabel>
                <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                  Our Vision & <span className="text-red-600">Mission</span>
                </h2>
              </div>
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
                >
                  <div className="flex items-center gap-3 bg-red-600 px-6 py-4">
                    <Eye className="h-5 w-5 text-white" />
                    <h3 className="text-xl font-bold text-white">Our Vision</h3>
                  </div>
                  <p className="p-6 leading-relaxed text-slate-600 md:p-8">
                    {transplantVisionMission.vision}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 }}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
                >
                  <div className="flex items-center gap-3 bg-slate-900 px-6 py-4">
                    <Target className="h-5 w-5 text-white" />
                    <h3 className="text-xl font-bold text-white">Our Mission</h3>
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="mb-6 leading-relaxed text-slate-600">
                      {transplantVisionMission.missionIntro}
                    </p>
                    <ul className="space-y-4">
                      {transplantVisionMission.missionPoints.map((point) => (
                        <li key={point.title} className="flex gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                          <div>
                            <p className="font-semibold text-slate-900">
                              {point.title}
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600">
                              {point.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Program achievements — Liver & Kidney */}
            <section
              id="achievements"
              className="scroll-mt-28 border-b border-slate-100 py-12 md:py-16"
            >
              <div className="mb-10 text-center">
                <SectionLabel>Clinical Excellence</SectionLabel>
                <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                  Our <span className="text-red-600">Achievements</span>
                </h2>
                <p className="mx-auto max-w-2xl text-slate-600">
                  {transplantProgramAchievements.intro}
                </p>
              </div>
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
                <motion.article
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-6 md:p-8"
                >
                  <h3 className="mb-4 text-xl font-bold text-red-600">
                    {transplantProgramAchievements.liver.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-600">
                    {transplantProgramAchievements.liver.preview}
                  </p>
                  <ul className="space-y-2">
                    {transplantProgramAchievements.liver.bullets.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-slate-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.article>
                <motion.article
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-6 md:p-8"
                >
                  <h3 className="mb-4 text-xl font-bold text-red-600">
                    {transplantProgramAchievements.kidney.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-600">
                    {transplantProgramAchievements.kidney.preview}
                  </p>
                  <ul className="space-y-2">
                    {transplantProgramAchievements.kidney.bullets.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-slate-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </div>
            </section>

            {/* Lead doctor — Vaseekaran */}
            <section
              id="leadership"
              className="scroll-mt-28 border-b border-slate-100 py-12 md:py-16"
            >
              <SectionLabel>Leadership</SectionLabel>
              <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 lg:grid-cols-[240px_1fr]">
                <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-lg">
                  <img
                    src={leadDoctor.image}
                    alt={leadDoctor.name}
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                    {leadDoctor.name}
                  </h2>
                  <p className="mt-1 font-semibold text-red-600">
                    {leadDoctor.credentials}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{leadDoctor.department}</p>
                  <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 md:text-base">
                    <p>{leadDoctor.preview}</p>
                    <p className="whitespace-pre-line">{leadDoctor.fullBio}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Expert care / infrastructure */}
            <section
              id="infrastructure"
              className="scroll-mt-28 border-b border-slate-100 py-12 md:py-16"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-800 via-red-700 to-red-900 px-8 py-10 md:px-12 md:py-14">
                <div className="relative max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-widest text-red-200">
                    Expert Care
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                    Expert Care in{" "}
                    <span className="text-red-200">Liver & Kidney Transplantation</span>
                  </h2>
                  <p className="mt-4 leading-relaxed text-red-50/90">
                    {transplantTeamNote.description}
                  </p>
                </div>
              </div>

              <div className="relative z-10 mx-auto -mt-6 grid max-w-6xl grid-cols-1 gap-5 px-2 sm:grid-cols-2 md:-mt-8 md:gap-6 md:px-4 lg:grid-cols-4">
                {transplantInfrastructure.map((item, index) => {
                  const Icon = infrastructureIcons[index] ?? Building2;
                  return (
                    <motion.article
                      key={item.slice(0, 40)}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
                      whileHover={{ y: -6 }}
                      className="group rounded-2xl border border-red-100 bg-white p-6 shadow-lg shadow-red-900/5 transition-all hover:border-red-200 hover:shadow-xl"
                    >
                      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <p className="text-sm leading-relaxed text-slate-600 line-clamp-[8]">
                        {item}
                      </p>
                    </motion.article>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mx-auto mt-8 flex max-w-6xl items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-6 md:p-8"
              >
                <Award className="h-10 w-10 shrink-0 text-red-600" />
                <p className="text-sm font-medium text-red-900 md:text-base">
                  NABH Accredited — Government of Tamil Nadu recognized institute
                  for quality healthcare and transplant services.
                </p>
              </motion.div>
            </section>

            <div id="specialists" className="scroll-mt-28 border-b border-slate-100">
              <DepartmentSpecialistDoctors
                departmentSlug="multi-organ-transplant"
                specialists={transplantDepartmentSpecialists}
                embedded
              />
            </div>

            <DepartmentFAQ departmentSlug="multi-organ-transplant" />
            <DepartmentPatientCareSection
              heading={transplantJourney.heading}
              body={transplantJourney.body}
              pillars={transplantJourneyPillars}
              ctaHeading={transplantJourney.ctaHeading}
              ctaBody={transplantJourney.ctaBody}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
