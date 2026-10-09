import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { JOBS, type BrandKit } from "./data";
import { BrandArtefact } from "./BrandArtefact";
import { advanceComposer, composerFrame, COMPOSER_REST, initialComposer, pickJob } from "./frames/composer";
import { toneBg, toneBorder, toneText } from "./tones";
import { caretOn, useDemoClock } from "./useDemoClock";

const TICKET_BASE = 1036;

/*
  Hero 1a: a job is typed to Auto, the agent steps tick in, the branded
  artefact fades up and the card ends on NEEDS YOU with Approve. Auto-cycles
  about every 13s unless the visitor picks a job.
*/
export const ComposerDemo = ({ brand }: { brand: BrandKit }) => {
  const { ref, t, reduced } = useDemoClock();
  const [s, setS] = useState(initialComposer);

  useEffect(() => {
    if (t > 0) setS((cur) => advanceComposer(cur, t, JOBS.length));
  }, [t]);

  const job = JOBS[s.job];
  const approved = s.approvedAt !== null;
  const f = composerFrame(job, reduced ? COMPOSER_REST : t - s.jobStart, approved);
  const approve = () => {
    if (f.showAsk && !approved) setS((cur) => ({ ...cur, approvedAt: t }));
  };
  const askTone = approved ? "olive" : "accent";

  return (
    <div ref={ref} className="overflow-hidden rounded-[18px] border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-[18px] py-3 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-2" aria-live="polite">
          <span className={cn("h-[7px] w-[7px] rounded-full", toneBg[f.liveTone])} />
          AUTO · {f.status}
        </span>
        <span className="whitespace-nowrap">TICKET #{TICKET_BASE + s.job}</span>
      </div>

      <div className="flex flex-wrap gap-2 px-[18px] pt-3.5">
        {JOBS.map((j, i) => (
          <button
            key={j.key}
            type="button"
            onClick={() => setS(pickJob(i, t))}
            aria-pressed={i === s.job}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[13px] transition-colors",
              i === s.job ? "border-foreground bg-foreground text-background" : "border-border text-foreground hover:border-foreground/50",
            )}
          >
            {j.label}
          </button>
        ))}
      </div>

      <div className="flex min-h-[430px] flex-col gap-3.5 px-[18px] py-4">
        <div className="max-w-[82%] self-end rounded-[14px_14px_4px_14px] bg-secondary px-3.5 py-3 text-[14.5px] leading-normal">
          {f.typed}
          <span className={f.typing && caretOn(t) ? "opacity-100" : "opacity-0"} aria-hidden>
            ▍
          </span>
        </div>

        <div className={cn("flex items-start gap-2.5 transition-opacity", f.showSteps ? "opacity-100" : "opacity-0")}>
          <img src="/brand/automatos-mark-hi.png" alt="" className="mt-0.5 h-[26px] w-[26px] object-contain" />
          <div className="flex flex-1 flex-col gap-1.5">
            {f.steps.map((step) => (
              <div
                key={step.text}
                className={cn("flex items-center gap-2 text-[13.5px] transition-opacity duration-300", step.shown ? "opacity-100" : "opacity-0")}
              >
                <span className={cn("w-3.5 font-mono text-[11px]", step.done ? "text-olive" : "text-muted-foreground")}>
                  {step.done ? "✓" : "…"}
                </span>
                {step.text}
              </div>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "transition-[opacity,transform] duration-500",
            f.showArtefact ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          <BrandArtefact brand={brand} kind={job.key} docType={job.doc} />
        </div>

        <div
          className={cn(
            "mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-border pt-3.5 transition-opacity duration-300",
            f.showAsk ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <span className="flex items-center gap-2 text-sm">
            <span className={cn("rounded border px-1.5 font-mono text-[11px]", toneText[askTone], toneBorder[askTone])}>
              {approved ? "DONE" : "NEEDS YOU"}
            </span>
            {approved ? "Approved by you. Logged on the board." : job.ask}
          </span>
          <span className="flex gap-2">
            <button type="button" className="rounded-full border border-border px-3.5 py-2 text-[13.5px] text-foreground">
              Edit
            </button>
            <button
              type="button"
              onClick={approve}
              className={cn(
                "rounded-full px-4 py-2 text-[13.5px] font-medium text-background",
                approved ? "bg-olive" : "bg-foreground hover:bg-foreground/90",
              )}
            >
              {approved ? "Sent ✓" : job.btn}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};
