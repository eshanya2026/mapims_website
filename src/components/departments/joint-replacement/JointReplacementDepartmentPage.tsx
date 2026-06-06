"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Bone, Activity } from "lucide-react";
import DepartmentHeroStats from "@/components/departments/DepartmentHeroStats";
import DepartmentPatientCareSection from "@/components/departments/DepartmentPatientCareSection";
import { jointReplacementStats } from "@/data/department-stats";
import {
  jointReplacementHeroTagline,
  jointReplacementIntro,
  whenJointReplacementRecommended,
  whyChooseJointReplacement,
  jointReplacementServices,
  jointReplacementInfrastructure,
  jointReplacementCommitment,
  jointReplacementJourney,
  jointReplacementJourneyPillars,
  jointReplacementHeroImage,
} from "@/data/joint-replacement-department";
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

const serviceIcons = [Bone, Activity, Bone, Activity] as const;

export default function JointReplacementDepartmentPage() {
  return (
    <main className="min-h-screen">
      <DepartmentPageHero
        breadcrumbLabel="Joint Replacement"
        badge="Best joint replacement service in Chennai"
        title={
          <>
            Joint Replacement <span className="text-red-500">Department</span>
          </>
        }
        tagline={jointReplacementHeroTagline}
        imageSrc={jointReplacementHeroImage}
      />
      <DepartmentHeroStats stats={jointReplacementStats} />

      <DepartmentContentLayout>
        <DepartmentSection id="why-choose-us">
          <DepartmentSectionLabel>Department</DepartmentSectionLabel>
          <DepartmentIntroText>
            <p>{jointReplacementIntro.preview}</p>
            <p>{jointReplacementIntro.full}</p>
          </DepartmentIntroText>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 rounded-2xl border border-slate-200/80 bg-slate-50 p-6 md:p-8"
          >
            <h3 className="mb-4 text-xl font-bold text-slate-900 md:text-2xl">
              {whenJointReplacementRecommended.heading}
            </h3>
            <p className="mb-4 text-sm text-slate-600 md:text-base">
              Joint replacement may be considered when:
            </p>
            <ul className="space-y-2">
              {whenJointReplacementRecommended.reasons.map((reason) => (
                <li
                  key={reason}
                  className="flex gap-2 text-sm text-slate-700 md:text-base"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  {reason}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-medium leading-relaxed text-slate-700 md:text-base">
              {whenJointReplacementRecommended.conclusion}
            </p>
          </motion.div>

          <DepartmentSectionHeading title="Why" highlight="Choose Us?" />
          <DepartmentWhyChooseCards items={whyChooseJointReplacement} />
        </DepartmentSection>

        <DepartmentSection id="services">
          <div className="text-center">
            <DepartmentSectionLabel align="center">Clinical Programs</DepartmentSectionLabel>
            <DepartmentSectionHeading
              title="Our Joint Replacement"
              highlight="Services"
              align="center"
            />
          </div>
          <DepartmentServicesGrid
            services={jointReplacementServices}
            icons={serviceIcons}
          />
        </DepartmentSection>

        <DepartmentSection id="infrastructure">
          <DepartmentGradientPanel
            eyebrow="Facilities"
            title="Advanced"
            highlight="Infrastructure"
            description="Our Joint Replacement Centre is equipped with:"
          />
          <div className="mt-8">
            <DepartmentChecklistGrid items={jointReplacementInfrastructure} />
          </div>
          <div className="mt-8">
            <DepartmentExcellenceNote
              title={
                <>
                  Our Commitment to{" "}
                  <span className="text-red-600">Excellence</span>
                </>
              }
              paragraphs={[jointReplacementCommitment]}
            />
          </div>
        </DepartmentSection>

        <DepartmentPatientCareSection
          heading={jointReplacementJourney.heading}
          body={jointReplacementJourney.body}
          pillars={jointReplacementJourneyPillars}
          ctaHeading={jointReplacementJourney.ctaHeading}
          ctaBody={jointReplacementJourney.ctaBody}
        />
      </DepartmentContentLayout>
    </main>
  );
}
