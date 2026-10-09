# Redesign plan — the Automatos product site

Reviewed 6 Oct 2026 against this repo (last commit 16 Jul 2026, `b54f0bc`) and the platform on `main` `dfda0f027`. Nothing here is built yet; this is the map for working on it locally.

## 1. What's here and what's stale

| Area | Today | Verdict |
|---|---|---|
| Hero | "An operating system for autonomous agent teams", orange glow/shimmer SVG | Replace. Wrong pitch (agents, not outputs) and the "AI OS" line is what every competitor says. |
| Pillar pages | `/design-your-agents`, `/connect-your-world`, `/empower-with-knowledge`, `/launch-missions` with 22 screenshots from ~June | Retire as pages; 301 them to the new pages (§3). Every screenshot predates the Studio theme, the board, Deliverables, Brand kit, Templates and Socials. |
| `/marketplace` | A hardcoded fake catalogue: 6 invented agents, 7 categories | Replace with the real six categories (Packages, Applications, Agents, Playbooks, LLMs, Capabilities) and what a package installs. |
| Pricing | Personal €29 / Business €99 / Enterprise; feature names like "Automatos CodeGraph & NL2SQL" | Replace with the real tiers (`basic` / `pro` / `business` in platform `config.py`), described by what you get (render minutes, agents, channels), not module names. |
| Metrics | "87% fewer tokens", "86% context recovery", "1,000+ integrations" | Drop the first two (unverifiable research claims). Keep integrations with the real Composio count. |
| Testimonial | Scott, Budstacks.io | Keep only with a relationship disclosure line. Better: replace with a real output (an invoice, a post) than a quote. |
| Industries | Six stock photos (personal assistant, support, social, accounting, e-commerce, developer) | Re-cut as "who it's for": shop, café, accountant, hairdresser, Shopify store — the #895 brief. Use rendered outputs, not stock. |
| Video | `automatos-intro.mp4`, 13.6 MB, old UI | Replace with a re-cut of the open-source launch ad (`automatos-ai/docs/assets/automatos-oss-launch-16x9.mp4`) once new screenshots exist. |
| Blog, Research, EU AI Act (+checker), legal | Fine | Keep. Blog stays on the widget (dogfood). Research/EU AI Act move down the nav; they're credibility, not product. |
| About, Contact | Fine | About belongs to the company site (V2). Keep a short one here or link out — your call (§6). |
| Chrome | Dark/light toggle, system fonts, orange `hsl(16 100% 50%)` everywhere | Replace with the Studio tokens (§2). The orange-on-everything is the same "orange problem" PRD-255 fixed in the product. |

Housekeeping before any design: new README (drop Lovable), decide on `@clerk/clerk-js`, confirm the sign-in host, add a build+lint CI lane, delete `nginx.conf*` if unused.

## 2. Studio branding — port the app's tokens, don't restyle

Source of truth: `automatos-ai/frontend/app/globals.css` (Studio theme block) and `app/layout.tsx` (fonts). Copy these into `src/index.css` and `tailwind.config.ts`; the screenshots will then sit in matching chrome.

- **Paper, not glass.** Background cream `hsl(38 50% 92%)`, cards white, secondary surface `#ebe3d2`, tan borders `#dcd2bd`, no gradients, no glow, no shimmer, no glass alpha.
- **Ink.** Primary ink `#1a1814`, muted `#5a5448`, faded meta `hsl(36 10% 50%)`. The default CTA is ink, not orange.
- **Accent is sparing.** Burnt orange `#c44a1a` (`hsl(15 76% 44%)`) for one thing per view: the live dot, a primary action, a highlight. Olive `#5b6f3a` for live/positive and focus rings. Navy `hsl(213 51% 23%)` exists for charts.
- **Type.** Newsreader (serif, display and headlines, italic for the brand line), Geist (sans, body/UI), Geist Mono (numbers, code). Load via Google Fonts in `index.html`. Note: the company site V2 uses Instrument Serif; the product site should match the *app* (Newsreader) so screenshots and chrome agree.
- **Dark mode.** The app's Studio dark block (`--paper: hsl(30 10% 12%)`, accent lifted to `hsl(15 80% 56%)`) is the only dark theme to use. Keep the toggle only if both themes are maintained; otherwise ship light (paper) only.
- **Mark.** The sailboat mark stays on every product (the Markets lesson). `public/brand/automatos-mark-hi.png` is the current asset; `src/assets/logo-*.svg` are the wordmarks.

