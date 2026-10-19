# CLAUDE.md — automatos-ai-landing (the PRODUCT site)

Role in the family (decided 6 Oct 2026): `automatos-ai-landingV2` is the **company** site (automatos.app). This repo becomes the **product** site for the platform itself (working name: Automatos Studio; domain TBD, `os.automatos.app` was v1's). Academy and Markets have their own sites, "powered by Automatos AI".

## Stack
- Vite 5 + React 18 + TypeScript, shadcn/ui (Radix), Tailwind, framer-motion, React Router (`src/App.tsx`).
- `server.js` (Express) serves `dist/` and `POST /api/contact` (SMTP). `nginx.conf*` are leftovers from an older stage; the Dockerfile's run stage is `node server.js`. Deploy = Railway.
- Dogfood widgets: `src/components/widgets/AutomatosChat.tsx` and `AutomatosBlog.tsx` use the widget SDK with `VITE_AUTOMATOS_PUBLIC_KEY` / `VITE_AUTOMATOS_WORKSPACE_ID` / `VITE_AUTOMATOS_CHAT_AGENT_ID` (build args in the Dockerfile). The public key is origin-allow-listed server-side: a new domain must be added to the key first.
- `scripts/generate-feeds.mjs` runs on prebuild (RSS). No OG image generator is checked in. `public/images/og-studio-v2.png` (1280x640) is the default social card (`SITE.ogImage` and the `index.html` meta tags); CMS blog posts and research papers (`BlogPost.tsx`, `ResearchPaper.tsx`) and the two static posts (`AutomatosNotWrapper.tsx`, `FromToolListsToOperatingGraphs.tsx`) pass their own cover image to `SEO` instead. The card was re-rendered on 19 Oct 2026 from the 9 Oct card, keeping its sail icon and app screenshot and redrawing the left column in Newsreader and Geist. A wording change means a new render under a new file name (images are cached immutable).

## Commands
- `npm ci` · `npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck` · `npm test` (vitest).
- CI: `.github/workflows/ci.yml` (lint, typecheck, test, build; every step runs even after a failure) and `malware-scan.yml` (DPRK loader IOC check, after the July 2026 incident).

## Layout
- Home (`src/pages/Index.tsx`): `HomeHero → WhoItsFor → ProductTour → OsUnderneath → ApprovalsSection → Pricing → FAQ → CTA`, from the Claude Design handoff (7 Oct 2026). Hero 1a ships; `?hero=1b` / `?hero=1c` show the other two directions.
- Interactive demos live in `src/components/demos/`: sample data in `data.ts`, the timing and state of each demo as pure functions in `frames/` (tested in `frames.test.ts`), one `useDemoClock` per demo (110 ms tick, paused off-screen, frozen on a resting frame under reduced motion).
- Product pages use `ProductPage` with an optional `demo` ("Try it" card); sections alternate sides by index and their screenshots zoom on hover.

## Traps
- `README.md` is the Lovable boilerplate; the project no longer lives in Lovable. Replace it.
- `@clerk/clerk-js` backs the waitlist form (`CTASection` → `joinWaitlist`, needs `VITE_CLERK_PUBLISHABLE_KEY`); sign-in itself links out.
- Sign in goes to `/login`, which redirects to `SIGN_IN_URL` (`src/lib/links.ts`, mirrored in `server.js`): `https://ui.automatos.app/sign-in` — confirm the live app host before relaunch.
- `public/logos/` (284 Composio app logos) is fine to keep. The stale, unreferenced `public/videos/automatos-intro.mp4` and the v1 pillar-page image folders were deleted on 19 Oct 2026 (git history has them).
- `prd.json` is a finished Ralph kit for the blog page (July); historical only.
- Caching (`server.js`): HTML (`index.html` and the SPA fallback) is no-store; Vite's hashed `dist/assets/*` and every image, font, video or PDF from `public/` are `immutable` for a year, as they were before 19 Oct 2026, so an edited image needs a new file name (the 19 Oct trims are `*-v2.jpg`); text files from `public/` (`llms.txt`, `llms-full.txt`, `robots.txt`, `sitemap.xml`, `rss.xml`, `site.webmanifest`) are cached for 1 hour because they are edited in place. A missing file under `/images`, `/logos`, `/brand`, `/videos`, `/screenshots` or `/assets` (and the removed platform guide PDF) is a 404, not the SPA shell.
- The chat widget SDK (`widgets.automatos.app/v0`) renders `title` in the header but never renders `greeting`, so the AI label lives in the title.
- Brand: see `REDESIGN-PLAN.md` §2 — the site must take the app's Studio tokens, not invent its own.
- About: `/about` redirects to automatos.app (client route + `server.js` 301); company material lives there, this site sells Studio. The old `About.tsx` (mission, team, Function1 Dubai) was deleted on 19 Oct 2026.
- EU AI Act: `/eu-ai-act` and `/eu-ai-act/checker` redirect to automatos.app (client route + `server.js` 301). The old unrouted `EuAiAct*.tsx` pages (and the four v1 pillar pages) were deleted on 19 Oct 2026 because they carried claims the public facts sheet forbids; they are in git history if the text is needed again.
- Family and organisation (Gerard, 19 Oct 2026): the footer ends with the family row (`src/components/layout/FamilyRow.tsx`, sites in `family.ts`; Studio is `aria-current`, not a link), and the columns carry no family links. The Organization JSON-LD is the one node shared by all four sites (`ORGANIZATION` in `src/lib/seo/site.ts`: `@id` https://automatos.app/#organization, the automatos.app logo, sameAs = the automatos.app footer profiles). `index.html` carries a static copy; `src/lib/seo/structured-data.test.ts` fails if the two drift. Studio schemas point at it by `@id`, never as a second Organization.
- Public copy follows the 19 Oct 2026 facts sheet: prices in USD (Own keys $9 / Pro $29 / Business $99, beta pricing), Enterprise "coming soon", hosted beta "opens November 2026 · Join the waitlist", per-edition counts, and the EU AI Act posture line.
