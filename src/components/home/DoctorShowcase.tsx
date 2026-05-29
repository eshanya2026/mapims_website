"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useState, useEffect } from "react";

const doctors = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    qualification: "MBBS, MD, DM (Cardiology)",
    specialty: "Senior Cardiologist",
    experience: "15+ Years",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    qualification: "MBBS, MS (Neurology)",
    specialty: "Neurologist",
    experience: "12+ Years",
    image: "https://images.unsplash.com/photo-1594824416174-8848d61719c8?q=80&w=1974&auto=format&fit=crop",
    rating: 4.8
  },
  {
    id: 3,
    name: "Dr. Anand Verma",
    qualification: "MBBS, MS (Orthopaedics)",
    specialty: "Orthopaedic Surgeon",
    experience: "20+ Years",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop",
    rating: 5.0
  },
  {
    id: 4,
    name: "Dr. Sunita Reddy",
    qualification: "MBBS, MD (Pediatrics)",
    specialty: "Pediatrician",
    experience: "10+ Years",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
    rating: 4.7
  }
];

export default function DoctorShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, doctors.length - itemsPerView + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, doctors.length - itemsPerView + 1)) % Math.max(1, doctors.length - itemsPerView + 1));
  };

  return (
    <section className="section-padding bg-slate-50">
      <div className="page-container">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-10 md:mb-12 md:flex-row md:items-end md:gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-[2px] bg-red-600"></div>
              <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">Our Experts</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
              Meet Our <span className="text-red-600">Specialists</span>
            </h2>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden py-4">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="w-full flex-shrink-0 px-2 sm:px-4"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-xl sm:rounded-3xl">
                  <div className="relative h-56 overflow-hidden bg-slate-100 sm:h-72 md:h-80">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold text-slate-900 shadow-sm">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      {doctor.rating}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="mb-2 text-sm font-medium text-red-600">{doctor.specialty}</div>
                    <h3 className="mb-1 text-xl font-bold text-slate-900 sm:text-2xl">{doctor.name}</h3>
                    <p className="mb-4 text-sm text-slate-500">{doctor.qualification}</p>
                    
                    <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-sm">
                        <span className="block text-slate-400">Experience</span>
                        <span className="font-bold text-slate-900">{doctor.experience}</span>
                      </div>
                      <Button className="w-full rounded-full bg-slate-900 text-white hover:bg-red-600 sm:w-auto">
                        Book Consult
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
