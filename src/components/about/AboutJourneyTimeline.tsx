"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

const milestones = [
  {
    year: "1986",
    title: "Hospital Founded",
    description:
      "Started with a vision of compassionate healthcare service.",
  },
  {
    year: "2008",
    title: "MAPIMS Established",
    description:
      "Medical college and tertiary care services expanded.",
  },
  {
    year: "2012",
    title: "Advanced Specialty Expansion",
    description:
      "Super-specialty institutes and departments grew to serve more complex medical needs.",
  },
  {
    year: "2018",
    title: "Modern Diagnostic Facilities",
    description:
      "Advanced imaging, laboratory, and digital health infrastructure strengthened patient care.",
  },
  {
    year: "2024",
    title: "1000+ Bed Super Specialty Hospital",
    description:
      "A leading tertiary care campus delivering ethical, transparent, world-class treatment.",
  },
] as const;

function MilestoneCard({
  item,
  isLast,
  alignRight,
}: {
  item: (typeof milestones)[number];
  isLast: boolean;
  alignRight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white p-5 shadow-sm md:p-6",
        isLast
          ? "border-red-200 shadow-md ring-1 ring-red-100"
          : "border-slate-200",
        alignRight && "md:text-right"
      )}
    >
      <p className="text-sm font-bold uppercase tracking-wider text-red-600">
        {item.year}
      </p>
      <h3 className="mt-1 text-lg font-bold text-slate-900 md:text-xl">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
        {item.description}
      </p>
    </div>
  );
}

export default function AboutJourneyTimeline() {
  const journeyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start 0.85", "end 0.15"],
  });

  const objectPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["center 38%", "center 58%"]
  );

  return (
    <section
      id="our-journey"
      className="section-padding scroll-mt-28 bg-slate-50"
      aria-labelledby="our-journey-heading"
    >
      <div className="container mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-12"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-0.5 w-12 bg-red-600" />
            <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
              Heritage
            </span>
            <div className="h-0.5 w-12 bg-red-600" />
          </div>
          <h2
            id="our-journey-heading"
            className="text-3xl font-bold text-slate-900 md:text-4xl"
          >
            Our <span className="text-red-600">Journey</span>
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            From a compassionate community hospital to a 1000+ bed super-specialty
            tertiary care institution — decades of service at Melmaruvathur.
          </p>
        </motion.header>

        <div
          ref={journeyRef}
          className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16"
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
          >
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
              <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[4/5]">
                <motion.img
                  src="/images/mapims-about-campus.png"
                  alt="Adhiparasakthi Hospital campus at Melmaruvathur"
                  style={{ objectPosition }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/25 to-transparent" />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                    Melmaruvathur
                  </p>
                  <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
                    Four decades of healing
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    Rooted in service since 1986, growing with MAPIMS and the
                    communities we serve.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <ol className="relative">
              <div
                className="absolute bottom-4 left-[1.125rem] top-4 w-0.5 bg-gradient-to-b from-red-200 via-red-500 to-red-600 md:left-1/2 md:-translate-x-px"
                aria-hidden
              />

              {milestones.map((item, index) => {
                const isLast = index === milestones.length - 1;
                const isRight = index % 2 === 1;

                return (
                  <motion.li
                    key={item.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className="relative pb-10 last:pb-0 md:pb-12"
                  >
                    <div className="flex gap-4 md:hidden">
                      <div className="relative z-10 shrink-0 pt-1">
                        <span
                          className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-white text-[11px] font-bold shadow-md",
                            isLast
                              ? "bg-red-600 text-white ring-4 ring-red-100"
                              : "bg-white text-red-600 ring-2 ring-red-100"
                          )}
                        >
                          {item.year.slice(2)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <MilestoneCard item={item} isLast={isLast} />
                      </div>
                    </div>

                    <div className="relative hidden md:block md:min-h-[6.5rem]">
                      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                        <span
                          className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-slate-50 text-sm font-bold shadow-lg",
                            isLast
                              ? "bg-red-600 text-white shadow-red-600/30 ring-4 ring-red-100"
                              : "bg-white text-red-600 ring-2 ring-red-100"
                          )}
                        >
                          {item.year}
                        </span>
                      </div>
                      <div
                        className={cn(
                          "w-[calc(50%-2.75rem)] pt-1",
                          isRight ? "ml-auto pl-2" : "mr-auto pr-2"
                        )}
                      >
                        <MilestoneCard
                          item={item}
                          isLast={isLast}
                          alignRight={!isRight}
                        />
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
