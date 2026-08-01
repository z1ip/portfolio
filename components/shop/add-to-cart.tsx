"use client";

import { useCart } from "./cart-context";
import { cn } from "@/lib/cn";

export function AddToCart({
  id,
  className,
}: {
  id: string;
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
        "inline-flex w-full items-center justify-center gap-2 border px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-150",
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
