"use client";

import { motion } from "framer-motion";
import { Award, Clock, ShieldPlus, UserCheck, Laptop, BookOpen } from "lucide-react";

const features = [
  { icon: Award, title: "NABH Accredited", desc: "Recognized for highest quality of patient care and safety standards." },
  { icon: Clock, title: "24/7 Emergency", desc: "Round-the-clock emergency and trauma care with dedicated ambulances." },
  { icon: ShieldPlus, title: "Advanced ICU", desc: "State-of-the-art intensive care units with modern life-support systems." },
  { icon: UserCheck, title: "Expert Doctors", desc: "Highly qualified and experienced medical professionals across all specialities." },
  { icon: Laptop, title: "Digital Patient Care", desc: "Seamless digital experience from booking appointments to accessing reports." },
  { icon: BookOpen, title: "Teaching Hospital", desc: "A premier medical college fostering research and academic excellence." },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 transform origin-top" />
      
      <div className="page-container relative z-10">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          <div className="w-full lg:w-1/3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-red-600"></div>
              <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">Why Choose Us</span>
            </div>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Excellence in <br />
              <span className="text-red-600">Healthcare</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              We are committed to providing compassionate, high-quality, and affordable healthcare to all. Our patient-centric approach ensures you receive the best possible treatment.
            </p>
            
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop" 
                alt="Medical Team" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-red-600/20 mix-blend-multiply" />
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
