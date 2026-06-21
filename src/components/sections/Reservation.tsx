"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Check, Clock, Minus, Plus, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { cdn } from "@/lib/utils";

const TIME_SLOTS = ["5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"];

export default function Reservation() {
  const [party, setParty] = useState(2);
  const [time, setTime] = useState(TIME_SLOTS[3]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulated submission — wire up to a booking provider or API route.
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1100);
  }

  return (
    <section id="reservation" className="relative bg-obsidian py-28 md:py-40">
      <div className="container-luxe grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="relative hidden overflow-hidden rounded-sm lg:block">
          <Image
            src={cdn("https://images.unsplash.com/photo-1559339352-11d035aa65de", 1400)}
            alt="Restaurant interior seating, set for evening service"
            fill
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
          <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-gold/15" />
          <div className="absolute bottom-8 left-8 max-w-xs">
            <p className="font-display text-2xl text-ivory">
              Tables are limited. Evenings book quickly.
            </p>
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="Reservations" title="Book Your Table" />

          <div className="glass mt-10 rounded-sm p-6 sm:p-9">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold">
                  <Check size={24} className="text-obsidian" />
                </span>
                <h3 className="mt-6 font-display text-2xl text-ivory">Request Received</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone">
                  We&apos;ve received your request for {party} {party === 1 ? "guest" : "guests"} at{" "}
                  {time}. A member of our team will confirm by email within two hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-ghost mt-7"
                  type="button"
                >
                  Book Another Table
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field label="Full Name" htmlFor="name">
                    <input
                      id="name"
                      required
                      type="text"
                      placeholder="Jordan Vale"
                      className="form-input"
                    />
                  </Field>
                  <Field label="Email" htmlFor="email">
                    <input
                      id="email"
                      required
                      type="email"
                      placeholder="jordan@email.com"
                      className="form-input"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field label="Date" htmlFor="date" icon={<Calendar size={14} />}>
                    <input id="date" required type="date" className="form-input" />
                  </Field>

                  <Field label="Party Size" icon={<Users size={14} />}>
                    <div className="flex items-center justify-between rounded-sm border border-char-line bg-char-soft px-4 py-3">
                      <button
                        type="button"
                        aria-label="Decrease party size"
                        onClick={() => setParty((p) => Math.max(1, p - 1))}
                        className="text-stone transition-colors hover:text-ivory"
                      >
                        <Minus size={15} />
                      </button>
                      <span className="font-mono text-sm text-ivory">
                        {party} {party === 1 ? "Guest" : "Guests"}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase party size"
                        onClick={() => setParty((p) => Math.min(12, p + 1))}
                        className="text-stone transition-colors hover:text-ivory"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </Field>
                </div>

                <Field label="Time" icon={<Clock size={14} />}>
                  <div className="flex flex-wrap gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`rounded-sm border px-3 py-2 font-mono text-xs transition-colors ${
                          time === slot
                            ? "border-gold bg-gold text-obsidian"
                            : "border-char-line text-stone hover:border-gold/40 hover:text-ivory"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Special Requests (optional)" htmlFor="notes">
                  <textarea
                    id="notes"
                    rows={3}
                    placeholder="Anniversary, allergies, seating preference…"
                    className="form-input resize-none"
                  />
                </Field>

                <MagneticButton type="submit" variant="gold" className="w-full justify-center">
                  {loading ? "Sending…" : "Request Reservation"}
                </MagneticButton>

                <p className="text-center text-xs text-stone-dim">
                  For parties larger than 12, please call us directly.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  icon,
  children,
}: {
  label: string;
  htmlFor?: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-stone"
      >
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
