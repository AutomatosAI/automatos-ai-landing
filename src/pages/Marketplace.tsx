import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  Workflow,
  Sparkles,
  Brain,
  Clock,
  Zap,
  MousePointerClick,
  User,
  Headphones,
  Server,
  Share2,
  Calculator,
  ShoppingCart,
  PenTool,
  Users,
  BarChart3,
  Store,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────

const featuredAgents = [
  {
    name: "Sales Prospector",
    description: "Finds, qualifies and scores leads automatically using your CRM and email.",
    category: "Sales & CRM",
    tools: [
      { name: "HubSpot", logo: "/logos/HubSpot.png" },
      { name: "LinkedIn", logo: "/logos/Linkedin.png" },
      { name: "Gmail", logo: "/logos/Gmail.png" },
    ],
    model: "Llama 3.3 70B",
    installs: "2.4k",
  },
  {
    name: "Bookkeeper",
    description: "Categorises transactions, reconciles accounts and generates monthly P&L reports.",
    category: "Finance",
    tools: [
      { name: "QuickBooks", logo: "/logos/Quickbooks.png" },
      { name: "Google Sheets", logo: "/logos/GoogleSheets.png" },
      { name: "Stripe", logo: "/logos/Stripe.png" },
    ],
    model: "Llama 3.3 70B",
    installs: "1.8k",
  },
  {
    name: "SEO Strategist",
    description: "Keyword analysis, on-page SEO audits and content briefs — on autopilot.",
    category: "Marketing",
    tools: [
      { name: "Google Drive", logo: "/logos/GoogleDrive.png" },
      { name: "Notion", logo: "/logos/Notion.png" },
      { name: "Slack", logo: "/logos/Slack.png" },
    ],
    model: "Claude 3.5 Sonnet",
    installs: "1.5k",
  },
  {
    name: "Client Success Manager",
    description: "Proactive health monitoring, churn scoring and re-engagement emails.",
    category: "Customer Success",
    tools: [
      { name: "HubSpot", logo: "/logos/HubSpot.png" },
      { name: "Intercom", logo: "/logos/Intercom.png" },
      { name: "Gmail", logo: "/logos/Gmail.png" },
    ],
    model: "Claude 3.5 Sonnet",
    installs: "1.2k",
  },
  {
    name: "Bug Triage Agent",
    description: "Analyses issues, finds root causes in code and assigns to the right team.",
    category: "Engineering",
    tools: [
      { name: "Jira", logo: "/logos/Jira.png" },
      { name: "GitHub", logo: "/logos/GitHub.png" },
      { name: "Sentry", logo: "/logos/Sentry.png" },
    ],
    model: "Claude 3.5 Sonnet",
    installs: "980",
  },
  {
    name: "Research Analyst",
    description: "Web research, synthesis and reporting — delivered straight to your docs.",
    category: "Research",
    tools: [
      { name: "Google Docs", logo: "/logos/GoogleDocs.png" },
      { name: "Notion", logo: "/logos/Notion.png" },
    ],
    model: "DeepSeek R1",
    installs: "870",
  },
];

const categories = [
  { name: "Personal Assistant", icon: User },
  { name: "Customer Support", icon: Headphones },
  { name: "DevOps", icon: Server },
  { name: "Social Media", icon: Share2 },
  { name: "Accounting", icon: Calculator },
  { name: "E-commerce", icon: ShoppingCart },
  { name: "Content Creation", icon: PenTool },
  { name: "HR & Recruiting", icon: Users },
  { name: "Data Analysis", icon: BarChart3 },
  { name: "Sales & CRM", icon: Store },
];

const recipes = [
  {
    name: "Morning Business Briefing",
    description: "Daily at 7 AM: emails, CRM changes, and KPI snapshot aggregated into one brief.",
    trigger: "scheduled",
    tools: ["Gmail", "HubSpot", "GoogleSheets", "Slack"],
  },
  {
    name: "New Lead Qualification & Meeting Booking",
    description: "On new HubSpot lead: enriches with LinkedIn, scores, and books a meeting if qualified.",
    trigger: "event",
    tools: ["HubSpot", "Linkedin", "Calendly", "Gmail"],
  },
  {
    name: "GitHub PR Security & Quality Gate",
    description: "On new PR: scans for vulnerabilities, reviews code quality, blocks on critical findings.",
    trigger: "event",
    tools: ["GitHub", "Jira", "Slack"],
  },
  {
    name: "Inbox Zero Email Processor",
    description: "Categorises emails by priority, routes to Slack channels, creates tasks for follow-ups.",
    trigger: "manual",
    tools: ["Gmail", "Slack", "Todoist"],
  },
  {
    name: "Weekly Expense Reconciliation",
    description: "Friday 4 PM: scans receipts, reconciles against QuickBooks, flags discrepancies.",
    trigger: "scheduled",
    tools: ["Gmail", "Quickbooks", "GoogleSheets"],
  },
];

