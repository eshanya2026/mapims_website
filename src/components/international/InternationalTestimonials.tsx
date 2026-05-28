"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import SectionIntro from "@/components/home/SectionIntro";

type Testimonial = {
  name: string;
  role: string;
  image: string;
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
    role: "Patient (UK)",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    text: "From airport pickup to my first consultation, the coordinator’s support was consistent. The doctor explained the plan clearly, and I received follow-ups after each visit. The overall experience felt organized and reassuring.",
    rating: 5,
  },
  {
    name: "Maria S.",
    role: "Attendant (Malaysia)",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    text: "We needed help with travel timing, documents, and arranging the stay. Everything was guided step-by-step, and the staff were patient with our questions. The only delay was minor scheduling, and the team promptly resolved it.",
    rating: 4.5,
  },
  {
    name: "S. Kumar",
    role: "Patient (UAE)",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    text: "My consultation and reports process was smooth. The care team maintained clear communication, and the billing details were explained without confusion. The hospital environment helped us stay comfortable during the treatment period.",
    rating: 4,
  },
];

export default function InternationalTestimonials() {
  return (
    <section className="section-padding bg-white relative overflow-hidden border-b border-slate-100">
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <SectionIntro
          centered
          spacing="spaced"
          eyebrow="International Patient Stories"
          title={
            <>
              Real Experiences, <span className="text-red-600">Trusted</span> Care
            </>
          }
          titleClassName="text-slate-900"
          description={
            <span className="text-sm text-slate-600">
              Coordinators, clear communication, and patient-first support throughout your journey.
            </span>
          }
        />

        <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-3 md:gap-6">
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
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-sm object-cover"
                    loading="lazy"
                  />
                </div>

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

