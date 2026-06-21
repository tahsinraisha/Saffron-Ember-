"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Chef", href: "#chef" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div
        className={cn(
          "container-luxe flex items-center justify-between rounded-sm transition-all duration-500",
          scrolled && "glass-strong mx-auto max-w-[88rem] py-2"
        )}
      >
        <a href="#hero" className="font-display text-lg tracking-tight text-ivory md:text-xl">
          Saffron <span className="text-stone">&amp;</span> Ember
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-stone transition-colors hover:text-ivory"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <MagneticButton href="#reservation" variant="gold">
            Reserve
          </MagneticButton>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="text-ivory lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong container-luxe mx-4 mt-2 flex flex-col gap-1 rounded-sm p-4 lg:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-char-line py-3 font-mono text-xs uppercase tracking-[0.2em] text-stone last:border-none hover:text-ivory"
              >
                {link.label}
              </a>
            ))}
            <a href="#reservation" onClick={() => setOpen(false)} className="btn-gold mt-4 justify-center">
              Reserve
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
