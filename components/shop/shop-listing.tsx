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
 * Etsy-style listing: a square "photo" tile (the stat stands in for product
 * imagery until real photos exist), then title, rating, price and add-to-cart.
 */
export function ShopListing({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col">
      {/* "Photo" tile — links to the item page */}
      <Link
        href={`/shop/${product.id}`}
        aria-label={`View ${product.name}`}
        className="relative block aspect-square overflow-hidden border border-hairline bg-paper-dim transition-colors group-hover:border-accent"
      >
        {/* soft top-light so the tile isn't flat */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(120%_90%_at_50%_-10%,color-mix(in_oklab,var(--accent)_16%,transparent),transparent_62%)]"
        />
        <div className="relative flex h-full items-center justify-center p-4">
          <span className="font-serif text-4xl font-medium leading-none tracking-tight text-accent transition-transform duration-300 group-hover:scale-105 sm:text-5xl">
            {product.stat}
          </span>
        </div>

        {product.badge && (
          <span
            className={cn(
              "absolute left-3 top-3 px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.12em]",
              badgeClass[product.badge],
            )}
          >
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-2.5 left-3 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-muted">
          {product.sku}
        </span>
      </Link>

      {/* Meta */}
      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="font-serif text-base font-medium leading-snug tracking-tight text-ink">
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

        <p className="mt-2 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted">
          Free shipping · In stock: 1
        </p>

        <div className="mt-3 pt-1">
          <AddToCart id={product.id} />
        </div>
      </div>
    </article>
  );
}
