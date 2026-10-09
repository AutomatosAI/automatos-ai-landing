import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionEyebrow } from "../SectionEyebrow";
import { OS_MODULES } from "./data";

/* "What's underneath": eight OS modules driving one detail card. Replaces the OsHub ring hero. */
export const OsUnderneath = () => {
  const [active, setActive] = useState(0);
  const cur = OS_MODULES[active];
  return (
    <section id="os" className="border-t border-border">
      <div className="mx-auto grid max-w-[1280px] items-start gap-14 px-4 py-24 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex flex-col gap-[18px]">
          <SectionEyebrow n="03" label="What's underneath" />
          <h2 className="m-0 text-4xl font-medium leading-[1.05] sm:text-5xl">
            One voice on top. <em className="font-normal">A whole OS underneath.</em>
          </h2>
          <p className="m-0 text-[17px] leading-relaxed text-muted-foreground">
            Studio is what you see. Underneath, the Automatos OS runs the agents, remembers your business and keeps
            every action on the record.
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {OS_MODULES.map((m, i) => (
              <button
                key={m.name}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={cn(
                  "flex items-center gap-2 rounded-[10px] border px-3.5 py-[11px] text-left font-mono text-[13px] transition-colors",
                  i === active ? "border-foreground bg-foreground text-background" : "border-border bg-card text-foreground hover:border-foreground/50",
                )}
              >
                <span className={cn("h-[7px] w-[7px] rounded-full", i === active ? "bg-accent" : "bg-olive")} />
                {m.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex min-h-[420px] flex-col gap-[18px] rounded-[18px] border border-border bg-card p-7 sm:p-9" aria-live="polite">
          <span className="font-mono text-xs text-accent">THE OS · {cur.name}</span>
          <span className="font-serif text-3xl leading-tight sm:text-4xl">{cur.title}</span>
          <p className="m-0 text-[16.5px] leading-relaxed text-muted-foreground">{cur.body}</p>
          <div className="mt-auto flex flex-col gap-2.5 border-t border-border pt-[18px]">
            {cur.points.map((p) => (
              <span key={p} className="flex gap-2.5 text-[15px]">
                <span className="text-olive">✓</span>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
