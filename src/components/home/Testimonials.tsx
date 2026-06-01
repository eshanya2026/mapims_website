"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import InitialAvatar from "@/components/shared/InitialAvatar";

const testimonials = [
  {
    name: "Rahul Krishnan",
    role: "Patient",
    text: "The care I received at Adhiparasakthi Hospital was exceptional. The doctors were attentive, and the nursing staff was incredibly compassionate. The facilities are truly world-class.",
    rating: 5,
  },
  {
    name: "Meera Reddy",
    role: "Patient's Family",
    text: "My father underwent a complex cardiac surgery here. The expertise of the surgical team and the post-operative care in the advanced ICU gave us immense confidence and peace of mind.",
    rating: 5,
  },
  {
    name: "Suresh Menon",
    role: "Patient",
    text: "From booking the appointment on their app to the consultation and getting reports via WhatsApp, the entire digital experience is seamless and highly convenient.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-slate-900 z-0" />

      <div className="page-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-[2px] bg-red-600" />
            <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">
              Patient Stories
            </span>
            <div className="w-12 h-[2px] bg-red-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Patients <span className="text-red-600">Say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative mt-12"
            >
              <div className="absolute -top-10 left-8">
                <InitialAvatar name={testimonial.name} size="lg" className="shadow-lg" />
              </div>
              <div className="absolute top-6 right-8 text-slate-200">
                <Quote className="w-12 h-12" />
              </div>

              <div className="mt-8 mb-6">
                <div
                  className="mb-4 flex gap-0.5"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-slate-600 italic leading-relaxed">
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
