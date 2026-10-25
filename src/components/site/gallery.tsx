"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/site/section-heading";
import { GALLERY } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Gallery() {
  return (
    <section id="gallery" className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The rig"
          title="From setup to showtime"
          description="The gear we bring and run: line arrays tuned to the room, moving heads operated live, stages built to fit, and a clean mix for the stream."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[11rem] lg:grid-cols-4">
          {GALLERY.map((shot, i) => (
            <motion.figure
              key={shot.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "group relative flex min-h-[13rem] flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-brand/40 lg:min-h-0",
                shot.span
              )}
            >
              <div className="relative flex-1 overflow-hidden">
                <div className="photo-grade absolute inset-0">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
                />
              </div>
              <figcaption className="relative border-t border-border/70 bg-card px-4 py-3 text-xs font-medium text-muted-foreground">
                {shot.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground/80">
          Illustrative images. Ask us for photos from events we have produced.
        </p>
      </div>
    </section>
  );
}
