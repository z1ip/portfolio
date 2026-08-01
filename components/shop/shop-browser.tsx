"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ShopListing } from "./shop-listing";
import {
  Facets,
  activeFilterCount,
  matchesFilters,
  type Feature,
  type RatingFloor,
  type ShopFilters,
} from "./shop-filters";
import { cn } from "@/lib/cn";
import {
  departments,
  products,
  sortLabels,
  sortProducts,
  type Department,
  type SortKey,
} from "@/lib/shop";

const SORT_KEYS: SortKey[] = ["featured", "rating", "name", "department"];

function readFilters(params: URLSearchParams): ShopFilters {
  const dept = params.get("dept");
  const rating = params.get("rating");
  const feat = (params.get("feat") ?? "")
    .split(",")
    .filter((f): f is Feature => f === "badged" || f === "casestudy");

  return {
    dept: (departments as string[]).includes(dept ?? "")
      ? (dept as Department)
      : "All",
    rating: (["4.8", "4.9", "5"].includes(rating ?? "")
      ? rating
      : "any") as RatingFloor,
    features: feat,
  };
}

/**
 * The results page: facets on the left, a sorted grid on the right.
 *
 * All of it — query, department, rating, features, sort — lives in the URL, so
 * any view of the store is a link someone can send. The mobile version trades
 * the sidebar for a sheet, which is the only way facets fit on a phone.
 */
export function ShopBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const query = params.get("q") ?? "";
  const filters = useMemo(
    () => readFilters(new URLSearchParams(params.toString())),
    [params],
  );
  const sort = (SORT_KEYS.includes(params.get("sort") as SortKey)
    ? params.get("sort")
    : "featured") as SortKey;

  const [sheetOpen, setSheetOpen] = useState(false);

  // Lock the page behind the filter sheet — otherwise the list scrolls under it.
  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheetOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [sheetOpen]);

  const setParams = useCallback(
    (updates: Record<string, string | null>) => {
      const next = new URLSearchParams(params.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") next.delete(key);
        else next.set(key, value);
      }
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const onFilterChange = useCallback(
    (next: Partial<ShopFilters>) => {
      const merged = { ...filters, ...next };
      setParams({
        dept: merged.dept === "All" ? null : merged.dept,
        rating: merged.rating === "any" ? null : merged.rating,
        feat: merged.features.length ? merged.features.join(",") : null,
      });
    },
    [filters, setParams],
  );

  const results = useMemo(
    () =>
      sortProducts(
        products.filter((p) => matchesFilters(p, filters, query)),
        sort,
      ),
    [filters, query, sort],
  );

  // Department counts ignore the department facet itself — otherwise every
  // other department would read "0" the moment you picked one.
  const counts = useMemo(() => {
    const base = { ...filters, dept: "All" as const };
    const pool = products.filter((p) => matchesFilters(p, base, query));
    const out: Record<string, number> = { All: pool.length };
    for (const d of departments) {
      out[d] = pool.filter((p) => p.department === d).length;
    }
    return out;
  }, [filters, query]);

  const activeCount = activeFilterCount(filters);

  return (
    <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[16rem_minmax(0,1fr)] xl:gap-14">
      {/* Desktop sidebar. top-24 clears the sticky header (h-16) with room to spare. */}
      <aside
        aria-label="Filter listings"
        className="hidden lg:sticky lg:top-24 lg:block lg:self-start"
      >
        <Facets filters={filters} counts={counts} onChange={onFilterChange} />
      </aside>

      <div className="min-w-0">
        {/* Results toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-3">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted">
            {results.length === 0
              ? "0 results"
              : `1–${results.length} of ${results.length} result${results.length === 1 ? "" : "s"}`}
            {query && (
              <>
                {" "}
                for <span className="text-ink">&ldquo;{query}&rdquo;</span>
              </>
            )}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="inline-flex items-center gap-2 border border-hairline px-3 py-2 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-ink transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              <span aria-hidden="true">☰</span> Filters
              {activeCount > 0 && (
                <span className="inline-flex min-w-4 items-center justify-center bg-accent px-1 text-accent-ink">
                  {activeCount}
                </span>
              )}
            </button>

            <label
              htmlFor="shop-sort"
              className="hidden font-mono text-[0.64rem] uppercase tracking-[0.12em] text-muted sm:inline"
            >
              Sort by
            </label>
            <select
              id="shop-sort"
              value={sort}
              onChange={(e) =>
                setParams({
                  sort: e.target.value === "featured" ? null : e.target.value,
                })
              }
              className="cursor-pointer border border-hairline bg-paper-dim px-2.5 py-2 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-ink transition-colors hover:border-accent focus:border-accent focus:outline-none"
            >
              {SORT_KEYS.map((k) => (
                <option key={k} value={k}>
                  {sortLabels[k]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active-filter pills — the fastest way back out of a dead end. */}
        {activeCount > 0 && (
          <ul className="mt-3 flex flex-wrap items-center gap-2">
            {filters.dept !== "All" && (
              <FilterPill
                label={filters.dept}
                onClear={() => onFilterChange({ dept: "All" })}
              />
            )}
            {filters.rating !== "any" && (
              <FilterPill
                label={`${filters.rating} ★ & up`}
                onClear={() => onFilterChange({ rating: "any" })}
              />
            )}
            {filters.features.map((f) => (
              <FilterPill
                key={f}
                label={f === "badged" ? "Bestsellers" : "Case study"}
                onClear={() =>
                  onFilterChange({
                    features: filters.features.filter((x) => x !== f),
                  })
                }
              />
            ))}
          </ul>
        )}

        {results.length > 0 ? (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4 2xl:grid-cols-5">
            {results.map((product) => (
              <ShopListing key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-12 max-w-md">
            <p className="font-serif text-2xl leading-snug text-ink-soft">
              No results{query && <> for &ldquo;{query}&rdquo;</>}.
            </p>
            <p className="mt-3 text-sm text-muted">
              Try a broader search, or clear the filters to see all{" "}
              {products.length} listings.
            </p>
            <button
              type="button"
              onClick={() =>
                setParams({ q: null, dept: null, rating: null, feat: null })
              }
              className="mt-5 border border-accent bg-accent px-4 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-accent-ink transition-opacity hover:opacity-90"
            >
              Reset the store
            </button>
          </div>
        )}
      </div>

      {/* Mobile filter sheet */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          sheetOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!sheetOpen}
      >
        <div
          onClick={() => setSheetOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/60 transition-opacity duration-300",
            sheetOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Filter listings"
          className={cn(
            "absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col border-t border-hairline bg-paper transition-transform duration-300 ease-out",
            sheetOpen ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
            <h2 className="font-serif text-lg font-medium tracking-tight text-ink">
              Filters
            </h2>
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              aria-label="Close filters"
              className="text-2xl leading-none text-muted transition-colors hover:text-accent"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <Facets
              filters={filters}
              counts={counts}
              onChange={onFilterChange}
            />
          </div>
          <div className="border-t border-hairline px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className="w-full bg-accent px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-accent-ink transition-opacity hover:opacity-90"
            >
              Show {results.length} {results.length === 1 ? "result" : "results"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function FilterPill({
  label,
  onClear,
}: {
  label: string;
  onClear: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center gap-1.5 rounded-full border border-accent px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-accent transition-colors hover:bg-accent hover:text-accent-ink"
      >
        {label}
        <span aria-hidden="true">×</span>
        <span className="sr-only">— remove this filter</span>
      </button>
    </li>
  );
}
