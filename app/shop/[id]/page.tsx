import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { AddToCart } from "@/components/shop/add-to-cart";
import { Stars } from "@/components/shop/stars";
import { ShopListing } from "@/components/shop/shop-listing";
import { FrequentlyBought } from "@/components/shop/frequently-bought";
import { MobileBuyBar } from "@/components/shop/mobile-buy-bar";
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

  const sameDept = productsByDepartment(product.department).filter(
    (p) => p.id !== product.id,
  );
  const companions = sameDept.slice(0, 2);
  const related = sameDept.slice(0, 4);

  return (
    // pb clears the sticky mobile buy bar.
    <div className="pb-24 pt-6 sm:pt-10 lg:pb-16">
      <Container>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted"
        >
          <Link href="/shop" className="transition-colors hover:text-accent">
            Store
          </Link>
          <span className="mx-2" aria-hidden="true">
            ›
          </span>
          <Link
            href={{ pathname: "/shop", query: { dept: product.department } }}
            className="transition-colors hover:text-accent"
          >
            {product.department}
          </Link>
          <span className="mx-2" aria-hidden="true">
            ›
          </span>
          <span className="text-ink-soft">{product.name}</span>
        </nav>

        {/*
          Marketplace product layout: gallery | details | buy box.
          Below xl the buy box drops to a full-width row under the details —
          three columns in ~1000px would squeeze all of them.
        */}
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)_19rem] xl:gap-12">
          {/* "Photo" */}
          <div className="relative flex aspect-[5/4] items-center justify-center overflow-hidden border border-hairline bg-paper-dim sm:aspect-square lg:self-start">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-80 bg-[radial-gradient(120%_90%_at_50%_-10%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_62%)]"
            />
            <span className="relative px-6 text-center font-serif text-4xl font-medium tracking-tight text-accent sm:text-6xl xl:text-7xl">
              {product.stat}
            </span>
            {product.badge && (
              <span className="absolute left-0 top-4 bg-accent px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-accent-ink">
                {product.badge}
              </span>
            )}
            <span className="absolute bottom-3 left-4 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-muted">
              {product.sku}
            </span>
          </div>

          {/* Details */}
          <div className="flex min-w-0 flex-col">
            <h1 className="font-serif text-2xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Stars rating={product.rating} reviews={product.reviews} />
              <Link
                href={{ pathname: "/shop", query: { dept: product.department } }}
                className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-accent transition-opacity hover:opacity-80"
              >
                More in {product.department}
              </Link>
            </div>

            <div className="mt-4 border-y border-hairline py-4">
              <p className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-medium text-ink tnum">
                  $0.00
                </span>
                {product.valueUsd && (
                  <span className="font-mono text-xs text-muted line-through">
                    ${product.valueUsd.toLocaleString("en-US")}/yr
                  </span>
                )}
              </p>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                Free delivery · remote-ready
              </p>
            </div>

            <div className="mt-6">
              <h2 className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                About this item
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft sm:text-lg">
                {product.blurb}
              </p>
            </div>

            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-hairline pt-6 font-mono text-[0.62rem] uppercase tracking-[0.12em] sm:grid-cols-4 xl:grid-cols-2">
              <Spec label="Headline">
                <span className="font-serif text-xl normal-case tracking-normal text-accent">
                  {product.stat}
                </span>
              </Spec>
              <Spec label="Department">{product.department}</Spec>
              <Spec label="Item no.">{product.sku}</Spec>
              <Spec label="Returns">None — he sticks around</Spec>
            </dl>

            {product.href && (
              <Link
                href={product.href}
                className="mt-7 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-accent transition-colors hover:text-ink"
              >
                Read the full case study
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>

          {/* Buy box */}
          <aside
            aria-label="Purchase options"
            className="border border-hairline bg-paper-dim p-5 lg:col-span-2 xl:sticky xl:top-24 xl:col-span-1 xl:self-start"
          >
            <p className="font-serif text-2xl font-medium text-ink tnum">
              $0.00
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              Free delivery worldwide.{" "}
              <span className="text-muted">No payment, obviously.</span>
            </p>

            <p className="mt-4 font-serif text-lg text-accent">In stock</p>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">
              Only 1 candidate available
            </p>

            <div className="mt-5 space-y-2.5">
              <AddToCart id={product.id} />
              <Link
                href="/shop/checkout"
                className="flex w-full items-center justify-center rounded-full border border-hairline px-4 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Go to checkout
              </Link>
            </div>

            <dl className="mt-5 space-y-2 border-t border-hairline pt-4 font-mono text-[0.6rem] uppercase tracking-[0.1em]">
              <SellerRow label="Ships from" value="Dallas, GA" />
              <SellerRow label="Sold by" value={site.name} />
              <SellerRow label="Returns" value="Non-returnable" />
            </dl>

            <Link
              href="/contact"
              className="mt-5 block text-center font-mono text-[0.62rem] uppercase tracking-[0.12em] text-accent underline decoration-hairline underline-offset-4 hover:decoration-accent"
            >
              Question about this item?
            </Link>
          </aside>
        </div>

        <FrequentlyBought product={product} companions={companions} />

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-14 sm:mt-20">
            <h2 className="font-serif text-xl font-medium tracking-tight text-ink sm:text-2xl">
              More from {product.department}
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
              {related.map((p) => (
                <ShopListing key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-14 border-t border-hairline pt-6">
          <Link
            href="/shop"
            className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-accent"
          >
            ← Back to the store
          </Link>
        </div>
      </Container>

      <MobileBuyBar product={product} />
      <p className="sr-only">
        Contact {site.name} at {site.email}
      </p>
    </div>
  );
}

function Spec({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-muted">{label}</dt>
      <dd className="mt-1 text-ink">{children}</dd>
    </div>
  );
}

function SellerRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}
