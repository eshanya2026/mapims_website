"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Krishnan",
    role: "Patient",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    text: "The care I received at Adhiparasakthi Hospital was exceptional. The doctors were attentive, and the nursing staff was incredibly compassionate. The facilities are truly world-class.",
    rating: 5
  },
  {
    name: "Meera Reddy",
    role: "Patient's Family",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    text: "My father underwent a complex cardiac surgery here. The expertise of the surgical team and the post-operative care in the advanced ICU gave us immense confidence and peace of mind.",
    rating: 5
  },
  {
    name: "Suresh Menon",
    role: "Patient",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    text: "From booking the appointment on their app to the consultation and getting reports via WhatsApp, the entire digital experience is seamless and highly convenient.",
    rating: 4
  }
];

export default function Testimonials() {
  return (
    <section className="section-padding relative overflow-hidden bg-slate-900">
      <div className="page-container relative z-10">
        <div className="section-header-center mb-10 sm:mb-12">
          <div className="section-eyebrow-center">
            <div className="h-0.5 w-10 bg-red-600 sm:w-12" />
            <span className="text-xs font-semibold uppercase tracking-wider text-red-500 sm:text-sm">
              Patient Stories
            </span>
            <div className="h-0.5 w-10 bg-red-600 sm:w-12" />
          </div>
          <h2 className="mb-3 text-2xl font-bold leading-tight text-white sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
            What Our Patients <span className="text-red-500">Say</span>
          </h2>
        </div>

        <div className="section-grid grid-cols-1 md:grid-cols-3 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative mt-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-xl sm:mt-12 sm:rounded-3xl sm:p-8"
            >
              <div className="absolute -top-8 left-6 sm:-top-10 sm:left-8">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="h-16 w-16 rounded-full border-4 border-white object-cover shadow-lg sm:h-20 sm:w-20"
                />
              </div>
              <div className="absolute top-5 right-6 text-slate-200 sm:top-6 sm:right-8">
                <Quote className="h-10 w-10 sm:h-12 sm:w-12" />
              </div>
              
              <div className="mb-5 mt-6 sm:mb-6 sm:mt-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 italic leading-relaxed">&quot;{testimonial.text}&quot;</p>
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
