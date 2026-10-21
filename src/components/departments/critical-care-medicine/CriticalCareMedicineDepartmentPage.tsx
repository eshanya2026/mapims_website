"use client";

import {
  Activity,
  HeartPulse,
  Wind,
  Scissors,
  ShieldAlert,
  Baby,
  Heart,
  Clock,
  Flame,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { criticalCareMedicineStats } from "@/data/department-stats";
import {
  criticalCareMedicineHeroTagline,
  criticalCareMedicineIntro,
  whyChooseCriticalCareMedicine,
  criticalCareMedicineServices,
  criticalCareMedicineConditions,
  criticalCareMedicineTechnology,
  criticalCareMedicineInfrastructure,
  criticalCareMedicineJourney,
  criticalCareMedicineJourneyPillars,
  criticalCareMedicineHeroImage,
} from "@/data/critical-care-medicine-department";
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
  Activity,
  HeartPulse,
  Wind,
  Scissors,
  ShieldAlert,
  Baby,
  Heart,
  Clock,
  Flame,
] as const;

export default function CriticalCareMedicineDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Critical Care Medicine"
        badge="Advanced Care for the Critically Ill"
        title={
          <>
            Critical Care <span className="text-red-500">Medicine</span>
          </>
        }
        tagline={criticalCareMedicineHeroTagline}
        imageSrc={criticalCareMedicineHeroImage}
        imageClassName="object-cover object-[50%_35%]"
      />
      <DepartmentHeroStats stats={criticalCareMedicineStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Coordinated Critical Care</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{criticalCareMedicineIntro.preview}</p>
            <p>{criticalCareMedicineIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseCriticalCareMedicine} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Specialised Critical Care Units</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Intensive Care Units"
              align="center"
            />
            <p className="mt-2 text-sm text-slate-500 max-w-2xl mx-auto">
              Comprehensive high-acuity critical care infrastructure spanning medical, surgical, cardiac, respiratory, trauma, neonatal, pediatric, post-op, and burns intensive care.
            </p>
          </div>
          <div className="mt-8">
            <DepartmentServicesGrid services={criticalCareMedicineServices} icons={serviceIcons} />
          </div>
        </DepartmentSection>

        <DepartmentSection id="conditions">
          <DepartmentGradientPanel
            eyebrow="Clinical Scope"
            title="Conditions"
            highlight="Managed"
            description="Our intensivist team provides life-sustaining support across critical diagnoses and severe multi-organ dysfunction:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={criticalCareMedicineConditions} />
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
          <DepartmentChecklistGrid items={criticalCareMedicineInfrastructure} />
        </DepartmentSection>

        <DepartmentSection id="technology">
          <DepartmentGradientPanel
            eyebrow="Technology & Quality"
            title="Safe, Coordinated,"
            highlight="Evidence-Based Care"
            description="Critical care combines timely assessment, close monitoring, appropriate organ support and regular multidisciplinary review:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={criticalCareMedicineTechnology} />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="critical-care-medicine" />
        <DepartmentPatientCareSection
          heading={criticalCareMedicineJourney.heading}
          body={criticalCareMedicineJourney.body}
          pillars={criticalCareMedicineJourneyPillars}
          ctaHeading={criticalCareMedicineJourney.ctaHeading}
          ctaBody={criticalCareMedicineJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
