"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import CategoryTabs from "@/components/sections/menu/CategoryTabs";
import MenuCard from "@/components/sections/menu/MenuCard";
import QuickViewModal from "@/components/sections/menu/QuickViewModal";
import { MENU_ITEMS } from "@/lib/data";
import type { MenuCategory, MenuItem } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const [active, setActive] = useState<MenuCategory>("starters");
  const [quickView, setQuickView] = useState<MenuItem | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const items = useMemo(
    () => MENU_ITEMS.filter((item) => item.category === active),
    [active]
  );

  // GSAP ScrollTrigger stagger for the category tab controls, distinct
  // from the Framer Motion driven card grid below.
  useEffect(() => {
    if (!tabsRef.current) return;
    const buttons = tabsRef.current.querySelectorAll("[role='tab']");

    const tween = gsap.fromTo(
      buttons,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="menu" ref={sectionRef} className="relative bg-obsidian py-28 md:py-40">
      <div className="container-luxe">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="The Menu" title="A Table Built on Fire & Saffron" />
          <div ref={tabsRef}>
            <CategoryTabs active={active} onChange={setActive} />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} onQuickView={setQuickView} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <QuickViewModal item={quickView} onClose={() => setQuickView(null)} />
    </section>
  );
}
