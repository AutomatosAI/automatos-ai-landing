/**
 * SEO — centralised Helmet wrapper used by every page.
 *
 * Handles:
 *   - <title> (with template fallback)
 *   - meta description
 *   - canonical link
 *   - OpenGraph (og:*) meta for social previews
 *   - Twitter Card meta
 *   - Arbitrary JSON-LD schemas rendered as <script type="application/ld+json">
 *
 * JSON-LD is what LLM crawlers (ChatGPT, Claude, Perplexity) parse to build
 * the knowledge graph they answer from. Every page should pass at least one
 * structured-data block.
 *
 * Security: JSON-LD payloads come from our own factory functions (never user
 * input). We still escape `<` and `>` to prevent any theoretical script-tag
 * breakout if a string value contains a literal "</script>".
 */

import { Helmet } from "react-helmet-async";
import { SITE, absoluteUrl } from "@/lib/seo/site";

interface SEOProps {
  /** Page-specific title. SITE.titleTemplate wraps this unless `titleOverride` is true. */
  title?: string;
  /** If true, use `title` verbatim without the " | Automatos AI" suffix. */
  titleOverride?: boolean;
  /** Meta description — keep under 160 chars. Falls back to site default. */
  description?: string;
  /** Path (e.g. "/about") OR absolute URL. Used for canonical + OG URL. */
  path?: string;
  /** OG + Twitter image URL. Falls back to site default. */
  image?: string;
  /** og:type (website, article, product). Defaults to "website". */
  type?: "website" | "article" | "product";
  /** Mark this page noindex (e.g. search results, internal pages). */
  noindex?: boolean;
  /** Array of JSON-LD schema objects. Use the factories in lib/seo/structured-data.ts. */
  structuredData?: Array<Record<string, unknown>>;
}

/** Serialise a JSON-LD schema object safely for inline <script> injection. */
function safeJsonLd(schema: Record<string, unknown>): string {
  return JSON.stringify(schema)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export function SEO({
  title,
  titleOverride = false,
  description,
  path,
  image,
  type = "website",
  noindex = false,
  structuredData,
}: SEOProps) {
  const resolvedTitle = title
    ? titleOverride
      ? title
      : `${title} | ${SITE.name}`
    : SITE.defaultTitle;
  const resolvedDescription = description || SITE.description;
  const resolvedUrl = path ? absoluteUrl(path) : SITE.url;
  const resolvedImage = image || SITE.ogImage;

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <link rel="canonical" href={resolvedUrl} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* OpenGraph */}
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={resolvedUrl} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:locale" content={SITE.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE.twitter} />
      <meta name="twitter:creator" content={SITE.twitter} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />

      {/* JSON-LD structured data */}
      {structuredData?.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {safeJsonLd(schema)}
        </script>
      ))}
    </Helmet>
  );
}
