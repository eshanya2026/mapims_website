"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Users,
} from "lucide-react";
import type { ContentJob } from "@/lib/content";

type CareersJobListProps = {
  jobs: ContentJob[];
};

export default function CareersJobList({ jobs }: CareersJobListProps) {
  if (jobs.length === 0) {
    return (
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-lg rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-sm sm:p-12"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
              <Briefcase className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">No openings right now</h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              We don&apos;t have any published positions at the moment. Please check back soon or
              reach out to our HR team.
            </p>
            <a
              href="mailto:contact@mapims.online"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              <Mail className="h-4 w-4" />
              Contact HR
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Open positions</h2>
            <p className="mt-2 text-slate-600">
              Explore current opportunities across departments at Melmaruvathur.
            </p>
          </div>
          <p className="text-sm font-medium text-slate-500">
            {jobs.length} {jobs.length === 1 ? "role" : "roles"} listed
          </p>
        </motion.div>

        <div className="space-y-4">
          {jobs.map((job, index) => (
            <motion.article
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:border-red-100 hover:shadow-lg sm:rounded-3xl"
            >
              <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-600">
                      {job.department}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {job.employmentType}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-red-600 sm:text-2xl">
                    {job.title}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {job.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 shrink-0 text-red-500" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 shrink-0 text-red-500" />
                      Posted {job.postedAt}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-4 w-4 shrink-0 text-red-500" />
                      {job.vacancy} {job.vacancy === 1 ? "vacancy" : "vacancies"}
                    </span>
                    {job.closingDate ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 shrink-0 text-red-500" />
                        Closes {job.closingDate}
                      </span>
                    ) : null}
                  </div>
                </div>

                <Link
                  href={`/careers/${job.slug}`}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-2 border-red-600 bg-white px-6 py-3 text-sm font-semibold text-red-600 transition-all group-hover:bg-red-600 group-hover:text-white sm:min-w-[160px]"
                >
                  View role
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
