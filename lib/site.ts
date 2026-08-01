// Central place for identity + contact details so nothing is hard-coded
// across pages. Update these in one spot.
export const site = {
  // Short display name used for the wordmark/header; full legal name below.
  name: "Michael Blakely",
  fullName: "Michael David Blakely Jr",
  role: "E-commerce Operations",
  // One-line positioning used in the hero.
  positioning: "E-commerce operations for multi-channel brands.",
  description:
    "E-commerce and marketplace operations manager with 7 years running Amazon, Walmart, Etsy, Shopify, and TikTok Shop stores end-to-end — listings, logistics, creative, and the internal tools that hold it together.",
  url: "https://michaeldblakely.com",
  email: "contact@michaeldblakely.com",
  phone: "352-410-4999",
  linkedin: "https://www.linkedin.com/in/michael-blakely-20a139223",
  location: "Dallas, GA — remote or open to relocation",
  resume: "/michael-blakely-resume.pdf",
} as const;

export type Platform =
  | "Amazon"
  | "Walmart"
  | "Etsy"
  | "Shopify"
  | "TikTok Shop";

export type WorkType =
  | "Listing optimization"
  | "Launch"
  | "Ops"
  | "Branding"
  | "Tooling";
