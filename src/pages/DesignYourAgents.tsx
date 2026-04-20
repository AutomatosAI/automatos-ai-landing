import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { SEO } from "@/components/seo/SEO";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data";
import {
  ArrowRight,
  Bot,
  Brain,
  Cpu,
  Settings,
  Wrench,
  Shield,
  FileText,
  Search,
  MessageSquare,
  Heart,
  BarChart3,
  Clock,
  Zap,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────

const modelCategories = [
  {
    title: "Reasoning Models",
    icon: Brain,
    models: "Claude, GPT-4, DeepSeek R1",
    bullets: [
      "Complex analysis and multi-step planning",
      "High accuracy on nuanced tasks",
      "Best for critical decision-making",
    ],
  },
  {
    title: "Fast & Efficient",
    icon: Zap,
    models: "Llama, Mistral, Gemini Flash",
    bullets: [
      "High throughput, lower cost per token",
      "Great for bulk processing tasks",
      "Sub-second response times",
    ],
  },
  {
    title: "Specialized",
    icon: Sparkles,
    models: "Vision, code-specific, multilingual",
    bullets: [
      "Task-optimized model variants",
      "Image understanding and generation",
      "Domain-specific fine-tuning",
    ],
  },
];

const configFeatures = [
  { icon: Bot, label: "Name & Description", detail: "Give your agent a clear identity and purpose" },
  { icon: FileText, label: "System Prompt", detail: "Define exactly how your agent thinks and responds" },
  { icon: MessageSquare, label: "Persona", detail: "Professional, Casual, Technical, or fully Custom" },
  { icon: Settings, label: "Temperature", detail: "Control creativity vs precision (0.0 to 1.0)" },
  { icon: Cpu, label: "Category", detail: "code_architect, security_expert, data_analyst, or custom" },
];

const templates = [
  { icon: CheckCircle2, name: "Code Reviewer", desc: "Reviews PRs, checks code quality, suggests improvements" },
  { icon: Shield, name: "QA Engineer", desc: "Test planning, validation, quality assurance" },
  { icon: Shield, name: "Sentinel", desc: "Security scanning, vulnerability detection, compliance audit" },
  { icon: FileText, name: "Scribe", desc: "Documentation, reports, meeting summaries" },
  { icon: Search, name: "Scout", desc: "Research, information gathering, competitive analysis" },
  { icon: MessageSquare, name: "Comms", desc: "Email workflows, communication management, notifications" },
];

const heartbeatFeatures = [
  { icon: Clock, label: "Periodic Background Cycles", detail: "Agents independently check for scheduled tasks" },
  { icon: BarChart3, label: "Kanban Task Lifecycle", detail: "inbox \u2192 assigned \u2192 in_progress \u2192 review \u2192 done" },
  { icon: Zap, label: "Cost-Efficient", detail: "Minimal context mode reduces token usage" },
  { icon: Settings, label: "Configurable Interval", detail: "Set how often each agent checks for work" },
];

const metrics = [
  { label: "Success Rate", unit: "%", icon: CheckCircle2 },
  { label: "Avg Response Time", unit: "ms", icon: Clock },
  { label: "Tasks Completed", unit: "with trends", icon: BarChart3 },
  { label: "Token Usage & Cost", unit: "$", icon: Sparkles },
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
    <div ref={containerRef} className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dya-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dya-grid)" />
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
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/30 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/20 to-transparent rounded-tr-full" />
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────

const DesignYourAgents = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Design Your Agents"
        description="Author specialised AI agents with roles, skills, tools and your choice of LLM — no code required. 300+ models, 850+ tool integrations, per-workspace memory."
        path="/design-your-agents"
        structuredData={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Design Your Agents", url: "/design-your-agents" },
          ]),
          faqSchema([
            {
              question: "Do I need to write code to create an AI agent on Automatos?",
              answer:
                "No. Agents are authored through the platform UI — choose a role, add skills, pick an LLM, equip tools and save. Developers can optionally define skills via the SKILL.md contract.",
            },
            {
              question: "Can a single Automatos agent use multiple LLMs?",
              answer:
                "Each agent has one primary LLM assignment, but workspaces can run heterogeneous teams — a GPT-powered researcher alongside a Claude-powered writer and a Grok-powered coder, for example.",
            },
            {
              question: "What is a skill in Automatos?",
              answer:
                "A skill is a reusable capability package defined by a SKILL.md contract (frontmatter, instructions, tool mappings). Skills inject into the agent's context at runtime with priority ordering and a token budget.",
            },
          ]),
        ]}
      />
      <Navbar />
      <main className="pt-24 pb-16">

        {/* ── Hero ──────────────────────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Bot className="w-4 h-4" />
                <span>Design Your Agents</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Build the <span className="text-primary">[Perfect]</span> AI Agent
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              From choosing the right brain to fine-tuning behavior — every agent is crafted to your exact specifications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-4 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" />
                <span><strong className="text-foreground">300+</strong> LLMs</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                <span><strong className="text-foreground">6</strong> Agent Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span><strong className="text-foreground">Custom</strong> Personas</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" />
                <span><strong className="text-foreground">Heartbeat</strong> System</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 01 Choose Your Model ─────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-primary font-mono text-sm">01</span>
            <span className="text-muted-foreground text-sm">Model Selection</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Pick the Right Brain for Every Task</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              300+ LLMs from OpenRouter, OpenAI, Anthropic, Google, and DeepSeek. Each model has different strengths — reasoning, coding, vision, speed, cost.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {modelCategories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{cat.title}</h3>
                  <p className="text-sm text-primary mb-4">{cat.models}</p>
                  <ul className="space-y-2">
                    {cat.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground text-sm text-center">[IMAGE: Screenshot of the LLM model selection grid in Settings &rarr; Models]</p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-center mt-6 max-w-2xl mx-auto"
          >
            Every model shows cost per token (input/output), context window size, and capability flags for reasoning, coding, and vision — so you always pick the right tool for the job.
          </motion.p>
        </section>

        {/* ── 02 Agent Configuration ───────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-primary font-mono text-sm">02</span>
            <span className="text-muted-foreground text-sm">Configuration</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Customize Every Detail</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Each agent has its own identity, model, persona, tools, and skills. Configure every aspect to match your workflow.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {configFeatures.map((feat, index) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * index }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-0.5">{feat.label}</h4>
                      <p className="text-sm text-muted-foreground">{feat.detail}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex items-center justify-center min-h-[300px]">
                <p className="text-muted-foreground text-sm text-center">[IMAGE: Screenshot of the Agent Details / Edit panel]</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 03 Agent Templates ───────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-primary font-mono text-sm">03</span>
            <span className="text-muted-foreground text-sm">Templates</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Start with Battle-Tested Templates</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Don't start from scratch. Choose from pre-built agent templates, then customize to fit your needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((tmpl, index) => {
              const Icon = tmpl.icon;
              return (
                <motion.div
                  key={tmpl.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * index }}
                  className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{tmpl.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{tmpl.desc}</p>
                  <Button variant="ghost" className="rounded-full text-primary hover:bg-primary/10 px-4 text-sm">
                    Use Template <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── 04 Tools & Skills ─────────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-primary font-mono text-sm">04</span>
            <span className="text-muted-foreground text-sm">Tools & Skills</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Equip Your Agents</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Agents can be assigned tools (external app integrations via Composio) and skills (specialized capabilities).
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Tools</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect apps like GitHub, Slack, and Gmail. Agents use them automatically when relevant. The tool router decides when to call tools based on conversation context.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Skills</h3>
              <p className="text-muted-foreground leading-relaxed">
                Add capabilities like code analysis, web search, database querying, and file operations. Skills give agents deeper expertise in specific domains.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground text-sm text-center">[IMAGE: Screenshot of the Agent's Tools tab showing assigned apps]</p>
            </div>
          </motion.div>
        </section>

        {/* ── 05 Heartbeat System ──────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-primary font-mono text-sm">05</span>
            <span className="text-muted-foreground text-sm">Heartbeat</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Agents That Work While You Sleep</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The heartbeat system lets agents run on a schedule, independently checking for work. Configure interval, scope, and minimal context mode to keep costs low.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {heartbeatFeatures.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * index }}
                  className="p-6 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold mb-1 text-sm">{feat.label}</h4>
                  <p className="text-xs text-muted-foreground">{feat.detail}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground text-sm text-center">[IMAGE: Screenshot of Heartbeat Settings in Agent Configuration]</p>
            </div>
          </motion.div>
        </section>

        {/* ── 06 Performance Tracking ──────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-primary font-mono text-sm">06</span>
            <span className="text-muted-foreground text-sm">Performance</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Measure What Matters</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every agent tracks its own performance metrics. Monitor success rates, response times, token usage, and costs.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {metrics.map((m, index) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * index }}
                  className="p-6 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold mb-1">{m.label}</h4>
                  <p className="text-xs text-muted-foreground">{m.unit}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground text-sm text-center">[IMAGE: Screenshot of Agent Performance metrics dashboard]</p>
            </div>
          </motion.div>
        </section>

        {/* ── CTA ──────────────────────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl">
          <div className="relative bg-card border border-primary/20 rounded-2xl p-12 md:p-24 overflow-hidden text-center">
            <InteractiveBackground />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-semibold mb-6">
                Ready to Design Your First Agent?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Choose a model, pick a template, assign tools — your custom AI agent is minutes away.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="rounded-full px-8 text-base bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <a href="/marketplace">
                  <Button variant="outline" size="lg" className="rounded-full px-8 text-base border-primary/20 hover:bg-primary/5 bg-background/50 backdrop-blur-sm">
                    View Marketplace
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

export default DesignYourAgents;
