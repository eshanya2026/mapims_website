"use client";

import {
  Sparkles,
  Zap,
  ShieldCheck,
  Droplet,
  Smile,
} from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import DepartmentFAQ from "@/components/departments/DepartmentFAQ";
import { dermatologyStats } from "@/data/department-stats";
import {
  dermatologyHeroTagline,
  dermatologyIntro,
  whyChooseDermatology,
  dermatologyServices,
  dermatologyConditions,
  dermatologyInfrastructure,
  dermatologyTechnology,
  dermatologyExcellenceNote,
  dermatologyJourney,
  dermatologyJourneyPillars,
  dermatologyHeroImage,
} from "@/data/dermatology-department";
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

const serviceIcons = [Sparkles, Smile, Zap, Droplet, ShieldCheck] as const;

export default function DermatologyDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Dermatology"
        badge="Best dermatology in Chennai"
        title={
          <>
            Dermatology <span className="text-red-500">Department</span>
          </>
        }
        tagline={dermatologyHeroTagline}
        imageSrc={dermatologyHeroImage}
        imageClassName="object-cover object-[50%_35%] sm:object-[55%_35%] md:object-[58%_35%]"
      />
      <DepartmentHeroStats stats={dermatologyStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{dermatologyIntro.preview}</p>
            <p>{dermatologyIntro.full}</p>
          </DepartmentIntroText>
          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseDermatology} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our"
              highlight="Dermatology Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid
            services={dermatologyServices}
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
          <DepartmentChecklistGrid items={dermatologyConditions} />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="Advanced"
            highlight="Infrastructure"
            description="Our department is equipped with modern diagnostic, dermatosurgery and laser technologies:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={dermatologyInfrastructure} />
          </div>

          {/* Technology-Driven Dermatology Care - Seperate Box */}
          <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md">
            <div className="border-b border-slate-100 bg-gradient-to-r from-red-50/80 via-white to-slate-50 px-6 py-6 md:px-8 md:py-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-600">
                Innovation & Equipment
              </span>
              <h3 className="mt-1.5 text-2xl font-bold text-slate-900 md:text-3xl">
                Technology-Driven <span className="text-red-600">Dermatology Care</span>
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
                We continuously invest in modern medical and aesthetic technologies to deliver accurate diagnosis, precision dermatosurgery, and effective treatments, including:
              </p>
            </div>

            <div className="p-6 md:p-8">
              <DepartmentChecklistGrid items={dermatologyTechnology} />

              <div className="mt-8 rounded-xl border border-red-100 bg-gradient-to-br from-red-50/70 via-white to-red-50/30 p-6 md:p-7">
                <h4 className="text-lg font-bold text-slate-900 md:text-xl">
                  Excellence in <span className="text-red-600">Dermatological Care</span>
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                  {dermatologyExcellenceNote}
                </p>
              </div>
            </div>
          </div>
        </DepartmentSection>

        <DepartmentFAQ departmentSlug="dermatology" />
        <DepartmentPatientCareSection
          heading={dermatologyJourney.heading}
          body={dermatologyJourney.body}
          pillars={dermatologyJourneyPillars}
          ctaHeading={dermatologyJourney.ctaHeading}
          ctaBody={dermatologyJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
