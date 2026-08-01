"use client";

import { useEffect, useState } from "react";
import { useCart } from "./cart-context";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/shop";

/**
 * Sticky add-to-cart bar for small screens — the buy box scrolls away on a
 * phone, and this is what every storefront puts in its place.
 *
 * It only appears once the visitor has scrolled past the fold, so it doesn't
 * duplicate the button that's already on screen when the page loads.
 */
export function MobileBuyBar({ product }: { product: Product }) {
  const { has, toggle, hydrated, setDrawer, count } = useCart();
  const [shown, setShown] = useState(false);
  const inCart = hydrated && has(product.id);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-paper/95 backdrop-blur-sm transition-transform duration-300 ease-out lg:hidden",
        shown ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!shown}
    >
      <div className="flex items-center gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-sm leading-tight text-ink">
            {product.name}
          </p>
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted">
            $0.00 · free delivery
          </p>
        </div>

        {inCart ? (
          <button
            type="button"
            onClick={() => setDrawer(true)}
            className="shrink-0 rounded-full border border-accent px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-accent"
          >
            View cart ({count})
          </button>
        ) : (
          <button
            type="button"
            onClick={() => toggle(product.id)}
            className="shrink-0 rounded-full border border-accent bg-accent px-5 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-accent-ink transition-opacity hover:opacity-90"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
