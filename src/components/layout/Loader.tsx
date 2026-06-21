"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const duration = 1700;

    let frame: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 280);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={done}
          role="status"
          aria-label="Loading Saffron & Ember"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <span className="eyebrow mb-4">Est. 2019 — One Michelin Star</span>
            <h1 className="font-display text-3xl md:text-4xl text-ivory tracking-tight">
              Saffron <span className="text-stone">&amp;</span> Ember
            </h1>

            <div className="relative mt-7 h-px w-48 overflow-hidden bg-char-line">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gold"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>

            <span className="mt-4 font-mono text-[0.7rem] tracking-[0.3em] text-stone-dim">
              {String(progress).padStart(3, "0")}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
