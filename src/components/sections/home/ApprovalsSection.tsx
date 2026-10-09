import { EU_AI_ACT_URL } from "@/lib/links";
import { SectionEyebrow } from "../SectionEyebrow";

/* "You stay in charge": draft copy from the design handoff, to review. */
const CARDS = [
  {
    tag: "NEEDS YOU",
    title: "Asks before it acts",
    body: "Approve, edit or deny from the board, the chat, or your phone. One click, logged.",
  },
  {
    tag: "THE BOARD",
    title: "Every job a ticket",
    body: "Auto files a ticket instead of pretending it did the work. You see who's on it and what's stuck.",
  },
  {
    tag: "ON THE RECORD",
    title: "Every action on the record",
    body: "An append-only audit log, grants you can revoke, and your data kept in the EU. Export or erase it on request.",
    link: { label: "Our EU AI Act posture →", href: EU_AI_ACT_URL },
  },
];

export const ApprovalsSection = () => (
  <section className="border-t border-border bg-card">
    <div className="mx-auto flex max-w-[1280px] flex-col gap-11 px-4 py-24 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-10">
        <div className="flex max-w-[680px] flex-col gap-4">
          <SectionEyebrow n="04" label="You stay in charge" />
          <h2 className="m-0 text-4xl font-medium leading-[1.05] sm:text-5xl">
            Nothing leaves the building <em className="font-normal">without your yes.</em>
          </h2>
        </div>
        <p className="m-0 max-w-[420px] text-[16.5px] leading-relaxed text-muted-foreground">
          Agents can draft, design and plan all day. Sending, posting and paying always stop at your desk first.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {CARDS.map((c) => (
          <div key={c.tag} className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-7">
            <span className="font-mono text-xs text-accent">{c.tag}</span>
            <span className="font-serif text-[26px] leading-tight">{c.title}</span>
            <span className="text-[15px] leading-normal text-muted-foreground">
              {c.body}{" "}
              {c.link && (
                <a href={c.link.href} target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-accent">
                  {c.link.label}
                </a>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
