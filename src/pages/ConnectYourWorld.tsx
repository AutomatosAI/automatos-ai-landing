import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo/SEO";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data";
import {
  Plug,
  Link,
  Shield,
  Mail,
  Code,
  Briefcase,
  Users,
  BarChart3,
  ShoppingCart,
  HardDrive,
  Database,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Zap,
  Clock,
  Lock,
  Key,
  Webhook,
  Bell,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const stepsData = [
  {
    step: "Connect",
    description:
      "Authenticate via OAuth or API key. One click for most apps.",
    icon: Link,
  },
  {
    step: "Assign",
    description:
      "Choose which agents get access to which tools.",
    icon: Users,
  },
  {
    step: "Automate",
    description:
      "Agents use tools automatically when relevant. The tool router decides when to invoke.",
    icon: Zap,
  },
];

const categories = [
  {
    name: "Developer Tools",
    apps: "GitHub, GitLab, Bitbucket, Linear",
    icon: Code,
  },
  {
    name: "Productivity",
    apps: "Slack, Microsoft Teams, Notion, Asana",
    icon: Briefcase,
  },
  {
    name: "CRM",
    apps: "Salesforce, HubSpot, Pipedrive",
    icon: Users,
  },
  {
    name: "Email",
    apps: "Gmail, Outlook, SendGrid",
    icon: Mail,
  },
  {
    name: "Analytics",
    apps: "Datadog, PagerDuty, Sentry",
    icon: BarChart3,
  },
  {
    name: "E-commerce",
    apps: "Stripe, Shopify",
    icon: ShoppingCart,
  },
  {
    name: "Storage",
    apps: "Dropbox, Google Drive, S3",
    icon: HardDrive,
  },
  {
    name: "Databases",
    apps: "PostgreSQL, MySQL, MongoDB",
    icon: Database,
  },
];

const pipelineSteps = [
  {
    label: "Tool Request",
    detail: "Agent determines it needs an external action",
    icon: MessageSquare,
  },
  {
    label: "Registry Lookup",
    detail: "Find the right tool by name",
    icon: Database,
  },
  {
    label: "Parameter Validation",
    detail: "Pydantic schema validation",
    icon: CheckCircle2,
  },
  {
    label: "Credential Resolution",
    detail: "Secure credential injection",
    icon: Key,
  },
  {
    label: "Tool Execution",
    detail: "Async execution with timeout handling",
    icon: Zap,
  },
  {
    label: "Result Formatting",
    detail: "Standardized response format",
    icon: Code,
  },
  {
    label: "Return to Agent",
    detail: "Agent continues with the result",
    icon: ArrowRight,
  },
];

const channels = [
  { name: "Telegram", auth: "Bot Token" },
  { name: "Slack", auth: "OAuth" },
  { name: "WhatsApp", auth: "Business API" },
  { name: "Discord", auth: "Bot Token" },
  { name: "Microsoft Teams", auth: "OAuth" },
  { name: "Google Chat", auth: "Service Account" },
  { name: "iMessage", auth: "Webhook" },
  { name: "Matrix", auth: "Access Token" },
  { name: "Signal", auth: "Webhook" },
];

const webhookTriggers = [
  {
    platform: "Jira",
    events: ["Issue created", "Issue updated", "Sprint started"],
    icon: Bell,
  },
  {
    platform: "GitHub",
    events: ["Push to branch", "PR opened", "Issue filed"],
    icon: Code,
  },
  {
    platform: "Slack",
    events: ["Message posted", "Reaction added"],
    icon: MessageSquare,
  },
];

const securityFeatures = [
  "OAuth auto-refresh and API key storage",
  "Credential expiry warnings",
  "Permission scope management",
  "Access audit logging",
  "Credential rotation and testing",
];

const cronExamples = [
  { pattern: "0 9 * * 1-5", label: "Weekdays at 9 AM" },
  { pattern: "0 */6 * * *", label: "Every 6 hours" },
  { pattern: "0 0 * * 0", label: "Weekly on Sunday" },
  { pattern: "*/30 * * * *", label: "Every 30 minutes" },
];

const ConnectYourWorld = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Connect Your World"
        description="Plug Automatos AI agents into 850+ apps — Gmail, Slack, LinkedIn, GitHub, Shopify, Stripe, Notion, Google Drive, Salesforce, HubSpot and more — via Composio and native integrations."
        path="/connect-your-world"
        structuredData={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Connect Your World", url: "/connect-your-world" },
          ]),
          faqSchema([
            {
              question: "Which apps can Automatos AI agents connect to?",
              answer:
                "Over 850 apps including Gmail, Slack, LinkedIn, GitHub, Shopify, Stripe, Notion, Google Drive, Google Calendar, Salesforce, HubSpot, Airtable, Jira, Linear, Discord, and most major SaaS tools via Composio. Native workspace tools handle file I/O, git and shell.",
            },
            {
              question: "How do tool integrations work?",
              answer:
                "Agents call Composio-backed tools through the unified tool executor. OAuth or API key connection is done once per workspace, then any agent assigned that tool can use it. All calls are logged and respect workspace isolation.",
            },
            {
              question: "Can I add a custom integration?",
              answer:
                "Yes. Enterprise customers can ship custom tools via the plugin system; community authors can publish plugins to the marketplace.",
            },
          ]),
        ]}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <motion.div {...fadeUp} className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Plug className="w-4 h-4" />
              Connect Your World
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              One Platform, <span className="text-primary">[1,000+ Apps]</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Your agents work where you work. Gmail, Slack, GitHub, Salesforce
              — connect your entire tech stack with a single click.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "1,000+ Apps",
                "12,000+ Actions",
                "9 Messaging Channels",
                "OAuth & API Key Auth",
              ].map((stat) => (
                <span
                  key={stat}
                  className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium"
                >
                  {stat}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Section 01 — How Connections Work */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <motion.div {...fadeUp}>
            <span className="text-primary font-mono text-sm">01</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Connect in Three Steps
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {stepsData.map((item, i) => (
              <motion.div
                key={item.step}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.step}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-12">
            <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground text-sm text-center">
                [IMAGE: Screenshot of the Tools &amp; Integrations page showing
                the connected apps grid]
              </p>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="mt-8 p-6 rounded-2xl bg-muted/50 border border-border"
          >
            <h4 className="font-semibold mb-2">Tool Registry Pattern</h4>
            <p className="text-muted-foreground">
              Define a tool once and use it everywhere — agents, workflows,
              APIs, and chat. The registry ensures consistent parameter
              schemas, authentication, and logging across every execution
              surface.
            </p>
          </motion.div>
        </section>

        {/* Section 02 — App Categories */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <motion.div {...fadeUp}>
            <span className="text-primary font-mono text-sm">02</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Every Tool Your Business Needs
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <cat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">{cat.apps}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-12">
            <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground text-sm text-center">
                [IMAGE: Screenshot showing app category filters with counts (api
                services 67, api 51, crm 41, etc.)]
              </p>
            </div>
          </motion.div>
        </section>

        {/* Section 03 — Tool Execution Pipeline */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <motion.div {...fadeUp}>
            <span className="text-primary font-mono text-sm">03</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Intelligent Tool Routing
            </h2>
          </motion.div>
          <div className="mt-10 max-w-2xl mx-auto space-y-4">
            {pipelineSteps.map((step, i) => (
              <motion.div
                key={step.label}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-mono text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-semibold">{step.label}</h4>
                  <p className="text-sm text-muted-foreground">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeUp}
            className="mt-8 p-6 rounded-2xl bg-muted/50 border border-border max-w-2xl mx-auto"
          >
            <p className="text-muted-foreground text-sm">
              Every execution is logged with input/output, timing, token usage,
              cost, and cache hit status — giving you full observability into
              what your agents are doing and why.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="mt-8 max-w-2xl mx-auto">
            <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground text-sm text-center">
                [IMAGE: Screenshot of tool execution logs showing action names,
                status, and timing]
              </p>
            </div>
          </motion.div>
        </section>

        {/* Section 04 — Messaging Channels */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <motion.div {...fadeUp}>
            <span className="text-primary font-mono text-sm">04</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Meet Your Users Where They Are
            </h2>
            <p className="text-muted-foreground max-w-2xl mt-2">
              Same agents, same tools, same knowledge — accessible from 9
              messaging platforms. Messages are routed through the Universal
              Router using the same multi-tier routing as chat: cache, rules,
              semantic, then LLM.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {channels.map((ch, i) => (
              <motion.div
                key={ch.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold">{ch.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Auth: {ch.auth}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-12">
            <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground text-sm text-center">
                [IMAGE: Screenshot of Channel configuration panel in Settings]
              </p>
            </div>
          </motion.div>
        </section>

        {/* Section 05 — Webhook Triggers */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <motion.div {...fadeUp}>
            <span className="text-primary font-mono text-sm">05</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              React to Events in Real-Time
            </h2>
            <p className="text-muted-foreground max-w-2xl mt-2">
              External events can automatically trigger playbooks. Combine
              webhooks with cron scheduling for recurring tasks like daily
              reports, weekly audits, and hourly monitoring.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {webhookTriggers.map((trigger, i) => (
              <motion.div
                key={trigger.platform}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <trigger.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {trigger.platform}
                </h3>
                <ul className="space-y-2">
                  {trigger.events.map((event) => (
                    <li
                      key={event}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Webhook className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      {event}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeUp}
            className="mt-10 p-6 rounded-2xl bg-muted/50 border border-border"
          >
            <h4 className="font-semibold mb-4">Common Cron Patterns</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cronExamples.map((cron) => (
                <div
                  key={cron.pattern}
                  className="p-3 rounded-xl bg-background border border-border"
                >
                  <code className="text-xs font-mono text-primary block mb-1">
                    {cron.pattern}
                  </code>
                  <span className="text-xs text-muted-foreground">
                    {cron.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Section 06 — Security & Credentials */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <motion.div {...fadeUp}>
            <span className="text-primary font-mono text-sm">06</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Enterprise-Grade Security
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-10 mt-10 items-start">
            <motion.div {...fadeUp}>
              <ul className="space-y-4">
                {securityFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Shield className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex items-center justify-center min-h-[300px]">
                <p className="text-muted-foreground text-sm text-center">
                  [IMAGE: Screenshot of the Security tab in Tools showing auth
                  health and scopes]
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Connect Your Stack?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full">
                Start Connecting
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                Browse 1,000+ Apps
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ConnectYourWorld;
