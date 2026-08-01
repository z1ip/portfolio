import Link from "next/link";
import { AddToCart } from "./add-to-cart";
import { Stars } from "./stars";
import type { Product } from "@/lib/shop";

const badgeClass: Record<NonNullable<Product["badge"]>, string> = {
  Bestseller: "bg-accent text-accent-ink",
  "Staff pick": "bg-accent text-accent-ink",
  "New arrival": "border border-accent text-accent",
  "Limited stock": "border border-accent text-accent",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col border border-hairline bg-paper-dim p-5 transition-colors duration-200 hover:border-accent/60 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
          {product.sku}
        </span>
        {product.badge && (
          <span
            className={`font-mono text-[0.6rem] uppercase tracking-[0.12em] px-2 py-0.5 ${badgeClass[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Stat, sitting where a price would be */}
      <p className="mt-5 font-serif text-4xl font-medium leading-none tracking-tight text-accent sm:text-5xl">
        {product.stat}
      </p>

      <h3 className="mt-4 font-serif text-xl font-medium leading-snug tracking-tight text-ink">
        {product.href ? (
          <Link
            href={product.href}
            className="transition-colors hover:text-accent"
          >
            {product.name}
            <span aria-hidden="true"> ↗</span>
          </Link>
        ) : (
          product.name
        )}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
        {product.blurb}
      </p>

      <div className="mt-4">
        <Stars rating={product.rating} reviews={product.reviews} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-hairline pt-4">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
          In stock: 1
        </span>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
          Ships worldwide
        </span>
      </div>

      <div className="mt-4">
        <AddToCart id={product.id} />
      </div>
    </article>
  );
}
