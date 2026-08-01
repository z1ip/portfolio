import { Suspense } from "react";
import { Container } from "@/components/container";
import { ShopBanner } from "@/components/shop/shop-banner";
import { ShopBrowser } from "@/components/shop/shop-browser";
import { HowItWorks } from "@/components/shop/how-it-works";

export default function ShopHome() {
  return (
    <>
      <ShopBanner />
      <section className="py-7 sm:py-10">
        <Container>
          <HowItWorks />
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
