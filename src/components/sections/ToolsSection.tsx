import { motion } from "framer-motion";
import { TrendingUp, Brain, BookOpen, Workflow } from "lucide-react";

const tools = [
  {
    title: "Automatos Agents",
    description: "Design custom agents or select from the marketplace. Choose the best LLM, tools, and skills for the task to optimize costs.",
    icon: Brain,
    tags: ["Customizable", "Marketplace"],
  },
  {
    title: "Automatos RAG",
    description: "Intelligent search for your knowledge bases. Ensure your agents always have the right context.",
    icon: BookOpen,
    stat: "100%",
    statLabel: "Context Accuracy",
  },
  {
    title: "Automatos Memory",
    description: "Personal and Agent memory. Remembers your preferences and operational details.",
    icon: TrendingUp,
    progress: 85,
    progressLabel: "Memory Retention",
    timeLeft: "Active",
  },
  {
    title: "Automatos CodeGraph",
    description: "Index your code, map relationships, and help analyze bugs or review code changes automatically.",
    icon: Workflow,
    tags: ["Code Analysis", "Refactoring"],
  },
  {
    title: "Automatos NL2SQL",
    description: "Speak to your databases. 'How many new customers last month?'—no SQL needed.",
    icon: BookOpen, // Reusing icons as imports are limited
    greeting: "Ask Data",
    subtext: "Natural Language Queries",
  },
  {
    title: "Automatos Workflows",
    description: "9-stage complex workflows with self-learning and multi-agent coordination.",
    icon: Workflow,
    metrics: [
      { label: "Stages", value: "9 Complex" },
      { label: "Learning", value: "Self-Optimizing" },
    ]
  },
  {
    title: "Automatos Tools",
    description: "One adapter, infinite possibilities. Connect to 850+ apps with over 12,000 tools.",
    icon: TrendingUp, // Reusing
    stat: "850+",
    statLabel: "Connected Apps",
  },
  {
    title: "Automatos Widgets",
    description: "Embed Automatos tools directly into your sites or workspace via our SDK.",
    icon: Brain, // Reusing
    tags: ["SDK", "Embeddable"],
  },
];

export const ToolsSection = () => {
  return (
    <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">04</span>
          <span className="text-muted-foreground text-sm">Advanced Tools</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            The Automatos Toolchain
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to build, manage, and scale your AI workforce.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <tool.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-tight">{tool.title}</h3>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 flex-grow">{tool.description}</p>

              {/* Tool-specific content */}
              {/* @ts-ignore - Dynamic types in tool object */}
              {tool.stat && (
                <div className="bg-muted/50 rounded-xl p-3 flex items-center justify-between mt-auto">
                  {/* @ts-ignore */}
                  <span className="text-2xl font-bold text-primary">{tool.stat}</span>
                  {/* @ts-ignore */}
                  <span className="text-xs text-muted-foreground">{tool.statLabel}</span>
                </div>
              )}
              {/* @ts-ignore */}
              {tool.progress && (
                <div className="bg-muted/50 rounded-xl p-3 space-y-2 mt-auto">
                  <div className="flex items-center justify-between">
                    {/* @ts-ignore */}
                    <span className="text-xl font-bold text-primary">{tool.progress}%</span>
                    {/* @ts-ignore */}
                    <span className="text-xs text-muted-foreground">{tool.progressLabel}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      // @ts-ignore
                      whileInView={{ width: `${tool.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-primary h-1.5 rounded-full"
                    />
                  </div>
                </div>
              )}
              {/* @ts-ignore */}
              {tool.metrics && (
                <div className="space-y-2 mt-auto">
                  {/* @ts-ignore */}
                  {tool.metrics.map((metric: any) => (
                    <div key={metric.label} className="bg-muted/50 rounded-lg p-2 flex items-center justify-between">
                      <span className="text-xs font-medium">{metric.label}</span>
                      <span className="text-xs text-muted-foreground">{metric.value}</span>
                    </div>
                  ))}
                </div>
              )}
              {/* @ts-ignore */}
              {tool.tags && (
                <div className="flex flex-wrap gap-2 mt-auto">
                  {/* @ts-ignore */}
                  {tool.tags.map(tag => (
                    <span key={tag} className="text-xs bg-muted/50 px-2 py-1 rounded-md text-muted-foreground">{tag}</span>
                  ))}
                </div>
              )}
              {/* @ts-ignore */}
              {tool.greeting && (
                <div className="bg-muted/50 rounded-xl p-3 text-center mt-auto">
                  {/* @ts-ignore */}
                  <p className="text-base font-semibold">{tool.greeting}</p>
                  {/* @ts-ignore */}
                  <p className="text-xs text-muted-foreground">{tool.subtext}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
