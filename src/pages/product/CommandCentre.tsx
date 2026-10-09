import { ProductPage } from "@/components/product/ProductPage";

const CommandCentre = () => (
  <ProductPage
    path="/command-centre"
    seoTitle="Command Centre"
    seoDescription="The summary, board, calendar, questions, activity, governance and analytics for everything your agents do. Every job is a ticket you can see and steer."
    eyebrow="Command Centre"
    headline="Where you run the business."
    brandLine="Not where you chase it."
    lede="Open the Command Centre and you know where everything stands: what finished, what's running, what's waiting for you and what it cost. Every job is a ticket. Every decision that matters comes to you."
    hero={{
      src: "/images/studio/30-cc-summary.png",
      alt: "The Command Centre summary with Auto's read, live counters and the needs-you list",
      caption: "Command Centre · Summary · Auto's read, live counters and what needs you",
    }}
    sections={[
      {
        eyebrow: "Board",
        title: "Every job is a ticket.",
        body: "Inbox, assigned, in progress, review, blocked. Each card says who has it, what it's waiting on and what it made. Group by column or by agent, comfortable or compact.",
        points: [
          "Drag a card to reassign, approve or send it back",
          "Tasks, missions and agent sessions on one board",
          "File missing, question, approval: the reason a card is stuck, in plain words",
        ],
        shot: {
          src: "/images/studio/02-board.png",
          alt: "The board with tickets in columns",
          caption: "Command Centre · Board",
        },
      },
      {
        eyebrow: "Calendar",
        title: "What's scheduled, what posted, what's due.",
        body: "Scheduled jobs, social slots, missions and reminders on one calendar, by month or week. Drag a post to another day and it reschedules.",
        shot: {
          src: "/images/studio/03-calendar.png",
          alt: "The calendar",
          caption: "Command Centre · Calendar",
        },
        flip: true,
      },
      {
        eyebrow: "Questions",
        title: "Agents ask. You answer once.",
        body: "When an agent hits a decision, a cost or a file it can't reach, it doesn't guess. It asks. Allow, deny or type an answer, and the ticket carries on.",
        points: [
          "Per question, never a blanket grant",
          "Answer from the board, the chat or Telegram",
          "Unanswered questions expire instead of being assumed",
        ],
        shot: {
          src: "/images/studio/05-questions.png",
          alt: "The Questions tab",
          caption: "Command Centre · Questions",
        },
      },
      {
        eyebrow: "Activity",
        title: "A record of everything that ran.",
        body: "Who did what, when, with which tool. The audit trail you'd want from a person, kept automatically.",
        shot: {
          src: "/images/studio/04-activity.png",
          alt: "The Activity tab",
          caption: "Command Centre · Activity",
        },
        flip: true,
      },
      {
        eyebrow: "Governance · the Harness",
        title: "Budgets, standards and approvals.",
        body: "An action nobody has classified waits for a person. Money actions are denied by default. Plans carry render minutes and AI media caps. Audit, policy and compliance sit beside the approvals.",
        points: [
          "Fail-safe: unknown means ask, never allow",
          "Grant or deny with an expiry",
          "Audit, policy and compliance tabs",
        ],
        shot: {
          src: "/images/studio/31-cc-governance.png",
          alt: "Governance approvals with a pending action that needs a human",
          caption: "Command Centre · Governance",
        },
      },
      {
        eyebrow: "Analytics",
        title: "Know what it costs, and what to fix.",
        body: "Cost per agent, cost per decision, plan usage and the cache paying for itself. Recommendations tell you what to change: agents with no skills, agents with no tools, where the money went.",
        shot: {
          src: "/images/studio/38-analytics-scrolled.png",
          alt: "Analytics recommendations: spend across requests, agents with no skills, agents with no tools",
          caption: "Analytics · Recommendations",
        },
        flip: true,
      },
    ]}
    runs={{
      title: "What the Command Centre keeps for you",
      items: [
        "A count of what needs your eyes, always in view",
        "Auto's read: one paragraph on where things stand",
        "Live counts: working, queued, attention, cost per request",
        "Every ticket's history, files and report",
        "Approvals with expiries, never silent defaults",
        "Spend and usage per agent, per plan, per month",
      ],
    }}
    related={[
      { label: "Auto & agents", href: "/auto" },
      { label: "Documents & templates", href: "/documents" },
      { label: "Socials", href: "/socials" },
    ]}
    ctaHeading={<>See every job. <span className="brand-line">Decide the ones that matter.</span></>}
    ctaSub="Join the waitlist. The Command Centre is the first screen you'll open each morning."
  />
);

export default CommandCentre;
