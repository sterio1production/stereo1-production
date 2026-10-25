"use client";

import Image from "next/image";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card/50">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <a href="#top" aria-label="Stereo 1 Production" className="inline-flex">
              <Image
                src="/images/logo.png"
                alt="Stereo 1 Production"
                width={640}
                height={174}
                className="h-16 w-auto brightness-[1.12] contrast-[1.03] drop-shadow-[0_2px_12px_rgb(0_0_0/0.5)] sm:h-20"
              />
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Professional Sound • Lighting • Staging • Live stream audio •
              Event production
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © 2026 Stereo 1 Production. Munyonyo, Kampala, Uganda.
          </p>
          <p>
            {SITE.phones[0].display} · {SITE.phones[1].display} ·{" "}
            {SITE.phones[2].display}
          </p>
        </div>
      </div>
    </footer>
  );
}
