import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/*
  Public facts sheet, 19 Oct 2026, section 8: production runs with the policy plane off, so the site claims
  only what the per-feature gates do. Social posts wait for approval, and board work can be set to ask before
  it runs. Never a platform-wide "everything waits for your yes".
*/
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const RETIRED: Array<[RegExp, string]> = [
  [/nothing is sent, posted or paid for/i, "no 'nothing is sent, posted or paid for until you say so'"],
  [/(nothing|anything)[^.]{0,40}leaves the building/i, "no 'nothing/anything leaves the building (without your yes)'"],
  [/\bbefore it acts\b/i, "no '(a board that asks) before it acts' as an absolute"],
  [/human approval before anything/i, "no 'human approval before anything publishes or spends'"],
  [/anything that (spends money|publishes)[^.]{0,40}waits/i, "no 'anything that spends money or publishes waits for a person'"],
  [/stop at your desk/i, "no 'stop at your desk before anything goes out'"],
  [/\b(anything|everything)\b[^.]{0,60}\bwaits for your yes\b/i, "no 'anything/everything ... waits for your yes' as a platform-wide absolute"],
];

/** Every source file under src (tests excluded), plus the static shell and the llms files. */
function publicFiles(): string[] {
  const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((name) => {
      const p = path.join(dir, name);
      return statSync(p).isDirectory() ? walk(p) : [p];
    });
  const src = walk(path.join(ROOT, "src")).filter((p) => /\.(ts|tsx)$/.test(p) && !/\.test\.(ts|tsx)$/.test(p));
  return [...src, ...["index.html", "public/llms.txt", "public/llms-full.txt"].map((f) => path.join(ROOT, f))];
}

describe("public copy (facts sheet section 8)", () => {
  const files = publicFiles().map((p) => ({ p: path.relative(ROOT, p), text: readFileSync(p, "utf8") }));

  it.each(RETIRED.map(([rx, rule]) => ({ rx, rule })))("$rule", ({ rx }) => {
    expect(files.filter(({ text }) => rx.test(text)).map(({ p }) => p)).toEqual([]);
  });

  it("states the EU AI Act posture line word for word wherever the posture is summarised", () => {
    const posture =
      "Social posts wait for your approval before they publish, board work can be set to ask before it runs, and every action lands in an append-only audit log, all in the product today.";
    for (const f of ["src/components/sections/faqs.ts", "public/llms.txt"]) {
      expect(readFileSync(path.join(ROOT, f), "utf8"), f).toContain(posture);
    }
  });
});
