import { SLOTS } from "../data";
import type { Tone } from "../tones";

/* /socials: a week plays in WEEK_TICKS; each day is SLOT_TICKS; a post takes MAKING_TICKS to render. */
export const SLOT_TICKS = 30;
export const WEEK_TICKS = SLOT_TICKS * SLOTS.length;
export const MAKING_TICKS = 10;
/* Reduced motion renders day 3 with its post waiting for you. */
export const SOCIALS_REST = SLOT_TICKS * 2 + 15;

const HALF_DAY = SLOT_TICKS / 2;
const MINUTES_PER_TICK = 4;
const FADED = 0.25;
const MISSED = 0.3;

export type Slot = {
  day: string;
  src: string;
  alt: string;
  tag: string;
  tone: Tone;
  canApprove: boolean;
  artOpacity: number;
  highlight: boolean;
};

export type WeekFrame = { dayNum: number; now: string; slots: Slot[] };

const pad = (n: number) => String(n).padStart(2, "0");

function pastSlot(approved: boolean): Pick<Slot, "tag" | "tone" | "artOpacity"> {
  return approved
    ? { tag: "POSTED ✓", tone: "olive", artOpacity: 1 }
    : { tag: "MISSED · NOT APPROVED", tone: "muted", artOpacity: MISSED };
}

function todaySlot(approved: boolean, within: number): Pick<Slot, "tag" | "tone" | "artOpacity" | "canApprove"> {
  if (approved) return { tag: "SCHEDULED · 12:00", tone: "olive", artOpacity: 1, canApprove: false };
  if (within < MAKING_TICKS) return { tag: "MAKING…", tone: "muted", artOpacity: within / MAKING_TICKS, canApprove: false };
  return { tag: "NEEDS YOU", tone: "accent", artOpacity: 1, canApprove: true };
}

function futureSlot(approved: boolean, isNext: boolean): Pick<Slot, "tag" | "tone" | "artOpacity" | "canApprove"> {
  if (approved) return { tag: "SCHEDULED", tone: "olive", artOpacity: 1, canApprove: false };
  if (isNext) return { tag: "READY · NEEDS YOU", tone: "accent", artOpacity: 1, canApprove: true };
  return { tag: "PLANNED", tone: "muted", artOpacity: FADED, canApprove: false };
}

/* A slot approved before its time publishes; one that isn't is marked missed, never posted late. */
export function weekFrame(sw: number, approved: ReadonlySet<number>): WeekFrame {
  const dayIdx = Math.floor(sw / SLOT_TICKS);
  const within = sw % SLOT_TICKS;
  const clock =
    within < HALF_DAY ? `09:${pad(within * MINUTES_PER_TICK)}` : `11:${pad((within - HALF_DAY) * MINUTES_PER_TICK)}`;
  return {
    dayNum: dayIdx + 1,
    now: `${SLOTS[dayIdx].day} ${clock}`,
    slots: SLOTS.map((s, i) => {
      const ok = approved.has(i);
      let state: Pick<Slot, "tag" | "tone" | "artOpacity"> & { canApprove?: boolean };
      if (i < dayIdx) state = pastSlot(ok);
      else if (i === dayIdx) state = todaySlot(ok, within);
      else state = futureSlot(ok, i === dayIdx + 1);
      const canApprove = state.canApprove ?? false;
      return { ...s, ...state, canApprove, highlight: canApprove };
    }),
  };
}
