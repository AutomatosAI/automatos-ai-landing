import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  FileText,
  Database,
  Code,
  Search,
  Brain,
  Network,
  Upload,
  FileSearch,
  Table,
  GitBranch,
  Layers,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────

const fileTypes = [
  { category: "Text", extensions: [".md", ".txt", ".csv", ".json"] },
  { category: "Office", extensions: [".docx", ".xlsx", ".pptx"] },
  { category: "PDF", extensions: [".pdf (including scanned with OCR)"] },
  { category: "Code", extensions: [".py", ".js", ".ts", ".go", ".java"] },
  { category: "Web", extensions: [".html"] },
];

const pipelineSteps = [
  { step: 1, title: "Parse", description: "Extract text from any file format", icon: FileText },
  { step: 2, title: "Chunk", description: "Split into semantic segments", icon: Layers },
  { step: 3, title: "Embed", description: "Generate vector embeddings", icon: Zap },
  { step: 4, title: "Index", description: "Store in vector database for retrieval", icon: Database },
];

const nl2sqlFeatures = [
  {
    title: "Schema Introspection",
    description: "Reads actual DB structure, never guesses",
    icon: Database,
  },
  {
    title: "Self-Correction",
    description: "Retries on DB errors with adjusted queries",
    icon: GitBranch,
  },
  {
    title: "Safety First",
    description: "Read-only by default, no DROP/DELETE/UPDATE",
    icon: Shield,
  },
  {
    title: "Multiple Formats",
    description: "Results as CSV, JSON, or Markdown tables",
    icon: Table,
  },
];

const codeGraphCapabilities = [
  {
    title: "Semantic Code Search",
    description: '"Find user login logic" (not just grep)',
    icon: Search,
  },
  {
    title: "Symbol Resolution",
    description: "Jump-to-definition across your codebase",
    icon: Code,
  },
  {
    title: "Call Graph Analysis",
    description: '"Who calls process_payment?"',
    icon: GitBranch,
  },
  {
    title: "Relationship Mapping",
    description: "Imports, inheritance, dependencies",
    icon: Network,
  },
];

const memoryTiers = [
  {
    title: "Working Memory",
    description: "Current task context",
    icon: Zap,
  },
  {
    title: "Short-term Memory",
    description: "Recent conversation history",
    icon: FileSearch,
  },
  {
    title: "Long-term Memory",
    description: "Preferences, operational history, learned patterns",
    icon: Brain,
  },
  {
    title: "Collective Memory",
    description: "Shared knowledge across all agents in a workspace",
    icon: Network,
  },
];

// ── Animation helpers ─────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

// ── Component ─────────────────────────────────────────────────────────