const triggerBadge: Record<string, { label: string; icon: typeof Clock }> = {
  scheduled: { label: "Scheduled", icon: Clock },
  event: { label: "Event Triggered", icon: Zap },
  manual: { label: "On Demand", icon: MousePointerClick },
};

const integrationLogos = [
  "Gmail", "Slack", "HubSpot", "Salesforce", "GoogleDrive", "Dropbox",
  "Notion", "Jira", "GitHub", "Stripe", "Zapier", "Intercom",
  "Mailchimp", "Calendly", "Discord", "Asana", "Trello", "Shopify",
  "Zendesk", "Figma", "Airtable", "MongoDB", "AWS", "Twilio",
];

const llmProviders = [
  {
    name: "Anthropic",
    logo: "/logos/Anthropic.png",
    models: ["Claude 3.5 Sonnet", "Claude 3 Haiku"],
    badge: "Premium",
  },
  {
    name: "Meta",
    logo: "/logos/Facebook.png",
    models: ["Llama 3.3 70B", "Llama 3.1 8B"],
    badge: "Open Source",
  },
  {
    name: "DeepSeek",
    logo: "/logos/Deepl.png",
    models: ["DeepSeek R1"],
    badge: "Reasoning",
  },
  {
    name: "OpenAI",
    logo: "/logos/OpenAI.png",
    models: ["GPT-4o", "GPT-4o Mini"],
    badge: "Popular",
  },
];

const useCases = [
  {
    name: "Patricia",
    role: "Marketing Agency Owner",
    team: "5-person team",
    story: "Patricia replaced 3 separate SaaS tools with Automatos agents. Her SEO Strategist agent generates content briefs, the Email Marketing Specialist runs campaigns, and the Competitive Intelligence agent monitors rivals — all working together autonomously.",
    agents: ["SEO Strategist", "Email Marketing Specialist", "Competitive Intelligence"],
    result: "60% less time on routine marketing tasks",
  },
  {
    name: "Budstacks.io",
    role: "Cannabis SaaS Platform",
    team: "Growing startup",
    story: "Budstacks.io integrated Automatos across their platform — SEO agents drive organic traffic, Automatos Widgets power customer-facing AI, compliance agents monitor regulatory changes, and analytics agents surface insights from their data.",
    agents: ["SEO Strategist", "Customer Service Agent", "Compliance Monitor", "Analytics Agent"],
    result: "5 workflows automated across the platform",
  },
  {
    name: "James",
    role: "Freelance Consultant",
    team: "Solo operator",
    story: "James uses the Calendar Optimizer and Research Analyst agents to reclaim 10+ hours per week. The Inbox Zero recipe keeps his email under control while he focuses on client work.",
    agents: ["Calendar Optimizer", "Research Analyst", "Inbox Zero Recipe"],
    result: "10+ hours reclaimed per week",
  },
];

// ── Interactive Background ─────────────────────────────────────────────

const InteractiveBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);
    return () => container?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mp-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mp-grid)" />
      </svg>
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/30 blur-xl"
          style={{
            width: 80 + i * 20,
            height: 80 + i * 20,
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            x: [0, 30 * (i % 2 === 0 ? 1 : -1), 0],
            y: [0, 20 * (i % 2 === 0 ? -1 : 1), 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={i}
            d={`M ${-100 + i * 50} ${300 + i * 30} Q ${200 + i * 100} ${100 - i * 20} ${500 + i * 50} ${250 + i * 40}`}
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: i * 0.3, ease: "easeInOut" }}
          />
        ))}
      </svg>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/30 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/20 to-transparent rounded-tr-full" />
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main className="pt-24 pb-16">

        {/* ── Hero Header ──────────────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Store className="w-4 h-4" />
                <span>Marketplace</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Pre-Built Agents, <span className="text-primary">[Ready to Deploy]</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Explore agents, recipes, integrations and LLMs built by our team and the community. Install in one click, customise to fit your workflow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center gap-4 pt-2"
            >
              <a href="/marketplace">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-6 text-base">
                  Explore Marketplace
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <a href="#featured-agents">
                <Button variant="ghost" className="text-foreground hover:bg-muted rounded-full px-6 py-6 text-base">
                  See What's Available
                </Button>
              </a>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex items-center justify-center gap-8 pt-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-primary" />
                <span><strong className="text-foreground">18+</strong> Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4 text-primary" />
                <span><strong className="text-foreground">15+</strong> Recipes</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span><strong className="text-foreground">850+</strong> Integrations</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" />
                <span><strong className="text-foreground">400+</strong> LLMs</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Featured Agents ──────────────────────────── */}
        <section id="featured-agents" className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-primary font-mono text-sm">01</span>
            <span className="text-muted-foreground text-sm">Featured Agents</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Ready-Made AI Workers</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Install an agent in one click. Each one comes pre-configured with the right tools, model and skills.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAgents.map((agent, index) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs text-primary font-medium">{agent.category}</span>
                    <h3 className="text-lg font-semibold mt-1">{agent.name}</h3>
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-1">
                    {agent.installs} installs
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{agent.description}</p>

                {/* Tool logos */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-muted-foreground mr-1">Tools:</span>
                  {agent.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="w-7 h-7 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center p-1"
                      title={tool.name}
                    >
                      <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>

                {/* Model */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Brain className="w-3.5 h-3.5" />
                  <span>{agent.model}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Browse by Category ───────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-primary font-mono text-sm">02</span>
            <span className="text-muted-foreground text-sm">Categories</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Whatever your department, there's an agent built for it.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <motion.a
                  key={cat.name}
                  href="/marketplace"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-center">{cat.name}</span>
                </motion.a>
              );
            })}
          </div>
        </section>

        {/* ── Recipes ──────────────────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-primary font-mono text-sm">03</span>
            <span className="text-muted-foreground text-sm">Recipes</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Workflow Recipes</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Multi-step automations that combine agents, tools and triggers. Install a recipe and it runs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => {
              const badge = triggerBadge[recipe.trigger];
              const BadgeIcon = badge.icon;
              return (
                <motion.div
                  key={recipe.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
                >
                  {/* Trigger badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      <BadgeIcon className="w-3 h-3" />
                      {badge.label}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{recipe.description}</p>

                  {/* Tool logos */}
                  <div className="flex items-center gap-2">
                    {recipe.tools.map((tool) => (
                      <div
                        key={tool}
                        className="w-7 h-7 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center p-1"
                        title={tool}
                      >
                        <img src={`/logos/${tool}.png`} alt={tool} className="w-full h-full object-contain" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Integrations Marquee ─────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-primary font-mono text-sm">04</span>
            <span className="text-muted-foreground text-sm">Integrations</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">850+ Apps Connected</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Gmail, Salesforce, Slack, GitHub — your agents plug into the tools you already use.
            </p>
          </motion.div>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex animate-marquee items-center opacity-80 hover:opacity-100 transition-opacity">
              {[...integrationLogos, ...integrationLogos, ...integrationLogos].map((name, index) => (
                <motion.div
                  key={`${name}-${index}`}
                  whileHover={{ scale: 1.1 }}
                  className="flex-shrink-0 mx-4"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl flex items-center justify-center hover:border-primary/50 hover:bg-card/80 transition-all p-3 shadow-sm">
                    <img
                      src={`/logos/${name}.png`}
                      alt={name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LLM Models ───────────────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-primary font-mono text-sm">05</span>
            <span className="text-muted-foreground text-sm">Models</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Choose Your Intelligence</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              400+ language models from leading providers. Pick the right brain for every task.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {llmProviders.map((provider, index) => (
              <motion.div
                key={provider.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center p-2.5 mx-auto mb-4">
                  <img src={provider.logo} alt={provider.name} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{provider.name}</h3>
                <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                  {provider.badge}
                </div>
                <div className="space-y-1">
                  {provider.models.map((model) => (
                    <p key={model} className="text-sm text-muted-foreground">{model}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Use Cases ────────────────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-primary font-mono text-sm">06</span>
            <span className="text-muted-foreground text-sm">Use Cases</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">How Teams Use Automatos</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From solo operators to growing teams — see how real users build their AI workforce.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((uc, index) => (
              <motion.div
                key={uc.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-300"
              >
                {/* Person */}
                <div className="mb-5">
                  <h3 className="text-lg font-semibold">{uc.name}</h3>
                  <p className="text-sm text-primary">{uc.role}</p>
                  <p className="text-xs text-muted-foreground">{uc.team}</p>
                </div>

                {/* Story */}
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed italic">
                  "{uc.story}"
                </p>

                {/* Agents used */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {uc.agents.map((agent) => (
                    <span
                      key={agent}
                      className="text-xs px-2 py-1 rounded-full bg-muted border border-border/50"
                    >
                      {agent}
                    </span>
                  ))}
                </div>

                {/* Result */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium text-primary">{uc.result}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl">
          <div className="relative bg-card border border-primary/20 rounded-2xl p-12 md:p-24 overflow-hidden text-center">
            <InteractiveBackground />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-semibold mb-6">
                Start Building Your AI Workforce
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Browse the full marketplace, install agents in one click, and have your workflows running in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/marketplace">
                  <Button size="lg" className="rounded-full px-8 text-base bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                    Explore Marketplace
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a href="#waitlist">
                  <Button variant="outline" size="lg" className="rounded-full px-8 text-base border-primary/20 hover:bg-primary/5 bg-background/50 backdrop-blur-sm">
                    Get Started Free
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
