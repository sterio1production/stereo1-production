"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/site/section-heading";
import { REASONS } from "@/lib/site";

export function WhyUs() {
  return (
    <section id="why" className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why Stereo 1"
          title={<>Built around <span className="grad-text">your event</span></>}
          description="Booking event production should be the easiest part of planning your day. We keep it simple, clear and personal."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-card to-background p-7 transition-colors duration-300 hover:border-brand/40"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[7rem] font-black leading-none text-brand/10"
              >
                {reason.number}
              </span>
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
                  <reason.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-foreground">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
