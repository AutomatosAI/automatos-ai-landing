import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CHAPTER_TICKS, restingTourFrame, tourFrame } from "@/components/demos/frames/tour";
import { useDemoClock } from "@/components/demos/useDemoClock";
import { SectionEyebrow } from "../SectionEyebrow";
import { CHAPTERS } from "./data";

const EASE = "cubic-bezier(.45,.05,.25,1)";
const IMAGE_TRANSITION = `opacity .6s, transform 1.8s ${EASE}, transform-origin 1.8s ${EASE}`;

/*
  "This is it. Not a mock-up." Four chapters, each a real capture that zooms
  to two focus points with a callout pinned to each. Replaces ScreensSection.
*/
export const ProductTour = () => {
  const { ref, t, reduced } = useDemoClock();
  const [s, setS] = useState({ ch: 0, start: 0 });

  useEffect(() => {
    if (t > 0) setS((cur) => (t - cur.start >= CHAPTER_TICKS ? { ch: (cur.ch + 1) % CHAPTERS.length, start: t } : cur));
  }, [t]);

  const chapter = CHAPTERS[s.ch];
  const f = reduced ? restingTourFrame(chapter) : tourFrame(chapter, t - s.start);

  return (
    <section id="tour" className="border-t border-border">
      <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-8">
        <div className="mb-11 flex flex-col items-center gap-3.5 text-center">
          <SectionEyebrow n="02" label="The product" />
          <h2 className="m-0 text-4xl font-medium leading-[1.05] sm:text-[50px]">
            This is it. <em className="font-normal">Not a mock-up.</em>
          </h2>
          <p className="m-0 max-w-[620px] text-[17px] text-muted-foreground">
            Every frame is a capture of the platform running on a laptop, in the Automatos workspace.
          </p>
        </div>

        <div ref={ref} className="grid items-start gap-7 lg:grid-cols-[300px_minmax(0,1fr)]">
          <div className="flex gap-1.5 overflow-x-auto lg:flex-col lg:overflow-visible">
            {CHAPTERS.map((c, i) => {
              const active = i === s.ch;
              const progress = active ? f.progress : i < s.ch ? 1 : 0;
              return (
                <button
                  key={c.eyebrow}
                  type="button"
                  onClick={() => setS({ ch: i, start: t })}
                  aria-pressed={active}
                  className={cn(
                    "flex min-w-[220px] flex-col gap-1.5 rounded-[14px] border px-[18px] py-4 text-left text-foreground lg:min-w-0",
                    active ? "border-border bg-card" : "border-transparent bg-transparent",
                  )}
                >
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")} · {c.eyebrow}
                  </span>
                  <span className="font-serif text-xl leading-tight">{c.title}</span>
                  <span className={cn("text-[13.5px] leading-snug text-muted-foreground", active ? "opacity-100" : "opacity-60")}>
                    {c.desc}
                  </span>
                  <span className="mt-1 h-0.5 overflow-hidden rounded-sm bg-border">
                    <span className="block h-0.5 bg-foreground" style={{ width: `${progress * 100}%` }} />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-2xl border border-border bg-card p-2">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-board">
                {CHAPTERS.map((c, i) => {
                  const active = i === s.ch;
                  const focus = active ? f.focus : { ...c.focus[0], s: 1 };
                  return (
                    <img
                      key={c.src}
                      src={c.src}
                      alt={c.alt}
                      loading={i === 0 ? "eager" : "lazy"}
                      aria-hidden={!active}
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{
                        opacity: active ? 1 : 0,
                        transformOrigin: `${focus.x}% ${focus.y}%`,
                        transform: `scale(${focus.s})`,
                        transition: reduced ? "opacity .6s" : IMAGE_TRANSITION,
                      }}
                    />
                  );
                })}
                {f.callouts.map((co) => (
                  <div
                    key={co.text}
                    className="pointer-events-none absolute flex items-center gap-2 transition-opacity duration-500"
                    style={{ left: co.left, top: co.top, opacity: co.visible ? 1 : 0 }}
                  >
                    <span className="h-3.5 w-3.5 rounded-full border-[3px] border-callout bg-board-needs ring-1 ring-board-needs" />
                    <span className="hidden whitespace-nowrap rounded-lg bg-callout px-[11px] py-[7px] text-[13.5px] font-medium text-callout-ink shadow-[0_6px_20px_rgba(0,0,0,.25)] sm:inline">
                      {co.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-[7px] w-[7px] rounded-full bg-olive" />
                CAPTURED ON A LAPTOP · AUTOMATOS WORKSPACE · TUE 6 OCT
              </span>
              <Link to={chapter.href} className="text-foreground hover:text-accent">
                Open {chapter.eyebrow} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
