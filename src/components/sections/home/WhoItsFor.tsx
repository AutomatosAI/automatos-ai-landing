import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionEyebrow } from "../SectionEyebrow";
import { BUSINESSES, type Business } from "./businesses";

const linkClass = "self-start text-sm font-medium text-foreground hover:text-accent";

const BusinessLink = ({ link }: { link: Business["link"] }) =>
  link.href.startsWith("/") ? (
    <Link to={link.href} className={linkClass}>
      {link.label} →
    </Link>
  ) : (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {link.label} →
    </a>
  );

/* "Who it's for": pick a business, see who it is, what Studio does for them and the apps it plugs into. */
export const WhoItsFor = () => {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const b = BUSINESSES[active];

  return (
    <section id="who" className="border-t border-border">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-11 px-4 py-24 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div className="flex max-w-[680px] flex-col gap-4">
            <SectionEyebrow n="01" label="Who it's for" />
            <h2 className="m-0 text-4xl font-medium leading-[1.05] sm:text-5xl">
              Built for the business <em className="font-normal">with no IT department.</em>
            </h2>
          </div>
          <p className="m-0 max-w-[420px] text-[16.5px] leading-relaxed text-muted-foreground">
            A café, a salon, an accountant, a store. One person, a lot of paperwork and a feed to fill.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {BUSINESSES.map((x, i) => (
              <button
                key={x.id}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={cn(
                  "flex min-w-[200px] items-center gap-3 whitespace-nowrap rounded-[14px] border px-[18px] py-4 text-left text-[15px] font-medium transition-colors lg:min-w-0",
                  i === active ? "border-foreground bg-foreground text-background" : "border-border bg-card text-foreground hover:border-foreground/50",
                )}
              >
                <span className={cn("font-mono text-xs", i === active ? "text-accent" : "text-muted-foreground")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {x.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={b.id}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid gap-7 rounded-[18px] border border-border bg-card p-5 sm:p-7 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
            >
              <figure className="m-0 flex flex-col gap-2">
                <div className="relative overflow-hidden rounded-[14px] bg-board">
                  <img src={b.image} alt={b.imageAlt} width={800} height={800} className="aspect-square w-full object-cover" />
                  <div className="absolute bottom-3 right-3 w-[38%] rotate-[2deg] rounded-[10px] bg-card p-1.5 shadow-[0_12px_32px_rgba(0,0,0,.35)]">
                    <img
                      src={b.made.src}
                      alt={b.made.alt}
                      width={360}
                      height={450}
                      className="aspect-[4/5] w-full rounded-md object-cover object-top"
                    />
                    <span className="mt-1 block text-center font-mono text-[9.5px] tracking-[0.06em] text-muted-foreground">
                      MADE IN STUDIO
                    </span>
                  </div>
                </div>
                <figcaption className="font-mono text-[11px] tracking-[0.04em] text-muted-foreground">
                  PORTRAIT: AI ILLUSTRATION · CARD: A REAL RENDER FROM STUDIO
                </figcaption>
              </figure>
              <div className="flex flex-col gap-[18px]">
                <span className="font-mono text-xs text-accent">{b.modules.toUpperCase()}</span>
                <span className="font-serif text-3xl leading-tight sm:text-4xl">{b.label}</span>
                <div className="flex flex-col gap-2.5">
                  {b.features.map((f) => (
                    <span key={f} className="flex gap-2.5 text-[15px] leading-snug">
                      <span className="text-olive">✓</span>
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex flex-col gap-4 border-t border-border pt-[18px]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="mr-1 font-mono text-[11px] text-muted-foreground">WORKS WITH</span>
                    {b.logos.map((l) => (
                      <span
                        key={l.name}
                        className="flex items-center gap-1.5 rounded-full border border-border bg-background py-1 pl-1 pr-3 text-[13px]"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                          <img src={l.src} alt="" className="h-3.5 w-3.5 object-contain" />
                        </span>
                        {l.name}
                      </span>
                    ))}
                  </div>
                  <BusinessLink link={b.link} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
