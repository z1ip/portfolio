"use client";

import Link from "next/link";
import { useState } from "react";
import { CountUpMetric } from "./count-up-metric";
import { cn } from "@/lib/cn";
import type { CaseStudyMeta } from "@/lib/case-studies";

/**
 * Full-width editorial row. The headline metric tallies up on hover/focus.
 * The whole row is a single link; hover + keyboard focus both drive the
 * count-up (see CountUpMetric), so the interaction is fully keyboard-reachable.
 */
export function CaseStudyRow({
  study,
  index,
}: {
  study: CaseStudyMeta;
  index?: number;
}) {
  const [active, setActive] = useState(false);

  const kicker =
    study.platform +
    (study.type ? ` · ${study.type}` : "");

  return (
    <article className="border-t border-hairline last:border-b">
      <Link
        href={`/work/${study.slug}`}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className="group grid grid-cols-1 items-baseline gap-x-8 gap-y-4 py-8 transition-colors duration-200 hover:bg-paper-dim sm:grid-cols-[auto_1fr_auto] sm:py-10"
      >
        {typeof index === "number" && (
          <span
            aria-hidden="true"
            className="hidden font-serif text-sm text-muted tabular-nums transition-colors duration-200 group-hover:text-accent sm:block sm:pt-2"
          >
            {String(index).padStart(2, "0")}
          </span>
        )}

        <div className={cn(typeof index === "number" ? "" : "sm:col-start-1")}>
          <p className="eyebrow">{kicker}</p>
          <h3 className="mt-2 max-w-xl font-serif text-2xl font-medium leading-tight tracking-tight text-ink transition-colors duration-200 group-hover:text-accent sm:text-3xl">
            {study.title}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
            {study.summary}
          </p>
          {/* Persistent, subtle click cue — turns accent on hover/focus. */}
          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted transition-colors duration-200 group-hover:text-accent">
            Read case study
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>

        <div className="flex flex-col sm:items-end sm:text-right">
          <span className="font-serif text-5xl font-medium leading-none tracking-tight text-ink sm:text-6xl">
            <CountUpMetric {...study.metric} run={active} />
          </span>
          <span className="mt-3 text-xs uppercase tracking-[0.14em] text-muted">
            {study.metric.label}
          </span>
        </div>
      </Link>
    </article>
  );
}
