/*
  /your-store: a shopper asks the storefront chat; the agent looks the answer
  up in the synced catalog graph, then replies. Durations in ticks.
*/
export const STOREFRONT = {
  lookupAt: 6,
  firstFactAt: 8,
  factGap: 5,
  answerAt: 22,
  charsPerTick: 3,
  cycle: 80,
} as const;

export const STOREFRONT_REST = 10_000;

export type ShopperQuestion = { text: string; facts: string[]; answer: string };

export type StorefrontState = { q: number; start: number; locked: boolean };

export const initialStorefront: StorefrontState = { q: 0, start: 0, locked: false };

export function advanceStorefront(s: StorefrontState, t: number, count: number): StorefrontState {
  if (s.locked || t - s.start <= STOREFRONT.cycle) return s;
  return { q: (s.q + 1) % count, start: t, locked: false };
}

export type StorefrontFrame = {
  lookingUp: boolean;
  facts: { text: string; shown: boolean }[];
  answer: string;
  typing: boolean;
};

export function storefrontFrame(q: ShopperQuestion, at: number): StorefrontFrame {
  const typedN = Math.max(0, (at - STOREFRONT.answerAt) * STOREFRONT.charsPerTick);
  return {
    lookingUp: at >= STOREFRONT.lookupAt && at < STOREFRONT.answerAt,
    facts: q.facts.map((text, i) => ({ text, shown: at >= STOREFRONT.firstFactAt + i * STOREFRONT.factGap })),
    answer: q.answer.slice(0, typedN),
    typing: typedN > 0 && typedN < q.answer.length,
  };
}
