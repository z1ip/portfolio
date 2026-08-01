"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./container";
import { ViewSwitch } from "./view-switch";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/85 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-serif text-lg font-medium tracking-tight text-ink transition-colors hover:text-accent"
        >
          {site.name}
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav aria-label="Primary" className="hidden sm:block">
            <ul className="flex items-center gap-6">
              {nav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "text-sm transition-colors hover:text-accent",
                        active ? "text-accent" : "text-ink-soft",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <ViewSwitch />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
