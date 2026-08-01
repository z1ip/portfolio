"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Metric } from "@/lib/case-studies";

function formatNumber(n: number, decimals: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

type Props = Metric & {
  /** External hover/focus signal — used only on fine (mouse) pointers. */
  run?: boolean;
  /**
   * "hover" (default): tally on hover/focus on mouse, in-view on touch.
   * "inview": always tally once when scrolled into view (used for the
   * case-study hero, where there is no row to hover).
   */
  trigger?: "hover" | "inview";
  durationMs?: number;
  className?: string;
};

/**
 * The signature interaction: the headline metric tallies up from 0 to its
 * final value.
 *  - Fine pointers (mouse): re-tallies each time `run` goes true (hover/focus).
 *  - Coarse pointers (touch): tallies once when scrolled into view.
 *  - Reduced motion: shows the final value immediately, no animation.
 * The animated digits are aria-hidden; a visually-hidden sibling always holds
 * the final value so assistive tech reads a stable, correct number.
 */
export function CountUpMetric({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  display,
  run = false,
  trigger = "hover",
  durationMs = 1100,
  className,
}: Props) {
  const finalText = display ?? `${prefix}${formatNumber(value, decimals)}${suffix}`;
  const [text, setText] = useState(finalText);
  const rafRef = useRef<number | null>(null);
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const modeRef = useRef<"hover" | "inview" | "static">("hover");

  const fmt = (n: number) => `${prefix}${formatNumber(n, decimals)}${suffix}`;

  const animate = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutExpo — fast start, gentle settle. Feels like a mechanical tally.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setText(fmt(value * eased));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setText(finalText);
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  // Decide the trigger mode once, on mount.
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      modeRef.current = "static";
      setText(finalText);
      return;
    }
    const coarse = window.matchMedia("(hover: none)").matches;
    if (trigger === "inview" || coarse) {
      modeRef.current = "inview";
      const el = rootRef.current;
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              animate();
              io.disconnect();
            }
          }
        },
        { threshold: 0.6 },
      );
      io.observe(el);
      return () => io.disconnect();
    }
    modeRef.current = "hover";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React to the external hover/focus signal (fine pointers only).
  useEffect(() => {
    if (modeRef.current !== "hover") return;
    if (run) {
      animate();
    } else {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      setText(finalText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  return (
    <span ref={rootRef} className={cn("tnum", className)}>
      <span aria-hidden="true">{text}</span>
      <span className="sr-only">{finalText}</span>
    </span>
  );
}
