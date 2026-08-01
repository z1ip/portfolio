import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { AddToCart } from "@/components/shop/add-to-cart";
import { Stars } from "@/components/shop/stars";
import { ShopListing } from "@/components/shop/shop-listing";
import { getProduct, products, productsByDepartment } from "@/lib/shop";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return {};
  return {
    title: `${product.name} — The Store`,
    description: product.blurb,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const related = productsByDepartment(product.department)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-8 sm:pt-12">
      <Container>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted"
        >
          <Link href="/shop" className="transition-colors hover:text-accent">
            Store
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-ink-soft">{product.department}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
          {/* "Photo" */}
          <div className="relative flex aspect-square items-center justify-center overflow-hidden border border-hairline bg-paper-dim">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-80 bg-[radial-gradient(120%_90%_at_50%_-10%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_62%)]"
            />
            <span className="relative font-serif text-6xl font-medium tracking-tight text-accent sm:text-7xl">
              {product.stat}
            </span>
            {product.badge && (
              <span className="absolute left-4 top-4 bg-accent px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-accent-ink">
                {product.badge}
              </span>
            )}
            <span className="absolute bottom-4 left-4 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
              {product.sku}
            </span>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="eyebrow">{product.department}</p>
            <h1 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
              {product.name}
            </h1>
            <div className="mt-4">
              <Stars rating={product.rating} reviews={product.reviews} />
            </div>

            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              {product.blurb}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-hairline py-6 font-mono text-[0.66rem] uppercase tracking-[0.12em]">
              <div>
                <dt className="text-muted">Value</dt>
                <dd className="mt-1 font-serif text-2xl text-accent tracking-normal normal-case">
                  {product.stat}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Availability</dt>
                <dd className="mt-1 text-ink">In stock: 1</dd>
              </div>
              <div>
                <dt className="text-muted">Shipping</dt>
                <dd className="mt-1 text-ink">Free · worldwide (remote)</dd>
              </div>
              <div>
                <dt className="text-muted">Returns</dt>
                <dd className="mt-1 text-ink">None — he sticks around</dd>
              </div>
            </dl>

            <div className="mt-8 max-w-sm">
              <AddToCart id={product.id} />
            </div>

            {product.href && (
              <Link
                href={product.href}
                className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-accent transition-colors hover:text-ink"
              >
                Read the full case study
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="eyebrow">
              <span className="text-accent">/</span> More from {product.department}
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ShopListing key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-20 border-t border-hairline pt-8">
          <Link
            href="/shop"
            className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-accent"
          >
            ← Back to the store
          </Link>
        </div>
      </Container>
      <p className="sr-only">Contact {site.name} at {site.email}</p>
    </div>
  );
}
