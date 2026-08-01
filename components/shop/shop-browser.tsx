"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ShopListing } from "./shop-listing";
import { cn } from "@/lib/cn";
import { departments, products, type Department } from "@/lib/shop";

type Filter = "All" | Department;

function asFilter(value: string | null): Filter | null {
  if (!value) return null;
  return (departments as string[]).includes(value) ? (value as Department) : null;
}

export function ShopBrowser() {
  const searchParams = useSearchParams();
  const deptParam = asFilter(searchParams.get("dept"));

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>(deptParam ?? "All");

  // Sync the filter when the ?dept= query changes (e.g. header dept links).
  useEffect(() => {
    if (deptParam) setFilter(deptParam);
  }, [deptParam]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesDept = filter === "All" || p.department === filter;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.blurb.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q);
      return matchesDept && matchesQuery;
    });
  }, [query, filter]);

  const chips: Filter[] = ["All", ...departments];

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        >
          ⌕
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the shop — try “Amazon”, “tooling”, “certified”…"
          aria-label="Search products"
          className="w-full border border-hairline bg-paper-dim py-3.5 pl-11 pr-4 text-ink placeholder:text-muted focus:border-accent focus:outline-none"
        />
      </div>

      {/* Category chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {chips.map((c) => {
          const active = c === filter;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] transition-colors",
                active
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-hairline text-ink-soft hover:border-ink hover:text-ink",
              )}
            >
              {c}
            </button>
          );
        })}
      </div>

      <p className="mt-5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
        {results.length} {results.length === 1 ? "listing" : "listings"}
        {filter !== "All" && ` in ${filter}`}
      </p>

      {/* Listings grid */}
      {results.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((product) => (
            <ShopListing key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-12 font-serif text-2xl text-ink-soft">
          No listings match “{query}”. Try another search.
        </p>
      )}
    </div>
  );
}
