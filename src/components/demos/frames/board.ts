import { BOARD_COLUMNS, TICKETS, type BoardStatus, type Ticket } from "../data";

/* The board loops every BOARD_LOOP ticks; a ticket moves a column every STAGE_TICKS. */
export const BOARD_LOOP = 200;
export const STAGE_TICKS = 18;
/* Reduced motion renders this point of the loop: tickets spread across the columns. */
export const BOARD_REST = 120;

const NEEDS_YOU = 3;
const DONE = 4;
const DONE_BEFORE_TODAY = 41;
const MAX_PER_COLUMN = 3;

/* -1 = not filed yet. Tickets stop at "needs you" until approved. */
export function stageOf(ticket: Ticket, bt: number, approved: ReadonlySet<number>): number {
  const age = bt - ticket.spawn;
  if (age < 0) return -1;
  if (approved.has(ticket.id)) return DONE;
  return Math.min(NEEDS_YOU, Math.floor(age / STAGE_TICKS));
}

export type BoardColumn = {
  name: string;
  status: BoardStatus;
  tag: string;
  count: number;
  items: Ticket[];
};

export type BoardStat = { label: string; value: number; status: BoardStatus | "text" };

export type BoardFrame = {
  columns: BoardColumn[];
  stats: BoardStat[];
  request: { text: string; typing: boolean; id: number };
};

export function boardFrame(bt: number, approved: ReadonlySet<number>): BoardFrame {
  const columns = BOARD_COLUMNS.map((c, ci) => {
    const inColumn = TICKETS.filter((k) => stageOf(k, bt, approved) === ci);
    return { ...c, count: inColumn.length, items: inColumn.slice(-MAX_PER_COLUMN).reverse() };
  });
  const filed = TICKETS.filter((k) => bt >= k.spawn);
  const latest = filed[filed.length - 1] ?? TICKETS[0];
  const typedN = Math.max(0, bt - latest.spawn) * 3 + 1;
  return {
    columns,
    stats: [
      { label: "WORKING", value: columns[1].count + columns[2].count, status: "working" },
      { label: "NEEDS YOU", value: columns[NEEDS_YOU].count, status: "needs" },
      { label: "DONE TODAY", value: DONE_BEFORE_TODAY + columns[DONE].count, status: "done" },
      { label: "AGENTS", value: 6, status: "text" },
    ],
    request: {
      text: latest.title.slice(0, Math.min(latest.title.length, typedN)),
      typing: typedN <= latest.title.length,
      id: latest.id,
    },
  };
}
