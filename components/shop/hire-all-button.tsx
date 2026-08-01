"use client";

import { useCart } from "./cart-context";
import { products } from "@/lib/shop";

/** "Hire the whole store" — one click adds every listing to the cart. */
export function HireAllButton() {
  const { add, setDrawer, count } = useCart();
  const allIn = count >= products.length;

  return (
    <button
      type="button"
      onClick={() => {
        products.forEach((p) => add(p.id));
        setDrawer(true);
      }}
      className="inline-flex items-center justify-center gap-2 border border-accent bg-accent px-5 py-3 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-accent-ink transition-opacity hover:opacity-90"
    >
      <span aria-hidden="true">🛒</span>
      {allIn ? "The whole store's in your cart" : "Hire the whole store"}
    </button>
  );
}
