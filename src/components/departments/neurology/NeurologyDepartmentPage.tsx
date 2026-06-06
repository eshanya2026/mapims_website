"use client";

import { Brain } from "lucide-react";
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
  neurologyExcellenceNote,
  neurologyJourney,
  neurologyJourneyPillars,
  neurologyHeroImage,
} from "@/data/neurology-department";
import {
  DepartmentPageHero,
  DepartmentContentLayout,
  DepartmentIntroText,
  DepartmentSection,
  DepartmentSectionLabel,
  DepartmentSectionHeading,
  DepartmentWhyChooseCards,
  DepartmentServicesGrid,
  DepartmentChecklistGrid,
  DepartmentGradientPanel,
  DepartmentExcellenceNote,
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
          <DepartmentIntroText>
            <p>{neurologyIntro.preview}</p>
            <p>{neurologyIntro.full}</p>
          </DepartmentIntroText>
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
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Excellence in <span className="text-red-600">Patient Care</span>
                </>
              }
              paragraphs={[neurologyExcellenceNote]}
            />
          </div>
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
