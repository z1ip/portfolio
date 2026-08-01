import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand colors inlined — Satori doesn't read our CSS tokens.
const PAPER = "#FAFAF7";
const INK = "#1A1A1A";
const ACCENT = "#C2410C";
const MUTED = "#7A7A70";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: PAPER,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          borderTop: `16px solid ${ACCENT}`,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            color: MUTED,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {site.name} — E-commerce &amp; Marketplace Operations
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              lineHeight: 1.02,
              color: INK,
              fontWeight: 700,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            E-commerce operations for multi-channel brands.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 30,
              color: MUTED,
            }}
          >
            Amazon · Walmart · Etsy · Shopify · TikTok Shop — listings,
            logistics &amp; custom tooling.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: INK,
          }}
        >
          <span style={{ display: "flex", color: ACCENT, fontWeight: 700 }}>
            michaeldblakely.com
          </span>
          <span style={{ display: "flex", color: MUTED }}>
            7 years · 4 marketplaces
          </span>
        </div>
      </div>
    ),
    size,
  );
}
