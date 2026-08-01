import {
  siEtsy,
  siShopify,
  siTiktok,
  siPhp,
  siDropbox,
  siObsidian,
  siTeamviewer,
} from "simple-icons";
import { firstPublicAsset } from "@/lib/assets";
import { Container } from "@/components/container";

type Tool = {
  name: string;
  /** Used to look for an official logo at public/images/logos/<slug>.(svg|png|webp). */
  slug: string;
  /** simple-icons mark, when the brand is in the set. */
  icon?: { path: string };
  /** Brand color. Several major brands were pulled from simple-icons over
   *  trademark requests, so these carry the color for a monogram tile. */
  color: string;
  /** Official site. Marketplaces point at their *seller* side — this is a list
   *  of things Michael sells and works on, not a shopping list. Omitted where
   *  there's no stable public URL, and those tiles render unlinked. */
  href?: string;
};

const CATEGORIES: { title: string; items: Tool[] }[] = [
  {
    title: "Marketplaces",
    items: [
      {
        name: "Amazon",
        slug: "amazon",
        color: "#FF9900",
        href: "https://sell.amazon.com",
      },
      {
        name: "Walmart",
        slug: "walmart",
        color: "#0071CE",
        href: "https://marketplace.walmart.com",
      },
      {
        name: "Etsy",
        slug: "etsy",
        icon: siEtsy,
        color: "#F16521",
        href: "https://www.etsy.com/sell",
      },
      {
        name: "Shopify",
        slug: "shopify",
        icon: siShopify,
        color: "#7AB55C",
        href: "https://www.shopify.com",
      },
      {
        name: "TikTok Shop",
        slug: "tiktok",
        icon: siTiktok,
        color: "#FF0050",
        href: "https://www.tiktok.com",
      },
    ],
  },
  {
    title: "Design & creative",
    items: [
      {
        name: "Photoshop",
        slug: "photoshop",
        color: "#31A8FF",
        href: "https://www.adobe.com/products/photoshop.html",
      },
      {
        name: "Illustrator",
        slug: "illustrator",
        color: "#FF9A00",
        href: "https://www.adobe.com/products/illustrator.html",
      },
      {
        name: "Lightroom",
        slug: "lightroom",
        color: "#31A8FF",
        href: "https://www.adobe.com/products/photoshop-lightroom.html",
      },
      {
        name: "InDesign",
        slug: "indesign",
        color: "#FF3366",
        href: "https://www.adobe.com/products/indesign.html",
      },
      {
        name: "Premiere Pro",
        slug: "premiere",
        color: "#9999FF",
        href: "https://www.adobe.com/products/premiere.html",
      },
      {
        name: "CapCut",
        slug: "capcut",
        color: "#25F4EE",
        href: "https://www.capcut.com",
      },
    ],
  },
  {
    title: "Ops & fulfillment",
    items: [
      {
        name: "ShipStation",
        slug: "shipstation",
        color: "#3AAFDD",
        href: "https://www.shipstation.com",
      },
      // No stable public product page I can point at — left unlinked on purpose.
      { name: "Ultraprint RIP", slug: "ultraprint", color: "#E8A33D" },
      {
        name: "TeamViewer",
        slug: "teamviewer",
        icon: siTeamviewer,
        color: "#0E8EE9",
        href: "https://www.teamviewer.com",
      },
      {
        name: "Splashtop",
        slug: "splashtop",
        color: "#E43B3B",
        href: "https://www.splashtop.com",
      },
    ],
  },
  {
    title: "Research, build & workflow",
    items: [
      {
        name: "eRank",
        slug: "erank",
        color: "#2BB673",
        href: "https://erank.com",
      },
      {
        name: "Ahrefs",
        slug: "ahrefs",
        color: "#054ADA",
        href: "https://ahrefs.com",
      },
      {
        name: "PHP",
        slug: "php",
        icon: siPhp,
        color: "#777BB4",
        href: "https://www.php.net",
      },
      {
        name: "Slack",
        slug: "slack",
        color: "#4A154B",
        href: "https://slack.com",
      },
      {
        name: "Obsidian",
        slug: "obsidian",
        icon: siObsidian,
        color: "#7C3AED",
        href: "https://obsidian.md",
      },
      {
        name: "Dropbox",
        slug: "dropbox",
        icon: siDropbox,
        color: "#0061FF",
        href: "https://www.dropbox.com",
      },
    ],
  },
];

/**
 * One tile. Precedence for the mark:
 *   1. An official logo dropped into public/images/logos/<slug>.(svg|png|webp)
 *   2. A simple-icons path, filled with the brand color
 *   3. A monogram tile in the brand color
 * Every tile keeps its name visible, so a missing mark never reads as broken.
 */
function ToolTile({ tool }: { tool: Tool }) {
  const local = firstPublicAsset([
    `images/logos/${tool.slug}.svg`,
    `images/logos/${tool.slug}.png`,
    `images/logos/${tool.slug}.webp`,
  ]);

  const mark = (
    <>
      <span className="flex h-8 items-center justify-center">
        {local ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={local}
            alt=""
            aria-hidden="true"
            className="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-110"
          />
        ) : tool.icon ? (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-8 w-8 transition-transform duration-200 group-hover:scale-110"
            style={{ fill: tool.color }}
          >
            <path d={tool.icon.path} />
          </svg>
        ) : (
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center font-serif text-lg font-medium text-white transition-transform duration-200 group-hover:scale-110"
            style={{ backgroundColor: tool.color }}
          >
            {tool.name.charAt(0)}
          </span>
        )}
      </span>
      <span className="font-mono text-[0.6rem] uppercase leading-tight tracking-[0.1em] text-ink-soft transition-colors group-hover:text-accent">
        {tool.name}
      </span>
    </>
  );

  const shell =
    "group relative flex h-full flex-col items-center gap-3 border border-hairline bg-paper-dim/40 px-3 py-5 text-center transition-colors";

  // Unlinked tiles stay visually identical — no dead affordance, no odd gap.
  if (!tool.href) {
    return (
      <li className={shell}>
        {mark}
      </li>
    );
  }

  return (
    <li className="contents">
      <a
        href={tool.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${tool.name} — official site (opens in a new tab)`}
        className={`${shell} hover:border-accent`}
      >
        {mark}
        <span
          aria-hidden="true"
          className="absolute right-1.5 top-1 text-[0.6rem] leading-none text-muted opacity-0 transition-opacity group-hover:opacity-100"
        >
          ↗
        </span>
      </a>
    </li>
  );
}

/**
 * The stack, grouped and up front. Drop official SVGs into
 * public/images/logos/<slug>.svg and they replace the fallbacks automatically.
 */
export function LogoWall() {
  return (
    <section aria-label="Channels and tools" className="mt-24 sm:mt-32">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="eyebrow">
            <span className="text-accent">/</span> Channels &amp; tools
          </h2>
          <p className="max-w-md font-serif text-lg italic leading-snug text-ink-soft">
            Five storefronts, and the software that keeps them running.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {CATEGORIES.map((cat) => (
            <div key={cat.title}>
              <h3 className="border-b border-hairline pb-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted">
                {cat.title}
              </h3>
              <ul className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                {cat.items.map((t) => (
                  <ToolTile key={t.slug} tool={t} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
