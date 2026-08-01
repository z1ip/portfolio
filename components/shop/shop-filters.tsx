"use client";

import { cn } from "@/lib/cn";
import { departments, type Department, type Product } from "@/lib/shop";

export type RatingFloor = "any" | "4.8" | "4.9" | "5";
export type Feature = "badged" | "casestudy";

export type ShopFilters = {
  dept: "All" | Department;
  rating: RatingFloor;
  features: Feature[];
};

export const RATING_FLOORS: { key: RatingFloor; label: string }[] = [
  { key: "any", label: "Any rating" },
  { key: "4.8", label: "4.8 & up" },
  { key: "4.9", label: "4.9 & up" },
  { key: "5", label: "5.0 only" },
];

export const FEATURES: { key: Feature; label: string }[] = [
  { key: "badged", label: "Bestsellers & staff picks" },
  { key: "casestudy", label: "Includes a case study" },
];

export function matchesFilters(
  p: Product,
  f: ShopFilters,
  query: string,
): boolean {
  if (f.dept !== "All" && p.department !== f.dept) return false;
  if (f.rating !== "any" && p.rating < Number(f.rating)) return false;
  if (f.features.includes("badged") && !p.badge) return false;
  if (f.features.includes("casestudy") && !p.href) return false;

  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    p.name.toLowerCase().includes(q) ||
    p.blurb.toLowerCase().includes(q) ||
    p.department.toLowerCase().includes(q) ||
    p.stat.toLowerCase().includes(q) ||
    p.sku.toLowerCase().includes(q)
  );
}

export function activeFilterCount(f: ShopFilters): number {
  return (
    (f.dept !== "All" ? 1 : 0) +
    (f.rating !== "any" ? 1 : 0) +
    f.features.length
  );
}

const GROUP = "font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted";
const ROW =
  "flex w-full items-center gap-2.5 py-1.5 text-left text-sm transition-colors";

/**
 * The facet list. Rendered twice — in the desktop sidebar and inside the
 * mobile filter sheet — so the two can never drift apart.
 */
export function Facets({
  filters,
  counts,
  onChange,
}: {
  filters: ShopFilters;
  /** Listing count per department, for the "(4)" suffixes. */
  counts: Record<string, number>;
  onChange: (next: Partial<ShopFilters>) => void;
}) {
  const active = activeFilterCount(filters);

  return (
    <div className="space-y-7">
      <section>
        <h3 className={GROUP}>Department</h3>
        <ul className="mt-2.5">
          {(["All", ...departments] as const).map((d) => {
            const on = filters.dept === d;
            return (
              <li key={d}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => onChange({ dept: d })}
                  className={cn(
                    ROW,
                    on ? "text-accent" : "text-ink-soft hover:text-ink",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "inline-block h-3 w-3 shrink-0 rounded-full border",
                      on ? "border-accent bg-accent" : "border-hairline",
                    )}
                  />
                  <span className="min-w-0 flex-1 truncate">
                    {d === "All" ? "All departments" : d}
                  </span>
                  <span className="shrink-0 font-mono text-[0.62rem] text-muted">
                    {counts[d] ?? 0}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h3 className={GROUP}>Avg. customer review</h3>
        <ul className="mt-2.5">
          {RATING_FLOORS.map(({ key, label }) => {
            const on = filters.rating === key;
            return (
              <li key={key}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => onChange({ rating: key })}
                  className={cn(
                    ROW,
                    on ? "text-accent" : "text-ink-soft hover:text-ink",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "inline-block h-3 w-3 shrink-0 rounded-full border",
                      on ? "border-accent bg-accent" : "border-hairline",
                    )}
                  />
                  <span className="flex-1">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h3 className={GROUP}>Features</h3>
        <ul className="mt-2.5">
          {FEATURES.map(({ key, label }) => {
            const on = filters.features.includes(key);
            return (
              <li key={key}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() =>
                    onChange({
                      features: on
                        ? filters.features.filter((x) => x !== key)
                        : [...filters.features, key],
                    })
                  }
                  className={cn(
                    ROW,
                    on ? "text-accent" : "text-ink-soft hover:text-ink",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center border text-[0.6rem] leading-none",
                      on
                        ? "border-accent bg-accent text-accent-ink"
                        : "border-hairline",
                    )}
                  >
                    {on ? "✓" : ""}
                  </span>
                  <span className="flex-1">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {active > 0 && (
        <button
          type="button"
          onClick={() =>
            onChange({ dept: "All", rating: "any", features: [] })
          }
          className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-accent underline decoration-hairline underline-offset-4 hover:decoration-accent"
        >
          Clear all filters ({active})
        </button>
      )}
    </div>
  );
}
