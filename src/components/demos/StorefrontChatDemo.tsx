import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  advanceStorefront,
  initialStorefront,
  STOREFRONT_REST,
  storefrontFrame,
  type ShopperQuestion,
} from "./frames/storefront";
import { caretOn, useDemoClock } from "./useDemoClock";

/* Sample shopper questions for Harbourline (the coffee roaster in the test workspace). */
const QUESTIONS: ShopperQuestion[] = [
  {
    text: "Do you have Harbour Blend in 1kg, whole bean?",
    facts: ["Harbour Blend · 1kg · Whole bean", "In stock · 14", "£34.00"],
    answer: "Yes. Harbour Blend comes in 1kg whole bean at £34.00, and there are 14 in stock. Want me to add one to your cart?",
  },
  {
    text: "What goes well with the Ethiopia Guji?",
    facts: ["Washed Ethiopia Guji", "Often bought with · Brazil Mogiana", "Often bought with · V60 papers"],
    answer: "People who buy the Guji usually add the Brazil Mogiana for a rounder cup, and a pack of V60 papers. Both are in stock.",
  },
  {
    text: "Is the decaf available in 250g ground?",
    facts: ["Swiss Water Decaf · 250g · Ground", "Out of stock", "250g · Whole bean · 8 in stock"],
    answer: "The 250g ground is out right now, but the 250g whole bean has 8 in stock. I can also ask the team to call you back.",
  },
];

/* /your-store: the storefront chat answering from the synced catalog graph. */
export const StorefrontChatDemo = () => {
  const { ref, t, reduced } = useDemoClock();
  const [s, setS] = useState(initialStorefront);

  useEffect(() => {
    if (t > 0) setS((cur) => advanceStorefront(cur, t, QUESTIONS.length));
  }, [t]);

  const q = QUESTIONS[s.q];
  const f = storefrontFrame(q, reduced ? STOREFRONT_REST : t - s.start);

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11.5px] text-muted-foreground">A SHOPPER ASKS</span>
        {QUESTIONS.map((x, i) => (
          <button
            key={x.text}
            type="button"
            onClick={() => setS({ q: i, start: t, locked: true })}
            aria-pressed={i === s.q}
            className={cn(
              "rounded-xl border px-3.5 py-3 text-left text-sm leading-snug transition-colors",
              i === s.q ? "border-foreground bg-foreground text-background" : "border-border text-foreground hover:border-foreground/50",
            )}
          >
            “{x.text}”
          </button>
        ))}
      </div>

      <div className="flex flex-col overflow-hidden rounded-[18px] border border-border bg-background">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="h-[7px] w-[7px] rounded-full bg-olive" />
            Harbourline · Chat
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">ON YOUR STOREFRONT</span>
        </div>

        <div className="flex min-h-[300px] flex-col gap-3.5 p-4">
          <div className="max-w-[80%] self-end rounded-[14px_14px_4px_14px] bg-secondary px-3.5 py-2.5 text-[14.5px]">
            {q.text}
          </div>

          <div className="flex flex-col gap-2" aria-live="polite">
            <span className={cn("font-mono text-[11px] text-muted-foreground transition-opacity", f.lookingUp ? "opacity-100" : "opacity-0")}>
              LOOKING IT UP IN YOUR CATALOG…
            </span>
            <div className="flex flex-wrap gap-1.5">
              {f.facts.map((fact) => (
                <span
                  key={fact.text}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border border-olive px-2.5 py-1 font-mono text-[11.5px] transition-opacity duration-300",
                    fact.shown ? "opacity-100" : "opacity-0",
                  )}
                >
                  <span className="text-olive">✓</span>
                  {fact.text}
                </span>
              ))}
            </div>
          </div>

          {f.answer && (
            <div className="flex max-w-[88%] gap-2.5">
              <img src="/brand/automatos-mark-hi.png" alt="" className="mt-1 h-6 w-6 object-contain" />
              <div className="rounded-[14px_14px_14px_4px] border border-border bg-card px-3.5 py-2.5 text-[14.5px] leading-normal">
                {f.answer}
                <span className={f.typing && caretOn(t) ? "opacity-100" : "opacity-0"} aria-hidden>
                  ▍
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border px-4 py-2.5 text-center font-mono text-[10.5px] text-muted-foreground">
          POWERED BY AUTOMATOS AI
        </div>
      </div>
    </div>
  );
};
