"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Equalizer } from "@/components/site/equalizer";
import { EVENT_TYPES, SITE } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const reduce = useReducedMotion();
  // Cursor-tracked stage light works on fine pointers only; touch gets the auto sweep.
  const finePointer = useSyncExternalStore(
    (onStoreChange) => {
      const query = window.matchMedia("(pointer: fine)");
      query.addEventListener("change", onStoreChange);
      return () => query.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );

  // Cursor-tracked stage light (fine pointers only; touch gets the auto sweep).
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.4);
  const springX = useSpring(mx, { stiffness: 55, damping: 18 });
  const springY = useSpring(my, { stiffness: 55, damping: 18 });
  const spotX = useTransform(springX, (v) => `${v * 100}%`);
  const spotY = useTransform(springY, (v) => `${v * 100}%`);

  const trackLight = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || !finePointer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      id="top"
      onPointerMove={trackLight}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-texture"
    >
      {/* Stage backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="photo-grade absolute inset-0">
          <Image
            src="/images/hero-stage-3e10.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(37,99,235,0.25),transparent_58%)] mix-blend-screen" />
      </div>

      {/* Stage lighting effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-[-30%] h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.16),transparent_65%)] blur-2xl" />
        {finePointer && !reduce ? (
          <motion.div
            className="absolute h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(125,211,252,0.22),rgba(56,189,248,0.10)_40%,transparent_70%)] mix-blend-screen blur-2xl"
            style={{ left: spotX, top: spotY, x: "-50%", y: "-50%" }}
          />
        ) : (
          <div className="spotlight-sweep absolute left-1/2 top-[-20%] h-[60vh] w-[55vw] -translate-x-1/2 rounded-full bg-[conic-gradient(from_180deg_at_50%_0%,transparent_40%,rgba(56,189,248,0.10)_50%,transparent_60%)] blur-3xl" />
        )}
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 pb-16 pt-32 text-center sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            <span className="live-dot h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
            {SITE.tagline}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-6 max-w-4xl font-display text-5xl font-black leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl"
        >
          Make your event{" "}
          <span className="grad-text">sound unforgettable</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Professional sound, lighting, staging and live stream audio for
          concerts, weddings, conferences and corporate events across Kampala
          and beyond.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="glow-brand h-12 w-full px-7 font-display text-base font-bold transition-transform active:scale-[0.98] sm:w-auto"
          >
            <a href="#contact">Request a quote</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 w-full border-border bg-card/60 px-7 font-display text-base font-bold backdrop-blur transition-transform active:scale-[0.98] hover:bg-secondary sm:w-auto"
          >
            <a href={SITE.phones[0].tel}>
              <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
              Call {SITE.phones[0].display}
            </a>
          </Button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-14"
        >
          <Equalizer interactive className="h-14 opacity-90" />
        </motion.div>
      </div>

      {/* Events strip at hero base */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="relative border-t border-border/60 bg-background/40 backdrop-blur-sm"
      >
        <ul className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:px-6 sm:text-sm">
          {EVENT_TYPES.map((e, i) => (
            <li key={e.label} className="flex items-center gap-2">
              {i > 0 && (
                <span className="mr-2 hidden text-brand/60 sm:inline" aria-hidden="true">
                  /
                </span>
              )}
              {e.label}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
