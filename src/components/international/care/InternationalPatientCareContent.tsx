"use client";

import { motion } from "framer-motion";
import InternationalServiceLayout from "@/components/international/care/InternationalServiceLayout";
import {
  internationalCareWelcome,
  internationalCareServices,
  internationalCareLifeSavingTreatments,
  internationalCareTravel,
  internationalCareFinancial,
  internationalCareCultural,
  internationalCareFooterImage,
  type LabeledItem,
} from "@/data/international-patient-care";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-12 h-0.5 bg-red-600" />
      <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">
        {children}
      </span>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-outside pl-5 space-y-2 text-slate-600 leading-relaxed marker:text-red-600 mb-6">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function LabeledBulletList({ items }: { items: LabeledItem[] }) {
  return (
    <ul className="list-disc list-outside pl-5 space-y-3 text-slate-600 leading-relaxed marker:text-red-600 mb-6">
      {items.map((item) => (
        <li key={item.label}>
          <span className="font-semibold text-slate-900">{item.label}:</span>{" "}
          {item.text}
        </li>
      ))}
    </ul>
  );
}

export default function InternationalPatientCareContent() {
  return (
    <InternationalServiceLayout>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex-1 min-w-0"
      >
        <SectionLabel>Welcome</SectionLabel>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
          Adhiparasakthi Hospitals{" "}
          <span className="text-red-600">International Patients Care</span>
        </h2>
        <div className="space-y-6 text-slate-600 leading-relaxed mb-12">
          {internationalCareWelcome.paragraphs.map((p, i) =>
            i === 0 ? (
              <p
                key={p}
                className="text-lg text-slate-700 font-medium border-l-4 border-red-600 pl-5"
              >
                {p}
              </p>
            ) : (
              <p key={p}>{p}</p>
            )
          )}
        </div>

        <SectionLabel>Our Services</SectionLabel>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
          Services for{" "}
          <span className="text-red-600">International Patients</span>
        </h2>
        <div className="space-y-6 mb-12">
          {internationalCareServices.map((service) => (
            <div key={service.title}>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {service.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <SectionLabel>Treatments</SectionLabel>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          Life Saving <span className="text-red-600">Treatments</span>
        </h2>
        <BulletList items={internationalCareLifeSavingTreatments} />

        <SectionLabel>Travel & Stay</SectionLabel>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          Travel and Accommodation Assistance for{" "}
          <span className="text-red-600">International Patients</span>
        </h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          {internationalCareTravel.intro}
        </p>
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          {internationalCareTravel.travel.title}
        </h3>
        <LabeledBulletList items={internationalCareTravel.travel.items} />
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          {internationalCareTravel.accommodation.title}
        </h3>
        <LabeledBulletList items={internationalCareTravel.accommodation.items} />

        <div className="mb-12">
          <SectionLabel>Support</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Personalized <span className="text-red-600">Support</span>
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            {internationalCareTravel.personalizedSupport}
          </p>
          <p className="text-slate-600 leading-relaxed">{internationalCareTravel.contact}</p>
        </div>

        <div className="mb-12">
          <SectionLabel>Financial</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Financial Information for{" "}
            <span className="text-red-600">International Patients</span>
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            {internationalCareFinancial.intro}
          </p>
          {internationalCareFinancial.sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {section.title}
              </h3>
              <LabeledBulletList items={section.items} />
            </div>
          ))}
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Transparency and Support
          </h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            {internationalCareFinancial.transparency}
          </p>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Currency Exchange
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {internationalCareFinancial.currencyExchange}
          </p>
        </div>

        <SectionLabel>Culture & Care</SectionLabel>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          Cultural and Religious{" "}
          <span className="text-red-600">Sensitivity</span>
        </h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          {internationalCareCultural.intro}
        </p>
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          {internationalCareCultural.understanding.title}
        </h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          {internationalCareCultural.understanding.description}
        </p>
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          {internationalCareCultural.customized.title}
        </h3>
        <LabeledBulletList items={internationalCareCultural.customized.items} />
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          Your Comfort Matters
        </h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          {internationalCareCultural.comfortMatters}
        </p>
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          Commitment to Excellence
        </h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          {internationalCareCultural.commitment}
        </p>
        <p className="text-slate-600 leading-relaxed mb-12">
          {internationalCareCultural.closing}
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl mt-4 group"
        >
          <img
            src={internationalCareFooterImage}
            alt="Doctor providing compassionate, personalized care to a patient at Adhiparasakthi Hospitals"
            className="w-full object-cover aspect-[5/2] sm:aspect-[21/9] object-[center_45%] group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-white font-semibold text-lg">
              Compassionate care for every international patient
            </p>
            <p className="text-white/80 text-sm mt-1">
              Melmaruvathur · Dedicated coordinators · 24/7 support
            </p>
          </div>
        </motion.div>
      </motion.article>
    </InternationalServiceLayout>
  );
}
