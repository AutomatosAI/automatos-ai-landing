import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    phase: "Define the Vision",
    title: "Discovery & Strategy",
    description: "We begin by understanding your business goals, challenges, and opportunities. Through consultation and research, we define a clear AI strategy tailored to your needs.",
  },
  {
    number: "02",
    phase: "Design the Model",
    title: "Data & Design",
    description: "Our team analyzes your data, identifies patterns, and designs AI models or frameworks that align with your objectives. Every solution is built with scalability and accuracy in mind.",
  },
  {
    number: "03",
    phase: "Build the Solution",
    title: "Development & Integration",
    description: "We develop custom AI applications and integrate them seamlessly into your existing workflows, ensuring minimal disruption and maximum efficiency.",
  },
  {
    number: "04",
    phase: "Build the Solution",
    title: "Launch & Optimization",
    description: "Once deployed, we continuously monitor performance, optimize for better results, and provide support to keep your AI solutions running at peak potential.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">02</span>
          <span className="text-muted-foreground text-sm">How It Works</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            The Steps to Smarter AI
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            We follow a clear, step-by-step approach to deliver AI solutions that align with your business goals.
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
