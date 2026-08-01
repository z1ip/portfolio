"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import { useCart } from "@/components/shop/cart-context";
import type { Product } from "@/lib/shop";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "done";

// Easter-egg promo codes. Everything's already free — these just react.
const PROMO_CODES: Record<string, string> = {
  HIREME: "100% off. Always has been.",
  "HIRE-ME": "100% off. Always has been.",
  FREE: "It was already free — but I admire the diligence.",
  ONERING: "One code to rule them all. Applied.",
  WIZARD: "🧙 A wizard is never late. Discount applied precisely when it means to.",
  TOLKIEN: "Not all those who wander are lost. 100% off.",
};

export default function CheckoutPage() {
  const { items, count, value, clear } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [emailed, setEmailed] = useState(false);
  const [orderNo, setOrderNo] = useState("");
  const [receipt, setReceipt] = useState<Product[]>([]);
  const [receiptValue, setReceiptValue] = useState(0);

  const [promo, setPromo] = useState("");
  const [promoMsg, setPromoMsg] = useState<string | null>(null);

  function applyPromo() {
    const key = promo.trim().toUpperCase();
    if (!key) return;
    setPromoMsg(
      PROMO_CODES[key] ??
        "That code's expired — but the price is $0 regardless. Carry on.",
    );
  }

  function downloadReceipt() {
    const lines = receipt.map((i) => `  - ${i.name}  [${i.stat}]`).join("\n");
    const body =
      `THE MICHAEL BLAKELY STORE — RECEIPT\n` +
      `Order ${orderNo}\n` +
      `${"=".repeat(40)}\n\n` +
      `Your case for hiring Michael:\n\n${lines}\n\n` +
      (receiptValue > 0
        ? `Estimated annual value: $${receiptValue.toLocaleString("en-US")}/yr\n\n`
        : "\n") +
      `Total: $0.00 (talk is cheap; the proof is above)\n\n` +
      `Contact: ${site.email} · ${site.phone}\n`;
    const blob = new Blob([body], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${orderNo}-receipt.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      email: String(fd.get("email") || ""),
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""), // honeypot
      itemIds: items.map((i) => i.id),
    };

    // Capture the receipt before clearing the cart.
    setReceipt(items);
    setReceiptValue(value);
    setOrderNo(`MB-${Date.now().toString(36).toUpperCase().slice(-6)}`);

    try {
      const res = await fetch("/api/shop-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { emailed?: boolean };
      setEmailed(Boolean(data.emailed));
    } catch {
      setEmailed(false);
    }

    clear();
    setStatus("done");
  }

  // ---- Order confirmation ------------------------------------------------
  if (status === "done") {
    return (
      <div className="pt-16 sm:pt-24">
        <Container>
          <p className="eyebrow">
            <span className="text-accent">✓</span> Order confirmed
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Order {orderNo} is in.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {emailed
              ? "A copy of your shortlist is on its way to your inbox — keep it handy for when you're making the case."
              : "Here's your shortlist below. (Email delivery isn't switched on in this preview yet — the receipt is all yours to screenshot for now.)"}
          </p>

          <div className="mt-10 max-w-2xl border border-hairline bg-paper-dim p-6 sm:p-8">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
              Receipt · {orderNo}
            </p>
            <p className="mt-1 font-serif text-xl text-ink">
              Your case for hiring Michael
            </p>
            <ul className="mt-5 divide-y divide-hairline">
              {receipt.map((item) => (
                <li
                  key={item.id}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <span className="text-ink">{item.name}</span>
                  <span className="font-serif text-lg text-accent">
                    {item.stat}
                  </span>
                </li>
              ))}
            </ul>
            {receiptValue > 0 && (
              <div className="mt-4 flex items-baseline justify-between border-t border-hairline pt-4">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                  Est. annual value
                </span>
                <span className="font-serif text-2xl text-ink tnum">
                  ${receiptValue.toLocaleString("en-US")}/yr
                </span>
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="border border-accent bg-accent px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-accent-ink transition-opacity hover:opacity-90"
            >
              Keep shopping
            </Link>
            <button
              type="button"
              onClick={downloadReceipt}
              className="border border-hairline px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              ↓ Download receipt
            </button>
            <Link
              href="/contact"
              className="border border-hairline px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Talk to Michael →
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  // ---- Empty cart --------------------------------------------------------
  if (count === 0) {
    return (
      <div className="pt-16 sm:pt-24">
        <Container>
          <p className="eyebrow">Checkout</p>
          <h1 className="mt-5 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            Your cart&apos;s empty.
          </h1>
          <p className="mt-5 max-w-md text-lg text-ink-soft">
            Add a few reasons first, then come back to email yourself the list.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block border border-accent bg-accent px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-accent-ink transition-opacity hover:opacity-90"
          >
            Browse the store
          </Link>
        </Container>
      </div>
    );
  }

  // ---- Checkout form -----------------------------------------------------
  return (
    <div className="pt-16 sm:pt-24">
      <Container>
        <p className="eyebrow">Checkout</p>
        <h1 className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
          Email yourself the shortlist.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          No payment, obviously. Drop your email and I&apos;ll send you the{" "}
          {count} {count === 1 ? "reason" : "reasons"} you added — a tidy
          reminder for when you&apos;re building the case internally.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Order summary */}
          <section aria-label="Order summary" className="order-2 lg:order-1">
            <h2 className="eyebrow">In your cart</h2>
            <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <span className="text-ink">{item.name}</span>
                  <span className="font-serif text-lg text-accent">
                    {item.stat}
                  </span>
                </li>
              ))}
            </ul>
            {value > 0 && (
              <div className="mt-4 flex items-baseline justify-between">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                  Est. annual value
                </span>
                <span className="font-serif text-2xl text-ink tnum">
                  ${value.toLocaleString("en-US")}/yr
                </span>
              </div>
            )}
            <div className="mt-4 flex items-baseline justify-between border-t border-hairline pt-4">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                Total
              </span>
              <span className="font-serif text-2xl text-accent">$0.00</span>
            </div>

            {/* Promo code — an Easter egg; the price is $0 no matter what */}
            <div className="mt-6">
              <label htmlFor="promo" className="eyebrow">
                Promo code
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="promo"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      applyPromo();
                    }
                  }}
                  placeholder="Got a code?"
                  className="w-full border border-hairline bg-paper px-4 py-2.5 text-ink placeholder:text-muted focus:border-accent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={applyPromo}
                  className="shrink-0 border border-hairline px-4 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Apply
                </button>
              </div>
              {promoMsg && (
                <p className="mt-2 text-sm text-accent" role="status">
                  {promoMsg}
                </p>
              )}
            </div>
          </section>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="order-1 lg:order-2"
          >
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="co-name" className="eyebrow">
                  Your name (optional)
                </label>
                <input
                  id="co-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="mt-2 w-full border border-hairline bg-paper px-4 py-3 text-ink placeholder:text-muted focus:border-accent focus:outline-none"
                  placeholder="Jordan from Acme"
                />
              </div>
              <div>
                <label htmlFor="co-email" className="eyebrow">
                  Your email
                </label>
                <input
                  id="co-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-2 w-full border border-hairline bg-paper px-4 py-3 text-ink placeholder:text-muted focus:border-accent focus:outline-none"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-accent-ink transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "submitting"
                ? "Placing order…"
                : "Place order — email me my cart"}
              {status !== "submitting" && <span aria-hidden="true">→</span>}
            </button>
            <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
              Your email is only used to send this one message.
            </p>
          </form>
        </div>
      </Container>
    </div>
  );
}
