"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Phone } from "lucide-react";
import { expertCareTransplant } from "@/data/transplant-department";
import { cn } from "@/lib/utils";

export default function TransplantExpertCare() {
  const [openId, setOpenId] = useState<string>(
    expertCareTransplant.accordion[0]?.id ?? ""
  );

  return (
    <section className="py-12 md:py-16 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 aspect-[4/5] lg:aspect-auto lg:min-h-[520px] bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1631217868264-e5b1b5d261b9?q=80&w=1200&auto=format&fit=crop"
              alt="Expert kidney transplant care"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-5 leading-tight">
              {expertCareTransplant.title}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              {expertCareTransplant.intro}
            </p>

            <div className="space-y-0 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
              {expertCareTransplant.accordion.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id} className="border-b border-slate-200 last:border-b-0">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenId(isOpen ? "" : item.id)
                      }
                      className={cn(
                        "w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold transition-colors",
                        isOpen
                          ? "bg-red-600 text-white"
                          : "bg-white text-slate-900 hover:bg-slate-50"
                      )}
                      aria-expanded={isOpen}
                    >
                      <span>{item.title}</span>
                      {isOpen ? (
                        <ChevronDown className="w-5 h-5 shrink-0 text-white" />
                      ) : (
                        <ChevronRight className="w-5 h-5 shrink-0 text-red-600" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="bg-white px-5 py-4 max-h-48 overflow-y-auto border-t border-slate-100">
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {item.content}
                        </p>
                        {item.id === "contact" && (
                          <div className="mt-4 flex flex-wrap gap-3">
                            <a
                              href="tel:+919499059966"
                              className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
                            >
                              <Phone className="w-4 h-4" />
                              +91 94990 59966
                            </a>
                            <Link
                              href="/#book-appointment"
                              className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700"
                            >
                              Book Appointment
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
