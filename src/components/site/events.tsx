"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { useToast } from "@/hooks/use-toast";
import { useQuoteStore } from "@/lib/quote-store";
import { scrollToId } from "@/lib/utils";
import { EVENT_DETAILS, EVENT_TYPES } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Events() {
  const [active, setActive] = useState(EVENT_TYPES[0].label);
  const setEventType = useQuoteStore((s) => s.setEventType);
  const { toast } = useToast();
  const detail = EVENT_DETAILS[active];

  const planThis = () => {
    setEventType(active);
    toast({
      title: "Event type set",
      description: `${active} is pre-filled in your quote below.`,
    });
    scrollToId("contact");
  };

  return (
    <section id="events" className="relative py-20 sm:py-28">
      {/* subtle stage glow on the section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_bottom,rgba(56,189,248,0.07),transparent_60%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Events we cover"
          title={<>Big stage or <span className="grad-text">small room</span></>}
          description="From a packed concert to a quiet corporate briefing, we set up the right gear for the occasion. Pick yours to see what we would bring."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {/* Selector */}
          <div
            role="group"
            aria-label="Event types"
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {EVENT_TYPES.map((event, i) => {
              const selected = active === event.label;
              return (
                <motion.button
                  key={event.label}
                  type="button"
                  aria-pressed={selected}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => setActive(event.label)}
                  className={cn(
                    "group flex min-w-[11rem] shrink-0 snap-start items-center gap-3.5 rounded-2xl border px-4 py-4 text-left transition-all duration-300 active:scale-[0.98] lg:min-w-0",
                    selected
                      ? "border-brand/60 bg-brand/10 shadow-[0_0_24px_-6px_rgba(37,99,235,0.4)]"
                      : "border-border bg-card/70 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-card"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                      selected
                        ? "border-brand/50 bg-brand/20 text-brand"
                        : "border-brand/25 bg-brand/10 text-brand/80 group-hover:text-brand"
                    )}
                  >
                    <event.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-sm font-bold text-foreground sm:text-base">
                      {event.label}
                    </span>
                    <span className="mt-0.5 hidden text-xs text-muted-foreground sm:block">
                      {event.blurb}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-8" aria-live="polite">
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.14),transparent_70%)]"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex h-full flex-col"
                >
                  <p className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                    {active}
                  </p>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {detail?.intro}
                  </p>

                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {(detail?.includes ?? []).map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-secondary/40 px-3.5 py-3 text-sm leading-snug text-foreground"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        {line}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={planThis}
                      className="glow-brand inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(100deg,#2563eb_0%,#1d4ed8_100%)] px-5 font-display text-sm font-bold text-primary-foreground transition-transform active:scale-[0.98]"
                    >
                      Plan this event
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <p className="text-xs text-muted-foreground">
                      Pre-fills the quote builder below with{" "}
                      <span className="font-semibold text-foreground">
                        {active}
                      </span>
                      .
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
