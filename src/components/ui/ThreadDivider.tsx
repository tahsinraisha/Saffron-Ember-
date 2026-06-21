"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ThreadDividerProps {
  className?: string;
  label?: string;
}

/**
 * A single continuous gold line that knots once in the middle, echoing a
 * saffron thread. Used between sections instead of a generic <hr />.
 * The line itself carries the gold accent — never the label text.
 */
export default function ThreadDivider({ className = "", label }: ThreadDividerProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const wrap = wrapRef.current;
    if (!path || !wrap) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: wrap,
        start: "top 85%",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={wrapRef} className={`flex items-center gap-5 ${className}`}>
      <svg
        viewBox="0 0 240 16"
        className="h-4 w-28 shrink-0 md:w-40"
        fill="none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d="M0 8 C 40 8, 60 2, 90 8 C 105 11, 110 14, 120 8 C 130 2, 135 11, 150 8 C 180 2, 200 8, 240 8"
          stroke="#D4AF37"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
      {label && <span className="eyebrow whitespace-nowrap">{label}</span>}
    </div>
  );
}
