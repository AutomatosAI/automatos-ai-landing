import { motion } from "framer-motion";
import { TrendingUp, Brain, BookOpen, Workflow } from "lucide-react";

const tools = [
  {
    title: "Automatos RAG",
    description: "Track performance trends with intelligent visual dashboards. Spot opportunities, measure ROI, and make smart decisions.",
    icon: TrendingUp,
    stat: "33",
    statLabel: "AI Growth Score",
  },
  {
    title: "Automatos Memory",
    description: "Get a real-time overview of your company's AI performance — from growth scores to efficiency metrics, all in one place.",
    icon: Brain,
    progress: 65,
    progressLabel: "AI Dashboard Basics",
    timeLeft: "4 minutes left",
  },
  {
    title: "Automatos Agents",
    description: "Access step-by-step guides and video tutorials that simplify complex AI tools — helping your team get faster results.",
    icon: BookOpen,
    metrics: [
      { label: "Tasks", value: "5 tasks automated" },
      { label: "Productivity", value: "14% increase this week" },
      { label: "Chatbot", value: "87% of queries resolved" },
    ],
  },
  {
    title: "Automatos CodeGraph",
    description: "Receive daily summaries of your system's activity, new automations, and key performance shifts.",
    icon: Workflow,
    greeting: "Good morning!",
    subtext: "Your daily recap awaits",
  },
];

export const ToolsSection = () => {
  return (
    <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">04</span>
          <span className="text-muted-foreground text-sm">Advanced Tools</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Everything Needed to Operate Smarter
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Access powerful, easy-to-use tools that let you track data, manage automations, and stay on top of every metric that matters.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card border border-border rounded-3xl p-8 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <tool.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{tool.title}</h3>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">{tool.description}</p>

              {/* Tool-specific content */}
              {tool.stat && (
                <div className="bg-muted/50 rounded-2xl p-4 flex items-center justify-between">
                  <span className="text-4xl font-bold text-primary">{tool.stat}</span>
                  <span className="text-sm text-muted-foreground">{tool.statLabel}</span>
                </div>
              )}

              {tool.progress && (
                <div className="bg-muted/50 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{tool.progress}%</span>
                    <span className="text-sm text-muted-foreground">{tool.progressLabel}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tool.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-primary h-2 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{tool.timeLeft}</span>
                </div>
              )}

              {tool.metrics && (
                <div className="space-y-3">
                  {tool.metrics.map((metric) => (
                    <div key={metric.label} className="bg-muted/50 rounded-xl p-3 flex items-center justify-between">
                      <span className="text-sm font-medium">{metric.label}</span>
                      <span className="text-sm text-muted-foreground">{metric.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {tool.greeting && (
                <div className="bg-muted/50 rounded-2xl p-4 text-center">
                  <p className="text-lg font-semibold">{tool.greeting}</p>
                  <p className="text-sm text-muted-foreground">{tool.subtext}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
