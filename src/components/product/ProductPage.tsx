import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { SectionEyebrow } from "@/components/sections/SectionEyebrow";
import { SEO } from "@/components/seo/SEO";
import { cn } from "@/lib/utils";

/*
  One layout for every product page: an eyebrow, a serif headline with an
  italic brand line, a lede, then either a live demo ("Try it") or a hero
  screenshot, alternating screenshot + copy sections, a "what runs" list,
  related pages and the waitlist CTA. Screenshots are real captures of the
  local edition (public/images/studio).
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
  /* A code sample shown where a screenshot would go (e.g. an install snippet). */
  code?: { label: string; text: string };
};

export type ProductDemo = {
  label: string;
  hint: string;
  node: ReactNode;
};

export type ProductPageProps = {
  path: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  headline: string;
  brandLine: string;
  lede: string;
  demo?: ProductDemo;
  hero?: Shot;
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

/* Hover zooms to 1.18 around 30% 30% over 1.6s; reduced motion skips it. */
const ZOOM =
  "origin-[30%_30%] transition-transform duration-1600 ease-studio motion-safe:group-hover:scale-[1.18]";

export const Screenshot = ({ shot, priority = false, zoom = false }: { shot: Shot; priority?: boolean; zoom?: boolean }) => (
  <figure className="m-0 flex w-full flex-col gap-2.5">
    <div className="group rounded-2xl border border-border bg-card p-2">
      <div className={cn("overflow-hidden rounded-[10px] bg-board", zoom && "aspect-[16/10]")}>
        <img
          src={shot.src}
          alt={shot.alt}
          loading={priority ? "eager" : "lazy"}
          className={cn("h-auto w-full", zoom && cn("h-full object-cover object-left-top", ZOOM))}
        />
      </div>
    </div>
    {shot.caption && <figcaption className="font-mono text-[12.5px] text-muted-foreground">{shot.caption}</figcaption>}
  </figure>
);

const Motion = ({ children, className }: { children: ReactNode; className?: string }) => {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div {...fadeUp} className={className}>
      {children}
    </motion.div>
  );
};

const TryIt = ({ demo }: { demo: ProductDemo }) => (
  <div className="rounded-[22px] border border-border bg-card p-5 sm:p-7">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
      <span className="flex items-center gap-2 font-mono text-xs tracking-[0.06em]">
        <span className="h-[7px] w-[7px] rounded-full bg-accent" />
        TRY IT · {demo.label}
      </span>
      <span className="font-mono text-xs text-muted-foreground">{demo.hint}</span>
    </div>
    {demo.node}
  </div>
);

const CodeSample = ({ code }: { code: NonNullable<ProductSection["code"]> }) => (
  <figure className="m-0 flex w-full flex-col gap-2.5">
    <div className="overflow-hidden rounded-2xl border border-board-border bg-board">
      <div className="border-b border-board-border px-4 py-2.5 font-mono text-[11px] text-board-muted">{code.label}</div>
      <pre className="m-0 overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-board-text">
        <code>{code.text}</code>
      </pre>
    </div>
  </figure>
);

const SectionRow = ({ s, i }: { s: ProductSection; i: number }) => {
  const flipped = i % 2 === 1;
  const side = s.shot || s.code;
  return (
    <section className="border-t border-border">
      <div
        className={cn(
          "mx-auto grid max-w-[1280px] items-center gap-10 px-4 py-[88px] sm:px-8 lg:gap-16",
          side && "lg:grid-cols-2",
        )}
      >
        <Motion className={cn("flex flex-col gap-4", side && flipped && "lg:order-2", !side && "max-w-3xl")}>
          <SectionEyebrow n={String(i + 1).padStart(2, "0")} label={s.eyebrow} />
          <h2 className="m-0 text-3xl font-medium leading-[1.08] sm:text-[40px]">{s.title}</h2>
          <p className="m-0 text-[17px] leading-relaxed text-muted-foreground">{s.body}</p>
          {s.points && (
            <div className="mt-1 flex flex-col gap-2.5">
              {s.points.map((p) => (
                <span key={p} className="flex gap-2.5 text-[15.5px] leading-snug">
                  <span className="text-olive">✓</span>
                  {p}
                </span>
              ))}
            </div>
          )}
        </Motion>
        {side && (
          <Motion className={cn("min-w-0", flipped && "lg:order-1")}>
            {s.shot ? <Screenshot shot={s.shot} zoom /> : s.code && <CodeSample code={s.code} />}
          </Motion>
        )}
      </div>
    </section>
  );
};

export const ProductPage = ({
  path,
  seoTitle,
  seoDescription,
  eyebrow,
  headline,
  brandLine,
  lede,
  demo,
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
      <section className="mx-auto max-w-[1280px] px-4 pb-12 pt-32 sm:px-8 lg:pt-[152px]">
        <Motion>
          <SectionEyebrow n="Product" label={eyebrow} className="mb-5" />
          <h1 className="m-0 max-w-[960px] text-[40px] font-medium leading-[1.02] tracking-[-0.015em] sm:text-5xl lg:text-[64px]">
            {headline}
          </h1>
          <p className="mb-[22px] mt-1.5 max-w-[960px] font-serif text-[32px] italic leading-[1.05] sm:text-4xl lg:text-[50px]">
            {brandLine}
          </p>
          <p className="m-0 max-w-[720px] text-lg leading-relaxed text-muted-foreground">{lede}</p>
        </Motion>
      </section>

      {(demo || hero) && (
        <section className="mx-auto max-w-[1280px] px-4 pb-24 sm:px-8">
          {demo ? <TryIt demo={demo} /> : hero && <Screenshot shot={hero} priority />}
        </section>
      )}

      {sections.map((s, i) => (
        <SectionRow key={s.title} s={s} i={i} />
      ))}

      {(runs || (related && related.length > 0)) && (
        <section className="mx-auto max-w-[1280px] px-4 pb-8 pt-6 sm:px-8">
          {runs && (
            <div className="rounded-[20px] border border-border bg-card p-8 lg:p-11">
              <h2 className="mb-7 mt-0 text-[28px] font-medium sm:text-[32px]">{runs.title}</h2>
              <div className="grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
                {runs.items.map((item) => (
                  <span key={item} className="flex gap-3 text-[15.5px] leading-normal">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          {related && related.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span className="mr-1.5 text-sm text-muted-foreground">Next:</span>
              {related.map((r) => (
                <Link
                  key={r.href}
                  to={r.href}
                  className="whitespace-nowrap rounded-full border border-border px-4 py-[9px] text-sm font-medium text-foreground transition-colors hover:border-foreground"
                >
                  {r.label} →
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      <CTASection heading={ctaHeading} subheading={ctaSub} />
    </main>

    <Footer />
  </div>
);
