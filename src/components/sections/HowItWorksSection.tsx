import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    phase: "Select Intelligence",
    title: "Design Your Agents",
    description: "Select from 400+ LLM models to find the perfect brain for your task. Add specialized skills, equip custom tools, and fine-tune behavior for your specific needs.",
  },
  {
    number: "02",
    phase: "Integration",
    title: "Connect Your World",
    description: "Instantly integrate with 850+ apps including Gmail, Slack, Dropbox, and more. Your agents work where you work, seamlessly bridging your entire tech stack.",
  },
  {
    number: "03",
    phase: "Context Setup",
    title: "Empower with Knowledge",
    description: "Load up your knowledge bases. Connect Google Docs, upload PDFs, link databases via NL2SQL, or index your entire codebase with CodeGraph.",
  },
  {
    number: "04",
    phase: "Execution",
    title: "Automate Workflows",
    description: "Create complex, multi-step workflows using our recipes or design your own. Schedule them to run autonomously, 24/7.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">02</span>
          <span className="text-muted-foreground text-sm">How It Works</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Power in Simplicity
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Four steps to your fully autonomous workforce.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card border border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-300"
            >
              {/* Step Number */}
              <div className="flex items-start gap-4 mb-6">
                <span className="text-5xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                  {step.number}
                </span>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{step.phase}</p>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground italic mb-6">
                {step.description}
              </p>

              {/* CTA */}
              <Button
                variant="outline"
                className="rounded-full border-primary/30 hover:border-primary hover:bg-primary/5"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
