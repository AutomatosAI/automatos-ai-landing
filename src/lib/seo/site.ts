/**
 * Site-wide SEO constants — single source of truth for org identity,
 * canonical URL, social handles, and feature dates.
 */

export const SITE = {
  url: "https://automatos.app",
  name: "Automatos AI",
  tagline: "An Operating System for Autonomous Agent Teams",
  description:
    "Automatos is the open platform for AI workforces — design specialised agents, equip them with skills and knowledge, schedule their work, and run the whole room from one command centre.",
  defaultTitle: "Automatos AI | An Operating System for Autonomous Agent Teams",
  titleTemplate: "%s | Automatos AI",
  logo: "https://automatos.app/logos/automatos-ai-logo.png?v=2",
  ogImage: "https://automatos.app/images/og-default.png?v=3",
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
    url: "https://www.linkedin.com/in/gerardkavanagh/",
  },

  // Legal / company
  legal: {
    name: "Automatos AI Ltd",
    foundingDate: "2025",
    country: "IE",
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
