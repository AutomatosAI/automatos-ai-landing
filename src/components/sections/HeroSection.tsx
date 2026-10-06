import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { OsHub } from "./OsHub";

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
            <span className="bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded">
              Open source
            </span>
            <span className="text-sm text-muted-foreground">Automatos Studio · powered by Automatos AI</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Tell Auto what you need.
          </h1>
          <div className="flex items-center justify-center gap-3 mt-2 flex-wrap">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-serif">Your business,</span>
            <span className="inline-flex align-middle px-1">
              <span
                className={[
                  'inline-flex h-10 w-10 md:h-14 md:w-14 items-center justify-center',
                  'rounded-2xl bg-card ring-1 ring-border',
                  'shadow-[0_8px_24px_rgba(26,24,20,0.12)]',
                  '-rotate-12',
                ].join(' ')}
                aria-hidden="true"
              >
                <img
                  src="/brand/automatos-mark-hi.png"
                  alt=""
                  className="h-6 w-6 md:h-8 md:w-8 object-contain"
                  draggable={false}
                />
              </span>
            </span>
            <span className="text-4xl sm:text-5xl lg:text-6xl brand-line">in your brand.</span>
          </div>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-10"
        >
          Invoices, letters, spreadsheets and social posts, made by a team of agents and rendered from your one brand kit. A board shows the work. Nothing is sent, posted or paid for until you say so.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-4"
        >
          <a href="#waitlist">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-6 text-base">
              Join the waitlist
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
          <a href="#pricing">
            <Button variant="ghost" className="text-foreground hover:bg-muted rounded-full px-6 py-6 text-base">
              See pricing
            </Button>
          </a>
        </motion.div>

        {/* The hub: Automatos OS and everything it drives */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 max-w-6xl mx-auto"
        >
          <OsHub />
        </motion.div>
      </div>
    </section>
  );
};
