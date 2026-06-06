"use client";

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
  transplantAchievementStats,
  transplantAchievementFootnote,
  transplantLandmarkAchievement,
  transplantVisionMission,
  leadDoctor,
  transplantTrustMetrics,
  transplantJourney,
  transplantJourneyPillars,
  transplantHeroImage,
} from "@/data/transplant-department";
import {
  DepartmentPageHero,
  DepartmentContentLayout,
  DepartmentSection,
  DepartmentSectionLabel,
  DepartmentSectionHeading,
  DepartmentServicesGrid,
  DepartmentExcellenceNote,
} from "@/components/departments/design";

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
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 to-red-400" />
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
          <div className="mb-8 max-w-3xl space-y-4 leading-relaxed text-slate-600">
            <p>{transplantIntro.preview}</p>
            <p>{transplantIntro.full}</p>
          </div>
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
              title="Transplant"
              highlight="Achievements"
              align="center"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {transplantAchievementStats.map((metric) => (
              <MetricStat
                key={metric.label}
                end={metric.end}
                suffix={metric.suffix}
                label={metric.label}
              />
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-slate-500 md:text-sm">
            {transplantAchievementFootnote}
          </p>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={transplantLandmarkAchievement.title}
              paragraphs={[transplantLandmarkAchievement.body]}
            />
          </div>
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

        <DepartmentSection id="leadership" variant="muted">
          <DepartmentSectionLabel>Leadership</DepartmentSectionLabel>
          <DepartmentSectionHeading title="Meet Our" highlight="Leadership" />
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[240px_1fr]">
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-md">
              <img
                src={leadDoctor.image}
                alt={leadDoctor.name}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">
                {leadDoctor.name}
              </h3>
              <p className="mt-1 font-semibold text-red-600">
                {leadDoctor.credentials}
              </p>
              <p className="mt-1 text-sm text-slate-600">{leadDoctor.department}</p>
              <p className="mt-6 text-sm leading-relaxed text-slate-600 md:text-base">
                {leadDoctor.bio}
              </p>
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
