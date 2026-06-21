# Saffron & Ember

A production-ready, Michelin-star restaurant website built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, GSAP/ScrollTrigger, and Lenis smooth scrolling.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build
npm run start   # production server
```

## Stack

- **Next.js 15** — App Router, `next/image`, `next/font`, typed metadata/sitemap/robots
- **TypeScript** — strict mode
- **Tailwind CSS v4** — CSS-first theme tokens in `src/app/globals.css` (no `tailwind.config.js` needed)
- **Framer Motion** — scroll-linked parallax, staggered reveals, modal/carousel transitions, magnetic buttons
- **GSAP + ScrollTrigger** — the chef timeline draw, the signature thread divider, category-tab stagger
- **Lenis** — smooth scrolling, synced to GSAP's ticker so ScrollTrigger stays accurate

## Project structure

```
src/
  app/
    layout.tsx        Fonts, SEO metadata, JSON-LD, global providers
    page.tsx           Section order for the single-page site
    globals.css         Design tokens, base styles, component utility classes
    sitemap.ts / robots.ts
  components/
    layout/             Navbar, Loader, SmoothScroll (Lenis provider)
    sections/            Hero, About, Menu, Chef, Gallery, Testimonials, Reservation, Footer
      menu/              CategoryTabs, MenuCard, QuickViewModal
    ui/                  MagneticButton, ThreadDivider, RevealText, ParticleField, SectionHeading
  lib/
    data.ts              Menu items, gallery, testimonials, chef timeline (edit here for content changes)
    utils.ts             cn(), cdn() image helper, formatPrice()
  types/                 Shared TypeScript types
```

## Design system

Color, type, and motion choices are documented as CSS custom properties in `globals.css` under `@theme`. The notable constraint: **gold (`#D4AF37`) is used only for line work, borders, icon strokes, and button fills — never as a text color.** Headlines and body copy stay in ivory/stone tones; gold appears in the thread divider, tab indicators, focus rings, and CTA backgrounds (where the label itself renders in obsidian, sitting on the gold fill).

- Display face: **Fraunces** (serif, used with restraint for headlines)
- Body face: **Inter**
- Utility/mono face: **JetBrains Mono** (eyebrows, prices, timestamps — anything that reads as data)

## Content

All copy, menu items, prices, gallery captions, and testimonials live in `src/lib/data.ts`. Update that file to change the menu or swap images — everything else (filtering, modals, masonry layout) reads from it automatically.

## Images

All imagery is served from `images.unsplash.com` via `next/image`, with the remote pattern allowed in `next.config.ts`. Swap any URL in `src/lib/data.ts` or the section components to use your own photography; no other config changes are required as long as the host is added to `remotePatterns`.

## Notes for production

- The reservation form and newsletter signup are front-end only; wire `handleSubmit` in `Reservation.tsx` and `handleSubscribe` in `Footer.tsx` to your booking provider / email service / API route.
- `prefers-reduced-motion` is respected: Lenis and the particle field both no-op for users who request reduced motion, and global CSS shortens all transitions.
- Update `siteUrl` in `src/app/layout.tsx`, `sitemap.ts`, and `robots.ts` to your real domain before deploying.
