"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Plus } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { useToast } from "@/hooks/use-toast";
import { useQuoteStore } from "@/lib/quote-store";
import { scrollToId } from "@/lib/utils";
import { SERVICES, SERVICE_DETAILS } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Services() {
  const [open, setOpen] = useState<string | null>(SERVICES[0].title);
  const { services, toggleService } = useQuoteStore();
  const { toast } = useToast();

  const handleToggle = (title: string) => {
    const adding = !services.includes(title);
    toggleService(title);
    if (adding) {
      toast({
        title: "Added to your quote",
        description: `${title} will be included when you send your request.`,
      });
    }
  };

  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What we do"
          title={<>Everything your event <span className="grad-text">needs</span></>}
          description="One team to bring the equipment, set it up, run it and pack it away, so you can focus on your guests. Open a card for details, then add what you need straight to your quote."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const isOpen = open === service.title;
            const selected = services.includes(service.title);
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: (i % 3) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_8px_40px_-8px_rgba(37,99,235,0.28)]",
                  selected ? "border-brand/60" : "border-border"
                )}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand/0 blur-2xl transition-colors duration-300 group-hover:bg-brand/15"
                />

                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : service.title)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-3 p-6 pb-0 text-left"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand transition-all duration-300 group-hover:border-brand/50 group-hover:bg-brand/20">
                    <service.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "mt-2 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                      isOpen && "rotate-180 text-brand"
                    )}
                  />
                </button>

                <h3 className="mt-5 px-6 font-display text-xl font-bold tracking-tight text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 px-6 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-4 space-y-2 px-6">
                        {(SERVICE_DETAILS[service.title] ?? []).map((line) => (
                          <li
                            key={line}
                            className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                          >
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                              aria-hidden="true"
                            />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-auto px-6 pb-6 pt-5">
                  <button
                    type="button"
                    onClick={() => handleToggle(service.title)}
                    aria-pressed={selected}
                    className={cn(
                      "inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border font-display text-sm font-bold transition-all active:scale-[0.98]",
                      selected
                        ? "border-brand/60 bg-brand/15 text-brand"
                        : "border-border bg-secondary/60 text-foreground hover:border-brand/40 hover:text-brand"
                    )}
                  >
                    {selected ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" />
                        In your quote
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" aria-hidden="true" />
                        Add to quote
                      </>
                    )}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {services.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-col items-center justify-between gap-3 rounded-2xl border border-brand/30 bg-brand/10 px-5 py-4 sm:flex-row"
          >
            <p className="text-sm font-medium text-foreground">
              <span className="font-display text-base font-bold text-brand">
                {services.length}
              </span>{" "}
              {services.length === 1 ? "service" : "services"} in your quote
            </p>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="font-display text-sm font-bold text-brand underline-offset-4 hover:underline"
            >
              Review and send it →
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
