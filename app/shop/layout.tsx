import type { Metadata } from "next";
import { CartProvider } from "@/components/shop/cart-context";
import { StoreHeader } from "@/components/shop/store-header";
import { CartDrawer } from "@/components/shop/cart-drawer";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "The Store",
  description:
    "Shop the facts, skills, and results of Michael Blakely — add reasons to hire him to your cart and email yourself the shortlist.",
};

export default function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <CartProvider>
      <StoreHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <CartDrawer />
    </CartProvider>
  );
}
