import { useState } from "react";
import { cn } from "@/lib/utils";
import { KIT_RENDERS } from "./kitRenders";

/*
  Desktop columns follow the kit's document count (up to four), so a kit with
  two renders fills the row instead of leaving half of it empty. With one or
  two renders, each column stays at most the 400 px render width. Whole class
  names, for Tailwind.
*/
const DESKTOP_GRID: Record<number, string> = {
  1: "lg:mx-auto lg:max-w-[400px] lg:grid-cols-1",
  2: "lg:mx-auto lg:max-w-[814px] lg:grid-cols-2",
  3: "lg:grid-cols-3",
};
const DESKTOP_GRID_FULL = "lg:grid-cols-4";

/*
  /documents: real page-1 renders from Studio, grouped by the brand kit that
  made them. Each chip is a kit that has actually been rendered; switching
  shows that kit's documents. Add a kit in kitRenders.ts and it appears here.
*/
export const BrandKitDemo = () => {
  const [active, setActive] = useState(0);
  const kit = KIT_RENDERS[active];

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1.5 font-mono text-[11.5px] text-muted-foreground">BRAND KIT</span>
        {KIT_RENDERS.map((k, i) => (
          <button
            key={k.name}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap rounded-full border py-1.5 pl-1.5 pr-3.5 text-[13px] font-medium text-foreground transition-colors",
              i === active ? "border-foreground bg-card" : "border-border hover:border-foreground/50",
            )}
          >
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white">
              <img src={k.logo} alt="" className="h-3.5 w-3.5 object-contain" />
            </span>
            {k.name}
          </button>
        ))}
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">{kit.note}</span>
      </div>
      <div className={cn("grid w-full grid-cols-2 gap-3.5", DESKTOP_GRID[kit.docs.length] ?? DESKTOP_GRID_FULL)}>
        {kit.docs.map((d) => (
          <figure key={d.src} className="m-0 flex flex-col gap-2">
            <img
              src={d.src}
              alt={d.alt}
              width={400}
              height={520}
              loading="lazy"
              className="aspect-[1/1.3] w-full rounded-[10px] object-cover object-top shadow-[0_10px_30px_rgba(0,0,0,.18)]"
            />
            <figcaption className="font-mono text-[11px] text-muted-foreground">{d.label.toUpperCase()}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};
