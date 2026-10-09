import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { advanceDay, DAY_MAX, DAY_REST, DAY_START, dayFrame, dayTagTone, SCRUB_HOLD } from "@/components/demos/frames/day";
import { toneBg, toneText } from "@/components/demos/tones";
import { useDemoClock } from "@/components/demos/useDemoClock";
import { HeroCtas, heroH1, heroLede } from "./HeroCtas";

const HOUR_LABELS = ["00:00", "06:00", "12:00", "18:00", "24:00"];
const PAST_FADE = 0.2;

/* Hero 1c, "A day in your business": a clock, the current event, recent events and a scrubbable 24h track. */
export const HeroDay = () => {
  const { ref, t, reduced } = useDemoClock();
  const [s, setS] = useState({ day: DAY_START, scrubUntil: -1 });

  useEffect(() => {
    if (t > 0) setS((cur) => (t > cur.scrubUntil ? { ...cur, day: advanceDay(cur.day) } : cur));
  }, [t]);

  const scrubbed = s.scrubUntil >= 0;
  const day = reduced && !scrubbed ? DAY_REST : s.day;
  const f = dayFrame(day);

  return (
    <div ref={ref}>
      <div className="grid items-end gap-14 pb-10 pt-12 lg:grid-cols-2 lg:pt-20">
        <div className="flex flex-col gap-[22px]">
          <span className="font-mono text-[13px] text-accent">WHILE YOU RUN THE SHOP</span>
          <h1 className={heroH1}>
            Your business, <em className="font-normal">running all day</em> in your brand.
          </h1>
          <p className={heroLede}>
            Tell Auto once. Agents handle invoices, replies, posts and reports around the clock, and anything that
            leaves the building waits for your yes.
          </p>
          <HeroCtas />
        </div>

        <div className="flex flex-col gap-4 rounded-[18px] border border-border bg-card p-6">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-serif text-5xl leading-none tabular-nums sm:text-[64px]">{f.clock}</span>
            <span className="text-right font-mono text-xs text-muted-foreground">
              {f.phase} · {f.doneCount} JOBS DONE
            </span>
          </div>
          <div className="flex min-h-[118px] flex-col gap-2 rounded-xl border border-border bg-secondary p-4" aria-live="polite">
            <div className="flex justify-between gap-3 font-mono text-[11.5px] text-muted-foreground">
              <span>
                {f.current.time} · {f.current.agent}
              </span>
              <span className={toneText[dayTagTone[f.current.tag]]}>{f.current.tag}</span>
            </div>
            <div className="font-serif text-2xl leading-tight">{f.current.title}</div>
            <div className="text-sm text-muted-foreground">{f.current.note}</div>
          </div>
          <div className="flex flex-col gap-0.5">
            {f.past.map((e, i) => (
              <div
                key={e.time}
                className="grid grid-cols-[52px_1fr_auto] items-baseline gap-2.5 border-b border-border py-[5px] text-[13.5px]"
                style={{ opacity: 1 - i * PAST_FADE }}
              >
                <span className="font-mono text-xs text-muted-foreground">{e.time}</span>
                <span>{e.title}</span>
                <span className={cn("font-mono text-[10.5px]", toneText[dayTagTone[e.tag]])}>{e.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 pb-[72px]">
        <div className="relative h-11 overflow-hidden rounded-[10px] border border-border bg-secondary">
          <span className="absolute inset-y-0 left-0 w-1/4 bg-muted" />
          <span className="absolute inset-y-0 right-0 w-[21%] bg-muted" />
          {f.ticks.map((tk) => (
            <span
              key={tk.left}
              className={cn("absolute top-2.5 h-6 w-[3px] -translate-x-px rounded-sm", tk.reached ? toneBg[dayTagTone[tk.tag]] : "bg-border")}
              style={{ left: tk.left }}
            />
          ))}
          <span className="absolute inset-y-0 w-0.5 bg-accent" style={{ left: f.pct }} />
        </div>
        <input
          type="range"
          min={0}
          max={DAY_MAX}
          value={Math.round(day)}
          aria-label="Time of day"
          onChange={(e) => setS({ day: Number(e.target.value), scrubUntil: t + SCRUB_HOLD })}
          className="m-0 w-full accent-accent"
        />
        <div className="flex justify-between font-mono text-[11px] text-muted-foreground">
          {HOUR_LABELS.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
