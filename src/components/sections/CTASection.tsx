import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">11</span>
          <span className="text-muted-foreground text-sm">AI That Drives Impact</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-primary/20 rounded-2xl p-8 lg:p-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Automate Your Success?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Join the future of work with Automatos. Start building your autonomous workforce today.
          </p>
          <a href="https://ui.automatos.app" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="px-8 py-6 text-lg rounded-full">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
