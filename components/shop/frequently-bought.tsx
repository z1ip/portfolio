"use client";

import Link from "next/link";
import { useCart } from "./cart-context";
import type { Product } from "@/lib/shop";

/**
 * The "frequently bought together" strip every marketplace runs under the fold.
 * Here it's the current listing plus two from the same department, with one
 * button that carts the set.
 */
export function FrequentlyBought({
  product,
  companions,
}: {
  product: Product;
  companions: Product[];
}) {
  const { add, has, setDrawer, hydrated } = useCart();
  const bundle = [product, ...companions];
  const allIn = hydrated && bundle.every((p) => has(p.id));

  if (companions.length === 0) return null;

  return (
    <section className="mt-14 border border-hairline bg-paper-dim p-5 sm:mt-20 sm:p-7">
      <h2 className="font-serif text-xl font-medium tracking-tight text-ink sm:text-2xl">
        Frequently bought together
      </h2>

      <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
        {/* Tiles, with the "+" separators a bundle widget always has. */}
        <ul className="flex flex-wrap items-center gap-3">
          {bundle.map((p, i) => (
            <li key={p.id} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden="true" className="text-lg text-muted">
                  +
                </span>
              )}
              <Link
                href={`/shop/${p.id}`}
                className="flex h-20 w-24 items-center justify-center border border-hairline bg-paper p-2 text-center transition-colors hover:border-accent sm:h-24 sm:w-28"
              >
                <span className="font-serif text-base leading-none text-accent sm:text-lg">
                  {p.stat}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="lg:flex-1">
          <p className="font-serif text-lg text-ink">
            Total:{" "}
            <span className="text-accent">$0.00</span>{" "}
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted">
              ({bundle.length} items)
            </span>
          </p>
          <ul className="mt-2 space-y-1">
            {bundle.map((p) => (
              <li key={p.id} className="text-sm text-ink-soft">
                <span className="text-muted">✓</span> {p.name}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => {
              bundle.forEach((p) => add(p.id));
              setDrawer(true);
            }}
            className="mt-4 w-full rounded-full border border-accent bg-accent px-5 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-accent-ink transition-opacity hover:opacity-90 sm:w-auto"
          >
            {allIn
              ? "✓ All three are in your cart"
              : `Add all ${bundle.length} to cart`}
          </button>
        </div>
      </div>
    </section>
  );
}
