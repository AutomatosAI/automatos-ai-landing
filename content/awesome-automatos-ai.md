# Awesome Automatos AI [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of resources, skills, templates, agents and community projects for the [Automatos AI](https://automatos.app) multi-agent orchestration platform.

Automatos OS is the open-source engine of Automatos AI for building and deploying autonomous AI agents, and Automatos Studio is the hosted app (hosted beta opens November 2026). Agents, skills, playbooks, missions, a marketplace, an EU AI Act posture (work in progress) and semantic field memory, all in one place.

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
- [Marketplace](https://studio.automatos.app/marketplace) — 100+ ready-made agents in the Studio marketplace, 400+ skills, 70+ plugins, 20+ Playbooks and 3 packages.
- [Widgets](https://studio.automatos.app/your-store) — serve agent-generated content into any site with no CMS.

## Skills

The [automatos-skills](https://github.com/AutomatosAI/automatos-skills) repository is the open automatos-skills library of 140 skills.

- [SKILL-GUIDE.md](https://github.com/AutomatosAI/automatos-skills/blob/main/SKILL-GUIDE.md) — the author's guide for writing a new skill.
- **Team personas** — SKILL.md personas in the library's `team/` folder: SENTINEL, SCOUT, HARPER, ECHO, ATLAS, FORGE, ORACLE, RALLY and PATCHER (`team/bug-fixer`). They are skills in the open library, not agents pre-installed in a workspace.
- **Domain packs** — Shopify & Commerce, Software Engineering, Quality / Security / Compliance, DevOps & SRE, Product & PM, Design & UX, Content & Editorial, Social Media, Marketing & Growth, Sales & Revenue, Analytics & BI, People & Ops, Research, Support, Integrations.

## Agents

- [The Automatos Team](https://github.com/AutomatosAI/automatos-skills/tree/main/team) — team personas as SKILL.md files; none is pre-installed in a workspace.
  - **SENTINEL** — infra watchdog (API health, deploys, cost anomalies).
  - **PATCHER** (`team/bug-fixer`) — end-to-end bug fixing (ticket → fix → PR).
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

- [EU AI Act posture](https://automatos.app/eu-ai-act) — EU AI Act work is in progress. Social posts wait for your approval before they publish, board work can be set to ask before it runs, and every action lands in an append-only audit log, all in the product today. The Article 50 notices and the marking of generated media are in the product too.
- [Free EU AI Act compliance checker](https://automatos.app/eu-ai-act/checker) — classify any AI system into prohibited / high / limited / minimal risk in 5 questions.
- Platform controls — an append-only audit log, social posts that wait for your approval before they publish, board work that can be set to ask before it runs, and risk classes with matching oversight when the policy plane is switched on.

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
