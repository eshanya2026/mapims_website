"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import type { ReactNode } from "react";

export type TestimonialItem = {
  name: string;
  role: string;
  image: string;
  text: string;
  rating: number;
};

function TestimonialStars({ rating }: { rating: number }) {
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

type TestimonialsSectionProps = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  testimonials: TestimonialItem[];
  /** 3 = home layout; 4 = international (2 cols tablet, 4 desktop) */
  columns?: 3 | 4;
};

export default function TestimonialsSection({
  id,
  eyebrow,
  title,
  testimonials,
  columns = 3,
}: TestimonialsSectionProps) {
  const gridClass =
    columns === 4
      ? "grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4"
      : "grid grid-cols-1 gap-8 md:grid-cols-3";

  return (
    <section
      id={id}
      className="section-padding relative overflow-hidden bg-white"
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className="absolute left-0 top-0 z-0 h-1/2 w-full bg-slate-900" />

      <div className="page-container relative z-10">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-[2px] w-12 bg-red-600" />
            <span className="text-sm font-semibold uppercase tracking-wider text-red-600">
              {eyebrow}
            </span>
            <div className="h-[2px] w-12 bg-red-600" />
          </div>
          <h2
            id={id ? `${id}-heading` : undefined}
            className="text-4xl font-bold text-white md:text-5xl"
          >
            {title}
          </h2>
        </div>

        <div className={gridClass}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative mt-12 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl"
            >
              <div className="absolute -top-10 left-8">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-lg"
                  loading="lazy"
                />
              </div>
              <div className="absolute right-8 top-6 text-slate-200">
                <Quote className="h-12 w-12" />
              </div>

              <div className="mb-6 mt-8">
                <TestimonialStars rating={testimonial.rating} />
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
