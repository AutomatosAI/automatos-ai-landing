import { cn } from "@/lib/utils";
import { BRANDS } from "./data";

/* The sample brand kits as pills; each shows its mark in its own ink and paper. */
export const BrandChips = ({ active, onPick }: { active: number; onPick: (i: number) => void }) => (
  <div className="flex flex-wrap gap-2">
    {BRANDS.map((b, i) => (
      <button
        key={b.name}
        type="button"
        onClick={() => onPick(i)}
        aria-pressed={i === active}
        className={cn(
          "flex items-center gap-2 whitespace-nowrap rounded-full border py-1.5 pl-1.5 pr-3.5 text-[13px] font-medium text-foreground transition-colors",
          i === active ? "border-foreground bg-card" : "border-border bg-transparent hover:border-foreground/50",
        )}
      >
        <span
          className="flex h-[22px] w-[22px] items-center justify-center rounded-full text-[9px] font-bold"
          style={{ background: b.ink, color: b.paper }}
        >
          {b.mark}
        </span>
        {b.name}
      </button>
    ))}
  </div>
);
