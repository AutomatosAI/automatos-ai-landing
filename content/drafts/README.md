# Blog draft queue

Markdown drafts that are ready to be published through the Automatos
blog CMS (widget API). They are checked into the landing repo so they
are versioned and reviewable as PRs before going live.

## Workflow

1. Copy the body of a draft into the blog CMS.
2. Match the frontmatter fields to the CMS form (title, slug, excerpt,
   category, tags, cover image, author).
3. Publish.
4. The next deploy of the landing site regenerates `public/sitemap.xml`
   and `public/rss.xml` via `scripts/generate-feeds.mjs`.

## Current drafts

- `automatos-vs-langchain.md` — framework vs platform comparison
- `automatos-vs-crewai-autogen.md` — multi-agent head-to-head
- `how-to-build-a-shopify-ai-agent.md` — tutorial / template walkthrough
