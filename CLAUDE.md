# CLAUDE.md — automatos-ai-landing (the PRODUCT site)

Role in the family (decided 6 Oct 2026): `automatos-ai-landingV2` is the **company** site (automatos.app). This repo becomes the **product** site for the platform itself (working name: Automatos Studio; domain TBD, `os.automatos.app` was v1's). Academy and Markets have their own sites, "powered by Automatos AI".

## Stack
- Vite 5 + React 18 + TypeScript, shadcn/ui (Radix), Tailwind, framer-motion, React Router (`src/App.tsx`).
- `server.js` (Express) serves `dist/` and `POST /api/contact` (SMTP). `nginx.conf*` are leftovers from an older stage; the Dockerfile's run stage is `node server.js`. Deploy = Railway.
- Dogfood widgets: `src/components/widgets/AutomatosChat.tsx` and `AutomatosBlog.tsx` use the widget SDK with `VITE_AUTOMATOS_PUBLIC_KEY` / `VITE_AUTOMATOS_WORKSPACE_ID` / `VITE_AUTOMATOS_CHAT_AGENT_ID` (build args in the Dockerfile). The public key is origin-allow-listed server-side: a new domain must be added to the key first.
- `scripts/generate-feeds.mjs` runs on prebuild (RSS); `scripts/generate-og.mjs` makes OG images.

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
- `public/logos/` (284 Composio app logos) is fine to keep; `public/videos/automatos-intro.mp4` is 13.6 MB and stale.
- `prd.json` is a finished Ralph kit for the blog page (July); historical only.
- Brand: see `REDESIGN-PLAN.md` §2 — the site must take the app's Studio tokens, not invent its own.
- EU AI Act: `/eu-ai-act` and `/eu-ai-act/checker` redirect to automatos.app (client route + `server.js` 301). `src/pages/EuAiAct*.tsx` are kept unrouted: they restate PRD-132, still a draft (no Art. 5 router guardrails, tamper-evident logs, agent cards, Annex IV PDFs, Art. 50 notices, Art. 73 workflow or kill switch). Re-route them only once those are built (8 Oct 2026).
