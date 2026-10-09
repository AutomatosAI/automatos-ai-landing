import { useState } from "react";
import { cn } from "@/lib/utils";
import { BOARD_LOOP, BOARD_REST, boardFrame } from "./frames/board";
import { approvalsIn, noApprovals, withApproval, type LoopApprovals } from "./frames/loop";
import { statusBg, statusText } from "./tones";
import { caretOn, useDemoClock } from "./useDemoClock";

type Variant = "hero" | "panel";

/*
  The product board, always dark: Auto files tickets, they advance a column
  every ~2s and stop at NEEDS YOU until Approve is clicked. Loops every 22s.
  Used as hero 1b ("hero", open at the bottom) and on /command-centre ("panel").
*/
export const BoardDemo = ({ variant = "panel" }: { variant?: Variant }) => {
  const { ref, t, reduced } = useDemoClock();
  const [approvals, setApprovals] = useState<LoopApprovals>(noApprovals);
  const loop = Math.floor(t / BOARD_LOOP);
  const f = boardFrame(reduced ? BOARD_REST : t % BOARD_LOOP, approvalsIn(approvals, loop));
  const hero = variant === "hero";

  return (
    <div
      ref={ref}
      className={cn(
        "border border-board-border bg-board text-board-text",
        hero ? "rounded-t-2xl border-b-0 px-[22px] pt-[22px]" : "rounded-[14px] p-[18px]",
      )}
    >
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-board-border bg-board-field px-3.5 py-2.5">
          <img src="/brand/automatos-mark-hi.png" alt="" className="h-5 w-5 object-contain" />
          <span className="truncate text-sm">
            {f.request.text}
            <span className={f.request.typing && caretOn(t) ? "opacity-100" : "opacity-0"} aria-hidden>
              ▍
            </span>
          </span>
          <span className="ml-auto whitespace-nowrap font-mono text-[11px] text-board-muted">
            AUTO · FILED #{f.request.id}
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {f.stats.map((st) => (
            <div key={st.label} className="min-w-[84px] rounded-[10px] border border-board-border px-3 py-1.5">
              <div className="whitespace-nowrap font-mono text-[10px] tracking-[0.08em] text-board-muted">{st.label}</div>
              <div className={cn("font-mono text-xl", st.status === "text" ? "text-board-text" : statusText[st.status])}>
                {st.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div
          className={cn(
            "grid min-w-[760px] grid-cols-5 gap-3 overflow-hidden",
            hero ? "h-[340px]" : "h-[320px] gap-2.5",
          )}
        >
          {f.columns.map((col) => (
            <div
              key={col.name}
              className={cn(
                "flex min-w-0 flex-col border border-board-border bg-board-column",
                hero ? "rounded-t-xl" : "rounded-xl",
              )}
            >
              <div className="flex items-center justify-between border-b border-board-border px-3 py-2.5">
                <span className="flex items-center gap-[7px] whitespace-nowrap font-mono text-[11px] tracking-[0.08em]">
                  <span className={cn("h-[7px] w-[7px] rounded-full", statusBg[col.status])} />
                  {col.name}
                </span>
                <span className="rounded-full bg-board-pill px-[7px] py-px font-mono text-[11px] text-board-muted">
                  {col.count}
                </span>
              </div>
              <div className="flex flex-col gap-2 p-2.5">
                {col.items.map((k) => {
                  const needsYou = col.status === "needs";
                  return (
                    <div
                      key={k.id}
                      className={cn(
                        "flex flex-col gap-1.5 rounded-[10px] border bg-board-card p-2.5",
                        needsYou ? "border-board-needs" : "border-board-border",
                      )}
                    >
                      <div className="flex justify-between font-mono text-[10.5px] text-board-muted">
                        <span>
                          #{k.id} · {k.kind}
                        </span>
                        <span className={statusText[col.status]}>{col.tag}</span>
                      </div>
                      <div className="font-serif text-[15px] leading-tight">{k.title}</div>
                      <div className="flex items-center justify-between font-mono text-[10.5px] text-board-muted">
                        <span>{k.agent}</span>
                        {needsYou && (
                          <button
                            type="button"
                            onClick={() => setApprovals((a) => withApproval(a, loop, k.id))}
                            className="rounded-full bg-board-needs px-2.5 py-0.5 font-sans text-xs font-medium text-board"
                          >
                            Approve
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
