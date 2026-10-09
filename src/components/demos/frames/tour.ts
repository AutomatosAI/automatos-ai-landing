/* Home ProductTour: each chapter lasts CHAPTER_TICKS and has two focus points. */
export const CHAPTER_TICKS = 70;
/* A callout appears this many ticks after its focus point starts. */
export const CALLOUT_DELAY = 12;

export type Focus = { x: number; y: number; s: number };
export type Callout = { x: number; y: number; text: string };

export type Chapter = {
  eyebrow: string;
  title: string;
  desc: string;
  href: string;
  src: string;
  alt: string;
  focus: [Focus, Focus];
  callouts: [Callout, Callout];
};

export type TourFrame = {
  focus: Focus;
  callouts: { text: string; left: string; top: string; visible: boolean }[];
  progress: number;
};

/* ct = ticks into the chapter. A point zoomed around origin o by s lands at o + (p - o) * s. */
export function tourFrame(chapter: Chapter, ct: number): TourFrame {
  const half = CHAPTER_TICKS / 2;
  const fi = ct < half ? 0 : 1;
  const focus = chapter.focus[fi];
  const place = (p: number, o: number) => `${o + (p - o) * focus.s}%`;
  const startedAt = fi === 0 ? 0 : half;
  return {
    focus,
    callouts: chapter.callouts.map((c, i) => ({
      text: c.text,
      left: place(c.x, focus.x),
      top: place(c.y, focus.y),
      visible: i === fi && ct > startedAt + CALLOUT_DELAY,
    })),
    progress: Math.min(1, ct / CHAPTER_TICKS),
  };
}

/* Reduced motion: no zoom, both callouts pinned where they sit on the unzoomed capture. */
export function restingTourFrame(chapter: Chapter): TourFrame {
  return {
    focus: { ...chapter.focus[0], s: 1 },
    callouts: chapter.callouts.map((c) => ({ text: c.text, left: `${c.x}%`, top: `${c.y}%`, visible: true })),
    progress: 1,
  };
}
