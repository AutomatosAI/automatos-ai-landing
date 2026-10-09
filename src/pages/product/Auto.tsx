import { ProductPage } from "@/components/product/ProductPage";

const Auto = () => (
  <ProductPage
    path="/auto"
    seoTitle="Auto and your agents"
    seoDescription="Tell Auto what you need in plain words. Auto delegates to a team of agents, runs missions and playbooks, and brings back the result or the question."
    eyebrow="Auto & agents"
    headline="One voice to talk to."
    brandLine="A whole team behind it."
    lede="You don't learn Automatos. You tell Auto what you need, the way you'd tell a good office manager. Auto decides who does it, files the ticket, and brings back the result or the question."
    hero={{
      src: "/images/studio/01-auto-chat.png",
      alt: "Auto in chat making a branded invoice for a café, with questions from agents on the right",
      caption: "Chat · a branded invoice from one message, and the questions agents are asking on the right",
    }}
    sections={[
      {
        eyebrow: "Agents",
        title: "A roster, not a single bot.",
        body: "Writers, a Brand Designer, a Social Media Director, Shopify specialists, builders. Each has its own model, skills and tools, and runs on your own CLI subscription where it can.",
        points: [
          "Swap any agent's model in one click",
          "Skills and plugins from the marketplace",
          "Org chart, configuration and a success record per agent",
        ],
        shot: {
          src: "/images/studio/12-agents.png",
          alt: "Agent Management with the roster of agents",
          caption: "Agent Management · Roster",
        },
      },
      {
        eyebrow: "Missions, playbooks, plans, tasks",
        title: "Pick the shape of the work.",
        body: "A mission splits big work across several agents in parallel. A playbook is a routine written down once and run on a schedule. A plan is iterated with Auto before it starts. A task is one agent, one shot.",
        shot: {
          src: "/images/studio/14-missions.png",
          alt: "Assignments with Mission, Playbook, Plan and Task and the list of missions",
          caption: "Assignments · Missions",
        },
        flip: true,
      },
      {
        eyebrow: "Knowledge",
        title: "Auto reads your business before it writes.",
        body: "Documents, databases, code, a knowledge graph and memory, in one place. Sync Google Drive or Dropbox, search by meaning and by keyword, and agents cite what they used. Their own output stays out unless you add it.",
        points: [
          "RAG with hybrid search and citations",
          "NL2SQL over your own database",
          "CodeGraph and a knowledge graph of people, companies and work",
        ],
        shot: {
          src: "/images/studio/28-knowledge.png",
          alt: "The Knowledge Base",
          caption: "Knowledge Base · documents, database, CodeGraph, knowledge graph and memory",
        },
      },
    ]}
    runs={{
      title: "What Auto does without being asked twice",
      items: [
        "Routes a brand ask to the Brand Designer and a post to the Social Media Director",
        "Reads your brand kit before it writes, so the voice and sign-off are yours",
        "Files a ticket instead of pretending it did the work",
        "Reports back with the document, the link and what it checked",
        "Runs scheduled jobs: every Monday, the weekly report",
        "Asks when it doesn't know, instead of guessing",
      ],
    }}
    related={[
      { label: "Command Centre", href: "/command-centre" },
      { label: "Documents & templates", href: "/documents" },
      { label: "Marketplace", href: "/marketplace" },
    ]}
    ctaHeading={<>Tell Auto what you need. <span className="brand-line">Watch the board fill.</span></>}
    ctaSub="Join the waitlist. When your workspace opens, the first thing you'll do is talk to Auto."
  />
);

export default Auto;
