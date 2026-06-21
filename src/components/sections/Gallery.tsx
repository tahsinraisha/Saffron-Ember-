"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { GALLERY_IMAGES } from "@/lib/data";
import { cdn } from "@/lib/utils";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % GALLERY_IMAGES.length)),
    []
  );
  const prev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
      ),
    []
  );

  useEffect(() => {
    if (activeIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, next, prev]);

  const active = activeIndex !== null ? GALLERY_IMAGES[activeIndex] : null;

  return (
    <section id="gallery" className="relative bg-obsidian py-28 md:py-40">
      <div className="container-luxe">
        <SectionHeading eyebrow="The Gallery" title="A Room Worth Lingering In" align="left" />

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative block w-full overflow-hidden rounded-sm border border-char-line ${
                img.span === "tall" ? "aspect-[3/4.4]" : img.span === "wide" ? "aspect-[16/10]" : "aspect-[4/5]"
              }`}
              aria-label={`View ${img.caption} in lightbox`}
            >
              <Image
                src={cdn(img.src, 1100)}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/0 to-obsidian/0 opacity-70 transition-opacity group-hover:opacity-90" />
              <span className="absolute bottom-3 left-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ivory opacity-0 transition-opacity group-hover:opacity-100">
                {img.caption}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
          >
            <motion.div
              className="absolute inset-0 bg-obsidian/92 backdrop-blur-md"
              onClick={close}
            />

            <button
              onClick={close}
              aria-label="Close lightbox"
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-obsidian/70 text-ivory hover:border-gold"
            >
              <X size={18} />
            </button>

            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-obsidian/70 text-ivory hover:border-gold sm:left-6"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-obsidian/70 text-ivory hover:border-gold sm:right-6"
            >
              <ChevronRight size={20} />
            </button>

            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 aspect-[4/5] w-full max-w-3xl sm:aspect-[16/10]"
            >
              <Image
                src={cdn(active.src, 1800)}
                alt={active.alt}
                fill
                sizes="100vw"
                className="rounded-sm object-cover"
              />
              <p className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-[0.18em] text-ivory">
                {active.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
