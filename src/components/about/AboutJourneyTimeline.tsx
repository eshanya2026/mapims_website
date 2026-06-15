"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  isActive,
  isReached,
  alignRight,
}: {
  item: (typeof milestones)[number];
  isActive: boolean;
  isReached: boolean;
  alignRight?: boolean;
}) {
  return (
    <motion.div
      layout
      animate={{
        opacity: isReached ? 1 : 0.45,
        scale: isActive ? 1 : isReached ? 1 : 0.98,
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "rounded-2xl border bg-white p-5 shadow-sm transition-colors duration-300 md:p-6",
        isActive
          ? "border-red-300 shadow-md ring-2 ring-red-100"
          : isReached
            ? "border-red-100"
            : "border-slate-200"
      )}
    >
      <div className={cn(alignRight && "md:text-right")}>
        <p
          className={cn(
            "text-sm font-bold uppercase tracking-wider transition-colors duration-300",
            isActive || isReached ? "text-red-600" : "text-slate-400"
          )}
        >
          {item.year}
        </p>
        <h3
          className={cn(
            "mt-1 text-lg font-bold md:text-xl transition-colors duration-300",
            isActive || isReached ? "text-slate-900" : "text-slate-500"
          )}
        >
          {item.title}
        </h3>
      </div>
      <p
        className={cn(
          "mt-2 text-pretty text-sm normal-case leading-relaxed tracking-normal [word-spacing:normal] md:text-base transition-colors duration-300",
          isActive || isReached ? "text-slate-600" : "text-slate-400"
        )}
      >
        {item.description}
      </p>
    </motion.div>
  );
}

function MilestoneNode({
  year,
  isActive,
  isReached,
  compact,
}: {
  year: string;
  isActive: boolean;
  isReached: boolean;
  compact?: boolean;
}) {
  return (
    <motion.span
      animate={{
        scale: isActive ? 1.12 : 1,
      }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className={cn(
        "relative z-10 flex items-center justify-center rounded-full border-[3px] border-slate-50 font-bold shadow-lg transition-colors duration-300",
        compact ? "h-9 w-9 text-[11px]" : "h-14 w-14 text-sm",
        isActive
          ? "bg-red-600 text-white shadow-red-600/40 ring-4 ring-red-200"
          : isReached
            ? "bg-red-600 text-white shadow-red-600/25 ring-2 ring-red-100"
            : "bg-white text-slate-400 ring-2 ring-slate-100"
      )}
    >
      {compact ? year.slice(2) : year}
      {isActive ? (
        <span
          className="absolute inset-0 animate-ping rounded-full bg-red-500/30"
          aria-hidden
        />
      ) : null}
    </motion.span>
  );
}

export default function AboutJourneyTimeline() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLOListElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLLIElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.55", "end 0.45"],
  });

  const objectPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["center 38%", "center 58%"]
  );

  const syncTimeline = useCallback(() => {
    const track = trackRef.current;
    const nodes = nodeRefs.current;
    if (!track || nodes.some((node) => !node)) return;

    const viewportCenter = window.innerHeight * 0.5;
    const trackRect = track.getBoundingClientRect();

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    nodes.forEach((node, index) => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const nodeCenter = rect.top + rect.height / 2;
      const distance = Math.abs(nodeCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);

    const firstNode = nodes[0]!;
    const lastNode = nodes[nodes.length - 1]!;
    const firstRect = firstNode.getBoundingClientRect();
    const lastRect = lastNode.getBoundingClientRect();
    const firstCenter = firstRect.top + firstRect.height / 2 - trackRect.top;
    const lastCenter = lastRect.top + lastRect.height / 2 - trackRect.top;

    const headY = Math.min(
      lastCenter,
      Math.max(firstCenter, viewportCenter - trackRect.top)
    );

    setLineHeight(Math.max(firstCenter, headY));
  }, []);

  useEffect(() => {
    const nodes = nodeRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      () => {
        syncTimeline();
      },
      {
        root: null,
        rootMargin: "-42% 0px -42% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    nodes.forEach((node) => observer.observe(node));

    syncTimeline();
    window.addEventListener("scroll", syncTimeline, { passive: true });
    window.addEventListener("resize", syncTimeline);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncTimeline);
      window.removeEventListener("resize", syncTimeline);
    };
  }, [syncTimeline]);

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
            <ol ref={timelineRef} className="relative">
              <div
                ref={trackRef}
                className="absolute bottom-4 left-[1.125rem] top-4 w-0.5 overflow-hidden rounded-full bg-red-100 md:left-1/2 md:-translate-x-px"
                aria-hidden
              >
                <motion.div
                  className="w-full origin-top bg-gradient-to-b from-red-400 via-red-500 to-red-600"
                  animate={{ height: lineHeight }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </div>

              {milestones.map((item, index) => {
                const isActive = index === activeIndex;
                const isReached = index <= activeIndex;
                const isRight = index % 2 === 1;

                return (
                  <li
                    key={item.year}
                    ref={(el) => {
                      nodeRefs.current[index] = el;
                    }}
                    data-index={index}
                    className="relative pb-10 last:pb-0 md:pb-12"
                  >
                    <div className="flex gap-4 md:hidden">
                      <div className="relative z-10 shrink-0 pt-1">
                        <MilestoneNode
                          year={item.year}
                          isActive={isActive}
                          isReached={isReached}
                          compact
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <MilestoneCard
                          item={item}
                          isActive={isActive}
                          isReached={isReached}
                        />
                      </div>
                    </div>

                    <div className="relative hidden md:block md:min-h-[6.5rem]">
                      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                        <MilestoneNode
                          year={item.year}
                          isActive={isActive}
                          isReached={isReached}
                        />
                      </div>
                      <div
                        className={cn(
                          "w-[calc(50%-2.75rem)] pt-1",
                          isRight ? "ml-auto pl-2" : "mr-auto pr-2"
                        )}
                      >
                        <MilestoneCard
                          item={item}
                          isActive={isActive}
                          isReached={isReached}
                          alignRight={!isRight}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
