"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import type { InternationalServiceData } from "@/data/international-services/types";
import { internationalCarePath } from "@/data/international-patient-care";

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
    <ul className="list-disc list-outside pl-5 space-y-3 text-slate-600 leading-relaxed marker:text-red-600">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function InternationalServiceArticle({
  service,
}: {
  service: InternationalServiceData;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <SectionLabel>{service.sectionLabel}</SectionLabel>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 leading-tight">
        {service.title}{" "}
        <span className="text-red-600">{service.titleHighlight}</span>
      </h1>
      <p className="text-sm text-slate-500 mb-6">{service.seoTitle}</p>

      <p className="text-lg text-slate-700 font-medium border-l-4 border-red-600 pl-5 leading-relaxed mb-10">
        {service.intro}
      </p>

      {service.bannerLabel && (
        <div className="mb-10 w-full border border-slate-100 bg-white shadow-sm">
          <div className="flex items-center gap-3 px-4 py-4 sm:px-6 sm:py-5">
            {service.bannerImage ? (
              <img
                src={service.bannerImage}
                alt=""
                className="h-9 w-9 object-contain shrink-0"
                aria-hidden
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                <Activity className="h-5 w-5 text-sky-700" />
              </div>
            )}
            <span className="text-base sm:text-lg font-semibold text-slate-800 tracking-tight">
              {service.bannerLabel}
            </span>
          </div>
        </div>
      )}

      {service.sections.map((section) => (
        <div key={section.title} className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            <span className="text-red-600">{section.title}</span>
          </h2>
          <BulletList items={section.items} />
        </div>
      ))}

      {service.whyChooseTitle && service.whyChoose && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            {service.whyChooseTitle}
          </h2>
          <BulletList items={service.whyChoose} />
        </div>
      )}

      <p className="text-slate-600 leading-relaxed mb-10">{service.closing}</p>

      {/* <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
        <img
          src={service.footerImage ?? service.image}
          alt={`${service.breadcrumbLabel} at Adhiparasakthi Hospitals`}
          className="w-full aspect-[16/7] object-cover object-[center_bottom]"
        />
      </div> */}

      <p className="mt-8 text-sm text-slate-500">
        <Link
          href={internationalCarePath}
          className="text-red-600 font-semibold hover:underline"
        >
          ← Back to International Patients Care
        </Link>
      </p>
    </motion.article>
  );
}
