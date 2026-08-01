"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CountUpMetric } from "./count-up-metric";
import { cn } from "@/lib/cn";
import type { CaseStudyMeta } from "@/lib/case-studies";

/**
 * Square/portrait case-study card with a bold hover:
 *  - typographic mode (no cover): the card fills burnt-orange, text inverts,
 *    the card lifts, and the metric tallies up from 0.
 *  - image mode (cover present): the cover fills the card, zooms on hover with
 *    an accent wash, text stays legible over a gradient, metric still tallies.
 * Hover + keyboard focus both drive the interaction, so it's fully reachable.
 */
export function CaseStudyCard({
  study,
  index,
  coverSrc,
  variant = "standard",
  priority = false,
}: {
  study: CaseStudyMeta;
  index?: number;
  coverSrc?: string | null;
  variant?: "standard" | "wide";
  priority?: boolean;
}) {
  const [active, setActive] = useState(false);
  const kicker = study.platform + (study.type ? ` · ${study.type}` : "");
  const hasImage = Boolean(coverSrc);

  const shellBase =
    "group relative isolate flex overflow-hidden border transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out will-change-transform hover:-translate-y-1";
  const shellSkin = hasImage
    ? "border-hairline bg-paper-dim hover:border-accent hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.8)]"
    : "border-hairline bg-paper-dim hover:border-accent hover:bg-accent hover:shadow-[0_18px_50px_-20px_rgba(162,220,174,0.35)]";

  // Min-heights rather than aspect ratios. In a wide container a 4/5 card is
  // taller than the viewport, which is what made these balloon.
  const shape =
    variant === "wide"
      ? "flex-col justify-between p-7 min-h-[16rem] sm:min-h-[18rem] sm:p-9"
      : "flex-col justify-between p-6 min-h-[15rem] sm:min-h-[17rem] sm:p-7";

  // Text colors flip on hover in typographic mode; over an image they stay light.
  const c = hasImage
    ? {
        kicker: "text-ink-soft",
        title: "text-ink",
        metric: "text-ink",
        label: "text-ink-soft",
        cue: "text-ink-soft group-hover:text-accent",
      }
    : {
        kicker: "text-muted group-hover:text-accent-ink/70",
        title: "text-ink group-hover:text-accent-ink",
        metric: "text-ink group-hover:text-accent-ink",
        label: "text-muted group-hover:text-accent-ink/70",
        cue: "text-ink-soft group-hover:text-accent-ink",
      };

  return (
    <article className={variant === "wide" ? "sm:col-span-2" : undefined}>
      <Link
        href={`/work/${study.slug}`}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className={cn(shellBase, shellSkin, shape)}
      >
        {/* Cover image + legibility gradient (image mode only) */}
        {hasImage && (
          <>
            <Image
              src={coverSrc as string}
              alt=""
              fill
              priority={priority}
              sizes={
                variant === "wide"
                  ? "(min-width: 640px) 66vw, 100vw"
                  : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              }
              className="-z-10 object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/15 transition-colors duration-200 group-hover:from-accent/70"
            />
          </>
        )}

        {/* Top: kicker + index */}
        <div className="flex items-start justify-between gap-4">
          <span className={cn("eyebrow", c.kicker)}>{kicker}</span>
          {typeof index === "number" && (
            <span
              aria-hidden="true"
              className={cn(
                "font-mono text-xs tabular-nums",
                hasImage ? "text-ink-soft" : "text-muted group-hover:text-accent-ink/60",
              )}
            >
              {String(index).padStart(2, "0")}
            </span>
          )}
        </div>

        {/* Body: title (+ summary on wide) */}
        <div className={variant === "wide" ? "mt-6 max-w-lg" : "mt-4"}>
          <h3
            className={cn(
              "font-serif font-medium leading-[1.1] tracking-tight transition-colors duration-200",
              variant === "wide" ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl",
              c.title,
            )}
          >
            {study.title}
          </h3>
          {variant === "wide" && (
            <p
              className={cn(
                "mt-3 text-sm leading-relaxed transition-colors duration-200",
                hasImage ? "text-ink-soft" : "text-muted group-hover:text-accent-ink/80",
              )}
            >
              {study.summary}
            </p>
          )}
        </div>

        {/* Bottom: the metric, big */}
        <div
          className={cn(
            variant === "wide" ? "mt-8 flex items-end justify-between gap-6" : "mt-6",
          )}
        >
          <div className={variant === "wide" ? "order-2 text-right" : undefined}>
            <div
              className={cn(
                "font-serif font-medium leading-none tracking-tight transition-colors duration-200",
                variant === "wide" ? "text-5xl sm:text-6xl" : "text-[2.75rem] sm:text-5xl",
                c.metric,
              )}
            >
              <CountUpMetric {...study.metric} run={active} />
            </div>
            <span
              className={cn(
                "mt-2 block font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors duration-200",
                c.label,
              )}
            >
              {study.metric.label}
            </span>
          </div>

          <span
            className={cn(
              "mt-4 inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors duration-200",
              variant === "wide" ? "order-1 mt-0 self-end" : "",
              c.cue,
            )}
          >
            Read
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
