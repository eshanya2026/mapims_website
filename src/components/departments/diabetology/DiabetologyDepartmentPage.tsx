"use client";

import {
  Heart,
  Activity,
  Droplets,
  Stethoscope,
  Apple,
  Footprints,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { diabetologyStats } from "@/data/department-stats";
import {
  diabetologyHeroTagline,
  diabetologyIntro,
  whyChooseDiabetology,
  diabetologyServices,
  diabetologyProcedures,
  diabetologyInfrastructure,
  diabetologyBeyondDiabetes,
  diabetologyJourney,
  diabetologyJourneyPillars,
  diabetologyHeroImage,
} from "@/data/diabetology-department";
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
} from "@/components/departments/design";

const serviceIcons = [Stethoscope, Droplets, Heart, Apple] as const;
const procedureIcons = [Footprints, Activity] as const;

export default function DiabetologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Diabetology"
        badge="Best diabetology in India"
        title={
          <>
            Diabetology <span className="text-red-500">Department</span>
          </>
        }
        tagline={diabetologyHeroTagline}
        imageSrc={diabetologyHeroImage}
        imageClassName="object-cover object-[52%_48%] sm:object-[58%_45%] md:object-[62%_42%]"
      />
      <DepartmentHeroStats stats={diabetologyStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{diabetologyIntro.preview}</p>
            <p>{diabetologyIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseDiabetology} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Diabetology Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid
            services={diabetologyServices}
            icons={serviceIcons}
          />
        </DepartmentSection>

        <DepartmentSection id="procedures" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Surgical Care</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Specialized Diabetes"
              highlight="Procedures"
              align="center"
            />
          </div>
          <DepartmentServicesGrid
            services={diabetologyProcedures}
            icons={procedureIcons}
          />
        </DepartmentSection>


        <DepartmentSection id="infrastructure" variant="muted">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="Advanced"
            highlight="Infrastructure"
            description="Our department is supported by:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={diabetologyInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentSectionHeading
              title="Beyond"
              highlight="Diabetes Care"
              description="We also provide specialized care for endocrine and metabolic disorders, including:"
              align="center"
            />
            <DepartmentChecklistGrid items={diabetologyBeyondDiabetes} />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="diabetology" />
        <DepartmentPatientCareSection
          heading={diabetologyJourney.heading}
          body={diabetologyJourney.body}
          pillars={diabetologyJourneyPillars}
          ctaHeading={diabetologyJourney.ctaHeading}
          ctaBody={diabetologyJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
