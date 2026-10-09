import { describe, it, expect } from "vitest";
import { JOBS, PACKAGES, TICKETS } from "../data";
import { advanceComposer, composerFrame, COMPOSER, COMPOSER_REST, initialComposer, pickJob } from "./composer";
import { boardFrame, stageOf, STAGE_TICKS, BOARD_REST } from "./board";
import { dayFrame, advanceDay, DAY_MAX } from "./day";
import { advanceRouter, routerFrame, ROUTER_CYCLE, ROUTER_READ, ROUTER_WORK } from "./router";
import { weekFrame, SLOT_TICKS, MAKING_TICKS, SOCIALS_REST } from "./socials";
import { installFrame, INSTALL_TICKS_PER_ITEM } from "./install";
import { tourFrame, restingTourFrame, CHAPTER_TICKS, CALLOUT_DELAY, type Chapter } from "./tour";
import { approvalsIn, noApprovals, withApproval } from "./loop";
import { advanceStorefront, initialStorefront, STOREFRONT, STOREFRONT_REST, storefrontFrame } from "./storefront";

const none = new Set<number>();

describe("composer (hero 1a)", () => {
  it("types three characters a tick and stops at the end of the prompt", () => {
    expect(composerFrame(JOBS[0], 2, false).typed).toBe(JOBS[0].prompt.slice(0, 6));
    const done = composerFrame(JOBS[0], COMPOSER_REST, false);
    expect(done.typed).toBe(JOBS[0].prompt);
    expect(done.typing).toBe(false);
  });

  it("ends on NEEDS YOU, then SENT once approved", () => {
    expect(composerFrame(JOBS[0], COMPOSER.askAt - 1, false).showAsk).toBe(false);
    const waiting = composerFrame(JOBS[0], COMPOSER.askAt, false);
    expect(waiting.status).toBe("WAITING FOR YOU");
    expect(waiting.liveTone).toBe("accent");
    expect(composerFrame(JOBS[0], COMPOSER.askAt + 5, true).status).toBe("SENT");
  });

  it("ticks steps in one by one and checks each off", () => {
    const f = composerFrame(JOBS[0], COMPOSER.firstStepAt + COMPOSER.stepCheckAfter, false);
    expect(f.steps.map((s) => [s.shown, s.done])).toEqual([[true, true], [false, false], [false, false]]);
  });

  it("auto-cycles, but a picked job waits for its approval", () => {
    const next = advanceComposer(initialComposer, COMPOSER.cycle + 1, JOBS.length);
    expect(next.job).toBe(1);
    const picked = pickJob(2, 10);
    expect(advanceComposer(picked, 10 + COMPOSER.cycle * 3, JOBS.length)).toBe(picked);
    const approved = { ...picked, approvedAt: 100 };
    expect(advanceComposer(approved, 100 + COMPOSER.holdAfterApprove + 1, JOBS.length).job).toBe(3);
  });
});

describe("board (hero 1b, /command-centre)", () => {
  it("advances a ticket one column per stage and holds it at NEEDS YOU", () => {
    const k = TICKETS[0];
    expect(stageOf(k, k.spawn - 1, none)).toBe(-1);
    expect(stageOf(k, k.spawn + STAGE_TICKS, none)).toBe(1);
    expect(stageOf(k, k.spawn + STAGE_TICKS * 10, none)).toBe(3);
    expect(stageOf(k, k.spawn + STAGE_TICKS * 10, new Set([k.id]))).toBe(4);
  });

  it("counts every filed ticket exactly once across the columns", () => {
    const f = boardFrame(BOARD_REST, none);
    const filed = TICKETS.filter((k) => k.spawn <= BOARD_REST).length;
    expect(f.columns.reduce((n, c) => n + c.count, 0)).toBe(filed);
    expect(f.stats.find((s) => s.label === "NEEDS YOU")?.value).toBe(f.columns[3].count);
  });

  it("moves an approved ticket to DONE and adds it to today's count", () => {
    const before = boardFrame(BOARD_REST, none);
    const after = boardFrame(BOARD_REST, new Set([TICKETS[0].id]));
    expect(after.columns[4].items.map((k) => k.id)).toContain(TICKETS[0].id);
    expect(after.stats[2].value).toBe(before.stats[2].value + 1);
  });
});

describe("loop approvals", () => {
  it("forgets approvals when the loop starts over", () => {
    const a = withApproval(noApprovals, 3, 851);
    expect(approvalsIn(a, 3).has(851)).toBe(true);
    expect(approvalsIn(a, 4).size).toBe(0);
    expect(withApproval(a, 4, 852).ids).toEqual([852]);
  });
});

describe("day (hero 1c)", () => {
  it("shows the clock and the latest event for the hour", () => {
    const f = dayFrame(95);
    expect(f.clock).toBe("09:30");
    expect(f.current.title).toBe("Answered 9 customer emails");
    expect(f.past[0].time).toBe("07:30");
  });

  it("is quiet overnight and wraps at midnight", () => {
    expect(dayFrame(20).current.tag).toBe("IDLE");
    expect(dayFrame(20).phase).toBe("NIGHT SHIFT");
    expect(advanceDay(DAY_MAX)).toBe(0);
  });
});

