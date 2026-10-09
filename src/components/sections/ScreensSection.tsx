import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/* Real captures of the local edition, linking to the product pages. */
const screens = [
  {
    href: "/auto",
    eyebrow: "Auto",
    title: "One message. A branded invoice.",
    src: "/images/studio/01-auto-chat.png",
    alt: "Auto in chat making a branded invoice",
  },
  {
    href: "/documents",
    eyebrow: "Documents",
    title: "A brand board, a report, a proposal, a letter. One kit.",
    src: "/images/studio/06-deliverables.png",
    alt: "Deliverables with branded documents",
  },
  {
    href: "/socials",
    eyebrow: "Socials",
    title: "A plan that makes the posts on the day.",
    src: "/images/studio/09-socials.png",
    alt: "The Socials calendar with a running plan",
  },
  {
    href: "/auto",
    eyebrow: "The board",
    title: "Every job a ticket. Nothing hidden.",
    src: "/images/studio/02-board.png",
    alt: "The Command Centre board",
  },
];

export const ScreensSection = () => (
  <section id="screens" className="py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-center gap-4 mb-6">
        <span className="text-accent font-mono text-sm">00</span>
        <span className="text-muted-foreground text-sm">The product</span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4">
          This is it. <span className="brand-line">Not a mock-up.</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Every screen on this site is a capture of the platform running on a laptop, in the Automatos workspace.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {screens.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link to={s.href} className="group block">
              <div className="rounded-2xl border border-border bg-card p-2 group-hover:border-foreground/40 transition-colors">
                <img src={s.src} alt={s.alt} loading="lazy" className="w-full h-auto rounded-xl border border-border" />
              </div>
              <div className="flex items-start justify-between gap-4 mt-4">
                <div>
                  <p className="text-xs font-mono text-accent mb-1">{s.eyebrow}</p>
                  <h3 className="text-lg">{s.title}</h3>
                </div>
                <ArrowRight className="w-5 h-5 mt-1 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
