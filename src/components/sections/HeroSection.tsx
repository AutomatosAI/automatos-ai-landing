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
          <div className="flex items-center justify-center gap-3 mt-2 flex-wrap">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary">[Elevate]</span>
            <span className="inline-flex align-middle px-1">
              <span
                className={[
                  'inline-flex h-10 w-10 md:h-14 md:w-14 items-center justify-center',
                  'rounded-2xl bg-white/95 ring-2 ring-orange-500/60',
                  'shadow-[0_0_0_1px_rgba(249,115,22,0.25),0_18px_45px_rgba(0,0,0,0.35),0_0_40px_rgba(249,115,22,0.25)]',
                  '-rotate-12',
                ].join(' ')}
                aria-hidden="true"
              >
                <img
                  src="/brand/automatos-mark-hi.png"
                  alt=""
                  className="h-6 w-6 md:h-8 md:w-8 object-contain drop-shadow-[0_0_10px_rgba(249,115,22,0.35)]"
                  draggable={false}
                />
              </span>
            </span>
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
          Empower your business with autonomous agents that learn, adapt, and execute. From personal assistance to full-scale operations, Automatos grows with you.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-4"
        >
          <a href="https://ui.automatos.app" target="_blank" rel="noopener noreferrer">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-6 text-base">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
          <a href="#pricing">
            <Button variant="ghost" className="text-foreground hover:bg-muted rounded-full px-6 py-6 text-base">
              View Pricing
            </Button>
          </a>
        </motion.div>

        {/* Visual Element - Task Automation Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 relative h-[500px] sm:h-[550px]"
        >
          <div className="relative max-w-4xl mx-auto h-full flex items-center justify-center">

            {/* Curved Lines with Orange Shimmer Animation - Left Side */}
            <svg
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[45%] h-[400px]"
              viewBox="0 0 300 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="shimmerLeft1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="40%" stopColor="hsl(var(--primary))" />
                  <stop offset="60%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="transparent" />
                  <animate attributeName="x1" values="-100%;100%" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="x2" values="0%;200%" dur="3s" repeatCount="indefinite" />
                </linearGradient>
                <linearGradient id="shimmerLeft2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="40%" stopColor="hsl(var(--primary))" />
                  <stop offset="60%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="transparent" />
                  <animate attributeName="x1" values="-100%;100%" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                  <animate attributeName="x2" values="0%;200%" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                </linearGradient>
                <linearGradient id="shimmerLeft3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="40%" stopColor="hsl(var(--primary))" />
                  <stop offset="60%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="transparent" />
                  <animate attributeName="x1" values="-100%;100%" dur="3.5s" repeatCount="indefinite" begin="1s" />
                  <animate attributeName="x2" values="0%;200%" dur="3.5s" repeatCount="indefinite" begin="1s" />
                </linearGradient>
              </defs>
              {/* Base curves - visible in light mode, subtle in dark */}
              <path d="M300 200 Q250 200 200 180 Q120 150 50 80" stroke="currentColor" strokeWidth="2" fill="none" className="text-muted-foreground/30" />
              <path d="M300 200 Q240 210 180 200 Q100 180 20 150" stroke="currentColor" strokeWidth="2" fill="none" className="text-muted-foreground/30" />
              <path d="M300 200 Q240 220 180 240 Q100 270 30 320" stroke="currentColor" strokeWidth="2" fill="none" className="text-muted-foreground/30" />
              {/* Orange shimmer overlay */}
              <path d="M300 200 Q250 200 200 180 Q120 150 50 80" stroke="url(#shimmerLeft1)" strokeWidth="3" fill="none" />
              <path d="M300 200 Q240 210 180 200 Q100 180 20 150" stroke="url(#shimmerLeft2)" strokeWidth="3" fill="none" />
              <path d="M300 200 Q240 220 180 240 Q100 270 30 320" stroke="url(#shimmerLeft3)" strokeWidth="3" fill="none" />
            </svg>

            {/* Curved Lines with Orange Shimmer Animation - Right Side */}
            <svg
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-[400px]"
              viewBox="0 0 300 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="shimmerRight1" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="40%" stopColor="hsl(var(--primary))" />
                  <stop offset="60%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="transparent" />
                  <animate attributeName="x1" values="200%;0%" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="x2" values="100%;-100%" dur="3s" repeatCount="indefinite" />
                </linearGradient>
                <linearGradient id="shimmerRight2" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="40%" stopColor="hsl(var(--primary))" />
                  <stop offset="60%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="transparent" />
                  <animate attributeName="x1" values="200%;0%" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                  <animate attributeName="x2" values="100%;-100%" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                </linearGradient>
                <linearGradient id="shimmerRight3" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="40%" stopColor="hsl(var(--primary))" />
                  <stop offset="60%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="transparent" />
                  <animate attributeName="x1" values="200%;0%" dur="3.5s" repeatCount="indefinite" begin="1s" />
                  <animate attributeName="x2" values="100%;-100%" dur="3.5s" repeatCount="indefinite" begin="1s" />
                </linearGradient>
              </defs>
              {/* Base curves - visible in light mode, subtle in dark */}
              <path d="M0 200 Q50 200 100 180 Q180 150 250 80" stroke="currentColor" strokeWidth="2" fill="none" className="text-muted-foreground/30" />
              <path d="M0 200 Q60 210 120 200 Q200 180 280 150" stroke="currentColor" strokeWidth="2" fill="none" className="text-muted-foreground/30" />
              <path d="M0 200 Q60 220 120 240 Q200 270 270 320" stroke="currentColor" strokeWidth="2" fill="none" className="text-muted-foreground/30" />
              {/* Orange shimmer overlay */}
              <path d="M0 200 Q50 200 100 180 Q180 150 250 80" stroke="url(#shimmerRight1)" strokeWidth="3" fill="none" />
              <path d="M0 200 Q60 210 120 200 Q200 180 280 150" stroke="url(#shimmerRight2)" strokeWidth="3" fill="none" />
              <path d="M0 200 Q60 220 120 240 Q200 270 270 320" stroke="url(#shimmerRight3)" strokeWidth="3" fill="none" />
            </svg>

            {/* Center Icon Gallery Strip - Infinite Scroll */}
            <div className="absolute left-1/2 -translate-x-1/2 w-20 h-[450px] overflow-hidden rounded-2xl bg-muted/50 border border-border/50">
              <motion.div
                animate={{ y: ["0%", "-50%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="flex flex-col items-center gap-4 py-4"
              >
                {/* Duplicate icons for seamless loop */}
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex flex-col items-center gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/30">
                      <Lightbulb className="w-7 h-7 text-primary" />
                    </div>
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/30">
                      <FileText className="w-7 h-7 text-primary" />
                    </div>
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/30">
                      <Settings className="w-7 h-7 text-primary" />
                    </div>
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/30">
                      <Lightbulb className="w-7 h-7 text-primary" />
                    </div>
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/30">
                      <FileText className="w-7 h-7 text-primary" />
                    </div>
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/30">
                      <Settings className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Tasks Automated Card - Centered on top */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="relative z-10 w-72 bg-card border-2 border-primary rounded-xl p-6 shadow-xl"
            >
              <h3 className="font-semibold text-lg mb-4">Tasks Automated</h3>
              <div className="space-y-3">
                {[
                  "32 customer tickets resolved",
                  "13 invoices processed",
                  "7 social posts scheduled",
                  "3 workflows optimized",
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
