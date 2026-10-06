import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  BookOpen,
  Database,
  FileText,
  HardDrive,
  LayoutGrid,
  Mic,
  Orbit,
  Palette,
  Plug,
  Share2,
  ShieldCheck,
  Store,
  Workflow,

  AppWindow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/*
  Everything you run in the Studio, on the OS. Facts only: no benchmark
  numbers. A card with an href links to its product page.
*/
type Tool = {
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  href?: string;
};

const tools: Tool[] = [
  {
    title: "Auto & agents",
    description: "Tell Auto what you need. It hands the work to the right agent and comes back with the result or a question.",
    icon: Bot,
    tags: ["One voice", "Any model"],
    href: "/auto",
  },
  {
    title: "Command Centre",
    description: "Summary, board, calendar, questions, activity and governance. Every job is a ticket you can see and steer.",
    icon: LayoutGrid,
    tags: ["Board", "Calendar", "Questions"],
    href: "/command-centre",
  },
  {
    title: "Brand kit",
    description: "Colours, type scale, logo rules, voice and sign-off, set once. Every document and post renders from it, and the brand board shows it on one page.",
    icon: Palette,
    tags: ["Brand board", "Contrast checked"],
    href: "/documents",
  },
  {
    title: "Documents & templates",
    description: "Invoices, letters, proposals, reports and spreadsheets from branded starters. A document with a missing field is never sent.",
    icon: FileText,
    tags: ["PDF", "Word", "Excel"],
    href: "/documents",
  },
  {
    title: "Socials",
    description: "Plan a cadence, keep a bank of real facts, make posts on the day and publish what you approve to five channels.",
    icon: Share2,
    tags: ["Plans", "Approve", "Publish"],
    href: "/socials",
  },
  {
    title: "Missions & playbooks",
    description: "Big work split across agents in parallel, or a routine written down once and run on a schedule.",
    icon: Workflow,
    tags: ["Missions", "Playbooks", "Schedules"],
    href: "/auto",
  },
  {
    title: "Analytics",
    description: "Cost per agent, cost per decision, plan usage, and recommendations on what to fix next.",
    icon: BarChart3,
    tags: ["Costs", "Usage", "Recommendations"],
    href: "/command-centre",
  },
  {
    title: "Harness",
    description: "Governance, budgets and standards. Approvals for anything unclassified, a deny list on money actions, and caps per plan.",
    icon: ShieldCheck,
    tags: ["Approvals", "Budgets", "Audit"],
    href: "/command-centre",
  },
  {
    title: "Knowledge & RAG",
    description: "Your documents, searched by meaning and by keyword. Agents cite what they used. Their own output stays out unless you add it.",
    icon: BookOpen,
    tags: ["Hybrid search", "Citations"],
  },
  {
    title: "Memory & graphs",
    description: "Agents remember preferences and history across threads, and a knowledge graph links people, companies and work.",
    icon: Orbit,
    tags: ["Memory", "Knowledge graph"],
  },
  {
    title: "NL2SQL",
    description: "Ask your database a question in plain words. \"How many new customers last month?\" No SQL needed.",
    icon: Database,
    tags: ["Ask your data"],
  },
  {
    title: "Workspace files",
    description: "Every output lands in your workspace with a share link: documents, renders, reports and session files.",
    icon: HardDrive,
    tags: ["Deliverables", "Share links"],
  },
  {
    title: "Marketplace",
    description: "Install a package and get its agents, playbooks and setup together. Share what you build.",
    icon: Store,
    tags: ["Packages", "Agents", "Playbooks"],
    href: "/marketplace",
  },
  {
    title: "Integrations",
    description: "Over a thousand apps through your own accounts, plus Telegram, Slack, Discord and WhatsApp channels.",
    icon: Plug,
    tags: ["Your accounts", "Channels"],
    href: "/integrations",
  },
  {
    title: "Widgets",
    description: "Chat and blog widgets for your site or store, in your brand, driven by the same OS.",
    icon: AppWindow,
    tags: ["Chat", "Blog", "Shopify"],
  },
  {
    title: "Voice & CodeGraph",
    description: "Talk to your agents and hear them back. Index a codebase so agents can trace and review it.",
    icon: Mic,
    tags: ["Voice", "Code"],
  },
];

const Card = ({ tool, index }: { tool: Tool; index: number }) => {
  const Icon = tool.icon;
  const body = (
    <>
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <h3 className="text-lg leading-tight flex-1">{tool.title}</h3>
        {tool.href && (
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-4 flex-grow">{tool.description}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tool.tags.map((tag) => (
          <span key={tag} className="text-xs bg-secondary px-2 py-1 rounded-md text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
    </>
  );
  const cls =
    "group bg-card border border-border rounded-2xl p-6 hover:border-foreground/30 transition-all duration-300 flex flex-col h-full";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="h-full"
    >
      {tool.href ? (
        <Link to={tool.href} className={cls}>
          {body}
        </Link>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </motion.div>
  );
};

export const ToolsSection = () => {
  return (
    <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-accent font-mono text-sm">04</span>
          <span className="text-muted-foreground text-sm">Studio</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4">
            The Automatos <span className="brand-line">Studio</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you run your business with, in one place, on one OS.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <Card key={tool.title} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
