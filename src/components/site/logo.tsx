import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Official Stereo 1 Production logo artwork (chrome + electric blue),
 * background removed and tuned for the dark theme.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label="Stereo 1 Production, back to top"
      className={cn("flex items-center", className)}
    >
      <Image
        src="/images/logo.png"
        alt="Stereo 1 Production"
        width={640}
        height={174}
        priority
        className="h-10 w-auto brightness-[1.18] contrast-[1.04] drop-shadow-[0_2px_10px_rgb(0_0_0/0.45)] sm:h-12"
      />
    </a>
  );
}
