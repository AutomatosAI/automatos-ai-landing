/**
 * JSON-LD factory functions — emit schema.org structured data that
 * LLM crawlers (ChatGPT, Claude, Perplexity, Gemini) and traditional
 * search engines consume.
 *
 * All builders return plain objects; the SEO component serialises
 * them into <script type="application/ld+json"> tags.
 */

import { SITE, absoluteUrl } from "./site";

// ---------------------------------------------------------------------------
// Organization — always present sitewide
// ---------------------------------------------------------------------------

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legal.name,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: SITE.logo,
    },
    description: SITE.description,
    foundingDate: SITE.legal.foundingDate,
    founder: {
      "@type": "Person",
      name: SITE.founder.name,
      url: SITE.founder.url,
    },
    sameAs: [
      SITE.linkedin,
      SITE.github,
      SITE.youtube,
      `https://twitter.com/${SITE.twitter.replace("@", "")}`,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: absoluteUrl("/contact"),
      availableLanguage: ["en"],
    },
  };
}

// ---------------------------------------------------------------------------
// WebSite — enables sitelinks searchbox in Google + anchor for breadcrumbs
// ---------------------------------------------------------------------------

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en-US",
  };
}

// ---------------------------------------------------------------------------
// SoftwareApplication — product-level schema for the Automatos platform
// ---------------------------------------------------------------------------

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE.url}/#software`,
    name: SITE.name,
    description: SITE.description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "AI Agent Platform",
    operatingSystem: "Web",
    url: SITE.url,
    image: SITE.ogImage,
    offers: {
      "@type": "Offer",
      category: SITE.offers.category,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        description: SITE.offers.priceModel,
      },
    },
    featureList: [
      "Multi-agent orchestration",
      "Sequential mission coordinator",
      "Playbook execution with budgets",
      "BYOK support across OpenAI, Anthropic, Google, Grok, AWS Bedrock, OpenRouter",
      "Skills marketplace with one-click installs",
      "Composio tool integration (250+ services)",
      "Persistent memory and report sharing across agents",
      "Human-in-the-loop approvals and audit logging",
      "EU AI Act aligned governance",
    ],
    creator: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}

// ---------------------------------------------------------------------------
// FAQPage — question/answer schema eligible for ChatGPT citations + Google rich
// ---------------------------------------------------------------------------

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ---------------------------------------------------------------------------
// Article — blog posts + research papers
// ---------------------------------------------------------------------------

export interface ArticleInput {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  authorName?: string;
  datePublished?: string;
  dateModified?: string;
  articleSection?: string;
  keywords?: string[];
}

export function articleSchema(article: ArticleInput) {
  const published = article.datePublished;
  const modified = article.dateModified || article.datePublished;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image || SITE.ogImage,
    author: {
      "@type": "Person",
      name: article.authorName || SITE.founder.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: SITE.logo,
      },
    },
    datePublished: published,
    dateModified: modified,
    articleSection: article.articleSection,
    keywords: article.keywords?.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}

// ---------------------------------------------------------------------------
// BreadcrumbList — position-based breadcrumb trail
// ---------------------------------------------------------------------------

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

// ---------------------------------------------------------------------------
// HowTo — for tutorial-style content (e.g. "How to build a Shopify agent")
// ---------------------------------------------------------------------------

export interface HowToStep {
  name: string;
  text: string;
  url?: string;
}

export function howToSchema(args: {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration e.g. "PT15M"
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: args.name,
    description: args.description,
    totalTime: args.totalTime,
    step: args.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url,
    })),
  };
}

// ---------------------------------------------------------------------------
// Product — for marketplace items / workspace templates (future use)
// ---------------------------------------------------------------------------

export interface ProductInput {
  name: string;
  description: string;
  url: string;
  image?: string;
  brand?: string;
  category?: string;
}

export function productSchema(product: ProductInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: product.url,
    image: product.image || SITE.ogImage,
    brand: {
      "@type": "Brand",
      name: product.brand || SITE.name,
    },
    category: product.category,
  };
}
