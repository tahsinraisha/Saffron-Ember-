"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  function go(dir: 1 | -1) {
    setDirection(dir);
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  const current = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-char/30 py-28 md:py-40">
      <div className="container-luxe">
        <SectionHeading eyebrow="In Their Words" title="Notes from the Table" align="center" />

        <div className="relative mx-auto mt-16 max-w-2xl">
          <Quote className="mx-auto h-8 w-8 text-gold/50" aria-hidden="true" />

          <div className="relative mt-8 min-h-[220px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                className="cursor-grab text-center active:cursor-grabbing"
              >
                <p className="font-display text-xl leading-relaxed text-ivory text-balance md:text-2xl">
                  {current.quote}
                </p>

                <div className="mt-6 flex items-center justify-center gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-gold text-gold" />
                  ))}
                </div>

                <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-stone">
                  {current.name} — {current.role}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-ivory transition-colors hover:border-gold"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-gold" : "w-1.5 bg-char-line"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-ivory transition-colors hover:border-gold"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