const EmpowerWithKnowledge = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div {...fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Empower with Knowledge
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Give Your Agents{" "}
              <span className="text-primary">[Context]</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8"
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Documents, databases, code repositories — feed your agents the
              knowledge they need to make intelligent decisions.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-3"
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {["10+ File Types", "NL2SQL", "CodeGraph", "Vector Search"].map(
                (stat) => (
                  <span
                    key={stat}
                    className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium"
                  >
                    {stat}
                  </span>
                )
              )}
            </motion.div>
          </div>
        </section>

        {/* ── 01 Document Management ──────────────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <motion.div {...fadeUp}>
            <span className="text-primary font-mono text-sm">01</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Your Knowledge Library
            </h2>
            <p className="text-muted-foreground max-w-2xl mb-10">
              Upload any document and your agents can search, reference, and
              reason over it.
            </p>
          </motion.div>

          {/* File type grid */}
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12" {...staggerContainer}>
            {fileTypes.map((group) => (
              <motion.div
                key={group.category}
                className="p-4 rounded-2xl bg-card border border-border"
                {...fadeUp}
              >
                <p className="text-xs font-medium text-primary mb-2">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.extensions.map((ext) => (
                    <span
                      key={ext}
                      className="px-2 py-0.5 rounded-md bg-primary/10 text-xs font-mono"
                    >
                      {ext}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Ingestion pipeline */}
          <motion.h3
            className="text-xl font-semibold mb-6"
            {...fadeUp}
          >
            Ingestion Pipeline
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {pipelineSteps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group relative"
                  {...fadeUp}
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-primary font-mono text-xs absolute top-4 right-4">
                    {step.step}
                  </span>
                  <h4 className="font-semibold mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Image placeholders */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div {...fadeUp}>
              <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex items-center justify-center min-h-[300px]">
                <p className="text-muted-foreground text-sm text-center">
                  [IMAGE: Screenshot of the Knowledge Base &rarr; Documents
                  library showing uploaded files, sizes, and processing status]
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeUp}>
              <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex items-center justify-center min-h-[300px]">
                <p className="text-muted-foreground text-sm text-center">
                  [IMAGE: Screenshot of the Document Processing sub-tab showing
                  ingestion pipeline status]
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 02 RAG ──────────────────────────────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <motion.div {...fadeUp}>
            <span className="text-primary font-mono text-sm">02</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Smart Context, Not Token Dumps
            </h2>
            <p className="text-muted-foreground max-w-2xl mb-10">
              Automatos uses Shannon entropy filtering + MMR (Maximal Marginal
              Relevance) diversity scoring. Agents get the RIGHT context — not
              bloated token dumps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                stat: "87%",
                label: "Fewer tokens per task",
                detail: "3,200 vs 25,000 traditional",
              },
              {
                stat: "Semantic",
                label: "Search across all documents",
                detail: "By meaning, not just keywords",
              },
              {
                stat: "Auto",
                label: "Relevance ranking",
                detail: "Filtered & injected as context",
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group text-center"
                {...fadeUp}
              >
                <p className="text-3xl font-bold text-primary mb-2">
                  {item.stat}
                </p>
                <p className="font-semibold mb-1">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </motion.div>
            ))}
          </div>

          <motion.p className="text-muted-foreground max-w-2xl mb-8" {...fadeUp}>
            When an agent needs information, it searches your knowledge base
            semantically — by meaning, not just keywords. Results are ranked,
            filtered, and injected as context.
          </motion.p>

          <motion.div {...fadeUp}>
            <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground text-sm text-center">
                [IMAGE: Screenshot of the Knowledge Base &rarr; Search sub-tab
                showing semantic search results]
              </p>
            </div>
          </motion.div>
        </section>

        {/* ── 03 NL2SQL ───────────────────────────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <motion.div {...fadeUp}>
            <span className="text-primary font-mono text-sm">03</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Talk to Your Databases
            </h2>
            <p className="text-muted-foreground max-w-2xl mb-10">
              Ask questions in plain English. Automatos translates to SQL,
              validates for safety, executes, and explains the results.
            </p>
          </motion.div>

          {/* Example flow */}
          <motion.div
            className="p-8 rounded-3xl bg-card border border-border mb-12"
            {...fadeUp}
          >
            <p className="text-sm text-muted-foreground mb-4 font-medium">
              Example Flow
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="shrink-0 mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                  Q
                </span>
                <p className="font-medium">
                  &ldquo;How many new customers signed up last month?&rdquo;
                </p>
              </div>
              {[
                "Reads your actual DB schema (no hallucination)",
                "Generates SELECT query",
                "Validates safety (read-only)",
                "Executes against your database",
                "Formats results in your preferred output",
              ].map((step) => (
                <div key={step} className="flex items-start gap-3 pl-9">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Feature cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {nl2sqlFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
                  {...fadeUp}
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold mb-1">{feat.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {feat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div {...fadeUp}>
            <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground text-sm text-center">
                [IMAGE: Screenshot of the NL2SQL interface showing a natural
                language query and the generated SQL result]
              </p>
            </div>
          </motion.div>
        </section>

        {/* ── 04 CodeGraph ────────────────────────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <motion.div {...fadeUp}>
            <span className="text-primary font-mono text-sm">04</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Your Codebase, Mapped and Searchable
            </h2>
            <p className="text-muted-foreground max-w-2xl mb-10">
              Index your repositories. CodeGraph parses source code into a
              symbol graph — classes, functions, variables, imports, call chains.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {codeGraphCapabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
                  {...fadeUp}
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold mb-1">{cap.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {cap.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="flex flex-wrap gap-2 mb-12"
            {...fadeUp}
          >
            <span className="text-sm text-muted-foreground mr-2 self-center">
              Supported:
            </span>
            {[
              { lang: "Python", note: "AST-based" },
              { lang: "TypeScript / JavaScript", note: "Tree-sitter" },
            ].map((l) => (
              <span
                key={l.lang}
                className="px-3 py-1 rounded-full bg-primary/10 text-sm font-medium"
              >
                {l.lang}{" "}
                <span className="text-muted-foreground text-xs">
                  ({l.note})
                </span>
              </span>
            ))}
            {["Go", "Rust", "Java"].map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground"
              >
                {lang}{" "}
                <span className="text-xs italic">coming soon</span>
              </span>
            ))}
          </motion.div>

          <motion.div {...fadeUp}>
            <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground text-sm text-center">
                [IMAGE: Screenshot of the CodeGraph interface showing an indexed
                repository with symbol graph]
              </p>
            </div>
          </motion.div>
        </section>

        {/* ── 05 Knowledge Graph & Memory ─────────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <motion.div {...fadeUp}>
            <span className="text-primary font-mono text-sm">05</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Connected Intelligence
            </h2>
            <p className="text-muted-foreground max-w-2xl mb-10">
              Beyond documents — Automatos builds a knowledge graph of entity
              relationships and maintains a 4-tier memory system.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {memoryTiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.title}
                  className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
                  {...fadeUp}
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold mb-1">{tier.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="p-6 rounded-2xl bg-primary/5 border border-primary/20 mb-12"
            {...fadeUp}
          >
            <p className="text-sm">
              <span className="font-semibold text-primary">86%</span>{" "}
              context recovery across agent handoffs via semantic field memory.
              Agents discover each other&apos;s findings by meaning, not
              forwarding chains.
            </p>
          </motion.div>

          <motion.div {...fadeUp}>
            <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 flex items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground text-sm text-center">
                [IMAGE: Screenshot of the Knowledge Graph visualization showing
                entity relationships]
              </p>
            </div>
          </motion.div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <section className="container mx-auto px-4 max-w-7xl mb-24">
          <motion.div className="text-center" {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Empower Your Agents?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload Your First Document
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                Explore Knowledge Features
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EmpowerWithKnowledge;
