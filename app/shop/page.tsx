import { Suspense } from "react";
import { Container } from "@/components/container";
import { ShopBanner } from "@/components/shop/shop-banner";
import { ShopBrowser } from "@/components/shop/shop-browser";

export default function ShopHome() {
  return (
    <>
      {/* The banner carries the one-time "why is this a store?" dialog, which
          is where the how-it-works steps live now — one explainer, not two. */}
      <ShopBanner />
      <section className="py-7 sm:py-10">
        <Container>
          {/* ShopBrowser reads the filters out of the URL, so it needs a
              boundary or the whole route opts out of static rendering. */}
          <Suspense>
            <ShopBrowser />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
