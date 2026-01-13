import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, BarChart3, Code } from "lucide-react";

export const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
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
            AI Solutions for Business Growth
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            From intelligent automation to data-driven insights, our team helps you level up customer experiences.
          </p>
        </motion.div>

        {/* Main Solution Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-background border border-border rounded-3xl p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Business Process Automation with AI
              </h3>
              <p className="text-muted-foreground mb-8">
                Streamline repetitive processes with AI-powered automation. Save time, cut costs, and focus on the work that drives impact.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Right Content - Stats */}
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-muted/50 rounded-2xl p-6 text-center"
                >
                  <p className="text-sm text-muted-foreground mb-2">Costs Saved</p>
                  <p className="text-3xl font-bold text-primary">$60k/wk</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-muted/50 rounded-2xl p-6 text-center"
                >
                  <p className="text-sm text-muted-foreground mb-2">Time Saved</p>
                  <p className="text-3xl font-bold text-primary">60 hrs/wk</p>
                </motion.div>
              </div>

              {/* Feature Highlights */}
              <div className="bg-muted/30 rounded-2xl p-6">
                <p className="text-sm font-semibold mb-4">Save Time & Money</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: Zap, label: "Smart Automation" },
                    { icon: BarChart3, label: "Data Insights" },
                    { icon: Code, label: "AI Development" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 bg-background rounded-full px-4 py-2 border border-border"
                    >
                      <item.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
