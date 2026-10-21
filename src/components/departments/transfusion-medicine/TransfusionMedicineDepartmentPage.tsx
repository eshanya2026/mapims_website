"use client";

import { FlaskConical, Droplets, ShieldCheck, Activity, Award } from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { transfusionMedicineStats } from "@/data/department-stats";
import {
  transfusionMedicineHeroTagline,
  transfusionMedicineIntro,
  whyChooseTransfusionMedicine,
  transfusionMedicineServices,
  transfusionMedicineConditions,
  transfusionMedicineTechnology,
  transfusionMedicineInfrastructure,
  transfusionMedicineJourney,
  transfusionMedicineJourneyPillars,
  transfusionMedicineHeroImage,
} from "@/data/transfusion-medicine-department";
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
  FlaskConical,
  Droplets,
  ShieldCheck,
  Activity,
  Award,
] as const;

export default function TransfusionMedicineDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Transfusion Medicine"
        badge="Safe Blood. Better Care."
        title={
          <>
            Transfusion <span className="text-red-500">Medicine</span>
          </>
        }
        tagline={transfusionMedicineHeroTagline}
        imageSrc={transfusionMedicineHeroImage}
        imageClassName="object-cover object-[50%_35%]"
      />
      <DepartmentHeroStats stats={transfusionMedicineStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Care Built Around You</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{transfusionMedicineIntro.preview}</p>
            <p>{transfusionMedicineIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseTransfusionMedicine} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Transfusion Medicine Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid services={transfusionMedicineServices} icons={serviceIcons} />
        </DepartmentSection>

        <DepartmentSection id="conditions">
          <DepartmentGradientPanel
            eyebrow="Clinical Scope"
            title="Conditions We"
            highlight="Assess & Treat"
            description="Our service supports safe, protocol-driven transfusion management across diverse clinical situations:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={transfusionMedicineConditions} />
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
          <DepartmentChecklistGrid items={transfusionMedicineInfrastructure} />
        </DepartmentSection>

        <DepartmentSection id="technology">
          <DepartmentGradientPanel
            eyebrow="Technology & Quality"
            title="Coordinated,"
            highlight="Evidence-Based Care"
            description="Safe transfusion relies on validated testing, appropriate storage, accurate identification, traceability and systematic monitoring:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={transfusionMedicineTechnology} />
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="transfusion-medicine" />
        <DepartmentPatientCareSection
          heading={transfusionMedicineJourney.heading}
          body={transfusionMedicineJourney.body}
          pillars={transfusionMedicineJourneyPillars}
          ctaHeading={transfusionMedicineJourney.ctaHeading}
          ctaBody={transfusionMedicineJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
