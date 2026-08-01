"use client";

import { useCart } from "./cart-context";
import { cn } from "@/lib/cn";

/**
 * `compact` is the grid-card size. It's a prop rather than an override class
 * because `cn` is a plain joiner, not tailwind-merge — passing `py-2` next to
 * the base `py-2.5` would leave both in the class list and let stylesheet
 * order decide the winner.
 */
export function AddToCart({
  id,
  compact = false,
  className,
}: {
  id: string;
  compact?: boolean;
  className?: string;
}) {
  const { has, toggle, hydrated } = useCart();
  const inCart = hydrated && has(id);

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={inCart}
      className={cn(
        "inline-flex w-full items-center justify-center gap-1.5 rounded-full border font-mono uppercase tracking-[0.12em] transition-colors duration-150",
        compact
          ? "px-3 py-2 text-[0.6rem]"
          : "px-4 py-2.5 text-xs tracking-[0.14em]",
        inCart
          ? "border-accent bg-transparent text-accent hover:bg-accent/10"
          : "border-accent bg-accent text-accent-ink hover:bg-transparent hover:text-accent",
        className,
      )}
    >
      {inCart ? (
        <>
          <span aria-hidden="true">✓</span> In your cart
        </>
      ) : (
        <>Add to cart</>
      )}
    </button>
  );
}
