"use client";

import Link from "next/link";
import { useCart } from "./cart-context";
import { Container } from "@/components/container";
import { ViewSwitch } from "@/components/view-switch";
import { ThemeToggle } from "@/components/theme-toggle";

const depts = [
  "Results",
  "Operations",
  "Creative",
  "Tooling",
  "The Person",
] as const;

export function StoreHeader() {
  const { count, hydrated, setDrawer } = useCart();

  return (
    <>
      {/* Marquee-ish utility bar — leaning into the storefront bit */}
      <div className="border-b border-hairline bg-accent text-accent-ink">
        <Container className="flex items-center justify-center gap-x-6 gap-y-1 py-1.5 text-center font-mono text-[0.62rem] uppercase tracking-[0.14em] sm:justify-between">
          <span>✦ Free shipping worldwide — remote-ready</span>
          <span className="hidden sm:inline">In stock: 1 · open to relocation</span>
          <span className="hidden sm:inline">No returns — he sticks around</span>
        </Container>
      </div>

      <header className="sticky top-0 z-40 border-b border-hairline bg-paper/85 backdrop-blur-sm">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link href="/shop" className="group flex items-baseline gap-2">
            <span className="font-serif text-lg font-medium tracking-tight text-ink transition-colors group-hover:text-accent">
              The Michael Blakely Store
            </span>
          </Link>

          <nav aria-label="Departments" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {depts.map((d) => (
                <li key={d}>
                  <Link
                    href={{ pathname: "/shop", query: { dept: d } }}
                    className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-accent"
                  >
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <ViewSwitch />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="relative inline-flex items-center gap-2 border border-hairline px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-accent hover:text-accent"
              aria-label={`Open cart${hydrated && count ? `, ${count} items` : ""}`}
            >
              <span aria-hidden="true">🛒</span> Cart
              {hydrated && count > 0 && (
                <span className="ml-1 inline-flex min-w-5 items-center justify-center bg-accent px-1.5 font-mono text-[0.68rem] text-accent-ink">
                  {count}
                </span>
              )}
            </button>
          </div>
        </Container>
      </header>
    </>
  );
}
