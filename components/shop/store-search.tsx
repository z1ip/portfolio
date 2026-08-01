"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { departments } from "@/lib/shop";
import { cn } from "@/lib/cn";

/**
 * The header search bar — department select + query + submit, the way every
 * marketplace does it.
 *
 * The query lives in the URL (`?q=`), not in component state, so a search is
 * shareable and the back button works. The local `q` state exists only so the
 * input stays responsive while a debounced router update catches up.
 */
export function StoreSearch({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const urlQ = params.get("q") ?? "";
  const urlDept = params.get("dept") ?? "All";
  const onResults = pathname === "/shop";

  // The bar renders twice — once in the desktop row, once in the mobile row —
  // so the ids have to be unique or the <label for> pairs cross-wire.
  const uid = useId();
  const searchId = `store-search-${uid}`;
  const deptId = `store-search-dept-${uid}`;

  const [q, setQ] = useState(urlQ);
  const typing = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Re-sync the box when the URL changes from somewhere else (back button, a
  // department link, "clear filters") — but never mid-keystroke.
  useEffect(() => {
    if (!typing.current) setQ(urlQ);
  }, [urlQ]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function go(nextQ: string, nextDept: string) {
    const next = new URLSearchParams(params.toString());
    if (nextQ.trim()) next.set("q", nextQ.trim());
    else next.delete("q");
    if (nextDept !== "All") next.set("dept", nextDept);
    else next.delete("dept");

    const qs = next.toString();
    const url = qs ? `/shop?${qs}` : "/shop";
    // Already browsing? Replace, so a search doesn't stack 20 history entries.
    if (onResults) router.replace(url, { scroll: false });
    else router.push(url);
  }

  function onChange(value: string) {
    typing.current = true;
    setQ(value);
    // Live-filter only on the results page. Typing here from a product page
    // shouldn't yank you off it — that waits for submit.
    if (!onResults) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => go(value, urlDept), 250);
  }

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (timer.current) clearTimeout(timer.current);
        typing.current = false;
        go(q, urlDept);
      }}
      className={cn(
        // min-w-0 is load-bearing: as a flex child in the header this form has
        // min-width:auto by default, so it refuses to shrink below its select +
        // button and pushes the cart off the right edge around 1024px.
        "flex h-11 w-full min-w-0 items-stretch border border-hairline bg-paper-dim transition-colors focus-within:border-accent",
        className,
      )}
    >
      <label htmlFor={deptId} className="sr-only">
        Search in department
      </label>
      <select
        id={deptId}
        value={urlDept}
        onChange={(e) => go(q, e.target.value)}
        className="hidden shrink-0 cursor-pointer border-r border-hairline bg-transparent px-3 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-ink-soft focus:outline-none sm:block"
      >
        <option value="All">All</option>
        {departments.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <label htmlFor={searchId} className="sr-only">
        Search the store
      </label>
      <input
        id={searchId}
        type="search"
        value={q}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => (typing.current = false)}
        placeholder="Search the store — Amazon, tooling, certified…"
        className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink placeholder:text-muted focus:outline-none"
      />

      <button
        type="submit"
        aria-label="Search"
        className="flex shrink-0 items-center justify-center bg-accent px-4 text-accent-ink transition-opacity hover:opacity-90"
      >
        <span aria-hidden="true" className="text-base leading-none">
          ⌕
        </span>
      </button>
    </form>
  );
}
