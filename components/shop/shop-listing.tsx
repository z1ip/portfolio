import Link from "next/link";
import { AddToCart } from "./add-to-cart";
import { Stars } from "./stars";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/shop";

const badgeClass: Record<NonNullable<Product["badge"]>, string> = {
  Bestseller: "bg-accent text-accent-ink",
  "Staff pick": "bg-accent text-accent-ink",
  "New arrival": "bg-paper text-ink border border-hairline",
  "Limited stock": "bg-paper text-ink border border-hairline",
};

/**
 * A marketplace result card: photo tile, title, rating, price block, button.
 *
 * The stat stands in for product imagery — it's the most distinctive thing each
 * listing has. The price is $0.00 across the board, which is the joke, so the
 * tile has to carry the visual difference between cards.
 */
export function ShopListing({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col border border-hairline bg-paper transition-colors duration-200 hover:border-accent">
      {/* "Photo" tile — links to the item page */}
      <Link
        href={`/shop/${product.id}`}
        aria-label={`View ${product.name}`}
        className="relative block aspect-[5/4] overflow-hidden border-b border-hairline bg-paper-dim"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(120%_90%_at_50%_-10%,color-mix(in_oklab,var(--accent)_16%,transparent),transparent_62%)]"
        />
        <div className="relative flex h-full items-center justify-center p-3 sm:p-4">
          <span className="text-center font-serif text-2xl font-medium leading-none tracking-tight text-accent transition-transform duration-300 group-hover:scale-105 sm:text-3xl lg:text-4xl">
            {product.stat}
          </span>
        </div>

        {product.badge && (
          <span
            className={cn(
              "absolute left-0 top-2 px-2 py-0.5 font-mono text-[0.54rem] uppercase tracking-[0.1em]",
              badgeClass[product.badge],
            )}
          >
            {product.badge}
          </span>
        )}
      </Link>

      {/* Meta */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="font-mono text-[0.54rem] uppercase tracking-[0.12em] text-muted">
          {product.department}
        </p>

        <h3 className="mt-1.5 font-serif text-[0.95rem] font-medium leading-snug tracking-tight text-ink sm:text-base">
          <Link
            href={`/shop/${product.id}`}
            className="line-clamp-2 transition-colors hover:text-accent"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-1.5">
          <Stars rating={product.rating} reviews={product.reviews} />
        </div>

        <p className="mt-2 line-clamp-2 text-[0.8rem] leading-relaxed text-muted">
          {product.blurb}
        </p>

        {/* Price block pinned to the bottom so every card's button lines up. */}
        <div className="mt-auto pt-3">
          <p className="flex items-baseline gap-2">
            <span className="font-serif text-xl font-medium text-ink tnum">
              $0.00
            </span>
            {product.valueUsd && (
              <span className="font-mono text-[0.6rem] text-muted line-through">
                ${product.valueUsd.toLocaleString("en-US")}/yr
              </span>
            )}
          </p>
          <p className="mt-0.5 font-mono text-[0.56rem] uppercase tracking-[0.1em] text-muted">
            Free delivery · In stock: 1
          </p>

          <div className="mt-2.5">
            <AddToCart id={product.id} compact />
          </div>
        </div>
      </div>
    </article>
  );
}
