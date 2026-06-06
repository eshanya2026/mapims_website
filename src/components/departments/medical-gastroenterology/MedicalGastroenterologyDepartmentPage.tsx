"use client";

import {
  Activity,
  Stethoscope,
  Droplets,
  Shield,
  Apple,
  ScanLine,
  Scissors,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { medicalGastroenterologyStats } from "@/data/department-stats";
import {
  medicalGastroenterologyHeroTagline,
  medicalGastroenterologyIntro,
  whyChooseMedicalGastroenterology,
  medicalGastroenterologyServices,
  medicalGastroenterologyConditions,
  medicalGastroenterologyInfrastructure,
  medicalGastroenterologyExcellence,
  medicalGastroenterologyJourney,
  medicalGastroenterologyJourneyPillars,
  medicalGastroenterologyHeroImage,
} from "@/data/medical-gastroenterology-department";
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
  DepartmentExcellenceNote,
} from "@/components/departments/design";

const serviceIcons = [
  Activity,
  Droplets,
  Shield,
  Apple,
  ScanLine,
  Stethoscope,
  Scissors,
] as const;

export default function MedicalGastroenterologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Medical Gastroenterology"
        badge="Best gastroenterology in Chennai"
        title={
          <>
            Medical Gastroenterology{" "}
            <span className="text-red-500">Department</span>
          </>
        }
        tagline={medicalGastroenterologyHeroTagline}
        imageSrc={medicalGastroenterologyHeroImage}
        imageClassName="object-cover object-[50%_45%] sm:object-[56%_42%] md:object-[60%_40%]"
      />
      <DepartmentHeroStats stats={medicalGastroenterologyStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <div className="mb-8 max-w-3xl space-y-4 leading-relaxed text-slate-600">
            <p>{medicalGastroenterologyIntro.preview}</p>
            <p>{medicalGastroenterologyIntro.full}</p>
          </div>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseMedicalGastroenterology} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Gastroenterology Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid
            services={medicalGastroenterologyServices}
            icons={serviceIcons}
          />
        </DepartmentSection>

        <DepartmentSection id="conditions" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Scope</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Conditions"
              highlight="We Treat"
              align="center"
            />
          </div>
          <DepartmentChecklistGrid items={medicalGastroenterologyConditions} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="Advanced"
            highlight="Infrastructure"
            description="Our department is equipped with:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={medicalGastroenterologyInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Excellence in{" "}
                  <span className="text-red-600">Digestive Healthcare</span>
                </>
              }
              paragraphs={[
                medicalGastroenterologyExcellence.intro,
                medicalGastroenterologyExcellence.detail,
              ]}
            />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="medical-gastroenterology" />
        <DepartmentPatientCareSection
          heading={medicalGastroenterologyJourney.heading}
          body={medicalGastroenterologyJourney.body}
          pillars={medicalGastroenterologyJourneyPillars}
          ctaHeading={medicalGastroenterologyJourney.ctaHeading}
          ctaBody={medicalGastroenterologyJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
