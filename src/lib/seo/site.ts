/**
 * Site-wide SEO constants — single source of truth for org identity,
 * canonical URL, social handles, and feature dates.
 */

export const SITE = {
  url: "https://automatos.app",
  name: "Automatos AI",
  tagline: "Scaling Intelligence, Not Headcount",
  description:
    "Expert AI agency and SaaS platform for building and deploying autonomous AI agents. Multi-agent orchestration with agents, skills, playbooks, and a marketplace to run business operations end-to-end.",
  defaultTitle: "Automatos AI | Elevate Your Workflow",
  titleTemplate: "%s | Automatos AI",
  logo: "https://automatos.app/logos/automatos-ai-logo.png",
  ogImage: "https://automatos.app/images/og-default.png",
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
