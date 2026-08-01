"use client";

import { useEffect, useState } from "react";
import { applyTheme } from "@/lib/theme";

type Theme = "dark" | "light";

export function ThemeToggle() {
  // Start null so the button renders inert until we've read the real theme
  // (set pre-paint by the head script), avoiding a hydration mismatch.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    applyTheme(next);
    setTheme(next);
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme
          ? `Switch to ${isLight ? "dark" : "light"} mode`
          : "Toggle color theme"
      }
      title={theme ? `Switch to ${isLight ? "dark" : "light"} mode` : undefined}
      className="inline-flex h-8 w-8 items-center justify-center border border-hairline text-ink-soft transition-colors hover:border-accent hover:text-accent"
    >
      {/* Sun in light mode (click → dark), moon in dark mode (click → light) */}
      <span aria-hidden="true" className="text-sm leading-none">
        {isLight ? "☀" : "☾"}
      </span>
    </button>
  );
}
