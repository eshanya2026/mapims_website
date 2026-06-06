"use client";

import {
  Heart,
  Sparkles,
  Flame,
  Hand,
  Siren,
  Bandage,
  Layers,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { plasticSurgeryStats } from "@/data/department-stats";
import {
  plasticSurgeryHeroTagline,
  plasticSurgeryIntro,
  whyChoosePlasticSurgery,
  plasticSurgeryServices,
  plasticSurgeryConditions,
  plasticSurgeryInfrastructure,
  plasticSurgeryExcellenceNote,
  plasticSurgeryJourney,
  plasticSurgeryJourneyPillars,
  plasticSurgeryHeroImage,
} from "@/data/plastic-surgery-department";
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
  Layers,
  Sparkles,
  Heart,
  Flame,
  Hand,
  Bandage,
  Siren,
] as const;

export default function PlasticSurgeryDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Plastic Surgery"
        badge="Best plastic surgery in Chennai"
        title={
          <>
            Plastic Surgery <span className="text-red-500">Department</span>
          </>
        }
        tagline={plasticSurgeryHeroTagline}
        imageSrc={plasticSurgeryHeroImage}
        imageClassName="object-cover object-[50%_45%] sm:object-[56%_42%] md:object-[60%_40%]"
      />
      <DepartmentHeroStats stats={plasticSurgeryStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <div className="mb-8 max-w-3xl space-y-4 leading-relaxed text-slate-600">
            <p>{plasticSurgeryIntro.preview}</p>
            <p>{plasticSurgeryIntro.full}</p>
          </div>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChoosePlasticSurgery} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Plastic Surgery Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid
            services={plasticSurgeryServices}
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
          <DepartmentChecklistGrid items={plasticSurgeryConditions} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="Advanced"
            highlight="Infrastructure"
            description="Our department is supported by:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={plasticSurgeryInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Patient-Centered <span className="text-red-600">Care</span>
                </>
              }
              paragraphs={[plasticSurgeryExcellenceNote]}
            />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="plastic-surgery" />
        <DepartmentPatientCareSection
          heading={plasticSurgeryJourney.heading}
          body={plasticSurgeryJourney.body}
          pillars={plasticSurgeryJourneyPillars}
          ctaHeading={plasticSurgeryJourney.ctaHeading}
          ctaBody={plasticSurgeryJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
