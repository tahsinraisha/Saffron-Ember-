"use client";

import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Eye, Flame } from "lucide-react";
import type { MenuItem } from "@/types";
import { cdn, formatPrice } from "@/lib/utils";

export default function MenuCard({
  item,
  index,
  onQuickView,
}: {
  item: MenuItem;
  index: number;
  onQuickView: (item: MenuItem) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), {
    stiffness: 180,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), {
    stiffness: 180,
    damping: 18,
  });

  function handleMouseMove(e: ReactMouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function resetTilt() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      style={{ perspective: 1000 }}
      className="group"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        style={{ rotateX, rotateY }}
        className="relative flex flex-col overflow-hidden rounded-sm border border-char-line bg-char-soft transition-colors duration-300 group-hover:border-gold/40"
      >
        <button
          onClick={() => onQuickView(item)}
          className="relative block aspect-[4/3] w-full overflow-hidden text-left"
          aria-label={`Quick view ${item.name}`}
        >
          <motion.div
            className="absolute inset-0"
            initial={false}
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={cdn(item.image, 900)}
              alt={item.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />

          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-sm border border-gold/40 bg-obsidian/60 px-2.5 py-1 font-mono text-xs text-ivory">
            ${formatPrice(item.price)}
          </span>

          {item.tags?.includes("signature") && (
            <span className="absolute left-3 top-3 flex items-center gap-1 rounded-sm bg-gold px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-obsidian">
              <Flame size={11} /> Signature
            </span>
          )}

          <span className="absolute inset-0 flex items-center justify-center bg-obsidian/0 opacity-0 transition-all duration-300 group-hover:bg-obsidian/30 group-hover:opacity-100">
            <span className="flex items-center gap-2 rounded-sm border border-gold/60 bg-obsidian/70 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ivory">
              <Eye size={13} /> Quick View
            </span>
          </span>
        </button>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg text-ivory">{item.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone">
            {item.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
