import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  Target,
  ListTodo,
  Play,
  Calendar,
  MessageSquare,
  Webhook,
  Users,
  Network,
  LayoutDashboard,
  Activity,
  BarChart3,
  Clock,
  DollarSign,
  Pause,
  CheckCircle2,
  ArrowRight,
  Zap,
  GitBranch,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────

const lifecycleSteps = [
  { label: "Plan Pending", desc: "Agent creates an execution plan, awaiting your review" },
  { label: "Active", desc: "Agents executing the plan step by step" },
  { label: "Paused", desc: "Execution on hold (resumable with increased budget)" },
  { label: "Completed", desc: "All tasks finished successfully" },
  { label: "Cancelled", desc: "User stopped the mission" },
  { label: "Archived", desc: "Stored for historical reference" },
];

const decompositionPlan = [
  { step: "Initialize React project", tool: "create_react_app" },
  { step: "Create API client for stock data", tool: "write_file" },
  { step: "Build UI components", tool: "write_file" },
  { step: "Verify build passes", tool: "run_command" },
];

const executionStrategies = [
  { icon: ArrowRight, name: "Sequential", desc: "Strict dependency order (A \u2192 B \u2192 C)" },
  { icon: Zap, name: "Parallel", desc: "Independent tasks run simultaneously" },
  { icon: GitBranch, name: "Adaptive", desc: "System re-evaluates after each step based on results" },
];

const executionModes = [
  { icon: Play, name: "Manual", desc: "Click Run on the playbook card" },
  { icon: Calendar, name: "Scheduled", desc: "Cron-based (e.g., daily at 23:00)" },
  { icon: MessageSquare, name: "Chat-Triggered", desc: "Voice or text command activates it" },
  { icon: Webhook, name: "Webhook", desc: "External events (Jira issue, GitHub PR, Slack message)" },
];

const coordinationPatterns = [
  {
    icon: Users,
    name: "Hierarchical (Boss-Worker)",
    desc: "Boss delegates, workers execute, boss synthesises results",
  },
  {
    icon: Network,
    name: "Mesh (Peer-to-Peer)",
    desc: "Agents contribute expertise, peers review each other's work",
  },
  {
    icon: GitBranch,
    name: "Pipeline (Sequential)",
    desc: "Assembly line with context passing between stages",
  },
];

const dashboardCards = [
  { icon: Calendar, name: "Schedule", desc: "Weekly calendar with scheduled routines, upcoming tasks" },
  { icon: Activity, name: "Active Now", desc: "Tasks in progress with progress bars, elapsed time, step counts" },
  { icon: BarChart3, name: "Agent Reports", desc: "Each agent's latest report, status, last active time" },
  { icon: Zap, name: "Real-time Updates", desc: "Server-Sent Events (SSE) for live data streaming" },
];

const budgetFeatures = [
  { icon: DollarSign, name: "Per-task cost breakdown", desc: "Input/output token usage per step" },
  { icon: CheckCircle2, name: "Checkpoints", desc: "State snapshots at key milestones" },
  { icon: Pause, name: "Pause & resume", desc: "Adjust budget and continue execution" },
  { icon: Clock, name: "Time range selectors", desc: "View costs over 1 day, 7 days, or 30 days" },
];

// ── Shared animation ─────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const ImagePlaceholder = ({ label }: { label: string }) => (
  <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex items-center justify-center min-h-[300px]">
    <p className="text-muted-foreground text-sm text-center">[IMAGE: {label}]</p>
  </div>
);

// ── Component ────────────────────────────────────────────────────────

