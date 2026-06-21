"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, X } from "lucide-react";
import type { MenuItem } from "@/types";
import { cdn, formatPrice } from "@/lib/utils";

export default function QuickViewModal({
  item,
  onClose,
}: {
  item: MenuItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={item.name}
        >
          <motion.div
            className="absolute inset-0 bg-obsidian/85 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong relative z-10 grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-sm sm:grid-cols-2"
          >
            <button
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-obsidian/60 text-ivory transition-colors hover:border-gold"
            >
              <X size={16} />
            </button>

            <div className="relative aspect-[4/3] sm:aspect-auto">
              <Image
                src={cdn(item.image, 1100)}
                alt={item.name}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col p-7 sm:p-9">
              <span className="eyebrow">{item.category}</span>
              <h3 className="mt-3 font-display text-2xl text-ivory md:text-3xl">{item.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-stone md:text-base">
                {item.description}
              </p>

              {item.tags && item.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 rounded-sm border border-gold/30 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-stone"
                    >
                      {tag === "signature" && <Flame size={10} className="text-gold" />}
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-auto flex items-center justify-between pt-8">
                <span className="font-mono text-2xl text-ivory">
                  ${formatPrice(item.price)}
                </span>
                <button onClick={onClose} className="btn-ghost">
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
