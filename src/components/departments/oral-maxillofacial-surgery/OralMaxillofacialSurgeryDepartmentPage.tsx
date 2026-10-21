"use client";

import {
  Scissors,
  ShieldAlert,
  Microscope,
  Smile,
  Flame,
  Layers,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { oralMaxillofacialSurgeryStats } from "@/data/department-stats";
import {
  oralMaxillofacialSurgeryHeroTagline,
  oralMaxillofacialSurgeryIntro,
  whyChooseOralMaxillofacialSurgery,
  oralMaxillofacialSurgeryServices,
  oralMaxillofacialSurgeryConditions,
  oralMaxillofacialSurgeryTechnology,
  oralMaxillofacialSurgeryInfrastructure,
  oralMaxillofacialSurgeryJourney,
  oralMaxillofacialSurgeryJourneyPillars,
  oralMaxillofacialSurgeryHeroImage,
} from "@/data/oral-maxillofacial-surgery-department";
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

const serviceIcons = [
  Scissors,
  ShieldAlert,
  Microscope,
  Smile,
  Flame,
  Layers,
] as const;

export default function OralMaxillofacialSurgeryDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Oral & Maxillofacial Surgery"
        badge="Specialised Care for the Mouth, Jaw & Face"
        title={
          <>
            Oral & Maxillofacial <span className="text-red-500">Surgery</span>
          </>
        }
        tagline={oralMaxillofacialSurgeryHeroTagline}
        imageSrc={oralMaxillofacialSurgeryHeroImage}
        imageClassName="object-cover object-[50%_35%]"
      />
      <DepartmentHeroStats stats={oralMaxillofacialSurgeryStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Comprehensive Oral & Facial Surgical Care</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{oralMaxillofacialSurgeryIntro.preview}</p>
            <p>{oralMaxillofacialSurgeryIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseOralMaxillofacialSurgery} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our Oral &"
              highlight="Maxillofacial Surgery Services"
              align="center"
            />
            <p className="mt-2 text-sm text-slate-500 max-w-2xl mx-auto">
              Advanced surgical expertise across dentoalveolar extractions, facial trauma resuscitation, oral pathology, orthognathic alignment, and reconstructive surgery.
            </p>
          </div>
          <div className="mt-8">
            <DepartmentServicesGrid services={oralMaxillofacialSurgeryServices} icons={serviceIcons} />
          </div>
        </DepartmentSection>

        <DepartmentSection id="conditions">
          <DepartmentGradientPanel
            eyebrow="Clinical Scope"
            title="Conditions We"
            highlight="Assess & Treat"
            description="Our maxillofacial surgeons provide comprehensive diagnostic evaluation and surgical management for complex oral and facial conditions:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={oralMaxillofacialSurgeryConditions} />
          </div>
        </DepartmentSection>

        <DepartmentSection id="infrastructure" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Facilities</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Diagnostic &"
              highlight="Surgical Support"
              align="center"
            />
          </div>
          <DepartmentChecklistGrid items={oralMaxillofacialSurgeryInfrastructure} />
        </DepartmentSection>

        <DepartmentSection id="technology">
          <DepartmentGradientPanel
            eyebrow="Technology & Quality"
            title="Safe, Patient-Centred"
            highlight="Surgical Care"
            description="Care pathways combine meticulous preoperative assessment, digital imaging, informed consent, sterile surgical checklists, and multidisciplinary follow-up:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={oralMaxillofacialSurgeryTechnology} />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="oral-maxillofacial-surgery" />
        <DepartmentPatientCareSection
          heading={oralMaxillofacialSurgeryJourney.heading}
          body={oralMaxillofacialSurgeryJourney.body}
          pillars={oralMaxillofacialSurgeryJourneyPillars}
          ctaHeading={oralMaxillofacialSurgeryJourney.ctaHeading}
          ctaBody={oralMaxillofacialSurgeryJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
