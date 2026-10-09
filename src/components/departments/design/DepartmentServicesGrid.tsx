"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Maximize2, X, type LucideIcon } from "lucide-react";

export type DepartmentServiceItem = {
  title: string;
  description?: string;
  bullets?: string[];
  image?: string;
  badge?: string;
  badgeColor?: "blue" | "red";
  imageCaption?: string;
  imagePosition?: string;
};

type DepartmentServicesGridProps = {
  services: DepartmentServiceItem[];
  icons?: readonly LucideIcon[];
};

export default function DepartmentServicesGrid({
  services,
  icons = [],
}: DepartmentServicesGridProps) {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    title: string;
    subtitle?: string;
  } | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {services.map((service, index) => {
          const Icon = icons[index];
          return (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              whileHover={{ y: -4 }}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-red-100 hover:shadow-lg"
            >
              {/* Subtle ambient accent glow for cards with images */}
              {service.image ? (
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100 ${
                    service.badgeColor === "red"
                      ? "bg-red-500/10"
                      : "bg-blue-500/10"
                  }`}
                />
              ) : null}

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5 min-w-0">
                      {Icon ? (
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                          <Icon className="h-6 w-6" />
                        </span>
                      ) : (
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-bold text-red-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      )}
                      <div className="min-w-0 pt-1">
                        <h3 className="text-lg font-bold leading-snug text-slate-900 group-hover:text-red-700">
                          {service.title}
                        </h3>
                        {service.badge ? (
                          <span
                            className={`mt-1 inline-flex items-center gap-1.5 text-xs font-semibold ${
                              service.badgeColor === "red"
                                ? "text-red-600"
                                : "text-blue-600"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                                service.badgeColor === "red"
                                  ? "bg-red-600"
                                  : "bg-blue-600"
                              }`}
                            />
                            {service.badge}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {service.image ? (
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedImage({
                          src: service.image!,
                          title: service.title,
                          subtitle:
                            service.imageCaption ||
                            (service.badge
                              ? `${service.badge} Diagnostics & Care`
                              : "Specialized Neurological Care & Imaging"),
                        })
                      }
                      className={`group/thumb relative mb-4 w-full h-48 sm:h-52 overflow-hidden rounded-xl border border-slate-200/90 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer bg-slate-950/5 ${
                        service.badgeColor === "red"
                          ? "hover:border-red-400"
                          : "hover:border-blue-400"
                      }`}
                      title="Click to view image in full screen"
                      aria-label={`View ${service.title} illustration`}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                        quality={95}
                        className={`object-cover ${
                          service.imagePosition?.startsWith("object-")
                            ? service.imagePosition
                            : ""
                        } transition-transform duration-500 group-hover/thumb:scale-105`}
                        style={{
                          objectPosition: service.imagePosition || "center bottom",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/thumb:opacity-100 flex items-end justify-between p-3.5">
                        <span className="text-xs font-semibold text-white drop-shadow">
                          Click to expand
                        </span>
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/50 text-white backdrop-blur-sm">
                          <Maximize2 className="h-4 w-4 drop-shadow" />
                        </span>
                      </div>
                    </button>
                  ) : null}
                </div>

                {service.bullets ? (
                  <ul className="mt-auto space-y-2.5 border-t border-slate-100 pt-4">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-left text-sm leading-relaxed text-slate-600"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                        <span className="text-left leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : service.description ? (
                  <p className="mt-auto border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                ) : null}
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Lightbox Modal for Full View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl"
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-[75vh] bg-slate-950">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  quality={100}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-900 text-white border-t border-slate-800">
                <div>
                  <h4 className="font-bold text-base">{selectedImage.title}</h4>
                  {selectedImage.subtitle ? (
                    <p className="text-xs text-slate-400">
                      {selectedImage.subtitle}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
