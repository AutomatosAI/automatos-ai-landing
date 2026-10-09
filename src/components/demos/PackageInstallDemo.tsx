import { useState } from "react";
import { cn } from "@/lib/utils";
import { PACKAGES } from "./data";
import { installFrame } from "./frames/install";
import { useDemoClock } from "./useDemoClock";

const MARK = { idle: "+", pending: "…", done: "✓" } as const;

/* /marketplace: pick a package, Install, and its agents, playbooks and connections tick in. */
export const PackageInstallDemo = () => {
  const { ref, t, reduced } = useDemoClock();
  const [pkg, setPkg] = useState(0);
  const [installAt, setInstallAt] = useState<number | null>(null);

  /* Reduced motion skips the ticking: one click installs everything. */
  const elapsed = installAt === null ? null : reduced ? Number.MAX_SAFE_INTEGER : t - installAt;
  const current = PACKAGES[pkg];
  const f = installFrame(current, elapsed);

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="flex flex-col gap-2.5">
        {PACKAGES.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => {
              setPkg(i);
              setInstallAt(null);
            }}
            aria-pressed={i === pkg}
            className={cn(
              "flex flex-col gap-1.5 rounded-[14px] border-[1.5px] p-4 text-left text-foreground transition-colors",
              i === pkg ? "border-foreground bg-background" : "border-border bg-transparent hover:border-foreground/50",
            )}
          >
            <span className="flex items-center justify-between gap-2">
              <span className="font-serif text-[21px]">{p.name}</span>
              <span className="whitespace-nowrap font-mono text-[10.5px] text-muted-foreground">{p.by}</span>
            </span>
            <span className="text-[13.5px] leading-snug text-muted-foreground">{p.desc}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3.5 rounded-2xl border border-border bg-background p-[22px]">
        <div className="flex items-center justify-between gap-3">
          <span className="font-serif text-[26px]">{current.name}</span>
          <button
            type="button"
            onClick={() => installAt === null && setInstallAt(t)}
            className={cn(
              "rounded-full px-[18px] py-[9px] text-sm font-medium text-background",
              f.finished ? "bg-olive" : "bg-foreground hover:bg-foreground/90",
            )}
          >
            {f.button}
          </button>
        </div>
        <span className="h-1 overflow-hidden rounded bg-border">
          <span className="block h-1 bg-accent transition-[width] duration-200" style={{ width: `${f.progress * 100}%` }} />
        </span>
        {f.groups.map((g) => (
          <div key={g.label} className="flex flex-col gap-1.5">
            <span className="font-mono text-[11px] text-muted-foreground">{g.label}</span>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <span
                  key={it.name}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-[11px] py-[5px] text-[13.5px] transition-opacity duration-300",
                    it.state === "done" ? "border-olive" : "border-border",
                    it.state === "pending" ? "opacity-50" : "opacity-100",
                  )}
                >
                  <span className={it.state === "done" ? "text-olive" : "text-muted-foreground"}>{MARK[it.state]}</span>
                  {it.name}
                </span>
              ))}
            </div>
          </div>
        ))}
        <span className={cn("mt-auto text-[13.5px]", f.finished ? "text-olive" : "text-muted-foreground")} aria-live="polite">
          {f.note}
        </span>
      </div>
    </div>
  );
};
