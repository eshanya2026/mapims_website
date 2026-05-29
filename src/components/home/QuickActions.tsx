"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Video, FileText, Ambulance, HeartPulse, Search } from "lucide-react";
import { mapimsHealthCheckupUrl } from "@/data/site-links";

const actions = [
  { icon: Calendar, title: "Book Appointment", desc: "Schedule a visit with our experts", color: "bg-blue-50 text-blue-600", href: "/#book-appointment" },
  { icon: Video, title: "Video Consultation", desc: "Consult doctors from home", color: "bg-purple-50 text-purple-600", href: "/#book-appointment" },
  { icon: FileText, title: "Lab Reports", desc: "View your test results online", color: "bg-emerald-50 text-emerald-600", href: "/#book-appointment" },
  { icon: Ambulance, title: "Emergency Care", desc: "24/7 immediate medical help", color: "bg-red-50 text-red-700", href: "tel:1066" },
  { icon: HeartPulse, title: "Health Packages", desc: "Preventive health checkups", color: "bg-red-50 text-red-700", href: mapimsHealthCheckupUrl, external: true },
  { icon: Search, title: "Find Doctor", desc: "Search by specialty or name", color: "bg-indigo-50 text-indigo-600", href: "/departments" },
];

export default function QuickActions() {
  return (
    <section className="relative z-40 -mt-8 px-4 pb-2 sm:-mt-12 sm:pb-0 md:-mt-16">
      <div className="page-container">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {actions.map((action, index) => {
            const cardClass =
              "bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center cursor-pointer group min-h-[108px] sm:min-h-0";
            const content = (
              <>
                <div
                  className={`mb-2 sm:mb-4 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${action.color}`}
                >
                  <action.icon className="h-5 w-5 sm:h-7 sm:w-7" />
                </div>
                <h3 className="mb-0.5 text-xs font-semibold text-slate-900 sm:mb-1 sm:text-sm md:text-base">
                  {action.title}
                </h3>
                <p className="text-xs text-slate-500 hidden md:block">{action.desc}</p>
              </>
            );
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
