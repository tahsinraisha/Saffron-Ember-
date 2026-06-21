"use client";

import { useState, type FormEvent } from "react";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import ThreadDivider from "@/components/ui/ThreadDivider";

const SOCIALS = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className="relative border-t border-char-line bg-char/40 pt-20">
      <div className="container-luxe">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl text-ivory">
              Saffron <span className="text-stone">&amp;</span> Ember
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone">
              Live-fire fine dining, built on the spice routes of Kashmir and
              the kitchens of Lyon. One Michelin Star, since 2019.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-char-line text-stone transition-colors hover:border-gold/50 hover:text-ivory"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow mb-5">Visit</p>
            <ul className="space-y-3 text-sm text-stone">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-gold" />
                <span>214 Ember Lane, Suite 1<br />Downtown Arts District</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="shrink-0 text-gold" />
                <a href="tel:+15551234567" className="hover:text-ivory">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="shrink-0 text-gold" />
                <a href="mailto:host@saffronandember.com" className="hover:text-ivory">
                  host@saffronandember.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Hours</p>
            <ul className="space-y-2 text-sm text-stone">
              <li className="flex justify-between gap-6">
                <span>Tue – Thu</span>
                <span className="font-mono text-xs text-ivory">5:30 – 10 PM</span>
              </li>
              <li className="flex justify-between gap-6">
                <span>Fri – Sat</span>
                <span className="font-mono text-xs text-ivory">5:30 – 11 PM</span>
              </li>
              <li className="flex justify-between gap-6">
                <span>Sunday</span>
                <span className="font-mono text-xs text-ivory">5 – 9 PM</span>
              </li>
              <li className="flex justify-between gap-6">
                <span>Monday</span>
                <span className="font-mono text-xs text-ivory">Closed</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Stay in Touch</p>
            <p className="text-sm leading-relaxed text-stone">
              Seasonal menus, wine dinners, and the occasional table held just
              for our list.
            </p>

            {subscribed ? (
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-stone">
                You&apos;re on the list.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  aria-label="Email address"
                  className="form-input"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="shrink-0 rounded-sm border border-gold/50 px-4 font-mono text-xs uppercase tracking-[0.14em] text-ivory transition-colors hover:border-gold hover:bg-gold/10"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <ThreadDivider className="mt-16" />

        <div className="flex flex-col items-center justify-between gap-3 py-8 text-center font-mono text-[0.65rem] uppercase tracking-[0.16em] text-stone-dim sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Saffron &amp; Ember. All rights reserved.</p>
          <p>Reservations recommended · Smart casual attire</p>
        </div>
      </div>
    </footer>
  );
}
