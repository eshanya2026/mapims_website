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
    <div
      className="mb-4 flex gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const starIndex = i + 1;
        const isFull = rating >= starIndex;
        const isHalf = !isFull && rating >= starIndex - 0.5;

        if (isFull) {
          return (
            <Star
              key={i}
              className="h-5 w-5 fill-amber-400 text-amber-400"
            />
          );
        }

        if (isHalf) {
          return (
            <span key={i} className="relative inline-block h-5 w-5">
              <Star className="h-5 w-5 fill-slate-200 text-slate-200" />
              <span className="absolute inset-0 w-1/2 overflow-hidden">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </span>
            </span>
          );
        }

        return (
          <Star key={i} className="h-5 w-5 fill-slate-200 text-slate-200" />
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
      className="section-padding relative overflow-hidden bg-white"
      aria-labelledby="international-testimonials-heading"
    >
      <div className="absolute left-0 top-0 z-0 h-1/2 w-full bg-slate-900" />

      <div className="page-container relative z-10">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-[2px] w-12 bg-red-600" />
            <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
              Patient Stories
            </span>
            <div className="h-[2px] w-12 bg-red-600" />
          </div>
          <h2
            id="international-testimonials-heading"
            className="mb-6 text-4xl font-bold text-white md:text-5xl"
          >
            What Our International{" "}
            <span className="text-red-600">Patients Say</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300">
            Real experiences from patients and families who travelled to MAPIMS for
            treatment — coordinators, clear communication, and care you can trust.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative mt-12 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl"
            >
              <div className="absolute -top-10 left-8">
                <InitialAvatar
                  name={testimonial.name}
                  size="lg"
                  className="shadow-lg"
                />
              </div>
              <div className="absolute right-8 top-6 text-slate-200">
                <Quote className="h-12 w-12" />
              </div>

              <div className="mb-6 mt-8">
                <StarRating rating={testimonial.rating} />
                <p className="italic leading-relaxed text-slate-600">
                  &quot;{testimonial.text}&quot;
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                <p className="text-sm text-slate-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
