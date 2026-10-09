import type { BoardStatus } from "./data";

/* Semantic tones the frame functions return; components map them to token classes. */
export type Tone = "fg" | "muted" | "accent" | "olive" | "navy";

export const toneText: Record<Tone, string> = {
  fg: "text-foreground",
  muted: "text-muted-foreground",
  accent: "text-accent",
  olive: "text-olive",
  navy: "text-navy",
};

export const toneBorder: Record<Tone, string> = {
  fg: "border-foreground",
  muted: "border-border",
  accent: "border-accent",
  olive: "border-olive",
  navy: "border-navy",
};

export const toneBg: Record<Tone, string> = {
  fg: "bg-foreground",
  muted: "bg-muted-foreground",
  accent: "bg-accent",
  olive: "bg-olive",
  navy: "bg-navy",
};

/* The product board is always dark; its status colours are fixed, not themed. */
export const statusText: Record<BoardStatus, string> = {
  inbox: "text-board-muted",
  working: "text-board-working",
  review: "text-board-review",
  needs: "text-board-needs",
  done: "text-board-done",
};

export const statusBg: Record<BoardStatus, string> = {
  inbox: "bg-board-muted",
  working: "bg-board-working",
  review: "bg-board-review",
  needs: "bg-board-needs",
  done: "bg-board-done",
};
