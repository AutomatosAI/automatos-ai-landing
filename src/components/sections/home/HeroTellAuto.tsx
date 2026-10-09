import { useState } from "react";
import { BrandChips } from "@/components/demos/BrandChips";
import { ComposerDemo } from "@/components/demos/ComposerDemo";
import { BRANDS } from "@/components/demos/data";
import { HeroCtas, heroH1, heroLede } from "./HeroCtas";

/* Hero 1a, "Tell Auto, live" (the default): copy and a brand-kit switcher left, the composer right. */
export const HeroTellAuto = () => {
  const [brand, setBrand] = useState(0);
  return (
    <div className="grid items-center gap-12 pb-24 pt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:pt-20">
      <div className="flex flex-col gap-6">
        <span className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-card py-1.5 pl-1.5 pr-3.5 text-[13px] text-muted-foreground">
          <span className="whitespace-nowrap rounded bg-accent px-[7px] py-0.5 text-[11px] font-semibold text-accent-foreground">
            Open source
          </span>
          <span>Automatos Studio · powered by Automatos AI</span>
        </span>
        <h1 className={heroH1}>
          Tell Auto what you need. <em className="font-normal">Your business, in your brand.</em>
        </h1>
        <p className={heroLede}>
          A team of agents makes the invoice, the letter, the posts and the sheet, all from your one brand kit. Nothing
          is sent, posted or paid for until you say so.
        </p>
        <HeroCtas />
        <div className="mt-2 flex flex-col gap-2.5">
          <span className="font-mono text-xs text-muted-foreground">TRY A BRAND KIT</span>
          <BrandChips active={brand} onPick={setBrand} />
        </div>
      </div>
      <ComposerDemo brand={BRANDS[brand]} />
    </div>
  );
};
