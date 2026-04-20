# Awesome Automatos AI [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of resources, skills, templates, agents and community projects for the [Automatos AI](https://automatos.app) multi-agent orchestration platform.

Automatos AI is a multi-tenant SaaS platform for building and deploying autonomous AI agents — agents, skills, playbooks, missions, a marketplace, compliance posture, and semantic field memory all in one place.

---

## Contents

- [Platform](#platform)
- [Skills](#skills)
- [Agents](#agents)
- [Workspace templates](#workspace-templates)
- [Integrations](#integrations)
- [Compliance](#compliance)
- [Research](#research)
- [Tools](#tools)
- [Comparisons](#comparisons)
- [Community](#community)

---

## Platform

- [Automatos AI](https://automatos.app) — the platform.
- [Product guides](https://automatos.app/design-your-agents) — design agents, connect your world, empower with knowledge, launch missions.
- [Marketplace](https://automatos.app/marketplace) — install agents, skills, plugins and full workspace templates in one click.
- [Widget API](https://automatos.app/blog) — serve agent-generated content into any site with no CMS.

## Skills

The [automatos-skills](https://github.com/AutomatosAI/automatos-skills) repository is the canonical skills library — 128 skills organised into 16 top-level groups.

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

## Workspace templates

Workspace templates bundle agents, skills, plugins, missions and dashboards into a one-click install. The first template is **Shopify** — 16 agents, 32 skills, ready for any Shopify store.

- Shopify template — merchandiser, inventory, customer support, marketer, analyst and more.
- More templates coming — SaaS operator, content studio, consulting practice.

## Integrations

Automatos AI integrates with 100+ tools via the [Composio](https://composio.dev) SDK plus native connectors:

- Gmail, Slack, Jira, Google Calendar, LinkedIn, Twitter, TikTok, Shopify, Stripe, GitHub, Linear, Notion, Airtable…
- Bring-your-own-key for any LLM provider (OpenAI, Anthropic, Google, OpenRouter, AWS Bedrock, Azure, Groq, HuggingFace).
- Embed any Composio toolkit as a skill — see [`integrations/`](https://github.com/AutomatosAI/automatos-skills/tree/main/integrations).

## Compliance

- [EU AI Act posture](https://automatos.app/eu-ai-act) — how Automatos AI maps to Articles 5, 9, 10, 12, 13, 14, 15, 50, 71 and 73.
- [Free EU AI Act compliance checker](https://automatos.app/eu-ai-act/checker) — classify any AI system into prohibited / high / limited / minimal risk in 5 questions.
- Platform controls — tamper-evident logs, human approval gates, risk tiering on every agent/skill/mission, Compliance Pack for auditor share links.

## Research

- [Automatos Research](https://automatos.app/research) — original research on multi-agent coordination, semantic memory and orchestration.
- Semantic field memory — retrieval with provenance, not just vector search.

## Tools

- [llms.txt](https://automatos.app/llms.txt) — AI-crawler-friendly index of the site.
- [llms-full.txt](https://automatos.app/llms-full.txt) — full platform briefing for LLM context ingestion.
- [sitemap.xml](https://automatos.app/sitemap.xml) — XML sitemap.
- [RSS feed](https://automatos.app/rss.xml) — blog autodiscovery.

## Comparisons

- [Automatos AI vs LangChain](https://automatos.app/blog/automatos-vs-langchain) — framework vs platform.
- [Automatos AI vs CrewAI vs AutoGen](https://automatos.app/blog/automatos-vs-crewai-autogen) — multi-agent orchestration head-to-head.
- [How to build a Shopify AI agent](https://automatos.app/blog/how-to-build-a-shopify-ai-agent) — the template walkthrough.

## Community

- [LinkedIn](https://www.linkedin.com/company/automatos-ai)
- [GitHub](https://github.com/AutomatosAI)
- [YouTube](https://www.youtube.com/@AutomatosAI)
- [Twitter / X](https://twitter.com/AutomatosAI)

## Contributing

Pull requests are welcome. For new entries, please keep the description short, factual and link to a canonical source.

## License

This list is published under [CC0](https://creativecommons.org/publicdomain/zero/1.0/). Included projects retain their own licenses.
