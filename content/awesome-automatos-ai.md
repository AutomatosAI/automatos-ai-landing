# Awesome Automatos AI [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of resources, skills, templates, agents and community projects for the [Automatos AI](https://automatos.app) multi-agent orchestration platform.

Automatos AI is an open-source platform (hosted beta from November 2026) for building and deploying autonomous AI agents — agents, skills, playbooks, missions, a marketplace, an EU AI Act posture (work in progress), and semantic field memory all in one place.

---

## Contents

- [Platform](#platform)
- [Skills](#skills)
- [Agents](#agents)
- [Packages](#packages)
- [Integrations](#integrations)
- [Compliance](#compliance)
- [Research](#research)
- [Tools](#tools)
- [Community](#community)

---

## Platform

- [Automatos AI](https://automatos.app) — the company and brand site.
- [Automatos OS](https://github.com/AutomatosAI/automatos-ai) — the open-source engine (Apache 2.0); the local edition runs today on your own keys or your Claude Code / CLI subscription.
- [Automatos Studio](https://studio.automatos.app) — the hosted app. Hosted beta opens November 2026 · [Join the waitlist](https://studio.automatos.app/#waitlist).
- [Product guides](https://studio.automatos.app/auto) — Auto and agents, the Command Centre, documents, socials, integrations and your store.
- [Marketplace](https://studio.automatos.app/marketplace) — 100+ ready-made agents in the Studio marketplace, 400+ skills, 20+ Playbooks and 3 packages.
- [Widgets](https://studio.automatos.app/your-store) — serve agent-generated content into any site with no CMS.

## Skills

The [automatos-skills](https://github.com/AutomatosAI/automatos-skills) repository is the open automatos-skills library of 140 skills.

- [SKILL-GUIDE.md](https://github.com/AutomatosAI/automatos-skills/blob/main/SKILL-GUIDE.md) — the author's guide for writing a new skill.
- **Signature agents** — SENTINEL, SCOUT, HARPER, ECHO, ATLAS, FORGE, ORACLE, RALLY, PATCHER, each with their own `SKILL.md`.
- **Domain packs** — Shopify & Commerce (21), Software Engineering (11), Quality / Security / Compliance (9), DevOps & SRE (6), Product & PM (8), Design & UX (11), Content & Editorial (7), Social Media (12), Marketing & Growth (7), Sales & Revenue (8), Analytics & BI (5), People & Ops (3), Research (2), Support (1), Integrations (8).

## Agents

- [The Automatos Team](https://github.com/AutomatosAI/automatos-skills/tree/main/team) — named agents with persona, beat, and UI home.
  - **SENTINEL** — infra watchdog (API health, deploys, cost anomalies).
  - **PATCHER** — end-to-end bug fixing (ticket → fix → PR).
  - **SCOUT** — lead intelligence and outreach.
  - **HARPER** — turns platform activity into content.
  - **ECHO** — customer support classifier and responder.
  - **ATLAS** — weekly BI reporting.
  - **FORGE** — natural-language → recipe builder.
  - **ORACLE** — knowledge curator / RAG health.
  - **RALLY** — community growth.

## Packages

Packages bundle agents, Playbooks and a guided setup into one install. The Studio marketplace has 3 packages:

- **Socials** — a Social Media Director, a Brand Designer and five Playbooks.
- **Shopify Management** — an operations manager, a support agent, an inventory watchdog and a business analyst.
- **Shopify Development** — an app architect, a storefront developer and an extension builder.

## Integrations

Automatos AI connects to 1,000+ apps through [Composio](https://composio.dev) plus native connectors (local edition: bring your own Composio key):

- Gmail, Slack, Jira, Google Calendar, LinkedIn, Twitter, TikTok, Shopify, Stripe, GitHub, Linear, Notion, Airtable…
- 400+ models through OpenRouter, plus direct keys for OpenAI, Anthropic, Google, DeepSeek and others.
- Embed any Composio toolkit as a skill — see [`integrations/`](https://github.com/AutomatosAI/automatos-skills/tree/main/integrations).

## Compliance

- [EU AI Act posture](https://automatos.app/eu-ai-act) — EU AI Act work is in progress. Human approval before anything publishes or spends, risk classes with matching oversight, and an append-only audit log are in the product today. The Article 50 notices and the marking of generated media are being built now.
- [Free EU AI Act compliance checker](https://automatos.app/eu-ai-act/checker) — classify any AI system into prohibited / high / limited / minimal risk in 5 questions.
- Platform controls — an append-only audit log, human approval before anything publishes or spends, and risk classes with matching oversight.

## Research

- [Automatos Research](https://automatos.app/research) — original research on multi-agent coordination, semantic memory and orchestration.
- Semantic field memory — retrieval with provenance, not just vector search.

## Tools

- [llms.txt](https://studio.automatos.app/llms.txt) — AI-crawler-friendly index of the site.
- [llms-full.txt](https://studio.automatos.app/llms-full.txt) — full platform briefing for LLM context ingestion.
- [sitemap.xml](https://studio.automatos.app/sitemap.xml) — XML sitemap.
- [RSS feed](https://studio.automatos.app/rss.xml) — blog autodiscovery.

## Community

- [LinkedIn](https://www.linkedin.com/company/automatos-ai)
- [GitHub](https://github.com/AutomatosAI)
- [Twitter / X](https://twitter.com/AutomatosAI)

## Contributing

Pull requests are welcome. For new entries, please keep the description short, factual and link to a canonical source.

## License

This list is published under [CC0](https://creativecommons.org/publicdomain/zero/1.0/). Included projects retain their own licenses.
