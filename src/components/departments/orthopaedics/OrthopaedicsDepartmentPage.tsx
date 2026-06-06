"use client";

import {
  Bone,
  Activity,
  Stethoscope,
  Shield,
  Users,
  Heart,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { orthopaedicsStats } from "@/data/department-stats";
import {
  orthopaedicsHeroTagline,
  orthopaedicsIntro,
  whyChooseOrthopaedics,
  orthopaedicsServices,
  orthopaedicsSpecialityAreas,
  orthopaedicsInfrastructure,
  orthopaedicsExcellenceNote,
  orthopaedicsJourney,
  orthopaedicsJourneyPillars,
  orthopaedicsHeroImage,
} from "@/data/orthopaedics-department";
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

const serviceIcons = [
  Bone,
  Activity,
  Stethoscope,
  Shield,
  Users,
  Heart,
  Bone,
] as const;

export default function OrthopaedicsDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Orthopaedics"
        badge="Best orthopaedics in India"
        title={
          <>
            Orthopaedics <span className="text-red-500">Department</span>
          </>
        }
        tagline={orthopaedicsHeroTagline}
        imageSrc={orthopaedicsHeroImage}
      />
      <DepartmentHeroStats stats={orthopaedicsStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{orthopaedicsIntro.preview}</p>
            <p>{orthopaedicsIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseOrthopaedics} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Orthopaedic Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid services={orthopaedicsServices} icons={serviceIcons} />
        </DepartmentSection>

        <DepartmentSection id="speciality" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Subspecialties</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Specialities"
              align="center"
            />
          </div>
          <DepartmentChecklistGrid
            items={orthopaedicsSpecialityAreas}
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
            <DepartmentChecklistGrid items={orthopaedicsInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Excellence in <span className="text-red-600">Patient Care</span>
                </>
              }
              paragraphs={[orthopaedicsExcellenceNote]}
            />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="orthopaedics" />
        <DepartmentPatientCareSection
          heading={orthopaedicsJourney.heading}
          body={orthopaedicsJourney.body}
          pillars={orthopaedicsJourneyPillars}
          ctaHeading={orthopaedicsJourney.ctaHeading}
          ctaBody={orthopaedicsJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
