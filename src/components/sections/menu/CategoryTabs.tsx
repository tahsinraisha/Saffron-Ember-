"use client";

import { motion } from "framer-motion";
import type { MenuCategory } from "@/types";

const CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: "starters", label: "Starters" },
  { id: "mains", label: "Mains" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks", label: "Drinks" },
];

export default function CategoryTabs({
  active,
  onChange,
}: {
  active: MenuCategory;
  onChange: (c: MenuCategory) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      className="flex flex-wrap items-center gap-2 rounded-sm border border-char-line bg-char/40 p-1.5"
    >
      {CATEGORIES.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat.id)}
            className="relative rounded-sm px-4 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-stone transition-colors data-[active=true]:text-obsidian"
            data-active={isActive}
          >
            {isActive && (
              <motion.span
                layoutId="menu-tab-bg"
                className="absolute inset-0 rounded-sm bg-gold"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
