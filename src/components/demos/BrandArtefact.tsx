import type { ReactElement } from "react";
import type { BrandKit, JobKey } from "./data";

/*
  The document the composer produces, rendered in the chosen sample brand kit.
  Colours and font come from the kit (data), not from the site theme.
*/

const Invoice = ({ brand }: { brand: BrandKit }) => (
  <div className="flex flex-col gap-1.5 text-[13px]">
    <div className="flex justify-between gap-3 opacity-75">
      <span>Billed to Quay Deli · HL-W-1036</span>
      <span className="whitespace-nowrap">Due 6 Nov 2026</span>
    </div>
    <div className="flex justify-between border-t border-black/10 pt-1.5">
      <span>Harbour Blend · 12 kg × £22.00</span>
      <span>£264.00</span>
    </div>
    <div className="flex justify-between">
      <span>Carriage</span>
      <span>£5.00</span>
    </div>
    <div className="flex justify-between border-t-2 pt-2 text-base font-semibold" style={{ borderColor: brand.ink }}>
      <span>Total · no VAT</span>
      <span style={{ color: brand.accent }}>£269.00</span>
    </div>
  </div>
);

const Letter = ({ brand }: { brand: BrandKit }) => (
  <div className="flex flex-col gap-2 text-[13.5px] leading-[1.55]">
    <span>Dear Maya,</span>
    <span>
      Lovely news: your café starts with us on Monday. Your first Harbour Blend delivery lands at 7:30, and we'll pop
      in for a cupping session the same week.
    </span>
    <span>
      Warmly,
      <br />
      <span className="font-semibold" style={{ color: brand.accent }}>
        Gerard
      </span>
    </span>
  </div>
);

/*
  Three posts in the chosen kit: real photos from the Harbourline test
  workspace under the kit's ink or accent, with its paper colour and font.
*/
const POSTS = [
  { day: "TUE", text: "Autumn menu is here.", photo: "/images/hero-posts/tue-latte.jpg", look: "ink" },
  { day: "THU", text: "Harbour Blend is back.", photo: "/images/hero-posts/thu-bag.jpg", look: "band" },
  { day: "SAT", text: "Cupping, 10am. Bring a friend.", photo: "/images/hero-posts/sat-beans.jpg", look: "tint" },
] as const;

type Post = (typeof POSTS)[number];

/* ink: a fade from the kit's ink; band: an accent strip; tint: the whole photo under the ink. */
const postOverlay = (look: Post["look"], brand: BrandKit) => {
  if (look === "ink") return { background: `linear-gradient(to top, ${brand.ink} 8%, ${brand.ink}cc 32%, transparent 62%)` };
  if (look === "band") return { background: `linear-gradient(to top, ${brand.accent} 34%, transparent 34%)` };
  return { background: `${brand.ink}b3` };
};

const Posts = ({ brand }: { brand: BrandKit }) => (
  <div className="grid grid-cols-3 gap-2.5">
    {POSTS.map((p) => (
      <div key={p.day} className="relative aspect-[4/5] overflow-hidden rounded-lg">
        <img src={p.photo} alt="" width={400} height={500} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 transition-[background] duration-500" style={postOverlay(p.look, brand)} />
        <div
          className="relative flex h-full flex-col justify-between p-3 text-[15px] font-semibold leading-tight"
          style={{ color: brand.paper }}
        >
          <span className="self-start rounded px-1.5 py-0.5 text-[10px] tracking-[0.1em]" style={{ background: brand.ink }}>
            {p.day}
          </span>
          {p.text}
        </div>
      </div>
    ))}
  </div>
);

const SHEET_ROWS = [
  ["Harbour Blend", "£12,480", "38%"],
  ["Decaf", "£4,210", "35%"],
  ["Oat milk", "£2,960", "21% ↓4"],
];

const Sheet = ({ brand }: { brand: BrandKit }) => (
  <div className="grid grid-cols-[2fr_1fr_1fr] overflow-hidden rounded-md border border-black/10 text-[12.5px]">
    {["Product", "Sales", "Margin"].map((h, i) => (
      <span
        key={h}
        className={`px-2.5 py-1.5 font-semibold ${i ? "text-right" : ""}`}
        style={{ background: brand.ink, color: brand.paper }}
      >
        {h}
      </span>
    ))}
    {SHEET_ROWS.map((row, r) =>
      row.map((cell, c) => {
        const flagged = r === SHEET_ROWS.length - 1 && c === 2;
        return (
          <span
            key={`${r}-${c}`}
            className={`px-2.5 py-1.5 ${c ? "text-right" : ""} ${r % 2 ? "bg-black/[0.03]" : ""} ${flagged ? "font-semibold" : ""}`}
            style={flagged ? { color: brand.accent } : undefined}
          >
            {cell}
          </span>
        );
      }),
    )}
  </div>
);

const BODIES: Record<JobKey, (p: { brand: BrandKit }) => ReactElement> = {
  invoice: Invoice,
  letter: Letter,
  posts: Posts,
  sheet: Sheet,
};

export const BrandArtefact = ({ brand, kind, docType }: { brand: BrandKit; kind: JobKey; docType: string }) => {
  const Body = BODIES[kind];
  return (
    <div
      className="rounded-xl p-[18px] transition-colors duration-500"
      style={{ background: brand.paper, color: brand.ink, fontFamily: brand.font }}
    >
      <div className="mb-3 flex items-center justify-between border-b-2 pb-2.5" style={{ borderColor: brand.ink }}>
        <span className="flex items-center gap-2.5">
          <span
            className="flex h-[30px] w-[30px] items-center justify-center rounded-md text-[11px] font-bold"
            style={{ background: brand.ink, color: brand.paper }}
          >
            {brand.mark}
          </span>
          <span className="text-[17px] font-semibold">{brand.name}</span>
        </span>
        <span className="text-[11px] font-semibold tracking-[0.12em]" style={{ color: brand.accent }}>
          {docType}
        </span>
      </div>
      <Body brand={brand} />
    </div>
  );
};
