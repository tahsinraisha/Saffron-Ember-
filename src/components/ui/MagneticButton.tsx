"use client";

import { useRef, type MouseEvent as ReactMouseEvent, type ReactNode, type RefObject } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "gold" | "ghost";
  onClick?: () => void;
  type?: "button" | "submit";
  href?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  className,
  variant = "gold",
  onClick,
  type = "button",
  href,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 14, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 150, damping: 14, mass: 0.3 });

  function handleMouseMove(e: ReactMouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const classes = cn(variant === "gold" ? "btn-gold" : "btn-ghost", className);

  const content = (
    <motion.span
      style={{ x: springX, y: springY }}
      className="inline-flex items-center gap-2.5"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={classes}
    >
      {content}
    </button>
  );
}
