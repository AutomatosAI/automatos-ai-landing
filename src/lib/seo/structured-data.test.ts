import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  articleSchema,
  organizationSchema,
  productSchema,
  softwareApplicationSchema,
  websiteSchema,
} from "./structured-data";

const ORG_ID = "https://automatos.app/#organization";
const ORG_REF = { "@id": ORG_ID };

/** Every JSON-LD block that index.html serves before hydration, parsed. */
function staticJsonLd(): Array<Record<string, unknown>> {
  const html = readFileSync(path.resolve(process.cwd(), "index.html"), "utf8");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  return blocks.map((match) => JSON.parse(match[1]));
}

/** Collects every node in a JSON-LD tree whose @type is Organization. */
function organizationNodes(value: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(value)) return value.flatMap(organizationNodes);
  if (!value || typeof value !== "object") return [];
  const node = value as Record<string, unknown>;
  const own = node["@type"] === "Organization" ? [node] : [];
  return [...own, ...Object.values(node).flatMap(organizationNodes)];
}

describe("Organization structured data", () => {
  it("is the one shared Automatos AI node and nothing more", () => {
    expect(organizationSchema()).toEqual({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Automatos AI",
      url: "https://automatos.app",
      logo: "https://automatos.app/images/automatos-mark-black.png",
      sameAs: [
        "https://x.com/automatosai",
        "https://www.instagram.com/automatosai",
        "https://www.linkedin.com/company/automatos-ai",
        "https://github.com/AutomatosAI/automatos-ai",
      ],
    });
  });

  it("matches the static node in index.html", () => {
    const orgs = staticJsonLd().filter((block) => block["@type"] === "Organization");
    expect(orgs).toEqual([organizationSchema()]);
  });

  it("keeps index.html to a single Organization", () => {
    expect(organizationNodes(staticJsonLd())).toHaveLength(1);
  });
});

describe("Studio structured data", () => {
  it("names the product Automatos Studio, published by the organisation", () => {
    const app = softwareApplicationSchema();
    expect(app.name).toBe("Automatos Studio");
    expect(app.publisher).toEqual(ORG_REF);
    expect(app.creator).toEqual(ORG_REF);
    expect(app.offers.map((offer) => [offer.name, offer.price, offer.priceCurrency])).toEqual([
      ["Own keys", 9, "USD"],
      ["Pro", 29, "USD"],
      ["Business", 99, "USD"],
    ]);
  });

  it("names the website Automatos Studio, published by the organisation", () => {
    const site = websiteSchema();
    expect(site.name).toBe("Automatos Studio");
    expect(site.publisher).toEqual(ORG_REF);
    const staticSite = staticJsonLd().find((block) => block["@type"] === "WebSite");
    expect(staticSite?.name).toBe("Automatos Studio");
    expect(staticSite?.publisher).toEqual(ORG_REF);
  });

  it("points articles and products at the organisation instead of a second Organization", () => {
    const article = articleSchema({ title: "t", description: "d", url: "https://studio.automatos.app/blog/t" });
    const product = productSchema({ name: "p", description: "d", url: "https://studio.automatos.app/marketplace" });
    expect(article.publisher).toEqual(ORG_REF);
    expect(product.brand).toEqual(ORG_REF);
    const nodes = [websiteSchema(), softwareApplicationSchema(), article, product];
    expect(organizationNodes(nodes)).toEqual([]);
  });
});
