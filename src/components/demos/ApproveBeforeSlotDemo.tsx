import { useState } from "react";
import { cn } from "@/lib/utils";
import { approvalsIn, noApprovals, withApproval, type LoopApprovals } from "./frames/loop";
import { SOCIALS_REST, WEEK_TICKS, weekFrame } from "./frames/socials";
import { toneText } from "./tones";
import { useDemoClock } from "./useDemoClock";

/* /socials: a week plays fast; approve a slot before its time or it is marked missed. */
export const ApproveBeforeSlotDemo = () => {
  const { ref, t, reduced } = useDemoClock();
  const [approvals, setApprovals] = useState<LoopApprovals>(noApprovals);
  const loop = Math.floor(t / WEEK_TICKS);
  const f = weekFrame(reduced ? SOCIALS_REST : t % WEEK_TICKS, approvalsIn(approvals, loop));

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-between gap-2 font-mono text-xs text-muted-foreground">
        <span>PLAN · HARBOURLINE + AUTOMATOS · 1 POST A DAY · DAY {f.dayNum} OF 7</span>
        <span aria-live="polite">NOW · {f.now}</span>
      </div>
      <div className="overflow-x-auto">
        <div className="grid min-w-[760px] grid-cols-7 gap-2.5">
          {f.slots.map((sl, i) => (
            <div
              key={sl.day}
              className={cn(
                "flex min-w-0 flex-col gap-2 rounded-xl border-[1.5px] bg-background p-2.5",
                sl.highlight ? "border-accent" : "border-border",
              )}
            >
              <div className="flex justify-between font-mono text-[11px] text-muted-foreground">
                <span>{sl.day}</span>
                <span>12:00</span>
              </div>
              <img
                src={sl.src}
                alt={sl.alt}
                loading="lazy"
                width={432}
                height={540}
                className="aspect-[4/5] w-full rounded-lg object-cover transition-opacity"
                style={{ opacity: sl.artOpacity }}
              />
              <span className={cn("font-mono text-[10.5px]", toneText[sl.tone])}>{sl.tag}</span>
              {sl.canApprove && (
                <button
                  type="button"
                  onClick={() => setApprovals((a) => withApproval(a, loop, i))}
                  className="rounded-full bg-primary py-1.5 text-[12.5px] font-medium text-primary-foreground"
                >
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <span className="text-[13.5px] text-muted-foreground">
        Approve a slot before its time and it publishes. Miss it and it's marked missed, never posted late. Every card
        here is a real render from Studio.
      </span>
    </div>
  );
};
