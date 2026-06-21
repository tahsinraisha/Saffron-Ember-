"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/RevealText";
import { CHEF_TIMELINE } from "@/lib/data";
import { cdn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Chef() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current || !lineRef.current) return;

    const tween = gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: true,
        },
      }
    );

    const items = gsap.utils.toArray<HTMLElement>(".chef-timeline-item");
    const itemTweens = items.map((el) =>
      gsap.fromTo(
        el,
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      )
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      itemTweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <section id="chef" className="relative bg-char/30 py-28 md:py-40">
      <div className="container-luxe">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <SectionHeading eyebrow="Meet the Chef" title="Chef Dev Kapoor" />

            <FadeIn delay={0.1} className="relative mt-10 aspect-[3/4] w-full max-w-sm overflow-hidden rounded-sm">
              <Image
                src={cdn("https://images.unsplash.com/photo-1583394293214-28ded15ee548", 1200)}
                alt="Portrait of Chef Dev Kapoor in the kitchen"
                fill
                sizes="(min-width: 1024px) 35vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-gold/15" />
            </FadeIn>

            <FadeIn delay={0.2} className="mt-8 max-w-sm text-stone">
              <p className="text-sm leading-relaxed md:text-base">
                Trained in Lyon and shaped by years over live coals in
                Copenhagen, Chef Kapoor returned to the spice routes of his
                childhood to build a kitchen where fire and saffron share equal
                billing.
              </p>
            </FadeIn>
          </div>

          <div ref={timelineRef} className="relative pl-8">
            <div className="absolute left-0 top-0 h-full w-px bg-char-line">
              <div
                ref={lineRef}
                className="absolute left-0 top-0 h-full w-px origin-top bg-gold"
              />
            </div>

            <div className="flex flex-col gap-12">
              {CHEF_TIMELINE.map((entry) => (
                <div key={entry.year} className="chef-timeline-item relative">
                  <span className="absolute -left-[2.05rem] top-1 h-2 w-2 rounded-full bg-gold" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-stone">
                    {entry.year}
                  </span>
                  <h3 className="mt-2 font-display text-xl text-ivory md:text-2xl">
                    {entry.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-stone md:text-base">
                    {entry.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