const LaunchMissions = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-16">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 max-w-7xl mb-24">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Rocket className="w-4 h-4" />
            Launch Missions &amp; Playbooks
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            From Goal to <span className="text-primary">[Done]</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Define an objective, launch a mission, and watch your agents plan, execute, verify,
            and auto-retry every step. Save what works as reusable playbooks.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {["Auto-Decomposition", "Multi-Agent Execution", "Auto-Retry", "Reusable Playbooks"].map(
              (label) => (
                <span
                  key={label}
                  className="px-4 py-1.5 rounded-full bg-card border border-border text-sm font-medium"
                >
                  {label}
                </span>
              ),
            )}
          </div>
        </motion.div>
      </section>

      {/* ── 01 Mission Lifecycle ─────────────────────────────────── */}
      <section className="container mx-auto px-4 max-w-7xl mb-24">
        <motion.div {...fadeUp}>
          <span className="text-primary font-mono text-sm">01</span>
          <h2 className="text-3xl font-bold mt-2 mb-4">How Missions Work</h2>
          <p className="text-muted-foreground max-w-2xl mb-10">
            A mission starts with a natural-language goal. The system decomposes it into tasks,
            agents execute them, and you monitor progress in real time.
          </p>
        </motion.div>

        {/* lifecycle flow */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {lifecycleSteps.map((step, i) => (
            <motion.div
              key={step.label}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-4 rounded-2xl bg-card border border-border text-center"
            >
              <span className="text-primary font-mono text-xs block mb-1">{i + 1}</span>
              <p className="font-semibold text-sm mb-1">{step.label}</p>
              <p className="text-muted-foreground text-xs leading-snug">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p {...fadeUp} className="text-muted-foreground max-w-2xl mb-8">
          Attach files (up to 20 MB), review generated plans before execution, and monitor
          task-by-task progress.
        </motion.p>

        <motion.div {...fadeUp}>
          <ImagePlaceholder label="Screenshot of a Mission showing the execution plan with task list and status indicators" />
        </motion.div>
      </section>

      {/* ── 02 Smart Decomposition ──────────────────────────────── */}
      <section className="container mx-auto px-4 max-w-7xl mb-24">
        <motion.div {...fadeUp}>
          <span className="text-primary font-mono text-sm">02</span>
          <h2 className="text-3xl font-bold mt-2 mb-4">Goals In, Tasks Out</h2>
          <p className="text-muted-foreground max-w-2xl mb-10">
            The orchestrator uses LLM-powered decomposition to break any goal into executable steps.
          </p>
        </motion.div>

        {/* example card */}
        <motion.div
          {...fadeUp}
          className="p-8 rounded-3xl bg-card border border-border shadow-sm mb-10 max-w-2xl"
        >
          <p className="text-sm text-muted-foreground mb-1">User Goal</p>
          <p className="font-semibold mb-6">"Build a React app that displays stock prices"</p>

          <p className="text-sm text-muted-foreground mb-3">Generated Plan</p>
          <ol className="space-y-3">
            {decompositionPlan.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-mono">
                  {i + 1}
                </span>
                <div>
                  <span className="font-medium text-sm">{item.step}</span>
                  <span className="text-muted-foreground text-xs ml-2">Tool: {item.tool}</span>
                </div>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* execution strategies */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {executionStrategies.map((s, i) => (
            <motion.div
              key={s.name}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">{s.name}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp}>
          <ImagePlaceholder label="Screenshot of a mission plan showing task decomposition with dependencies" />
        </motion.div>
      </section>

      {/* ── 03 Playbooks ────────────────────────────────────────── */}
      <section className="container mx-auto px-4 max-w-7xl mb-24">
        <motion.div {...fadeUp}>
          <span className="text-primary font-mono text-sm">03</span>
          <h2 className="text-3xl font-bold mt-2 mb-4">Automate What Works</h2>
          <p className="text-muted-foreground max-w-2xl mb-10">
            Completed missions can be saved as reusable playbook templates. Playbooks define ordered
            steps, inputs, flow control, and scheduling.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {executionModes.map((m, i) => (
            <motion.div
              key={m.name}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <m.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">{m.name}</h3>
              <p className="text-muted-foreground text-sm">{m.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p {...fadeUp} className="text-muted-foreground max-w-2xl mb-8">
          Scratchpad enables intermediate state between steps -- each step reads the output of the
          previous one.
        </motion.p>

        <motion.div {...fadeUp}>
          <ImagePlaceholder label="Screenshot of a Playbook showing steps, triggers, and schedule configuration" />
        </motion.div>
      </section>

      {/* ── 04 Multi-Agent Coordination ─────────────────────────── */}
      <section className="container mx-auto px-4 max-w-7xl mb-24">
        <motion.div {...fadeUp}>
          <span className="text-primary font-mono text-sm">04</span>
          <h2 className="text-3xl font-bold mt-2 mb-4">Agents Working Together</h2>
          <p className="text-muted-foreground max-w-2xl mb-10">
            Three coordination patterns let you match execution style to the problem at hand.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {coordinationPatterns.map((p, i) => (
            <motion.div
              key={p.name}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <p.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">{p.name}</h3>
              <p className="text-muted-foreground text-sm">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="p-8 rounded-3xl bg-card border border-border shadow-sm mb-10 max-w-2xl">
          <h3 className="font-semibold mb-3">Collaborative Reasoning</h3>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>Independent analysis by each agent</li>
            <li>Proposals with confidence scores</li>
            <li>Structured debate across agents</li>
            <li>Weighted voting on final approach</li>
            <li>Consolidated solution</li>
          </ol>
        </motion.div>

        <motion.div {...fadeUp}>
          <ImagePlaceholder label="Screenshot of multi-agent mission execution showing agents collaborating on tasks" />
        </motion.div>
      </section>

      {/* ── 05 Command Centre ───────────────────────────────────── */}
      <section className="container mx-auto px-4 max-w-7xl mb-24">
        <motion.div {...fadeUp}>
          <span className="text-primary font-mono text-sm">05</span>
          <h2 className="text-3xl font-bold mt-2 mb-4">Your Mission Control</h2>
          <p className="text-muted-foreground max-w-2xl mb-10">
            The dashboard gives you a real-time view of everything happening across your workspace.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {dashboardCards.map((c, i) => (
            <motion.div
              key={c.name}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <c.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">{c.name}</h3>
              <p className="text-muted-foreground text-sm">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="flex flex-wrap gap-3 mb-6">
          {["Activity Feed", "Memory", "Reports"].map((tab) => (
            <span key={tab} className="px-4 py-1.5 rounded-full bg-card border border-border text-sm font-medium">
              {tab}
            </span>
          ))}
        </motion.div>

        <motion.div {...fadeUp} className="flex flex-wrap gap-3 mb-10">
          {["Agents", "Documents", "Tools", "Workflows", "LLM Costs"].map((metric) => (
            <span key={metric} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {metric}
            </span>
          ))}
        </motion.div>

        <motion.div {...fadeUp}>
          <ImagePlaceholder label="Screenshot of the Command Centre Dashboard showing Schedule, Active Now, and Agent Reports sections" />
        </motion.div>
      </section>

      {/* ── 06 Budget & Cost Control ────────────────────────────── */}
      <section className="container mx-auto px-4 max-w-7xl mb-24">
        <motion.div {...fadeUp}>
          <span className="text-primary font-mono text-sm">06</span>
          <h2 className="text-3xl font-bold mt-2 mb-4">Stay in Control</h2>
          <p className="text-muted-foreground max-w-2xl mb-10">
            Every mission tracks cost at the task level. View token usage breakdowns, pause if costs
            exceed expectations, and resume with adjusted budget.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {budgetFeatures.map((f, i) => (
            <motion.div
              key={f.name}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">{f.name}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp}>
          <ImagePlaceholder label="Screenshot of mission cost breakdown showing per-task token usage and total spend" />
        </motion.div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 max-w-7xl mb-24">
        <motion.div {...fadeUp} className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Launch Your First Mission?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full">
              Launch a Mission <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <a href="/marketplace">Browse Playbook Templates</a>
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
    <Footer />
  </div>
);

export default LaunchMissions;
