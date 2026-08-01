// The storefront's "catalog": facts, skills, and results about Michael modeled
// as products you can add to a cart. Leaning into the bit — but every product
// is a real, true claim, verified with Michael directly. Do not add a stat here
// that isn't confirmed; see INTAKE.md for the source data.

export type Department =
  | "Results"
  | "Operations"
  | "Creative"
  | "Tooling"
  | "The Person";

export type Product = {
  id: string;
  sku: string;
  department: Department;
  name: string;
  /** The headline value, shown where a price would go. */
  stat: string;
  blurb: string;
  /** Dollar value, if any — summed into the cart's "estimated annual value". */
  valueUsd?: number;
  rating: number;
  reviews: number;
  /** Links to the case-study "product detail" page when there is one. */
  href?: string;
  badge?: "Bestseller" | "Staff pick" | "New arrival" | "Limited stock";
};

export const departments: Department[] = [
  "Results",
  "Operations",
  "Creative",
  "Tooling",
  "The Person",
];

export const products: Product[] = [
  // ---- Results ----------------------------------------------------------
  {
    id: "order-platform",
    sku: "MB-TOOL-24K",
    department: "Results",
    name: "The $24k/yr order platform",
    stat: "$24,000/yr",
    blurb:
      "Helped build the platform that replaced ShipStation across five channels. Real savings, zero oversells.",
    valueUsd: 24000,
    rating: 5.0,
    reviews: 1,
    href: "/work/multi-channel-order-platform",
    badge: "Staff pick",
  },
  {
    id: "conversion-doubled",
    sku: "MB-CVR-2X",
    department: "Results",
    name: "Conversion rate, doubled",
    stat: "3% → 6%",
    blurb:
      "Rebuilt photography, keywords, titles, and the path to purchase across a 7,000-SKU catalog.",
    rating: 5.0,
    reviews: 1,
    href: "/work/listing-optimization-conversion",
    badge: "Bestseller",
  },
  {
    id: "revenue-run",
    sku: "MB-REV-20M",
    department: "Results",
    name: "$20.4M through my storefronts",
    stat: "$20.4M",
    blurb:
      "Lifetime revenue across the stores I operate day to day — 496,000 orders at a $41.25 average.",
    rating: 5.0,
    reviews: 1,
  },
  {
    id: "on-time",
    sku: "MB-OPS-99",
    department: "Results",
    name: "99% on-time shipping",
    stat: "99%",
    blurb:
      "Held at roughly 5,000 orders a month. The metric marketplaces suspend you for missing.",
    rating: 5.0,
    reviews: 1,
    badge: "Limited stock",
  },

  // ---- Operations -------------------------------------------------------
  {
    id: "seven-years",
    sku: "MB-OPS-7YR",
    department: "Operations",
    name: "7 years, multi-channel",
    stat: "7 yrs",
    blurb:
      "Amazon, Walmart, Etsy, Shopify & TikTok Shop, run end-to-end. Not theory — reps.",
    rating: 5.0,
    reviews: 1,
    badge: "Bestseller",
  },
  {
    id: "orders-fulfilled",
    sku: "MB-OPS-496",
    department: "Operations",
    name: "496,000 orders fulfilled",
    stat: "496K",
    blurb:
      "588,000 shipments behind them — split orders, partials, and the messy real-world cases.",
    rating: 5.0,
    reviews: 1,
  },
  {
    id: "catalog-scale",
    sku: "MB-OPS-7K",
    department: "Operations",
    name: "A 7,000-SKU catalog",
    stat: "7,000",
    blurb:
      "Listings, inventory, and pricing kept coherent across five storefronts at real scale.",
    rating: 5.0,
    reviews: 1,
  },
  {
    id: "customer-service",
    sku: "MB-OPS-CS",
    department: "Operations",
    name: "4.9 rating, 5/5 response",
    stat: "4.9 ★",
    blurb:
      "Across three Etsy shops. Every message, claim, and dispute handled in a tone that protects the brand.",
    rating: 4.9,
    reviews: 1,
  },

  // ---- Creative ---------------------------------------------------------
  {
    id: "adobe-certified",
    sku: "MB-CRV-ADO",
    department: "Creative",
    name: "Adobe Certified (PS & AI)",
    stat: "Certified",
    blurb:
      "Certified in Photoshop and Illustrator. Designs the creative that carries a listing, in-house.",
    rating: 5.0,
    reviews: 1,
    badge: "Staff pick",
  },
  {
    id: "photography",
    sku: "MB-CRV-PHO",
    department: "Creative",
    name: "Product photography, in-house",
    stat: "Shoots",
    blurb:
      "Shoots and retouches product photography and builds the infographics that answer buyer objections.",
    rating: 5.0,
    reviews: 1,
  },
  {
    id: "listing-creative",
    sku: "MB-CRV-LST",
    department: "Creative",
    name: "Listings engineered to convert",
    stat: "A+",
    blurb:
      "Keyword-led titles, descriptions, and imagery — creative built for CTR and conversion, not just looks.",
    rating: 4.9,
    reviews: 1,
  },
  {
    id: "print-production",
    sku: "MB-CRV-RIP",
    department: "Creative",
    name: "Ran the print floor",
    stat: "RIP",
    blurb:
      "Ultraprint RIP software and hands-on production. Knows what a design costs before it's on a shirt.",
    rating: 5.0,
    reviews: 1,
  },
  {
    id: "video",
    sku: "MB-CRV-VID",
    department: "Creative",
    name: "Video that sells",
    stat: "Premiere",
    blurb:
      "Premiere Pro and CapCut — listing video and short-form built for the channels that reward it.",
    rating: 4.8,
    reviews: 1,
  },

  // ---- Tooling ----------------------------------------------------------
  {
    id: "builds-tools",
    sku: "MB-TOOL-BLD",
    department: "Tooling",
    name: "Builds the software himself",
    stat: "Ships code",
    blurb:
      "When off-the-shelf stops fitting, he helps build the tool — PHP and five marketplace APIs.",
    rating: 5.0,
    reviews: 1,
    badge: "Limited stock",
  },
  {
    id: "five-apis",
    sku: "MB-TOOL-API",
    department: "Tooling",
    name: "Five channel APIs, one queue",
    stat: "×5",
    blurb:
      "Amazon, Walmart, Etsy, Shopify, and TikTok Shop normalized into a single fulfillment pipeline.",
    rating: 5.0,
    reviews: 1,
  },

  // ---- The Person -------------------------------------------------------
  {
    id: "detail",
    sku: "MB-PER-DTL",
    department: "The Person",
    name: "Tolkien-grade attention to detail",
    stat: "∞",
    blurb:
      "One does not simply ship a broken listing. Cares about the craft, down to the last backend keyword.",
    rating: 5.0,
    reviews: 1,
  },
  {
    id: "systems",
    sku: "MB-PER-SYS",
    department: "The Person",
    name: "Systems thinker (and car guy)",
    stat: "How it works",
    blurb:
      "Loves understanding how things actually work — engines, marketplaces, whatever. Builds for the long term.",
    rating: 5.0,
    reviews: 1,
  },
  {
    id: "remote",
    sku: "MB-PER-RMT",
    department: "The Person",
    name: "Remote-ready, relocation-willing",
    stat: "Ships worldwide",
    blurb:
      "Based in Dallas, GA. Fully set up for remote and open to relocating for the right team.",
    rating: 5.0,
    reviews: 1,
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function productsByDepartment(dept: Department): Product[] {
  return products.filter((p) => p.department === dept);
}

/** Sum the dollar-valued products in a set of ids — the cart's headline number. */
export function estimatedAnnualValue(ids: string[]): number {
  return ids.reduce((sum, id) => sum + (getProduct(id)?.valueUsd ?? 0), 0);
}
