"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ParticleField from "@/components/ui/ParticleField";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import { cdn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.92]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden bg-obsidian"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 h-[130%] w-full">
        <Image
          src={cdn("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4", 2400)}
          alt="Candlelit dining room at Saffron & Ember, set for the evening service"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/40 to-obsidian"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/30" />

      <ParticleField count={42} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-luxe relative z-10 flex h-full flex-col items-start justify-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow mb-6"
        >
          Est. 2019 — One Michelin Star
        </motion.span>

        <RevealText
          text="Where Flame Meets Spice"
          as="h1"
          delay={0.35}
          className="max-w-4xl font-display text-5xl leading-[1.02] text-ivory text-balance sm:text-6xl md:text-7xl lg:text-8xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-md text-base leading-relaxed text-stone md:text-lg"
        >
          An ode to live fire and the world&apos;s most coveted spice, plated
          nightly in the heart of the city.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#reservation" variant="gold">
            Reserve a Table
          </MagneticButton>
          <MagneticButton href="#menu" variant="ghost">
            View Menu
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-9 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-stone"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-gold" />
        </motion.div>
      </motion.a>
    </section>
  );
}
