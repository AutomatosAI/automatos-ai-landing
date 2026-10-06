import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { SEO } from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";

/*
  One layout for every product page: an eyebrow, a serif headline with an
  italic brand line, a lede, a hero screenshot, alternating screenshot +
  copy sections, a "what runs" list, related pages and the waitlist CTA.
  Screenshots are real captures of the local edition (public/images/studio).
*/

export type Shot = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProductSection = {
  eyebrow: string;
  title: string;
  body: string;
  points?: string[];
  shot?: Shot;
  flip?: boolean;
};

export type ProductPageProps = {
  path: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  headline: string;
  brandLine: string;
  lede: string;
  hero: Shot;
  sections: ProductSection[];
  runs?: { title: string; items: string[] };
  related?: { label: string; href: string }[];
  ctaHeading?: ReactNode;
  ctaSub?: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export const Screenshot = ({ shot, priority = false }: { shot: Shot; priority?: boolean }) => (
  <figure className="w-full">
    <div className="rounded-2xl border border-border bg-card p-2 shadow-[0_12px_40px_rgba(26,24,20,0.10)]">
      <img
        src={shot.src}
        alt={shot.alt}
        loading={priority ? "eager" : "lazy"}
        className="w-full h-auto rounded-xl border border-border"
      />
    </div>
    {shot.caption && (
      <figcaption className="mt-3 text-sm text-muted-foreground font-mono">{shot.caption}</figcaption>
    )}
  </figure>
);

export const ProductPage = ({
  path,
  seoTitle,
  seoDescription,
  eyebrow,
  headline,
  brandLine,
  lede,
  hero,
  sections,
  runs,
  related,
  ctaHeading,
  ctaSub,
}: ProductPageProps) => (
  <div className="min-h-screen bg-background">
    <SEO title={seoTitle} description={seoDescription} path={path} />
    <Navbar />

    <main>
      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-accent font-mono text-sm">Product</span>
              <span className="text-muted-foreground text-sm">{eyebrow}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-2">{headline}</h1>
            <p className="text-3xl sm:text-4xl lg:text-5xl brand-line mb-6">{brandLine}</p>
            <p className="text-muted-foreground text-lg max-w-2xl">{lede}</p>
          </motion.div>
          <motion.div {...fadeUp} className="mt-12">
            <Screenshot shot={hero} priority />
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      {sections.map((s, i) => (
        <section key={s.title} className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${s.flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <motion.div {...fadeUp}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-accent font-mono text-sm">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-muted-foreground text-sm">{s.eyebrow}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl mb-4">{s.title}</h2>
                <p className="text-muted-foreground text-lg mb-6">{s.body}</p>
                {s.points && (
                  <ul className="space-y-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-olive mt-0.5 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
              <motion.div {...fadeUp}>
                {s.shot ? (
                  <Screenshot shot={s.shot} />
                ) : (
                  <div className="rounded-2xl border border-dashed border-border bg-secondary/40 aspect-[16/10] flex items-center justify-center text-muted-foreground font-mono text-sm">
                    screenshot to come
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* What runs */}
      {runs && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeUp} className="bg-card border border-border rounded-2xl p-8 lg:p-12">
              <h2 className="text-2xl sm:text-3xl mb-8">{runs.title}</h2>
              <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
                {runs.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      )}

      {/* Related */}
      {related && related.length > 0 && (
        <section className="pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground mr-2">Next:</span>
            {related.map((r) => (
              <Link key={r.href} to={r.href}>
                <Button variant="outline" className="rounded-full">
                  {r.label}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CTASection heading={ctaHeading} subheading={ctaSub} showEyebrow={false} />
    </main>

    <Footer />
  </div>
);
