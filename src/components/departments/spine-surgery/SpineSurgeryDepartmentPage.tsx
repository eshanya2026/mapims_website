"use client";

import {
  Bone,
  Activity,
  Disc,
  ShieldCheck,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { spineSurgeryStats } from "@/data/department-stats";
import {
  spineSurgeryHeroTagline,
  spineSurgeryIntro,
  whyChooseSpineSurgery,
  spineSurgeryServices,
  spineSurgeryConditions,
  spineSurgeryInfrastructure,
  spineSurgeryTechnology,
  spineSurgeryExcellenceNote,
  spineSurgeryJourney,
  spineSurgeryJourneyPillars,
  spineSurgeryHeroImage,
} from "@/data/spine-surgery-department";
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

const serviceIcons = [Bone, Activity, Disc, ShieldCheck] as const;

export default function SpineSurgeryDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Spinal Surgeries"
        badge="Advanced Keyhole (MISS) & Complex Spine Surgery Center in Melmaruvathur"
        title={
          <>
            Spinal <span className="text-red-500">Surgeries</span>
          </>
        }
        tagline={spineSurgeryHeroTagline}
        imageSrc={spineSurgeryHeroImage}
        imageClassName="object-cover object-center"
      />
      <DepartmentHeroStats stats={spineSurgeryStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{spineSurgeryIntro.preview}</p>
            <p>{spineSurgeryIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseSpineSurgery} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Surgical & Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Spine Surgery Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid
            services={spineSurgeryServices}
            icons={serviceIcons}
          />
        </DepartmentSection>

        <DepartmentSection id="conditions" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Scope</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Spinal Disorders"
              highlight="We Treat"
              align="center"
            />
          </div>
          <DepartmentChecklistGrid items={spineSurgeryConditions} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="Advanced Spine"
            highlight="Infrastructure"
            description="Our department is equipped with ultra-clean laminar flow operating suites and intraoperative neuro-monitoring:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={spineSurgeryInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentSectionHeading
              title="Technology-Driven"
              highlight="Spine Care"
              description="We leverage intraoperative 3D navigation, endoscopic systems, and bone-sparing ultrasonic scalpels for superior patient safety:"
              align="center"
            />
            <DepartmentChecklistGrid items={spineSurgeryTechnology} />
          </div>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Excellence in <span className="text-red-600">Motion Preservation & Neural Safety</span>
                </>
              }
              paragraphs={[spineSurgeryExcellenceNote]}
            />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="spinal-surgeries" />
        <DepartmentPatientCareSection
          heading={spineSurgeryJourney.heading}
          body={spineSurgeryJourney.body}
          pillars={spineSurgeryJourneyPillars}
          ctaHeading={spineSurgeryJourney.ctaHeading}
          ctaBody={spineSurgeryJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
