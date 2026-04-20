#!/usr/bin/env node
/**
 * Build-time feed generator.
 *
 * - Writes public/sitemap.xml (static routes + dynamic blog + research posts)
 * - Writes public/rss.xml (latest 50 blog posts)
 *
 * Runs before `vite build`. Gracefully degrades if the widget API is
 * unreachable — emits a sitemap with only static routes so deploys never
 * fail because a CMS is down.
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, "..");
const PUBLIC_DIR = resolve(ROOT_DIR, "public");
mkdirSync(PUBLIC_DIR, { recursive: true });

// Lightweight .env loader so local `npm run feeds` works without extra tooling.
// In CI, real env vars take precedence.
for (const name of [".env.local", ".env"]) {
  const file = resolve(ROOT_DIR, name);
  if (!existsSync(file)) continue;
  for (const raw of readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

const SITE_URL = "https://automatos.app";
const API_BASE = process.env.AUTOMATOS_API_BASE || "https://api.automatos.app";
const WORKSPACE_ID =
  process.env.VITE_AUTOMATOS_WORKSPACE_ID ||
  process.env.AUTOMATOS_WORKSPACE_ID ||
  "";

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/marketplace", changefreq: "weekly", priority: "0.9" },
  { path: "/design-your-agents", changefreq: "monthly", priority: "0.9" },
  { path: "/connect-your-world", changefreq: "monthly", priority: "0.9" },
  { path: "/empower-with-knowledge", changefreq: "monthly", priority: "0.9" },
  { path: "/launch-missions", changefreq: "monthly", priority: "0.9" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/research", changefreq: "weekly", priority: "0.8" },
  { path: "/eu-ai-act", changefreq: "monthly", priority: "0.8" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/cookies", changefreq: "yearly", priority: "0.3" },
];

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function isoDate(d) {
  if (!d) return undefined;
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString().slice(0, 10);
}

function rfc822(d) {
  const date = d ? new Date(d) : new Date();
  if (Number.isNaN(date.getTime())) return new Date().toUTCString();
  return date.toUTCString();
}

async function fetchAllPosts(category) {
  if (!WORKSPACE_ID) {
    console.warn(
      `[feeds] VITE_AUTOMATOS_WORKSPACE_ID not set — skipping ${category || "blog"} fetch`,
    );
    return [];
  }
  const posts = [];
  let page = 1;
  // Hard cap — protect against runaway loops.
  const maxPages = 20;
  while (page <= maxPages) {
    const params = new URLSearchParams({
      workspace_id: WORKSPACE_ID,
      per_page: "50",
      page: String(page),
    });
    if (category) params.set("category", category);
    const url = `${API_BASE}/api/widgets/blog/posts?${params}`;
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        console.warn(`[feeds] ${url} -> HTTP ${res.status}`);
        break;
      }
      const data = await res.json();
      const chunk = Array.isArray(data?.posts) ? data.posts : [];
      posts.push(...chunk);
      const totalPages = Number(data?.total_pages ?? 1);
      if (page >= totalPages) break;
      page += 1;
    } catch (err) {
      console.warn(`[feeds] fetch failed: ${err?.message || err}`);
      break;
    }
  }
  return posts;
}

function renderSitemap(entries) {
  const urlXml = entries
    .map((e) => {
      const parts = [
        `    <loc>${escapeXml(e.loc)}</loc>`,
        e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
        e.priority ? `    <priority>${e.priority}</priority>` : null,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      ].filter(Boolean);
      return `  <url>\n${parts.join("\n")}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlXml}\n</urlset>\n`;
}

function renderRss(posts) {
  const now = rfc822();
  const items = posts
    .slice(0, 50)
    .map((p) => {
      const link = `${SITE_URL}/blog/${p.slug}`;
      const pubDate = rfc822(p.published_at);
      const categories = Array.isArray(p.tags)
        ? p.tags
            .map((t) => `      <category>${escapeXml(t)}</category>`)
            .join("\n")
        : "";
      const description = escapeXml(p.excerpt || p.seo_description || "");
      const author = p.author_name
        ? `      <dc:creator>${escapeXml(p.author_name)}</dc:creator>`
        : "";
      return [
        "    <item>",
        `      <title>${escapeXml(p.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${description}</description>`,
        author,
        categories,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>Automatos AI Blog</title>\n    <link>${SITE_URL}/blog</link>\n    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />\n    <description>Multi-agent orchestration, AI workforce, and platform updates from Automatos AI.</description>\n    <language>en-us</language>\n    <lastBuildDate>${now}</lastBuildDate>\n${items}\n  </channel>\n</rss>\n`;
}

async function main() {
  const [blogPosts, researchPosts] = await Promise.all([
    fetchAllPosts(),
    fetchAllPosts("Research"),
  ]);

  // De-dup research out of general blog list (some APIs return research in both).
  const researchSlugs = new Set(researchPosts.map((p) => p.slug));
  const blogOnly = blogPosts.filter((p) => !researchSlugs.has(p.slug));

  const dynamicEntries = [
    ...blogOnly.map((p) => ({
      loc: `${SITE_URL}/blog/${p.slug}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: isoDate(p.updated_at || p.published_at),
    })),
    ...researchPosts.map((p) => ({
      loc: `${SITE_URL}/research/${p.slug}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: isoDate(p.updated_at || p.published_at),
    })),
  ];

  const staticEntries = STATIC_ROUTES.map((r) => ({
    loc: `${SITE_URL}${r.path === "/" ? "/" : r.path}`,
    changefreq: r.changefreq,
    priority: r.priority,
  }));

  const sitemap = renderSitemap([...staticEntries, ...dynamicEntries]);
  writeFileSync(resolve(PUBLIC_DIR, "sitemap.xml"), sitemap, "utf8");
  console.log(
    `[feeds] sitemap.xml: ${staticEntries.length} static + ${dynamicEntries.length} dynamic URLs`,
  );

  const rss = renderRss(blogPosts);
  writeFileSync(resolve(PUBLIC_DIR, "rss.xml"), rss, "utf8");
  console.log(`[feeds] rss.xml: ${Math.min(blogPosts.length, 50)} items`);
}

main().catch((err) => {
  console.error("[feeds] generator failed:", err);
  // Never block the build — ship whatever is already on disk.
  process.exit(0);
});
