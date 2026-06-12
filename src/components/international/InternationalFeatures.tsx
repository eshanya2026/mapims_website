"use client";

import { internationalFeatures } from "@/data/international-patients";
import { StaggerItem, StaggerReveal } from "@/components/ui/scroll-reveal";

export default function InternationalFeatures() {
  return (
    <section className="relative z-20 -mt-1 border-b border-slate-100 bg-white py-10">
      <div className="container mx-auto px-4">
        <StaggerReveal className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
          {internationalFeatures.map(({ title, description, icon: Icon }) => (
            <StaggerItem key={title}>
              <div className="flex h-full flex-col items-center rounded-2xl border-2 border-red-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-md">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-600">
                  <Icon className="h-7 w-7 text-red-600" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
