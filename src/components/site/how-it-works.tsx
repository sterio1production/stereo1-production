"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessagesSquare, ReceiptText, Speaker } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { scrollToId } from "@/lib/utils";
import { HOW_IT_WORKS } from "@/lib/site";
import { cn } from "@/lib/utils";

const ICONS = {
  messages: MessagesSquare,
  receipt: ReceiptText,
  speaker: Speaker,
} as const;

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const step = HOW_IT_WORKS[active];

  return (
    <section id="how" className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps, zero stress"
          description="Booking event production should be the easiest part of planning your day. Tap through the journey."
        />

        {/* Stepper */}
        <div className="relative mt-14">
          {/* connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden h-px bg-border sm:block"
          >
            <motion.div
              className="h-full bg-brand"
              initial={false}
              animate={{ width: `${(active / (HOW_IT_WORKS.length - 1)) * 100}%` }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <ol className="relative grid gap-6 sm:grid-cols-3">
            {HOW_IT_WORKS.map((item, i) => {
              const Icon = ICONS[item.icon];
              const selected = active === i;
              const done = i < active;
              return (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={selected}
                    className="group flex w-full flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:text-left"
                  >
                    <span
                      className={cn(
                        "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 font-display text-sm font-black transition-all duration-300 active:scale-95",
                        selected
                          ? "glow-brand border-primary bg-primary text-primary-foreground"
                          : done
                            ? "border-brand/60 bg-brand/15 text-brand"
                            : "border-border bg-card text-muted-foreground group-hover:border-brand/40"
                      )}
                    >
                      {i + 1}
                      <span
                        className={cn(
                          "absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-brand transition-colors",
                          selected && "border-brand/50"
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </span>
                    <span className="max-w-[16rem]">
                      <span
                        className={cn(
                          "block font-display text-base font-bold transition-colors sm:text-lg",
                          selected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                        )}
                      >
                        {item.title}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Active step detail */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-2xl border border-border bg-card px-6 py-7 text-center sm:px-10"
            >
              <span className="rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                {step?.hint}
              </span>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {step?.description}
              </p>
              {active === 0 && (
                <button
                  type="button"
                  onClick={() => scrollToId("contact")}
                  className="font-display text-sm font-bold text-brand underline-offset-4 hover:underline"
                >
                  Start with the quote builder →
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