## 3. Page map

| Route | Page | What it shows (and the screenshot it needs) |
|---|---|---|
| `/` | Home | Hero: Auto + one real output. Then "how a week runs" (tell Auto → board → deliverables → socials), feature strip, who it's for, pricing teaser, FAQ, CTA. Chat widget stays (dogfood). |
| `/auto` | Auto | One voice, delegates to agents; questions and approvals come back as cards. Shots: Chat home with Auto; a question card; a document card. |
| `/command-centre` | Board & calendar | Tickets, drags, consent grants, calendar with socials and schedules, activity. Shots: board tab, calendar month, calendar week with a social slot, activity. |
| `/deliverables` | Documents & brand | Every output in one place; Template Studio (invoice preset); Brand kit tab with the board; a rendered invoice/letter PDF. Shots: outputs feed with thumbnails, Studio editor, Brand kit page, the brand board PNG. |
| `/socials` | Socials Studio | Plan a cadence, content bank with sourced facts, made on the day, approve, publish to LinkedIn/X/Instagram/TikTok/YouTube. Shots: editor (Brief/Format/Channels/Look/When), template gallery with photo cards, plan view, calendar. |
| `/marketplace` | Marketplace | The real six categories; packages first ("install Socials: two agents, four playbooks, guided setup"). Templates as "coming". Shot: Packages tab, Capabilities tab. |
| `/integrations` | Applications | Composio logos (reuse `ToolsSection`/`IntegrationsSection` and `public/logos`). Shot: Applications tab. |
| `/your-store` | Your site and store, run by your agents | The Shopify app, the chat and blog widgets on any site, Shopify packages and skills, store data in the knowledge graph. **8 Oct: built now** (Studio is not live yet); the Shopify app and widgets get an end-to-end test before launch. Was `/widgets`, gated while the repos were paused. |
| `/local` | Runs on your machine | Local edition, Apache-2.0, same product; CLI sessions on your own subscription. Shot: Session mode. |
| `/pricing` | Pricing | Basic / Pro / Business from config: render minutes 10/60/240, AI media caps, channels, agents. Enterprise = contact. |
| keep | `/blog`, `/research`, `/eu-ai-act`, `/eu-ai-act/checker`, `/privacy`, `/terms`, `/cookies`, `/contact` | Research and EU AI Act move to the footer. |
| redirects | the four pillar routes → `/auto`, `/integrations`, `/deliverables`, `/command-centre` | Keep the SEO. |

Nav: Product (Auto · Board · Deliverables · Socials) · Marketplace · Integrations · Pricing · Blog · Sign in.

## 4. Screenshot shot list

