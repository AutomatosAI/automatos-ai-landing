/**
 * Site-wide SEO constants — single source of truth for org identity,
 * canonical URL, social handles, and feature dates.
 */

export const SITE = {
  url: "https://studio.automatos.app",
  /** The organisation (Automatos AI) lives on the company site. */
  companyUrl: "https://automatos.app",
  name: "Automatos AI",
  /** The product this site sells. Titles and og:site_name use it; the organisation stays Automatos AI. */
  product: "Automatos Studio",
  tagline: "Run your business in your brand, on one OS",
  description:
    "Automatos Studio: tell Auto what you need and a team of agents does the work. Branded documents and invoices, socials on a plan, a Command Centre that asks before it acts, and a marketplace of packages. Powered by Automatos AI, open source.",
  defaultTitle: "Automatos Studio | Run your business in your brand",
  titleTemplate: "%s | Automatos Studio",
  logo: "https://studio.automatos.app/logos/automatos-ai-logo.png",
  ogImage: "https://studio.automatos.app/images/og-studio.png",
  themeColor: "#0a0a0a",
  locale: "en_US",

  // App surfaces
  app: "https://ui.automatos.app",
  docs: "https://docs.automatos.app",

  // Social
  twitter: "@AutomatosAI",
  linkedin: "https://www.linkedin.com/company/automatos-ai",
  github: "https://github.com/AutomatosAI",
  youtube: "https://www.youtube.com/@AutomatosAI",

  // Founder
  founder: {
    name: "Gerard Kavanagh",
    url: "https://www.linkedin.com/in/grkavanagh/",
  },

  // Pricing (tier marker, not price)
  offers: {
    category: "SaaS",
    priceModel: "Subscription + BYOK",
  },
} as const;

/** Build an absolute URL for any path on the landing site. */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${trimmed}`;
}
