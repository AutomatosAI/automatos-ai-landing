/**
 * Site-wide SEO constants — single source of truth for org identity,
 * canonical URL, social handles, and feature dates.
 */

/**
 * The Automatos AI organisation: the same JSON-LD entity on automatos.app,
 * studio.automatos.app, academy.automatos.app and markets.automatos.app.
 * The logo is served by automatos.app; sameAs lists only the profiles in the
 * automatos.app footer (X, Instagram, LinkedIn), with GitHub as the org profile,
 * github.com/AutomatosAI. The footer's GitHub icon still links the repo; that is
 * UI, not sameAs.
 */
export const ORGANIZATION = {
  id: "https://automatos.app/#organization",
  name: "Automatos AI",
  url: "https://automatos.app",
  logo: "https://automatos.app/images/automatos-mark-black.png",
  sameAs: [
    "https://x.com/automatosai",
    "https://www.instagram.com/automatosai",
    "https://www.linkedin.com/company/automatos-ai",
    "https://github.com/AutomatosAI",
  ],
} as const;

export const SITE = {
  url: "https://studio.automatos.app",
  /** The organisation (Automatos AI) lives on the company site. */
  companyUrl: ORGANIZATION.url,
  name: ORGANIZATION.name,
  /** The product this site sells. Titles and og:site_name use it; the organisation stays Automatos AI. */
  product: "Automatos Studio",
  tagline: "Run your business in your brand, on one OS",
  description:
    "Automatos Studio: tell Auto what you need and a team of agents does the work. Branded documents and invoices, socials on a plan that wait for your approval, a Command Centre that can be set to ask before work runs, and a marketplace of packages. Powered by Automatos AI, open source.",
  defaultTitle: "Automatos Studio | Run your business in your brand",
  titleTemplate: "%s | Automatos Studio",
  ogImage: "https://studio.automatos.app/images/og-studio-v2.png",
  themeColor: "#0a0a0a",
  locale: "en_US",

  // App surfaces
  app: "https://ui.automatos.app",
  docs: "https://docs.automatos.app",

  // Social (meta tags; the organisation's profiles are ORGANIZATION.sameAs)
  twitter: "@AutomatosAI",

  // Founder
  founder: {
    name: "Gerard Kavanagh",
    url: "https://www.linkedin.com/in/grkavanagh/",
  },

  // Pricing: the hosted Studio beta plans in USD (public facts sheet, 19 Oct 2026)
  offers: {
    category: "SaaS",
    priceModel:
      "Monthly plans from $9 (beta pricing, not charged until billing opens); after a one-time 500-credit trial the beta runs on your own AI keys",
    plans: [
      { name: "Own keys", monthlyUsd: 9 },
      { name: "Pro", monthlyUsd: 29 },
      { name: "Business", monthlyUsd: 99 },
    ],
  },
} as const;

/** Build an absolute URL for any path on the landing site. */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${trimmed}`;
}
