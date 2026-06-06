"use client";

import {
  Stethoscope,
  Syringe,
  Activity,
  Shield,
  Baby,
  Heart,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { paediatricStats } from "@/data/department-stats";
import {
  paediatricHeroTagline,
  paediatricIntro,
  whyChoosePaediatric,
  paediatricServices,
  paediatricSpecializedServices,
  paediatricInfrastructure,
  paediatricExcellenceNote,
  paediatricJourney,
  paediatricJourneyPillars,
  paediatricHeroImage,
} from "@/data/paediatric-department";
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
  Stethoscope,
  Syringe,
  Activity,
  Shield,
  Baby,
  Heart,
] as const;

export default function PaediatricDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Paediatric"
        badge="Best paediatric care in Chennai"
        title={
          <>
            Paediatrics <span className="text-red-500">Department</span>
          </>
        }
        tagline={paediatricHeroTagline}
        imageSrc={paediatricHeroImage}
        imageClassName="object-cover object-[48%_42%] sm:object-[54%_40%] md:object-[58%_38%]"
      />
      <DepartmentHeroStats stats={paediatricStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <div className="mb-8 max-w-3xl space-y-4 leading-relaxed text-slate-600">
            <p>{paediatricIntro.preview}</p>
            <p>{paediatricIntro.full}</p>
          </div>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChoosePaediatric} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Paediatric Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid services={paediatricServices} icons={serviceIcons} />
        </DepartmentSection>

        <DepartmentSection id="speciality" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Subspecialties</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Specialized"
              highlight="Pediatric Services"
              align="center"
            />
          </div>
          <DepartmentChecklistGrid
            items={paediatricSpecializedServices}
            variant="pill"
            className="mx-auto max-w-4xl"
          />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="Advanced"
            highlight="Infrastructure"
            description="Our department is supported by:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={paediatricInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Excellence in <span className="text-red-600">Child Healthcare</span>
                </>
              }
              paragraphs={[paediatricExcellenceNote]}
            />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="paediatric" />
        <DepartmentPatientCareSection
          heading={paediatricJourney.heading}
          body={paediatricJourney.body}
          pillars={paediatricJourneyPillars}
          ctaHeading={paediatricJourney.ctaHeading}
          ctaBody={paediatricJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
