import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    phase: "Say it",
    title: "Tell Auto what you need",
    description: "\"Invoice Harbourline for the March work.\" \"Plan this week's posts.\" \"Design my brand.\" One voice, in plain words. Auto is the only one you talk to.",
    href: "/auto",
  },
  {
    number: "02",
    phase: "Delegate",
    title: "Auto puts it on the board",
    description: "Auto files a ticket to the right agent. The Brand Designer, the Social Media Director, a bookkeeper. You see every ticket, and anything that needs you comes back as a question.",
    href: "/auto",
  },
  {
    number: "03",
    phase: "Render",
    title: "Outputs land in your brand",
    description: "Documents, spreadsheets, social images and video all render from your one brand kit. Every output is saved to Deliverables with a link you can send.",
    href: "/documents",
  },
  {
    number: "04",
    phase: "Approve",
    title: "You approve, it goes",
    description: "Nothing is published or paid for without you. Approve a post, a kit change or an invoice on the card. Then it's scheduled, sent or posted.",
    href: "/socials",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-accent font-mono text-sm">02</span>
          <span className="text-muted-foreground text-sm">How it works</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4">
            Auto drives. <span className="brand-line">You decide.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Four steps, and none of them is "learn a new tool".
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
              className="group bg-card border border-border rounded-2xl p-8 hover:border-foreground/30 transition-all duration-300"
            >
              {/* Step Number */}
              <div className="flex items-start gap-4 mb-6">
                <span className="text-5xl font-serif text-muted-foreground/40 group-hover:text-accent transition-colors">
                  {step.number}
                </span>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{step.phase}</p>
                  <h3 className="text-xl">{step.title}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6">
                {step.description}
              </p>

              {/* CTA */}
              <a href={step.href}>
                <Button
                  variant="outline"
                  className="rounded-full"
                >
                  See it
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
