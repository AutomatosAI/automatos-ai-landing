import { DAY, type DayEvent, type DayTag } from "../data";
import type { Tone } from "../tones";

/* Hero 1c: the day runs on a 0–240 scale (tenths of an hour). */
export const DAY_MAX = 240;
export const DAY_START = 50;
export const DAY_STEP = 0.6;
/* A scrub pauses autoplay for this many ticks (~5s). */
export const SCRUB_HOLD = 45;
/* Reduced motion renders mid-afternoon. */
export const DAY_REST = 160;

const PAST_SHOWN = 4;
const NIGHT_ENDS = 6;
const NIGHT_STARTS = 19;

export const dayTagTone: Record<DayTag, Tone> = {
  DONE: "olive",
  "NEEDS YOU": "accent",
  POSTED: "navy",
  QUEUED: "muted",
  IDLE: "muted",
};

const IDLE_EVENT: DayEvent = {
  h: 0,
  time: "00:00",
  agent: "Auto",
  title: "Overnight: the board is quiet",
  note: "Scheduled playbooks start at 06:00.",
  tag: "IDLE",
};

export const advanceDay = (day: number) => (day >= DAY_MAX ? 0 : day + DAY_STEP);

const pad = (n: number) => String(n).padStart(2, "0");

export type DayFrame = {
  clock: string;
  phase: string;
  doneCount: number;
  current: DayEvent;
  past: DayEvent[];
  ticks: { left: string; reached: boolean; tag: DayTag }[];
  pct: string;
};

export function dayFrame(day: number): DayFrame {
  const hour = day / 10;
  const happened = DAY.filter((e) => e.h <= hour);
  const hh = Math.floor(hour);
  const mm = Math.floor((hour - hh) * 60);
  return {
    clock: `${pad(hh % 24)}:${pad(mm)}`,
    phase: hour < NIGHT_ENDS || hour >= NIGHT_STARTS ? "NIGHT SHIFT" : "OPEN",
    doneCount: happened.length * 3 + hh,
    current: happened[happened.length - 1] ?? IDLE_EVENT,
    past: happened.slice(0, -1).reverse().slice(0, PAST_SHOWN),
    ticks: DAY.map((e) => ({ left: `${(e.h / 24) * 100}%`, reached: e.h <= hour, tag: e.tag })),
    pct: `${(hour / 24) * 100}%`,
  };
}
