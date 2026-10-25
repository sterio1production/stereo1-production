"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const BAR_HEIGHTS = [
  0.35, 0.7, 0.45, 0.95, 0.6, 0.8, 0.4, 1.0, 0.55, 0.75, 0.3, 0.85, 0.5, 0.65,
  0.9, 0.42, 0.72, 0.58,
];

const DURATIONS = [
  0.9, 1.15, 0.8, 1.3, 1.0, 1.2, 0.85, 1.35, 0.95, 1.1, 0.8, 1.25, 0.9, 1.05,
  1.3, 0.85, 1.15, 1.0,
];

/**
 * Animated equalizer bars: pure CSS animation.
 * With `interactive`, hovering raises the energy and clicking
 * fires a beat-drop wave across the bars.
 */
export function Equalizer({
  className,
  interactive = false,
}: {
  className?: string;
  interactive?: boolean;
}) {
  const [grooving, setGrooving] = useState(false);
  const [drop, setDrop] = useState(false);
  const dropTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDrop = useCallback(() => {
    if (dropTimer.current) clearTimeout(dropTimer.current);
    setDrop(false);
    // Restart the wave from bar one on every click.
    requestAnimationFrame(() => {
      setDrop(true);
      dropTimer.current = setTimeout(() => setDrop(false), 1200);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (dropTimer.current) clearTimeout(dropTimer.current);
    };
  }, []);

  return (
    <div
      className={cn(
        "flex h-16 items-end gap-1.5 sm:gap-2",
        interactive &&
          "eq-interactive cursor-pointer select-none rounded-xl p-1 -m-1",
        className
      )}
      data-energy={grooving ? "grooving" : "idle"}
      data-drop={drop ? "true" : "false"}
      onPointerEnter={interactive ? () => setGrooving(true) : undefined}
      onPointerLeave={interactive ? () => setGrooving(false) : undefined}
      onClick={interactive ? handleDrop : undefined}
      role={interactive ? "button" : undefined}
      aria-hidden={!interactive}
      aria-label={interactive ? "Drop the beat" : undefined}
      title={interactive ? "Tap for the drop" : undefined}
    >
      {BAR_HEIGHTS.map((h, i) => (
        <span
          key={i}
          className="eq-bar w-1.5 rounded-full bg-gradient-to-t from-brand/25 via-brand to-brand-soft sm:w-2"
          style={
            {
              height: `${h * 100}%`,
              "--eq-dur": `${DURATIONS[i]}s`,
              animationDelay: `${(i % 6) * 0.12}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
