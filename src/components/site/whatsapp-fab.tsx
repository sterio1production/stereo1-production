"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/site";

export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.25 }}
          href={buildWhatsAppUrl(
            "Hello Stereo 1 Production! I would like to ask about your services for my event."
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="glow-brand fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[linear-gradient(100deg,#2563eb_0%,#1d4ed8_100%)] p-3.5 text-primary-foreground transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
