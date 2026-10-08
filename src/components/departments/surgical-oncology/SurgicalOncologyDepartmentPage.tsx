"use client";

import {
  Scissors,
  ShieldCheck,
  Layers,
  Activity,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { surgicalOncologyStats } from "@/data/department-stats";
import {
  surgicalOncologyHeroTagline,
  surgicalOncologyIntro,
  whyChooseSurgicalOncology,
  surgicalOncologyServices,
  surgicalOncologyConditions,
  surgicalOncologyInfrastructure,
  surgicalOncologyTechnology,
  surgicalOncologyExcellenceNote,
  surgicalOncologyJourney,
  surgicalOncologyJourneyPillars,
  surgicalOncologyHeroImage,
} from "@/data/surgical-oncology-department";
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

const serviceIcons = [Scissors, ShieldCheck, Layers, Activity] as const;

export default function SurgicalOncologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Surgical Oncology"
        badge="Multidisciplinary Cancer Surgery & Organ-Preserving Oncoplasty in Melmaruvathur"
        title={
          <>
            Surgical <span className="text-red-500">Oncology</span>
          </>
        }
        tagline={surgicalOncologyHeroTagline}
        imageSrc={surgicalOncologyHeroImage}
        imageClassName="object-cover object-center"
      />
      <DepartmentHeroStats stats={surgicalOncologyStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{surgicalOncologyIntro.preview}</p>
            <p>{surgicalOncologyIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseSurgicalOncology} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Surgical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Surgical Oncology Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid
            services={surgicalOncologyServices}
            icons={serviceIcons}
          />
        </DepartmentSection>

        <DepartmentSection id="conditions" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Scope</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Cancer Indications"
              highlight="We Treat"
              align="center"
            />
          </div>
          <DepartmentChecklistGrid items={surgicalOncologyConditions} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="Advanced Surgical"
            highlight="Infrastructure"
            description="Our department is equipped with modern modular operating suites, frozen-section pathology, and specialized surgical ICU:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={surgicalOncologyInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentSectionHeading
              title="Technology-Driven"
              highlight="Cancer Surgery"
              description="We leverage 4K laparoscopic towers, vessel-sealing energy devices, and sentinel node mapping for optimal curative outcomes:"
              align="center"
            />
            <DepartmentChecklistGrid items={surgicalOncologyTechnology} />
          </div>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Excellence in <span className="text-red-600">Curative Precision & Organ Preservation</span>
                </>
              }
              paragraphs={[surgicalOncologyExcellenceNote]}
            />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="surgical-oncology" />
        <DepartmentPatientCareSection
          heading={surgicalOncologyJourney.heading}
          body={surgicalOncologyJourney.body}
          pillars={surgicalOncologyJourneyPillars}
          ctaHeading={surgicalOncologyJourney.ctaHeading}
          ctaBody={surgicalOncologyJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
