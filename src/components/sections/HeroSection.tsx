import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, FileText, Settings, CheckCircle2 } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm">
            <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded">
              Expert
            </span>
            <span className="text-sm text-muted-foreground">Future-Ready AI Agency</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            AI Services That
          </h1>
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary">[Elevate]</span>
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg rotate-3">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45-6.9 3.45-6.9-3.45L12 4.18zM4 8.64l7 3.5v7.5l-7-3.5v-7.5zm9 11v-7.5l7-3.5v7.5l-7 3.5z"/>
              </svg>
            </div>
            <span className="text-4xl sm:text-5xl lg:text-6xl font-bold">Your Workflow</span>
          </div>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-10"
        >
          Transforming ideas into intelligent solutions, empowering your business to lead with AI-driven growth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-4"
        >
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-6 text-base">
            Connect With Us
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="ghost" className="text-foreground hover:bg-muted rounded-full px-6 py-6 text-base">
            View Plans
          </Button>
        </motion.div>

        {/* Visual Element - Task Automation Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 relative"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent rounded-3xl" />
          
          {/* Workflow lines illustration */}
          <div className="relative max-w-3xl mx-auto">
            <svg
              className="w-full h-64 sm:h-80"
              viewBox="0 0 600 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Connection lines */}
              <path
                d="M300 40 Q200 100 150 150 Q100 200 80 250"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M300 40 Q400 100 450 150 Q500 200 520 250"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M300 40 L300 100"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            {/* Floating Icons */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 left-1/2 -translate-x-1/2"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="absolute top-24 left-1/2 -translate-x-1/2"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <FileText className="w-6 h-6 text-primary" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute top-40 left-1/2 -translate-x-1/2"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <Settings className="w-6 h-6 text-primary" />
              </div>
            </motion.div>

            {/* Tasks Automated Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 bg-card border border-border rounded-2xl p-6 shadow-xl"
            >
              <h3 className="font-semibold text-lg mb-4">Tasks Automated</h3>
              <div className="space-y-3">
                {[
                  "32 queries answered",
                  "13 emails sent",
                  "7 tasks completed",
                  "3 workflows analyzed",
                ].map((task, index) => (
                  <motion.div
                    key={task}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{task}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
