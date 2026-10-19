import type { Chapter } from "@/components/demos/frames/tour";

/* ProductTour chapters. Focus points and callouts are % of the capture (x, y); s is the zoom. */
export const CHAPTERS: Chapter[] = [
  {
    eyebrow: "Auto",
    title: "One message. A branded invoice.",
    desc: "You ask in plain words. Agents ask back only when they must.",
    href: "/auto",
    src: "/images/studio/01-auto-chat.png",
    alt: "Auto in chat making a branded invoice",
    focus: [{ x: 55, y: 22, s: 1.55 }, { x: 88, y: 45, s: 1.7 }],
    callouts: [{ x: 48, y: 13, text: "You ask in plain words" }, { x: 82, y: 36, text: "Agents’ questions wait here" }],
  },
  {
    eyebrow: "The board",
    title: "Every job a ticket. Nothing hidden.",
    desc: "Inbox to done, with the ones that need you flagged.",
    href: "/command-centre",
    src: "/images/studio/02-board.png",
    alt: "The Command Centre board",
    focus: [{ x: 40, y: 18, s: 1.6 }, { x: 70, y: 80, s: 1.7 }],
    callouts: [{ x: 38, y: 17, text: "124 need your eyes" }, { x: 72, y: 72, text: "Review, blocked, approval" }],
  },
  {
    /* 19 Oct 2026: was 06-deliverables.png, whose letterhead thumbnails show a personal phone number and email. */
    eyebrow: "Documents",
    title: "Templates your agents fill. One kit.",
    desc: "Invoices, letters, agreements and data sheets, each a complete branded layout.",
    href: "/documents",
    src: "/images/studio/22-template-editor.png",
    alt: "The Template Studio: branded agreement, data sheet, invoice and letter templates with the fields each one needs",
    focus: [{ x: 50, y: 40, s: 1.5 }, { x: 35, y: 65, s: 1.6 }],
    callouts: [{ x: 47, y: 30, text: "A brand board, drawn from your kit" }, { x: 20, y: 62, text: "Each template says what it needs" }],
  },
  {
    eyebrow: "Socials",
    title: "A plan that makes the posts on the day.",
    desc: "Planned, making, needs you, scheduled, posted.",
    href: "/socials",
    src: "/images/studio/09-socials.png",
    alt: "The Socials calendar with a running plan",
    focus: [{ x: 45, y: 85, s: 1.7 }, { x: 88, y: 70, s: 1.6 }],
    callouts: [{ x: 44, y: 82, text: "“Needs you” before it posts" }, { x: 80, y: 66, text: "A 7-day plan, running" }],
  },
];

export type OsModule = { name: string; title: string; body: string; points: string[] };

/* "What's underneath": draft copy from the design handoff, to review. */
export const OS_MODULES: OsModule[] = [
  {
    name: "Auto",
    title: "One voice to talk to.",
    body: "You tell Auto what you need, the way you’d tell a good office manager. Auto decides who does it, files the ticket, and brings back the result or the question.",
    points: ["Routes work to the right agent", "Reads your brand kit before it writes", "Asks when it doesn’t know"],
  },
  {
    name: "Agents",
    title: "A roster, not a single bot.",
    body: "Writers, a Brand Designer, a Social Media Director, Shopify specialists, builders. Each has its own model, skills and tools.",
    points: ["Swap any agent’s model in one click", "Skills and plugins from the marketplace", "A success record per agent"],
  },
  {
    name: "Memory",
    title: "Remembers how you work.",
    body: "Personal and agent memory: your preferences, your default channels, the team emails, the way you sign off.",
    points: ["Persists across runs", "Per-workspace, never shared", "Editable by you"],
  },
  {
    name: "RAG",
    title: "Reads your business before it writes.",
    body: "Documents, Drive and Dropbox, searched by meaning and by keyword. Agents cite what they used.",
    points: ["Hybrid search with citations", "Sync Google Drive or Dropbox", "Agent output stays out unless you add it"],
  },
  {
    name: "NL2SQL",
    title: "Ask your database in plain words.",
    body: "“How many new customers last month?” or “Sort best products by revenue.” No SQL needed.",
    points: ["Runs on your own database", "Shows the query it ran", "Read-only by default"],
  },
  {
    name: "Graphs",
    title: "People, companies and work, connected.",
    body: "A knowledge graph and CodeGraph map who, what and where, so agents keep context across jobs.",
    points: ["Knowledge graph of your world", "CodeGraph for your repos", "Relationships agents can follow"],
  },
  {
    name: "Analytics",
    title: "See what it costs and what it did.",
    body: "Runs, cache hits, cost per request and success rates, streaming live in the Command Centre.",
    points: ["Cost per request", "Mission success rates", "Deliverables per day"],
  },
  {
    name: "Harness",
    title: "Guardrails around every action.",
    body: "Budgets, approvals and an append-only audit log wrap every agent action. Anything that spends money or publishes waits for a person.",
    points: ["Stops cleanly at a budget", "Five risk classes, three levels of oversight", "Append-only audit log"],
  },
];
