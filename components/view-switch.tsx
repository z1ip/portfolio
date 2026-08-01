"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

/**
 * A physical-feeling switch that flips between the two experiences:
 * the clean portfolio (/) and the storefront (/shop). The knob slides to the
 * active side; clicking the other label navigates there.
 */
export function ViewSwitch() {
  const pathname = usePathname();
  const isFun = pathname.startsWith("/shop");

  // Short labels until lg. In the store header this sits next to a wordmark, a
  // search bar, a theme toggle and a cart — at 768px the full labels push that
  // whole row past the viewport edge.
  const label =
    "relative z-10 w-[4.75rem] rounded-full py-1.5 text-center font-mono text-[0.56rem] uppercase tracking-[0.08em] transition-colors lg:w-[7.5rem] lg:text-[0.6rem] lg:tracking-[0.1em]";

  return (
    <div
      role="group"
      aria-label="Switch between portfolio and store"
      className="relative inline-flex select-none items-center rounded-full border border-hairline bg-paper-dim p-0.5"
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-0.5 left-0.5 w-[calc(50%-0.125rem)] rounded-full bg-accent transition-transform duration-300 ease-out",
          isFun && "translate-x-full",
        )}
      />
      <Link
        href="/"
        aria-current={!isFun ? "page" : undefined}
        title="The straightforward version — case studies, background, contact."
        className={cn(
          label,
          !isFun ? "text-accent-ink" : "text-ink-soft hover:text-accent",
        )}
      >
        <span className="lg:hidden">Portfolio</span>
        <span className="hidden lg:inline">Read as portfolio</span>
      </Link>
      <Link
        href="/shop"
        aria-current={isFun ? "page" : undefined}
        title="Same facts, as a storefront — add reasons to hire me to a cart and email yourself the list."
        className={cn(
          label,
          isFun ? "text-accent-ink" : "text-ink-soft hover:text-accent",
        )}
      >
        <span className="lg:hidden">Shop</span>
        <span className="hidden lg:inline">Fun version</span>
      </Link>
    </div>
  );
}