Capture on the local edition, Studio theme, workspace c1 with the Automatos brand kit, 1440 wide, light theme, after a fresh build from main. The ten real shots in `automatos-ai/docs/assets/01..10` (29 Sept, #798) are the stopgap for Chat, Agents, Marketplace tools, Command Center, Analytics, Knowledge, LLM routes, Session mode, Runtime canvas and Calendar, but they predate PRD-252 (board), PRD-251B/C (Socials Studio, plans), the night-10 document fixes and PRD-255 (brand kit v2, brand board). Needed new:

1. `/chat` — Auto with a document card and a question card in the thread.
2. `/command-center` — board tab (tickets in columns, a "needs you" card), calendar month, calendar week with a social slot, activity tab, governance tab.
3. `/deliverables?tab=outputs` — feed with thumbnails.
4. `/deliverables?tab=templates` — gallery, then the editor on the Branded Invoice preset with preview.
5. `/deliverables?tab=brand` — Brand kit tab (basics + design), and the brand board PNG download.
6. `/deliverables?tab=socials` — editor, Look picker with photo cards, plans view, a post preview at 1080×1350.
7. `/marketplace` — Packages tab (Socials package open), Capabilities tab.
8. `/tools` — Applications grid.
9. `/playbooks`, `/agents`, `/missions` — one each.
10. Rendered outputs, not UI: an invoice PDF page 1, a letter, a social still, the brand board.

Mechanics: a small Playwright script in `scripts/screenshots/` (own `package.json`, never the app's) that logs into the local edition and walks the list is the PRD-251B B112 idea, never built; a manual pass is fine for the first round. Name files by route and tab; drop the old `public/images/<pillar>/` folders when the new set lands.

## 5. Build order (local, one thing at a time)

1. Housekeeping (§1 last paragraph) + `CLAUDE.md`.
2. Tokens, fonts, nav, footer (§2). Everything else inherits.
3. Home with frames where screenshots go; then `/auto`, `/command-centre`, `/deliverables`, `/socials` as one shared page template (hero line, three shots, one "what runs" list, CTA).
4. Screenshot session (§4); replace frames.
5. `/marketplace`, `/pricing`, `/integrations` from real data.
6. `/widgets` and Shopify only when those repos are un-paused.
7. Re-cut the video last.

## 6. Decisions needed from you

1. Domain: `os.automatos.app` (v1) or `studio.automatos.app`? The code and the nights say Studio.
2. Sign-in host for every CTA (`ui.automatos.app` today in nav/footer; V2's sitemap assumes `app.automatos.ai`).
3. Does About live here or only on the company site?
4. Pricing numbers to publish, and whether to show the local edition as free.
5. Widgets/Shopify: a page now (with the repos moving) or a Home section until then?
6. Keep dark mode, or ship paper-only?

## 7. Brand architecture (agreed 6 Oct 2026)

- **Automatos AI** is the brand. **automatos.app** is the marketing face.
- **Automatos OS** is the headless backend that drives everything: API first, modules (RAG, NL2SQL, graphs, memory, agents, documents, socials), MCP soon, modules later swappable for your own. Enterprise to come: OIDC, Kubernetes, Azure and AWS plugins, monitoring.
- **Studio** is the UI to manage the OS and your business. Because the OS is API-first, other UIs can follow.
- **Powered by Automatos**, branded on every one: Market Intelligence, Academy (web and app), widgets, Shopify, BudStacks.
- Line for the site: **one OS, any interface.**

The hub hero lives in `src/components/sections/OsHub.tsx` with its ring sets in `osHubRings.ts`. This site uses `STUDIO_RINGS` (the OS underneath, what you run in Studio), because product sites sell only their own product. `FAMILY_RINGS` (the OS, Studio, and every product Powered by Automatos) is the hero for automatos.app: port it to the core site.

## 8. Before Web Summit (9 Nov 2026)

Three launches move the picture from story to proof:

1. **Markets and Academy wired to their own workspaces** on the OS. Markets plugs in through its augmentor seam (`automatos-markets/src/lib/orchestration/augmentor.ts`, `AUGMENTOR_URL` + `AUTOMATOS_API_KEY`, shadow mode today).
2. **The Academy app in the stores** (`automatos-academy-app`).
3. **The Studio page live**, with a new page for Intelligent Markets and an updated home brand page.

## 9. Family footer (for the core-site session, 7 Oct 2026)

Applied 6 Oct: Studio (this repo) and Academy (`.worktrees/automatos-academy/footer-family-brand`, branch `feat/footer-family-brand`, uncommitted). automatos.app and Markets follow tomorrow.

Every Automatos site gets a footer with the same skeleton and its own skin. Sites: automatos.app (`automatos-ai-landingV2`), Studio (this repo), academy.automatos.app (`automatos-academy`), markets.automatos.app (`automatos-markets`, no footer yet).

**Must match on every site**

1. **Wordmark pattern:** sailboat mark + "Automatos" + product name. Decide one treatment. Today: Studio and automatos.app use the serif with an italic second word; Academy uses a sans two-weight wordmark. Mark is orange on Academy/Studio, white on automatos.app.
2. **One copyright line:** "© 2026 Automatos AI Ltd" (the legal name in the structured data) + product line + licence where relevant. Today there are three names: "Automatos AI" (Studio), "AUTOMATOS" (Academy), "Automatos Labs" (automatos.app).
3. **"Powered by Automatos AI"** pill linking to automatos.app. Studio has it; Academy has "Built on Automatos agents" (convert).
4. **No family column on product sites** (Gerard, 6 Oct: each site sells its own product; all cross and core marketing lives on automatos.app). The "Powered by Automatos AI" pill is the only bridge. The family column (Studio, Academy, Market Intelligence, Widgets, Shopify, Enterprise; BudStacks under Partners) appears on automatos.app only. One allowed exception: a single contextual next step where the audience genuinely moves on (Academy: "put it to work in Studio").
5. **Same social icons in the same order.** Legal links point to one canonical set on automatos.app unless a product needs its own.

**Can differ per product**

- Colours and theme (Academy periwinkle, Studio paper/dark, Markets its own).
- The product's own columns (Academy: Learn, Account; Studio: product pages; Markets: cockpit, ledger).
- One disclaimer line: Academy "not affiliated with any certification body"; Markets "not financial advice"; Studio EU AI Act posture.
- Tagline. automatos.app still reads "An operating system for autonomous agent teams"; the agreed line is "One OS. Any interface."

## 10. Site map for the family (agreed 8 Oct 2026, to tune)

Each product site sells only itself and carries its own pricing. The "Powered by Automatos AI" pill is the only bridge. Everything about the company, the OS and the family lives on automatos.app.

| Site | Repo | State | What it owns |
|---|---|---|---|
| **automatos.app** | `automatos-ai-landingV2` | live, last commit July | The company and the OS. See below. |
| **studio.automatos.app** | `automatos-ai-landing` (this repo) | local only | Studio, the UI a business runs on: Auto, Command Centre, Documents, Socials, Marketplace, Integrations, **Your store** (Shopify app + widgets), Studio pricing, waitlist. |
| **academy.automatos.app** | `automatos-academy` (+ the app) | live | Courses, tutor, the app. Its own pricing. |
| **markets.automatos.app** | `automatos-markets` | live | The cockpit, plans, replay, journal, research. Free during the pilot. |

**automatos.app keeps or gains**

- Hero: "One OS. Any interface." with the family ring hub (`FAMILY_RINGS` in this repo's `osHubRings.ts`, see §7).
- The OS: API-first, the modules (agents, memory, RAG, NL2SQL, graphs, documents, socials, the harness), MCP, Apache-2.0 open source.
- Enterprise: OIDC, Kubernetes, Azure and AWS plugins, monitoring. The bank PoC and Web Summit audience.
- The family: Studio, Academy, Markets, Widgets & Shopify (a Studio surface), BudStacks as a partner. Each card links out.
- Developers: the widget SDK as code, the API, MCP, docs, GitHub, DeepWiki.
- Research, field notes, the EU AI Act posture, About, Contact.
- The one canonical legal set (privacy, terms, cookies). Today privacy and cookies are `#` there while this repo has real pages: move them, and point product sites at them.

**Draft content already exists:** the 6 Oct team brief "One OS, Any interface" (claude.ai/artifact/YVxTRa4ZZjNd1c5UdjRcFT) is most of this page: the family hub hero, the brand map (brand → OS → Studio → products, each with buyer / promise / button / status), the editions, "A Jarvis is an app. We're what apps run on." (the comparison table), "Lego, for a business" (partners, verticals, app stores, own front end, enterprise, community). Port those; drop the internal parts ("Tonight", PR links, Web Summit plan, the feedback form). Verify before publishing: "over ten thousand backend tests", "17 feature modules whose boundaries CI enforces", "a Helm chart exists", and the Shopify app's status (the brief says "Built"; the 8 Oct research found the App Store app paused with stub pages).

**automatos.app drops**

- `pricing.html`: each product prices itself (Studio on studio.automatos.app, Academy and Markets on theirs).
- `marketplace.html` and the agent walkthrough (hire agents, Command Centre, costs): Studio's site covers them with real captures.

**Open**

- One blog or two? Studio's `/blog` runs on the blog widget (dogfood); automatos.app has field notes.
- Where research and the EU AI Act pages live canonically (proposal: automatos.app; Studio links to them).
- `SITE.url` in this repo is still `https://automatos.app` (canonical, sitemap, structured data). Switch to `https://studio.automatos.app` when the domain is set.
