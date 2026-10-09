import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Share2, LayoutGrid, Store, Server, BookOpen } from "lucide-react";

const pillars = [
  {
    icon: FileText,
    stat: "One kit",
    label: "Documents in your brand",
    desc: "Invoices, letters, reports and spreadsheets rendered from your colours, type and logo. PDF, Word, Excel.",
  },
  {
    icon: Share2,
    stat: "5 channels",
    label: "Socials that run on a plan",
    desc: "LinkedIn, X, Instagram, TikTok, YouTube. Posts made on the day, approved by you, then published.",
  },
  {
    icon: LayoutGrid,
    stat: "A board",
    label: "Work you can see",
    desc: "Every job is a ticket. Agents ask before they spend or publish. Approvals and questions come to you.",
  },
  {
    icon: Store,
    stat: "Marketplace",
    label: "Install, don't build",
    desc: "Packages, agents, playbooks, templates and integrations, built by us and by the community.",
  },
];

export const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-accent font-mono text-sm">01</span>
          <span className="text-muted-foreground text-sm">What it is</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4">
            Not another chat window.
            <br />
            <span className="brand-line">A platform that does the work.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Most "AI assistants" are a text box in front of a model. Automatos is a real backend:
            workspaces, roles, storage, a job board, a render pipeline and a marketplace. You talk
            to Auto. Auto delegates. The outputs land in your brand.
          </p>
        </motion.div>

        {/* Platform card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-2xl p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-foreground text-xs font-medium mb-4">
                <Server className="w-3.5 h-3.5" />
                Under the hood
              </div>
              <h3 className="text-2xl sm:text-3xl mb-4">
                Eighteen months of plumbing, so you don't need any.
              </h3>
              <p className="text-muted-foreground mb-6">
                A brand kit that every renderer reads. A deny list so agents can't spend your money.
                Approval bound to the exact content that was approved. Thousands of tests and a
                nightly harness that grades the outputs, not the demos. Hosted, or on your own machine
                under an open licence.
              </p>

              {/* Then / now */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-secondary/60 rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">A chat wrapper</p>
                  <p className="text-xl font-mono text-muted-foreground line-through">answers</p>
                  <p className="text-xs text-muted-foreground">you copy somewhere else</p>
                </div>
                <div className="bg-secondary border border-border rounded-xl p-4 text-center">
                  <p className="text-xs text-accent mb-1">Automatos</p>
                  <p className="text-xl font-mono text-foreground">deliverables</p>
                  <p className="text-xs text-muted-foreground">in your brand, ready to send</p>
                </div>
              </div>

              <a href="https://github.com/AutomatosAI/automatos-ai" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full px-6">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read the source on GitHub
                </Button>
              </a>
            </div>

            {/* Right - pillars */}
            <div className="grid grid-cols-2 gap-4">
              {pillars.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.02 }}
                  className="bg-secondary/60 rounded-2xl p-5"
                >
                  <item.icon className="w-5 h-5 text-accent mb-2" />
                  <p className="text-2xl font-serif">{item.stat}</p>
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
