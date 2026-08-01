"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  estimatedAnnualValue,
  getProduct,
  type Product,
} from "@/lib/shop";

const STORAGE_KEY = "mb-career-cart";

type CartContextValue = {
  ids: string[];
  items: Product[];
  count: number;
  value: number;
  hydrated: boolean;
  drawerOpen: boolean;
  has: (id: string) => boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
  setDrawer: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Load persisted cart once, on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Drop ids that no longer exist in the catalog.
          setIds(parsed.filter((id) => typeof id === "string" && getProduct(id)));
        }
      }
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  // Persist on change (after hydration, so we don't clobber storage with []).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* storage full / unavailable — non-fatal */
    }
  }, [ids, hydrated]);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const add = useCallback((id: string) => {
    if (!getProduct(id)) return;
    setIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const remove = useCallback((id: string) => {
    setIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const toggle = useCallback((id: string) => {
    if (!getProduct(id)) return;
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const clear = useCallback(() => setIds([]), []);
  const setDrawer = useCallback((open: boolean) => setDrawerOpen(open), []);

  const value = useMemo<CartContextValue>(() => {
    const items = ids
      .map((id) => getProduct(id))
      .filter((p): p is Product => Boolean(p));
    return {
      ids,
      items,
      count: items.length,
      value: estimatedAnnualValue(ids),
      hydrated,
      drawerOpen,
      has,
      add,
      remove,
      toggle,
      clear,
      setDrawer,
    };
  }, [ids, hydrated, drawerOpen, has, add, remove, toggle, clear, setDrawer]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
