import express from "express";
import { resolve, dirname, sep } from "path";
import { fileURLToPath } from "url";
import { readFileSync, existsSync } from "fs";
import compression from "compression";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 80;

// Middleware
app.use(compression());

// One contact route for every Automatos site: the company form (facts sheet 8b). Studio no longer runs its
// own form or SMTP route; keep in step with CONTACT_URL in src/lib/links.ts. Preserve the query string
// (utm_source etc.) so campaign links through /contact still attribute correctly on automatos.app.
app.get("/contact", (req, res) => {
  const queryIndex = req.url.indexOf("?");
  const query = queryIndex === -1 ? "" : req.url.slice(queryIndex);
  res.redirect(301, `https://automatos.app/contact${query}`);
});

// Sign in lives in the app; keep in step with SIGN_IN_URL in src/lib/links.ts
const SIGN_IN_URL = process.env.SIGN_IN_URL || "https://ui.automatos.app/sign-in";
app.get("/login", (_req, res) => res.redirect(302, SIGN_IN_URL));

// Company material lives on automatos.app (facts sheet 1); keep in step with COMPANY_URL in src/lib/links.ts
app.get("/about", (_req, res) => res.redirect(301, "https://automatos.app"));

// The EU AI Act posture lives on the company site (REDESIGN-PLAN §10); keep in step with src/lib/links.ts
app.get("/eu-ai-act", (_req, res) => res.redirect(301, "https://automatos.app/eu-ai-act"));
app.get("/eu-ai-act/checker", (_req, res) => res.redirect(301, "https://automatos.app/eu-ai-act/checker"));

// Serve static files from Vite build output
const distPath = resolve(__dirname, "dist");
// Vite content-hashes everything under dist/assets, so a changed file gets a new name.
const hashedAssetsPath = resolve(distPath, "assets") + sep;
const IMMUTABLE_CACHE = "public, max-age=31536000, immutable";
const HTML_CACHE = "no-store, no-cache, must-revalidate";
// Images, fonts and media copied from public/ keep the year-long cache they had before
// 19 Oct 2026: an edited image gets a new file name (the 19 Oct trims are *-v2.jpg).
const MEDIA_FILE = /\.(png|jpe?g|gif|webp|avif|svg|ico|mp4|webm|woff2?|ttf|otf|pdf)$/i;
// Text files copied from public/ (llms.txt, robots.txt, sitemap.xml, rss.xml) are edited
// in place, so they are cached for an hour.
const TEXT_FILE_CACHE = "public, max-age=3600";
app.use(express.static(distPath, {
  setHeaders(res, filePath) {
    if (filePath.endsWith(".html")) {
      // Don't cache HTML so deploys take effect immediately
      res.setHeader("Cache-Control", HTML_CACHE);
    } else if (filePath.startsWith(hashedAssetsPath) || MEDIA_FILE.test(filePath)) {
      res.setHeader("Cache-Control", IMMUTABLE_CACHE);
    } else {
      res.setHeader("Cache-Control", TEXT_FILE_CACHE);
    }
  },
}));

// Static files that are gone are 404s, not the SPA shell (19 Oct 2026 removed the platform guide PDF, the intro video and the v1 images).
// express.static has already served every file that exists, so only missing files reach this handler.
const STATIC_PREFIXES = ["/images", "/logos", "/brand", "/videos", "/screenshots", "/assets", "/Automatos-AI-Platform-Guide.pdf"];
app.use(STATIC_PREFIXES, (_req, res) => res.sendStatus(404));

// SPA fallback — all routes serve index.html (React Router handles routing)
app.get("/{*splat}", (_req, res) => {
  res.setHeader("Cache-Control", HTML_CACHE);
  res.sendFile(resolve(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Landing site running on port ${PORT}`);
});
