"use client";

import { motion } from "framer-motion";
import InternationalServiceLayout from "@/components/international/care/InternationalServiceLayout";
import {
  internationalCareWelcome,
  internationalCareServices,
  internationalCareLifeSavingTreatments,
  internationalCareTravel,
  internationalCarePersonalizedSupport,
  internationalCareFinancial,
  internationalCareCultural,
  internationalCareFooterImage,
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
              Services for <span className="text-red-600">International Patients</span>
            </h2>
            <div className="space-y-6 mb-12">
              {internationalCareServices.map((service) => (
                <div key={service.title}>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>

            <SectionLabel>Treatments</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Life Saving <span className="text-red-600">Treatments</span>
            </h2>
            <BulletList items={internationalCareLifeSavingTreatments} />

            <SectionLabel>Travel & Stay</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              {internationalCareTravel.title.split(" for ")[0]}{" "}
              <span className="text-red-600">for International Patients</span>
            </h2>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {internationalCareTravel.travel.title}
            </h3>
            <BulletList items={internationalCareTravel.travel.items} />
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {internationalCareTravel.accommodation.title}
            </h3>
            <BulletList items={internationalCareTravel.accommodation.items} />

            <div className="mb-12">
              <SectionLabel>Support</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Personalized <span className="text-red-600">Support</span>
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {internationalCarePersonalizedSupport}
              </p>
            </div>

            <div className="mb-12">
              <SectionLabel>Financial</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Financial Information for{" "}
                <span className="text-red-600">International Patients</span>
              </h2>
              {internationalCareFinancial.sections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {section.title}
                  </h3>
                  <BulletList items={section.items} />
                </div>
              ))}
              <div className="space-y-4 text-slate-600 leading-relaxed">
                {internationalCareFinancial.notes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </div>

            <SectionLabel>Culture & Care</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              {internationalCareCultural.title.split(" and ")[0]}{" "}
              <span className="text-red-600">and Religious Sensitivity</span>
            </h2>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {internationalCareCultural.understanding.title}
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              {internationalCareCultural.understanding.description}
            </p>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {internationalCareCultural.customized.title}
            </h3>
            <BulletList items={internationalCareCultural.customized.items} />

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl mt-4 group"
            >
              <img
                src={internationalCareFooterImage}
                alt="International patient care at Adhiparasakthi Hospitals"
                className="w-full h-auto object-cover aspect-[16/7] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-semibold text-lg">
                  World-class care for international patients
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
