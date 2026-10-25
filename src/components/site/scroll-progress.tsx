"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin brand-colored reading progress along the top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand-strong via-brand to-brand-soft"
      style={{ scaleX }}
    />
  );
}
