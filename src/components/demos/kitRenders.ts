/*
  Real page-1 renders from Studio, per brand kit (c1 test workspace).
  To add a kit: render the same document types in it, crop page 1 to
  400×520 into public/images/documents/<kit>/, and add an entry here.
  19 Oct 2026: the invoice and weekly report on the Automatos letterhead
  were removed. They read as Automatos's own revenue, customers and paid
  setup work. Re-render them in a fictional brand kit (Harbourline), save
  them under new file names and add them back here.
*/
export type KitRender = {
  name: string;
  logo: string;
  note: string;
  docs: { src: string; label: string; alt: string }[];
};

export const KIT_RENDERS: KitRender[] = [
  {
    name: "Automatos",
    logo: "/brand/automatos-mark-hi.png",
    note: "RENDERED 6–7 OCT 2026",
    docs: [
      { src: "/images/documents/harbour-log.jpg", label: "Newsletter", alt: "The Harbour Log, a coffee roaster's newsletter with a large sailboat mark" },
      { src: "/images/documents/brand-board.jpg", label: "Brand board", alt: "The Automatos brand board: colours, logo, type scale and spacing on cream paper" },
    ],
  },
];
