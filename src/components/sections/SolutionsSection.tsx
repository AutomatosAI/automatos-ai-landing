import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Code, Brain, Cpu, Database, BookOpen } from "lucide-react";

export const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">01</span>
          <span className="text-muted-foreground text-sm">Our Solutions</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            The Engine Behind the Intelligence
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Most AI tools guess. Automatos calculates. Our 9-stage orchestration pipeline uses mathematical context engineering to deliver precise, cost-efficient results — not bloated token dumps.
          </p>
        </motion.div>

        {/* Technical Engine Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-2xl p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - The Math */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
                <Cpu className="w-3.5 h-3.5" />
                Under the Hood
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Built on Math, Not Magic
              </h3>
              <p className="text-muted-foreground mb-6">
                Automatos uses mathematical context engineering — Shannon entropy, knapsack optimization, and MMR algorithms — to select the right information for every task. The result: 87% fewer tokens, 88% lower API costs, and dramatically better responses.
              </p>

              {/* Before/After comparison */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-muted/30 rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Traditional AI</p>
                  <p className="text-xl font-bold text-muted-foreground line-through">25,000</p>
                  <p className="text-xs text-muted-foreground">tokens per task</p>
                </div>
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center">
                  <p className="text-xs text-primary mb-1">Automatos</p>
                  <p className="text-xl font-bold text-primary">3,200</p>
                  <p className="text-xs text-muted-foreground">tokens per task</p>
                </div>
              </div>

              <a href="/Automatos-AI-Platform-Guide.pdf" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full px-6 border-primary/20 hover:bg-primary/5">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read the Platform Guide
                </Button>
              </a>
            </div>

            {/* Right - Architecture pillars */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Brain, stat: "Shannon", label: "Entropy Filtering", desc: "Removes noise, retains high-value signal" },
                { icon: Database, stat: "4-Tier", label: "Memory System", desc: "Working → Short-term → Long-term → Collective" },
                { icon: Zap, stat: "MMR", label: "Diversity Scoring", desc: "Balances relevance with unique context" },
                { icon: Code, stat: "94%", label: "Task Success", desc: "Up from 76% with traditional approaches" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.02 }}
                  className="bg-muted/50 rounded-2xl p-5"
                >
                  <item.icon className="w-5 h-5 text-primary mb-2" />
                  <p className="text-2xl font-bold text-primary">{item.stat}</p>
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
