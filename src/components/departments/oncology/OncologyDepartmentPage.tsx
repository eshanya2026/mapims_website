"use client";

import { Microscope, Radiation, Scissors } from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { oncologyStats } from "@/data/department-stats";
import {
  oncologyHeroWelcome,
  oncologyIntro,
  whyChooseOncology,
  oncologySupportServices,
  oncologyServices,
  oncologyInfrastructure,
  oncologyJourney,
  oncologyJourneyPillars,
  oncologyHeroImage,
} from "@/data/oncology-department";
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

const serviceIcons = [Microscope, Radiation, Scissors] as const;

export default function OncologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Oncology"
        badge="Best oncology in India"
        title={
          <>
            Oncology <span className="text-red-500">Department</span>
          </>
        }
        tagline={oncologyHeroWelcome}
        imageSrc={oncologyHeroImage}
      />
      <DepartmentHeroStats stats={oncologyStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <div className="mb-8 max-w-3xl space-y-4 leading-relaxed text-slate-600">
            <p>{oncologyIntro.preview}</p>
            <p>{oncologyIntro.full}</p>
          </div>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseOncology} />
        </DepartmentSection>

        <DepartmentSection id="care-programs" variant="muted">
          <DepartmentSectionLabel>Holistic Care</DepartmentSectionLabel>
          <DepartmentSectionHeading
            title="Integrated"
            highlight="Support Services"
          />
          <DepartmentChecklistGrid items={oncologySupportServices} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Oncology Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid services={oncologyServices} icons={serviceIcons} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Technology"
            title="Advanced Oncology"
            highlight="Infrastructure"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={oncologyInfrastructure} />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="oncology" />
        <DepartmentPatientCareSection
          heading={oncologyJourney.heading}
          body={oncologyJourney.body}
          pillars={oncologyJourneyPillars}
          ctaHeading={oncologyJourney.ctaHeading}
          ctaBody={oncologyJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
