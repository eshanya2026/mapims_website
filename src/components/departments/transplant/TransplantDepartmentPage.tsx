"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Eye, Target, Award } from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { transplantHeroStats } from "@/data/department-stats";
import {
  transplantHeroTagline,
  transplantIntro,
  whyChooseTransplant,
  liverTransplantProgram,
  kidneyTransplantProgram,
  transplantAchievements,
  transplantLandmarkMilestone,
  transplantVisionMission,
  transplantTrustMetrics,
  transplantJourney,
  transplantJourneyPillars,
  transplantHeroImage,
} from "@/data/transplant-department";
import {
  DepartmentPageHero,
  DepartmentContentLayout,
  DepartmentIntroText,
  DepartmentSection,
  DepartmentSectionLabel,
  DepartmentSectionHeading,
  DepartmentServicesGrid,
} from "@/components/departments/design";


export default function TransplantDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Multi Organ Transplant"
        badge="Best multi-organ transplant in India"
        title={
          <>
            Multi-Organ Transplant{" "}
            <span className="text-red-500">Department</span>
          </>
        }
        tagline={transplantHeroTagline}
        imageSrc={transplantHeroImage}
        imageClassName="object-cover object-[50%_40%] sm:object-[56%_38%] md:object-[60%_36%]"
        overlayClassName="bg-gradient-to-r from-slate-950/97 via-slate-900/90 via-40% to-slate-900/25"
      />
      <DepartmentHeroStats stats={transplantHeroStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{transplantIntro.preview}</p>
            <p>{transplantIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {whyChooseTransplant.map((item) => (
              <li
                key={item.title}
                className="flex gap-3 rounded-xl border border-slate-200/80 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-800 shadow-sm md:text-base"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                {item.title}
              </li>
            ))}
          </ul>
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid
            services={[liverTransplantProgram, kidneyTransplantProgram]}
          />
        </DepartmentSection>

        <DepartmentSection id="achievements" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Outcomes</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Achievements"
              align="center"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Liver Transplant */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
            >
              <div className="flex items-center gap-3 bg-gradient-to-r from-red-700 to-red-600 px-6 py-4">
                <Award className="h-5 w-5 text-white" />
                <h3 className="text-xl font-bold text-white">{transplantAchievements.liver.title}</h3>
              </div>
              <ul className="space-y-3 p-6 md:p-8">
                {transplantAchievements.liver.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm md:text-base">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                    <span className="leading-relaxed text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            {/* Kidney Transplant */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
            >
              <div className="flex items-center gap-3 bg-slate-900 px-6 py-4">
                <Award className="h-5 w-5 text-white" />
                <h3 className="text-xl font-bold text-white">{transplantAchievements.kidney.title}</h3>
              </div>
              <ul className="space-y-3 p-6 md:p-8">
                {transplantAchievements.kidney.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm md:text-base">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-700" />
                    <span className="leading-relaxed text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Landmark Clinical Breakthrough: HOPE Machine Perfusion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-red-50/80 via-white to-slate-50 px-6 py-4 md:px-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-100/70 px-3.5 py-1 text-xs font-bold tracking-wide text-red-700">
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                {transplantLandmarkMilestone.badge}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Hypothermic Oxygenated Machine Perfusion (HOPE)
              </span>
            </div>

            <div className="p-6 md:p-8 lg:p-10">
              <h3 className="text-xl font-bold leading-snug text-slate-900 sm:text-2xl lg:text-3xl">
                {transplantLandmarkMilestone.title}
              </h3>

              <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base lg:col-span-7">
                  {transplantLandmarkMilestone.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="lg:col-span-5">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-200/90 shadow-sm">
                    <Image
                      src={transplantLandmarkMilestone.image}
                      alt="Hypothermic Oxygenated Machine Perfusion (HOPE)"
                      fill
                      sizes="(max-width: 1024px) 100vw, 450px"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-2 text-center text-xs text-slate-500">
                    {transplantLandmarkMilestone.imageCaption}
                  </p>
                </div>
              </div>

              {/* 4 Core Pillars */}
              <div className="mt-8 grid grid-cols-1 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">
                {transplantLandmarkMilestone.pillars.map((pillar) => (
                  <div
                    key={pillar}
                    className="flex items-center gap-2.5 rounded-xl border border-red-100/80 bg-red-50/50 p-3.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-red-50 sm:text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-red-600" />
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </DepartmentSection>

        <DepartmentSection id="vision-mission">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Our Purpose</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our Vision &"
              highlight="Mission"
              align="center"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex items-center gap-3 bg-gradient-to-r from-red-700 to-red-600 px-6 py-4">
                <Eye className="h-5 w-5 text-white" />
                <h3 className="text-xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="p-6 leading-relaxed text-slate-600 md:p-8">
                {transplantVisionMission.vision}
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex items-center gap-3 bg-slate-900 px-6 py-4">
                <Target className="h-5 w-5 text-white" />
                <h3 className="text-xl font-bold text-white">Our Mission</h3>
              </div>
              <ul className="space-y-3 p-6 md:p-8">
                {transplantVisionMission.missionPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm md:text-base">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                    <span className="leading-relaxed text-slate-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DepartmentSection>



        <DepartmentSection id="trust">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Patient Confidence</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Why Patients"
              highlight="Trust Us"
              align="center"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {transplantTrustMetrics.map((metric, index) => (
              <motion.article
                key={metric.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-sm transition-all hover:shadow-md"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 to-red-400" />
                <p className="text-lg font-bold text-red-600 md:text-xl">
                  {metric.highlight}
                </p>
                <p className="mt-2 text-xs font-semibold text-slate-700 md:text-sm">
                  {metric.label}
                </p>
              </motion.article>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-6 md:p-8">
            <Award className="h-10 w-10 shrink-0 text-red-600" />
            <p className="text-sm font-medium text-red-900 md:text-base">
              NABH Accredited — Government of Tamil Nadu recognized institute for
              quality healthcare and transplant services.
            </p>
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="multi-organ-transplant" />
        <DepartmentPatientCareSection
          heading={transplantJourney.heading}
          body={transplantJourney.body}
          pillars={transplantJourneyPillars}
          ctaHeading={transplantJourney.ctaHeading}
          ctaBody={transplantJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
