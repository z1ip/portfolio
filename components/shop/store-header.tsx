"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "./cart-context";
import { StoreSearch } from "./store-search";
import { Container } from "@/components/container";
import { ViewSwitch } from "@/components/view-switch";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/cn";
import { departments } from "@/lib/shop";

/**
 * Marketplace-style header, three tiers:
 *   1. utility strip (scrolls away)
 *   2. sticky bar — wordmark, search, cart
 *   3. department nav — horizontally scrollable so it survives a phone
 *
 * On mobile the search drops to its own row inside the sticky bar, which is
 * exactly the tradeoff every storefront makes: search is the primary action,
 * so it earns the vertical space.
 */
export function StoreHeader() {
  return (
    <>
      {/* Utility strip. Scrolls sideways on a phone rather than wrapping into
          three cramped lines. */}
      <div className="border-b border-hairline bg-accent text-accent-ink">
        <Container className="flex items-center gap-x-6 overflow-x-auto whitespace-nowrap py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] [scrollbar-width:none] sm:justify-between">
          <span>✦ Free shipping worldwide — remote-ready</span>
          <span className="hidden sm:inline">In stock: 1 · open to relocation</span>
          <span className="hidden lg:inline">No returns — he sticks around</span>
        </Container>
      </div>

      <header className="sticky top-0 z-40 border-b border-hairline bg-paper/90 backdrop-blur-sm">
        <Container className="flex h-14 items-center justify-between gap-3 sm:h-16 sm:gap-5">
          <Link href="/shop" className="group shrink-0">
            {/* The full name doesn't fit beside the switch and cart until lg. */}
            <span className="font-serif text-base font-medium tracking-tight text-ink transition-colors group-hover:text-accent lg:hidden">
              MB Store
            </span>
            <span className="hidden font-serif text-lg font-medium tracking-tight text-ink transition-colors group-hover:text-accent lg:inline">
              The Michael Blakely Store
            </span>
          </Link>

          <Suspense fallback={<div className="hidden h-11 flex-1 lg:block" />}>
            <StoreSearch className="hidden max-w-2xl flex-1 lg:flex" />
          </Suspense>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ViewSwitch />
            <ThemeToggle />
            <CartButton />
          </div>
        </Container>

        {/* Small-screen search row — part of the sticky bar so it stays reachable. */}
        <Container className="pb-2.5 lg:hidden">
          <Suspense fallback={<div className="h-11" />}>
            <StoreSearch />
          </Suspense>
        </Container>
      </header>

      <Suspense fallback={<div className="h-11 border-b border-hairline" />}>
        <DeptNav />
      </Suspense>
    </>
  );
}

function CartButton() {
  const { count, hydrated, setDrawer } = useCart();

  return (
    <button
      type="button"
      onClick={() => setDrawer(true)}
      className="relative inline-flex items-center gap-2 border border-hairline px-2.5 py-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-accent hover:text-accent sm:px-3"
      aria-label={`Open cart${hydrated && count ? `, ${count} items` : ""}`}
    >
      <span aria-hidden="true">🛒</span>
      <span className="hidden sm:inline">Cart</span>
      {hydrated && count > 0 && (
        <span className="inline-flex min-w-5 items-center justify-center bg-accent px-1.5 font-mono text-[0.66rem] text-accent-ink">
          {count}
        </span>
      )}
    </button>
  );
}

function DeptNav() {
  const params = useSearchParams();
  const active = params.get("dept");

  const link =
    "inline-block whitespace-nowrap py-2.5 font-mono text-[0.64rem] uppercase tracking-[0.14em] transition-colors";

  return (
    <nav
      aria-label="Departments"
      className="border-b border-hairline bg-paper-dim"
    >
      {/* overflow-x-auto, not flex-wrap: a wrapped nav on a phone pushes the
          whole page down before the visitor has seen anything. */}
      <Container className="flex items-center gap-5 overflow-x-auto [scrollbar-width:none] sm:gap-7">
        <Link
          href="/shop"
          className={cn(
            link,
            !active
              ? "text-accent"
              : "text-ink-soft hover:text-accent",
          )}
        >
          All departments
        </Link>
        {departments.map((d) => (
          <Link
            key={d}
            href={{ pathname: "/shop", query: { dept: d } }}
            className={cn(
              link,
              active === d ? "text-accent" : "text-ink-soft hover:text-accent",
            )}
          >
            {d}
          </Link>
        ))}
      </Container>
    </nav>
  );
}