describe("router (/auto)", () => {
  it("reads first, then highlights the matched agent until it is done", () => {
    expect(routerFrame(3, 0).agents.some((a) => a.active)).toBe(false);
    const working = routerFrame(3, ROUTER_READ + 1);
    expect(working.agents.filter((a) => a.active).map((a) => a.name)).toEqual(["Finance"]);
    expect(working.agents[3].tag).toBe("WORKING");
    const done = routerFrame(3, ROUTER_READ + ROUTER_WORK);
    expect(done.agents[3].tag).toBe("DONE · REVIEW");
    expect(done.state).toBe("IN REVIEW · WAITING FOR YOU");
  });

  it("cycles requests unless one was picked", () => {
    expect(advanceRouter({ req: 5, start: 0, locked: false }, ROUTER_CYCLE + 1).req).toBe(0);
    const locked = { req: 2, start: 0, locked: true };
    expect(advanceRouter(locked, ROUTER_CYCLE * 4)).toBe(locked);
  });
});

describe("approve before the slot (/socials)", () => {
  it("never posts late: an unapproved past slot is missed", () => {
    const f = weekFrame(SLOT_TICKS * 2 + 1, none);
    expect(f.slots[0].tag).toBe("MISSED · NOT APPROVED");
    expect(weekFrame(SLOT_TICKS * 2 + 1, new Set([0])).slots[0].tag).toBe("POSTED ✓");
  });

  it("makes today's post, then asks for it", () => {
    expect(weekFrame(SLOT_TICKS * 2, none).slots[2].tag).toBe("MAKING…");
    const asking = weekFrame(SLOT_TICKS * 2 + MAKING_TICKS, none).slots[2];
    expect(asking.tag).toBe("NEEDS YOU");
    expect(asking.canApprove).toBe(true);
  });

  it("offers tomorrow for approval and leaves the rest planned", () => {
    const f = weekFrame(SOCIALS_REST, none);
    expect(f.dayNum).toBe(3);
    expect(f.slots[3].tag).toBe("READY · NEEDS YOU");
    expect(f.slots[4].tag).toBe("PLANNED");
    expect(f.now).toBe("THU 11:00");
  });
});

describe("package install (/marketplace)", () => {
  const pkg = PACKAGES[0];
  const total = pkg.groups.reduce((n, g) => n + g.items.length, 0);

  it("waits for a click", () => {
    const f = installFrame(pkg, null);
    expect(f.button).toBe("Install");
    expect(f.groups.flatMap((g) => g.items).every((i) => i.state === "idle")).toBe(true);
  });

  it("ticks items in group by group, then says Installed", () => {
    const mid = installFrame(pkg, INSTALL_TICKS_PER_ITEM * 2);
    expect(mid.groups[0].items.map((i) => i.state)).toEqual(["done", "done"]);
    expect(mid.groups[1].items[0].state).toBe("pending");
    const end = installFrame(pkg, INSTALL_TICKS_PER_ITEM * total);
    expect(end.finished).toBe(true);
    expect(end.button).toBe("Installed ✓");
    expect(end.progress).toBe(1);
  });
});

describe("product tour", () => {
  const chapter: Chapter = {
    eyebrow: "Auto",
    title: "t",
    desc: "d",
    href: "/auto",
    src: "/x.png",
    alt: "x",
    focus: [{ x: 50, y: 50, s: 2 }, { x: 10, y: 10, s: 1.5 }],
    callouts: [{ x: 60, y: 40, text: "first" }, { x: 20, y: 30, text: "second" }],
  };

  it("pins each callout to its point on the zoomed capture", () => {
    const f = tourFrame(chapter, CALLOUT_DELAY + 1);
    expect(f.callouts[0]).toMatchObject({ left: "70%", top: "30%", visible: true });
    expect(f.callouts[1].visible).toBe(false);
  });

  it("switches focus halfway and shows the second callout", () => {
    const f = tourFrame(chapter, CHAPTER_TICKS / 2 + CALLOUT_DELAY + 1);
    expect(f.focus).toEqual(chapter.focus[1]);
    expect(f.callouts.map((c) => c.visible)).toEqual([false, true]);
  });

  it("rests unzoomed with both callouts for reduced motion", () => {
    const f = restingTourFrame(chapter);
    expect(f.focus.s).toBe(1);
    expect(f.callouts.every((c) => c.visible)).toBe(true);
    expect(f.callouts[0].left).toBe("60%");
  });
});

describe("storefront chat (/your-store)", () => {
  const q = { text: "Q?", facts: ["A", "B", "C"], answer: "Yes, in stock." };

  it("looks up the catalog, ticks facts in, then answers", () => {
    expect(storefrontFrame(q, STOREFRONT.lookupAt).lookingUp).toBe(true);
    expect(storefrontFrame(q, STOREFRONT.firstFactAt + STOREFRONT.factGap).facts.map((f) => f.shown)).toEqual([true, true, false]);
    expect(storefrontFrame(q, STOREFRONT.answerAt).answer).toBe("");
    expect(storefrontFrame(q, STOREFRONT.answerAt + 1).answer).toBe("Yes");
    const done = storefrontFrame(q, STOREFRONT_REST);
    expect(done.answer).toBe(q.answer);
    expect(done.lookingUp).toBe(false);
    expect(done.typing).toBe(false);
  });

  it("cycles questions unless one was picked", () => {
    expect(advanceStorefront(initialStorefront, STOREFRONT.cycle + 1, 3).q).toBe(1);
    const locked = { q: 2, start: 0, locked: true };
    expect(advanceStorefront(locked, STOREFRONT.cycle * 5, 3)).toBe(locked);
  });
});
