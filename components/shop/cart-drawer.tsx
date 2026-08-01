"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./cart-context";
import { cn } from "@/lib/cn";

export function CartDrawer() {
  const { items, count, value, drawerOpen, setDrawer, remove, clear } =
    useCart();

  // Close on Escape.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, setDrawer]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        drawerOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!drawerOpen}
    >
      {/* Backdrop */}
      <div
        onClick={() => setDrawer(false)}
        className={cn(
          "absolute inset-0 bg-black/60 transition-opacity duration-300",
          drawerOpen ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-hairline bg-paper transition-transform duration-300 ease-out sm:w-[26rem]",
          drawerOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
          <div>
            <h2 className="font-serif text-xl font-medium tracking-tight text-ink">
              Your case for hiring Michael
            </h2>
            <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
              {count} {count === 1 ? "reason" : "reasons"} added
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDrawer(false)}
            aria-label="Close cart"
            className="text-2xl leading-none text-muted transition-colors hover:text-accent"
          >
            ×
          </button>
        </div>

        {count === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-serif text-2xl leading-snug text-ink-soft">
              Your cart&apos;s empty.
            </p>
            <p className="max-w-xs text-sm text-muted">
              Browse the aisles and add the reasons that matter to you — you can
              email the list to yourself at checkout.
            </p>
            <button
              type="button"
              onClick={() => setDrawer(false)}
              className="font-mono text-xs uppercase tracking-[0.14em] text-accent underline decoration-hairline underline-offset-4 hover:decoration-accent"
            >
              Keep shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-hairline overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.id} className="flex items-start gap-4 py-4">
                  <span className="min-w-[3.5rem] font-serif text-2xl font-medium leading-none text-accent">
                    {item.stat}
                  </span>
                  <div className="flex-1">
                    <p className="font-serif text-base leading-snug text-ink">
                      {item.name}
                    </p>
                    <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                      {item.sku}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-t border-hairline px-6 py-5">
              {value > 0 && (
                <div className="mb-4 flex items-baseline justify-between">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                    Est. annual value
                  </span>
                  <span className="font-serif text-2xl font-medium text-ink tnum">
                    ${value.toLocaleString("en-US")}
                    <span className="ml-1 text-sm text-muted">/yr</span>
                  </span>
                </div>
              )}
              <Link
                href="/shop/checkout"
                onClick={() => setDrawer(false)}
                className="flex w-full items-center justify-center gap-2 bg-accent px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-accent-ink transition-opacity hover:opacity-90"
              >
                Checkout — email me this
                <span aria-hidden="true">→</span>
              </Link>
              <button
                type="button"
                onClick={clear}
                className="mt-3 w-full text-center font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
