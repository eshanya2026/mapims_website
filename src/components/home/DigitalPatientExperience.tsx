"use client";

import { motion } from "framer-motion";
import { Smartphone, MessageSquare, Clock, Video, FileCheck } from "lucide-react";

const features = [
  { icon: Smartphone, title: "Online Appointments", desc: "Book and manage your appointments instantly via our mobile app or website." },
  { icon: MessageSquare, title: "WhatsApp Reports", desc: "Get your lab reports and prescriptions delivered securely to your WhatsApp." },
  { icon: Clock, title: "Patient Timeline", desc: "Track your complete medical history and upcoming visits in one place." },
  { icon: Video, title: "Telemedicine", desc: "Consult with our specialists from the comfort of your home via HD video calls." },
  { icon: FileCheck, title: "Digital Prescriptions", desc: "Access and refill your prescriptions digitally without carrying paper." },
];

export default function DigitalPatientExperience() {
  return (
    <section className="section-padding bg-slate-950 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-red-600/20 blur-[120px]" />
        <div className="absolute top-[60%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="page-container relative z-10">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-red-600"></div>
              <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">Smart Healthcare</span>
            </div>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Digital Patient <br />
              <span className="text-slate-400">Experience</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Experience seamless healthcare with our integrated digital platform. From booking appointments to accessing medical records, everything is just a click away.
            </p>

            <div className="space-y-6">
              {features.slice(0, 3).map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center text-red-600 shrink-0">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                    <p className="text-slate-400 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
                alt="Digital Healthcare App"
                loading="lazy"
                decoding="async"
                className="rounded-3xl shadow-2xl border border-slate-800"
              />
              
              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-2 top-1/4 hidden items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-2xl sm:flex md:-left-8"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Report Ready</p>
                  <p className="text-slate-400 text-xs">Sent via WhatsApp</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-2 bottom-1/4 hidden items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-2xl sm:flex md:-right-8"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Dr. Sharma</p>
                  <p className="text-slate-400 text-xs">Call starting in 5m</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
