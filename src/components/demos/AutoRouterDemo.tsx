import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { REQUESTS } from "./data";
import { advanceRouter, initialRouter, ROUTER_REST, routerFrame } from "./frames/router";
import { toneText } from "./tones";
import { useDemoClock } from "./useDemoClock";

/* /auto: pick a request, Auto replies, the matched agent works and lands in review. */
export const AutoRouterDemo = () => {
  const { ref, t, reduced } = useDemoClock();
  const [s, setS] = useState(initialRouter);

  useEffect(() => {
    if (t > 0) setS((cur) => advanceRouter(cur, t));
  }, [t]);

  const f = routerFrame(s.req, reduced ? ROUTER_REST : t - s.start);

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11.5px] text-muted-foreground">YOU SAY</span>
        {REQUESTS.map((r, i) => (
          <button
            key={r.text}
            type="button"
            onClick={() => setS({ req: i, start: t, locked: true })}
            aria-pressed={i === s.req}
            className={cn(
              "rounded-xl border px-3.5 py-3 text-left text-sm leading-snug transition-colors",
              i === s.req ? "border-foreground bg-foreground text-background" : "border-border text-foreground hover:border-foreground/50",
            )}
          >
            “{r.text}”
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3.5">
        <div className="flex items-center gap-3 rounded-[14px] border border-border bg-secondary px-4 py-3.5">
          <img src="/brand/automatos-mark-hi.png" alt="" className="h-7 w-7 object-contain" />
          <span className="text-[15px] leading-snug" aria-live="polite">
            {f.say}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {f.agents.map((a) => (
            <div
              key={a.name}
              className={cn(
                "flex flex-col gap-1.5 rounded-[14px] border-[1.5px] p-3.5 transition-colors duration-300",
                a.active ? "border-accent bg-background" : "border-border bg-transparent",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-serif text-[19px] leading-tight">{a.name}</span>
                <span className={cn("whitespace-nowrap font-mono text-[10.5px]", toneText[a.tone])}>{a.tag}</span>
              </div>
              <span className="text-[13px] text-muted-foreground">{a.skills}</span>
              <span className="h-[3px] overflow-hidden rounded-full bg-border">
                <span
                  className="block h-[3px] bg-accent transition-[width] duration-200"
                  style={{ width: `${Math.round(a.progress * 100)}%` }}
                />
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-2 border-t border-dashed border-border pt-3 font-mono text-xs text-muted-foreground">
          <span>{f.ticket}</span>
          <span className={toneText[f.stateTone]}>{f.state}</span>
        </div>
      </div>
    </div>
  );
};
