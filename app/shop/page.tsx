import { Suspense } from "react";
import { Container } from "@/components/container";
import { ShopBanner } from "@/components/shop/shop-banner";
import { ShopBrowser } from "@/components/shop/shop-browser";
import { HowItWorks } from "@/components/shop/how-it-works";

export default function ShopHome() {
  return (
    <>
      <ShopBanner />
      <section className="py-10 sm:py-12">
        <Container>
          <HowItWorks />
          <Suspense>
            <ShopBrowser />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
