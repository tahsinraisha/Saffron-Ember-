import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Loader from "@/components/layout/Loader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://www.saffronandember.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Saffron & Ember | Michelin-Starred Live-Fire Dining",
    template: "%s | Saffron & Ember",
  },
  description:
    "Saffron & Ember is a one Michelin Star restaurant built on live-fire cooking and saffron-forward flavor. Reserve your table for an unforgettable evening.",
  keywords: [
    "Saffron & Ember",
    "Michelin star restaurant",
    "fine dining",
    "live fire cooking",
    "luxury restaurant",
    "tasting menu",
    "reservations",
  ],
  openGraph: {
    title: "Saffron & Ember | Michelin-Starred Live-Fire Dining",
    description:
      "An ode to live fire and the world's most coveted spice, plated nightly. Reserve your table at Saffron & Ember.",
    url: siteUrl,
    siteName: "Saffron & Ember",
    images: [
      {
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Candlelit dining room at Saffron & Ember",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saffron & Ember | Michelin-Starred Live-Fire Dining",
    description:
      "An ode to live fire and the world's most coveted spice, plated nightly.",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-obsidian font-body text-ivory antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-gold focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.16em] focus:text-obsidian"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Saffron & Ember",
              servesCuisine: ["Fine Dining", "Mediterranean", "Indian-inspired"],
              priceRange: "$$$",
              acceptsReservations: true,
              address: {
                "@type": "PostalAddress",
                streetAddress: "214 Ember Lane, Suite 1",
                addressLocality: "Downtown Arts District",
              },
              telephone: "+1-555-123-4567",
              url: siteUrl,
            }),
          }}
        />
        <Loader />
        <SmoothScroll>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
