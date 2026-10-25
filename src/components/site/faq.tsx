"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/section-heading";
import { FAQS } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Good to know"
          title="Common questions"
          description="Quick answers before you get in touch. Anything else, call or WhatsApp us directly."
        />

        <Accordion
          type="single"
          collapsible
          className="mt-10 rounded-2xl border border-border bg-card px-5 sm:px-7"
        >
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={faq.question}
              value={`faq-${i}`}
              className="border-border/70 last:border-b-0"
            >
              <AccordionTrigger className="py-5 font-display text-base font-bold text-foreground hover:text-brand hover:no-underline sm:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
