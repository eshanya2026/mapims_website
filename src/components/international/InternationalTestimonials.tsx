"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import InitialAvatar from "@/components/shared/InitialAvatar";

type Testimonial = {
  name: string;
  role: string;
  text: string;
  rating: 4 | 4.5 | 5;
};

function StarRating({ rating }: { rating: Testimonial["rating"] }) {
  return (
    <div className="flex gap-1.5" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, idx) => {
        const starIndex = idx + 1; // 1..5
        const isFull = rating >= starIndex;
        const isHalf = !isFull && rating >= starIndex - 0.5;

        return (
          <span key={idx} className="relative inline-block w-5 h-5">
            <Star className="absolute inset-0 w-5 h-5 text-yellow-400/40" fill="none" />

            {(isFull || isHalf) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: isFull ? "100%" : "50%" }}
              >
                <Star
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

const testimonials: Testimonial[] = [
  {
    name: "John M.",
    role: "Cardiac care · United Kingdom",
    text: "We travelled from London for my father’s bypass evaluation. Airport pickup was arranged promptly, and we were given a room at GB Residency on the hospital campus — very convenient for daily visits. Updates from the international desk made a stressful trip manageable. The surgical team was thorough and the ICU nursing was excellent.",
    rating: 5,
  },
  {
    name: "Maria S.",
    role: "Attendant · Malaysia",
    text: "The coordinator helped us with medical visa letters, admission paperwork, and interpreter support when needed. One appointment ran late because of an emergency case, but they rescheduled us the same day and kept us informed throughout.",
    rating: 4.5,
  },
  {
    name: "S. Kumar",
    role: "Orthopaedic surgery · UAE",
    text: "Cost estimate was shared before admission with no surprise charges. Reports were emailed after discharge, and physiotherapy was arranged before we flew back. Overall care was very good; follow-up teleconsultation would have been helpful a week earlier.",
    rating: 4,
  },
  {
    name: "Amina H.",
    role: "Oncology · Kenya",
    text: "My family appreciated the transparent discussion about treatment options and timelines. The international patient lounge and guidance on local stay options near Melmaruvathur helped us focus on recovery rather than logistics.",
    rating: 5,
  },
];

export default function InternationalTestimonials() {
  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden border-b border-slate-100 bg-white"
      aria-labelledby="international-testimonials-heading"
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center md:mb-14"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-0.5 w-12 bg-red-600" />
            <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
              Testimonials
            </span>
            <div className="h-0.5 w-12 bg-red-600" />
          </div>
          <h2
            id="international-testimonials-heading"
            className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl"
          >
            What Our International <span className="text-red-600">Patients Say</span>
          </h2>
          <p className="leading-relaxed text-slate-600">
            Real experiences from patients and families who travelled to MAPIMS for
            treatment — coordinators, clear communication, and care you can trust.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="bg-white rounded-3xl p-7 shadow-lg border border-slate-100"
            >
              <div className="flex items-start gap-4">
                <InitialAvatar name={testimonial.name} />

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-slate-500">{testimonial.role}</p>
                    </div>
                    <div className="text-slate-300">
                      <Quote className="w-9 h-9" />
                    </div>
                  </div>

                  <div className="mt-3">
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
              </div>

              <p className="mt-5 text-slate-600 leading-relaxed italic">
                &quot;{testimonial.text}&quot;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

