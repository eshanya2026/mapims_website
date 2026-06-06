"use client";

import { Brain, Users } from "lucide-react";
import { motion } from "framer-motion";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { neurologyStats } from "@/data/department-stats";
import {
  neurologyIntro,
  whyChooseNeurology,
  neurologyServices,
  neurologyServicesIntro,
  neurologyInfrastructure,
  neurologyTeamNote,
  neurologyJourney,
  neurologyJourneyPillars,
  neurologyHeroImage,
} from "@/data/neurology-department";
import {
  DepartmentPageHero,
  DepartmentContentLayout,
  DepartmentSection,
  DepartmentSectionLabel,
  DepartmentSectionHeading,
  DepartmentWhyChooseCards,
  DepartmentServicesGrid,
  DepartmentChecklistGrid,
  DepartmentGradientPanel,
} from "@/components/departments/design";

const NEUROLOGY_HERO_TAGLINE =
  "World-class neurological care with advanced diagnostics, compassionate support, and personalized treatment for every patient.";

const serviceIcons = neurologyServices.map(() => Brain);

export default function NeurologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Neurology"
        badge="Best neurology in India"
        title={
          <>
            Neurology <span className="text-red-500">Department</span>
          </>
        }
        tagline={NEUROLOGY_HERO_TAGLINE}
        imageSrc={neurologyHeroImage}
        imageClassName="object-cover object-[50%_42%] sm:object-[56%_40%] md:object-[60%_38%]"
        overlayClassName="bg-gradient-to-r from-slate-950/97 via-slate-900/92 via-36% to-slate-900/10"
      />
      <DepartmentHeroStats stats={neurologyStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <div className="mb-8 max-w-3xl space-y-4 leading-relaxed text-slate-600">
            <p>{neurologyIntro.preview}</p>
            <p>{neurologyIntro.full}</p>
          </div>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseNeurology} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Our Speciality</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Neurology Services"
              description={neurologyServicesIntro}
              align="center"
            />
          </div>
          <DepartmentServicesGrid services={neurologyServices} icons={serviceIcons} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Infrastructure"
            title="Advanced Facilities and"
            highlight="Technology"
            description="State-of-the-art diagnostic and critical-care facilities supporting comprehensive neurological treatment."
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={neurologyInfrastructure} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-col gap-5 rounded-2xl border border-red-200 bg-red-50 p-6 md:flex-row md:items-center md:p-8"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-white shadow-md shadow-red-600/25">
              <Users className="h-7 w-7" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-red-900">
                {neurologyTeamNote.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-red-800/80 md:text-base">
                {neurologyTeamNote.description}
              </p>
            </div>
          </motion.div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="neurology" />
        <DepartmentPatientCareSection
          heading={neurologyJourney.heading}
          body={neurologyJourney.body}
          pillars={neurologyJourneyPillars}
          ctaHeading={neurologyJourney.ctaHeading}
          ctaBody={neurologyJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
