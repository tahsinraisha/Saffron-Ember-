"use client";

import { motion } from "framer-motion";
import { type ElementType, type ReactNode } from "react";

interface RevealTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Stagger by word (default) or by character for short headlines */
  by?: "word" | "char";
  once?: boolean;
}

export default function RevealText({
  text,
  as: Tag = "div",
  className = "",
  delay = 0,
  by = "word",
  once = true,
}: RevealTextProps) {
  const units = by === "word" ? text.split(" ") : text.split("");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline">
        {units.map((unit, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once, amount: 0.6 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + i * (by === "word" ? 0.06 : 0.025),
              }}
            >
              {unit}
              {by === "word" && i < units.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 24,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
