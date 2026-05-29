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
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-slate-900 z-0" />
      
      <div className="page-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-[2px] bg-red-600"></div>
            <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">Patient Stories</span>
            <div className="w-12 h-[2px] bg-red-600"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Patients <span className="text-red-600">Say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative mt-12"
            >
              <div className="absolute -top-10 left-8">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>
              <div className="absolute top-6 right-8 text-slate-200">
                <Quote className="w-12 h-12" />
              </div>
              
              <div className="mt-8 mb-6">
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
