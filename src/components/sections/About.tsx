"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ThreadDivider from "@/components/ui/ThreadDivider";
import { FadeIn } from "@/components/ui/RevealText";
import { cdn } from "@/lib/utils";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="about" ref={ref} className="relative bg-obsidian py-28 md:py-40">
      <div className="container-luxe grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionHeading eyebrow="Our Philosophy" title="Two Elements, One Table" />

          <FadeIn delay={0.1} className="mt-8 space-y-5 text-stone">
            <p className="text-base leading-relaxed md:text-lg">
              Saffron arrived on the spice routes that once defined entire
              economies — carried over mountains from Kashmir, traded for gold
              by weight, and folded into kitchens from Lyon to Lahore. Ember is
              older still: the original technique, before technique had a name.
            </p>
            <p className="text-base leading-relaxed md:text-lg">
              We built this room around the conversation between the two. Every
              dish that leaves our kitchen has touched live fire, and nearly
              every one carries a thread of saffron — never as decoration,
              always as structure.
            </p>
          </FadeIn>

          <ThreadDivider className="mt-10" label="Since 2019" />

          <FadeIn delay={0.2} className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
            {[
              { value: "1", label: "Michelin Star" },
              { value: "120+", label: "Wines, Cellared" },
              { value: "06", label: "Years Open" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-ivory md:text-4xl">{stat.value}</p>
                <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-stone-dim">
                  {stat.label}
                </p>
              </div>
            ))}
          </FadeIn>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
          <motion.div style={{ scale: imageScale, y: imageY }} className="absolute inset-0">
            <Image
              src={cdn("https://images.unsplash.com/photo-1552566626-52f8b828add9", 1600)}
              alt="Fine dining interior with warm, low light"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          {/* Curtain reveal — lifts once as the image enters view */}
          <motion.div
            initial={{ y: "0%" }}
            whileInView={{ y: "-100%" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 z-10 bg-obsidian"
          />

          <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-gold/15" />
        </div>
      </div>
    </section>
  );
}
