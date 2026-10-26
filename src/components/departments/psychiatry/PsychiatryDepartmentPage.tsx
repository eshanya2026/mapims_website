"use client";

import {
  Brain,
  HeartHandshake,
  Activity,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { psychiatryStats } from "@/data/department-stats";
import {
  psychiatryHeroTagline,
  psychiatryIntro,
  whyChoosePsychiatry,
  psychiatryServices,
  psychiatryConditions,
  psychiatryTechnology,
  psychiatryInfrastructure,
  psychiatryJourney,
  psychiatryJourneyPillars,
  psychiatryHeroImage,
} from "@/data/psychiatry-department";
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
  Brain,
  HeartHandshake,
  Activity,
  ShieldCheck,
  Users,
  Zap,
] as const;

export default function PsychiatryDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Psychiatry"
        badge="Mental Health & Emotional Wellbeing"
        title={
          <>
            Psychiatry & <span className="text-red-500">Mental Health</span>
          </>
        }
        tagline={psychiatryHeroTagline}
        imageSrc={psychiatryHeroImage}
        imageClassName="object-cover object-[50%_40%]"
      />
      <DepartmentHeroStats stats={psychiatryStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Care Built Around You</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{psychiatryIntro.preview}</p>
            <p>{psychiatryIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChoosePsychiatry} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Psychiatry Services"
              align="center"
            />
            <p className="mt-2 text-sm text-slate-500 max-w-2xl mx-auto">
              Comprehensive mental healthcare spanning outpatient clinical evaluations, mood disorder treatments, addiction recovery, and supportive family counseling.
            </p>
          </div>
          <div className="mt-8">
            <DepartmentServicesGrid services={psychiatryServices} icons={serviceIcons} />
          </div>
        </DepartmentSection>

        <DepartmentSection id="conditions">
          <DepartmentGradientPanel
            eyebrow="Clinical Scope"
            title="Conditions We"
            highlight="Assess and Treat"
            description="Our multidisciplinary team provides compassionate, individualized care for a full spectrum of mental health and emotional concerns:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={psychiatryConditions} />
          </div>
        </DepartmentSection>

        <DepartmentSection id="infrastructure" variant="muted">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Facilities</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Infrastructure &"
              highlight="Clinical Support"
              align="center"
            />
          </div>
          <DepartmentChecklistGrid items={psychiatryInfrastructure} />
        </DepartmentSection>

        <DepartmentSection id="technology">
          <DepartmentGradientPanel
            eyebrow="Technology & Quality"
            title="Coordinated,"
            highlight="Evidence-Based Care"
            description="Mental health care is guided by clinical assessment, shared decision-making, privacy and continuity of follow-up. Psychological therapies, specialised assessments and emergency services are confirmed in line with approved hospital protocols:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={psychiatryTechnology} />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="psychiatry" />
        <DepartmentPatientCareSection
          heading={psychiatryJourney.heading}
          body={psychiatryJourney.body}
          pillars={psychiatryJourneyPillars}
          ctaHeading={psychiatryJourney.ctaHeading}
          ctaBody={psychiatryJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
