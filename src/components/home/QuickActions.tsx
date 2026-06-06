"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Video, FileText, Ambulance, HeartPulse } from "lucide-react";
import { mapimsHealthCheckupUrl } from "@/data/site-links";

const actions = [
  { icon: Calendar, title: "Book Appointment", desc: "Schedule a visit with our experts", color: "bg-blue-50 text-blue-600", href: "/#book-appointment" },
  { icon: Video, title: "Video Consultation", desc: "Consult doctors from home", color: "bg-purple-50 text-purple-600", href: "/#book-appointment" },
  { icon: FileText, title: "Lab Reports", desc: "View your test results online", color: "bg-emerald-50 text-emerald-600", href: "/#book-appointment" },
  { icon: Ambulance, title: "Emergency Care", desc: "24/7 immediate medical help", color: "bg-red-50 text-red-700", href: "tel:1066" },
  { icon: HeartPulse, title: "Health Packages", desc: "Preventive health checkups", color: "bg-red-50 text-red-700", href: mapimsHealthCheckupUrl, external: true },
];

export default function QuickActions() {
  return (
    <section className="relative z-40 -mt-4 px-3 pb-2 sm:-mt-10 sm:px-4 md:-mt-14 lg:-mt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {actions.map((action, index) => {
            const cardClass =
              "flex h-full min-h-[108px] cursor-pointer flex-col items-center justify-center rounded-xl border border-slate-100 bg-white p-3 text-center shadow-lg shadow-slate-200/40 transition-shadow group sm:min-h-0 sm:rounded-2xl sm:p-5 sm:shadow-xl";
            const content = (
              <>
                <div
                  className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full transition-transform group-hover:scale-110 sm:mb-3 sm:h-14 sm:w-14 ${action.color}`}
                >
                  <action.icon className="h-5 w-5 sm:h-7 sm:w-7" />
                </div>
                <h3 className="text-[11px] font-semibold leading-tight text-slate-900 sm:text-sm md:text-base">
                  {action.title}
                </h3>
                <p className="mt-1 hidden text-xs text-slate-500 md:block">{action.desc}</p>
              </>
            );
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {"external" in action && action.external ? (
                  <a
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {content}
                  </a>
                ) : action.href.startsWith("tel:") ? (
                  <a href={action.href} className={cardClass}>
                    {content}
                  </a>
                ) : (
                  <Link href={action.href} className={cardClass}>
                    {content}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
