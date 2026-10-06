# CLAUDE.md — automatos-ai-landing (the PRODUCT site)

Role in the family (decided 6 Oct 2026): `automatos-ai-landingV2` is the **company** site (automatos.app). This repo becomes the **product** site for the platform itself (working name: Automatos Studio; domain TBD, `os.automatos.app` was v1's). Academy and Markets have their own sites, "powered by Automatos AI".

## Stack
- Vite 5 + React 18 + TypeScript, shadcn/ui (Radix), Tailwind, framer-motion, React Router (`src/App.tsx`).
- `server.js` (Express) serves `dist/` and `POST /api/contact` (SMTP). `nginx.conf*` are leftovers from an older stage; the Dockerfile's run stage is `node server.js`. Deploy = Railway.
- Dogfood widgets: `src/components/widgets/AutomatosChat.tsx` and `AutomatosBlog.tsx` use the widget SDK with `VITE_AUTOMATOS_PUBLIC_KEY` / `VITE_AUTOMATOS_WORKSPACE_ID` / `VITE_AUTOMATOS_CHAT_AGENT_ID` (build args in the Dockerfile). The public key is origin-allow-listed server-side: a new domain must be added to the key first.
- `scripts/generate-feeds.mjs` runs on prebuild (RSS); `scripts/generate-og.mjs` makes OG images.

## Commands
- `npm ci` · `npm run dev` · `npm run build` · `npm run lint` · `npm test` (vitest).
- CI: only `.github/workflows/malware-scan.yml` (DPRK loader IOC check, after the July 2026 incident). No build/lint lane — add one before this goes live again.

## Traps
- `README.md` is the Lovable boilerplate; the project no longer lives in Lovable. Replace it.
- `@clerk/clerk-js` is a dependency but the site only links out to sign-in; check before keeping it.
- Nav/footer link sign-in to `https://ui.automatos.app/sign-in` — confirm the live app host before relaunch.
- `public/logos/` (284 Composio app logos) is fine to keep; `public/videos/automatos-intro.mp4` is 13.6 MB and stale.
- `prd.json` is a finished Ralph kit for the blog page (July); historical only.
- Brand: see `REDESIGN-PLAN.md` §2 — the site must take the app's Studio tokens, not invent its own.
