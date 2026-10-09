/*
  Sample data for the interactive demos on the home and product pages.
  Brands, customers, tickets and packages here are illustrative, not
  customer data. Copy is final unless the design handoff marked it sample.
*/

export type BrandKit = {
  name: string;
  mark: string;
  ink: string;
  accent: string;
  paper: string;
  font: string;
};

/* Sample brand kits: each one re-skins the artefacts (ink, accent, paper, font). */
export const BRANDS: BrandKit[] = [
  { name: "Lantern Kitchen", mark: "LK", ink: "#1f3a2e", accent: "#b8862f", paper: "#f7f2e6", font: "var(--font-serif)" },
  { name: "Tide Café", mark: "TC", ink: "#163a5f", accent: "#d9663a", paper: "#f3f6f8", font: "var(--font-sans)" },
  { name: "Harbour Roasters", mark: "HR", ink: "#3b1f14", accent: "#c44a1a", paper: "#fbf5ee", font: "var(--font-mono)" },
];

export type JobKey = "invoice" | "letter" | "posts" | "sheet";

export type Job = {
  key: JobKey;
  label: string;
  doc: string;
  prompt: string;
  steps: string[];
  ask: string;
  btn: string;
};

export const JOBS: Job[] = [
  {
    key: "invoice",
    label: "Invoice Quay Deli",
    doc: "INVOICE",
    prompt: "Make an invoice to Quay Deli: 12 kg Harbour Blend at £22/kg, carriage £5, no VAT.",
    steps: ["Read your brand kit", "Finance agent drafted HL-W-1036", "Checked the totals · £269.00"],
    ask: "Email it to accounts@quaydeli.example?",
    btn: "Approve & send",
  },
  {
    key: "letter",
    label: "Letter to Maya",
    doc: "LETTER",
    prompt: "Write Maya a warm letter confirming her café starts with us on Monday.",
    steps: ["Read your brand voice", "Writer drafted the letter", "Signed it off as you"],
    ask: "Send it to Maya?",
    btn: "Approve & send",
  },
  {
    key: "posts",
    label: "A week of posts",
    doc: "SOCIAL PLAN",
    prompt: "Plan this week’s posts for the autumn menu, three is plenty.",
    steps: ["Social Director built a 3-post plan", "Brand Designer made the graphics", "Slots: Tue · Thu · Sat"],
    ask: "Queue 3 posts for Instagram?",
    btn: "Approve & queue",
  },
  {
    key: "sheet",
    label: "September sales sheet",
    doc: "SPREADSHEET",
    prompt: "Summarise September sales by product in a spreadsheet for my accountant.",
    steps: ["Read September orders", "Analyst built the sheet", "Flagged: oat milk margin down 4 pts"],
    ask: "Share it with your accountant?",
    btn: "Approve & share",
  },
];

export type Ticket = { id: number; kind: string; title: string; agent: string; spawn: number };

export const TICKETS: Ticket[] = [
  { id: 850, kind: "TASK", title: "Invoice Quay Deli for Harbour Blend", agent: "Finance", spawn: 0 },
  { id: 851, kind: "MISSION", title: "Autumn menu: three posts", agent: "Social Director", spawn: 26 },
  { id: 852, kind: "TASK", title: "Reply to 9 customer emails", agent: "Support", spawn: 52 },
  { id: 853, kind: "TASK", title: "Welcome letter for Maya", agent: "Writer", spawn: 78 },
  { id: 854, kind: "PLAYBOOK", title: "Monday sales report", agent: "Analyst", spawn: 104 },
  { id: 855, kind: "TASK", title: "Brand board refresh", agent: "Brand Designer", spawn: 130 },
];

export type BoardStatus = "inbox" | "working" | "review" | "needs" | "done";

export const BOARD_COLUMNS: { name: string; status: BoardStatus; tag: string }[] = [
  { name: "INBOX", status: "inbox", tag: "NEW" },
  { name: "WORKING", status: "working", tag: "SESSION" },
  { name: "REVIEW", status: "review", tag: "CHECKING" },
  { name: "NEEDS YOU", status: "needs", tag: "APPROVAL" },
  { name: "DONE", status: "done", tag: "SENT" },
];

export type DayTag = "DONE" | "NEEDS YOU" | "POSTED" | "QUEUED" | "IDLE";

export type DayEvent = { h: number; time: string; agent: string; title: string; note: string; tag: DayTag };

export const DAY: DayEvent[] = [
  { h: 6.0, time: "06:00", agent: "Finance", title: "Matched 14 payments to invoices", note: "Two late payers chased with your reminder template.", tag: "DONE" },
  { h: 7.5, time: "07:30", agent: "Auto", title: "Morning summary in your inbox", note: "3 things need you today. The rest is handled.", tag: "DONE" },
  { h: 9.0, time: "09:00", agent: "Support", title: "Answered 9 customer emails", note: "One refund over £50 is waiting for your OK.", tag: "NEEDS YOU" },
  { h: 11.0, time: "11:00", agent: "Brand Designer", title: "Autumn menu poster, in your kit", note: "A4 and Instagram sizes, your fonts, your colours.", tag: "DONE" },
  { h: 13.0, time: "13:00", agent: "Social Director", title: "Posted “Harbour Blend is back”", note: "You approved it at 10:41. Instagram and X.", tag: "POSTED" },
  { h: 15.5, time: "15:30", agent: "Analyst", title: "Weekly sales sheet", note: "Oat milk margin down 4 points. Suggests a price check.", tag: "DONE" },
  { h: 18.0, time: "18:00", agent: "Writer", title: "Letter to Maya, ready to send", note: "Signed off as you. Waiting for your yes.", tag: "NEEDS YOU" },
  { h: 22.0, time: "22:00", agent: "Auto", title: "Tomorrow planned: 6 jobs queued", note: "Two playbooks and four tasks, all on the board.", tag: "QUEUED" },
];

export const AGENTS: { name: string; skills: string }[] = [
  { name: "Writer", skills: "Letters, blogs, brand voice" },
  { name: "Brand Designer", skills: "Brand kit, boards, graphics" },
  { name: "Social Director", skills: "Plans, posts, the content bank" },
  { name: "Finance", skills: "Invoices, payments, statements" },
  { name: "Support", skills: "Customer email and chat" },
  { name: "Analyst", skills: "Reports, NL2SQL, sheets" },
];

/* Sample requests: what you say, which agent takes it, what Auto replies. */
export const REQUESTS: { text: string; agent: number; reply: string }[] = [
  { text: "Write the letter to Maya, warmly.", agent: 0, reply: "Writer has it. Reading your brand voice first." },
  { text: "Make the orange an accent, not the background.", agent: 1, reply: "Brand Designer will propose a kit change for you to approve." },
  { text: "Plan this week's socials.", agent: 2, reply: "Social Director is drafting a 7-day plan from your content bank." },
  { text: "Invoice Quay Deli for 12 kg of Harbour Blend.", agent: 3, reply: "Finance is filling your invoice template. Totals checked before you see it." },
  { text: "Reply to the refund email from Sam.", agent: 4, reply: "Support drafted a reply. The refund itself waits for your OK." },
  { text: "How did September compare to August?", agent: 5, reply: "Analyst is querying your orders. You get a sheet and one paragraph." },
];

/*
  One week of posts across two workspaces' brands: Harbourline (a coffee
  roaster) and Automatos. Each slot is a real 4:5 render from the platform
  (Socials, Sept–Oct 2026), resized to 432×540.
*/
export const SLOTS: { day: string; src: string; alt: string }[] = [
  { day: "TUE", src: "/images/socials/tue-flat-white-review.jpg", alt: "Harbourline review card over a coffee photo: “Best flat white in town, and the beans are roasted down the road.”" },
  { day: "WED", src: "/images/socials/wed-hire-an-ai-team.jpg", alt: "Automatos highlights card: Hire an AI team." },
  { day: "THU", src: "/images/socials/thu-september-sales.jpg", alt: "Harbourline stat card: 46% of all retail bags sold in September were Harbour Blend." },
  { day: "FRI", src: "/images/socials/fri-grassy-to-chocolatey.jpg", alt: "Harbourline before-and-after card of roasted beans: From grassy to chocolatey." },
  { day: "SAT", src: "/images/socials/sat-web-summit.jpg", alt: "Automatos announcement card: Meet us at Web Summit." },
  { day: "SUN", src: "/images/socials/sun-team-never-sleeps.jpg", alt: "Automatos photo card: Your team never sleeps." },
  { day: "MON", src: "/images/socials/mon-house-blend-offer.jpg", alt: "Harbourline offer card: 20% off house blend, 1kg bags." },
];

export type PackageGroup = { label: string; items: string[] };
export type MarketPackage = { name: string; by: string; desc: string; groups: PackageGroup[] };

/* Shopify packages as seeded (seed_packages.py); the Socials fourth playbook is still a placeholder (handoff). */
export const PACKAGES: MarketPackage[] = [
  {
    name: "Socials",
    by: "BY AUTOMATOS",
    desc: "A Social Media Director, a Brand Designer, four playbooks and a guided setup.",
    groups: [
      { label: "AGENTS", items: ["Social Media Director", "Brand Designer"] },
      { label: "PLAYBOOKS", items: ["Weekly social posts", "Content bank research", "Brand kit from your website", "Evening-before reminder"] },
      { label: "CONNECTIONS", items: ["Instagram", "LinkedIn", "X"] },
    ],
  },
  {
    name: "Shopify Management",
    by: "BY AUTOMATOS",
    desc: "An operations manager, a support agent, an inventory watchdog and a business analyst.",
    groups: [
      { label: "AGENTS", items: ["Operations Manager", "Support Agent", "Inventory Watchdog", "Business Analyst"] },
      { label: "REPORT TEMPLATES", items: ["Weekly numbers", "Inventory status", "Customer service summary"] },
      { label: "CONNECTIONS", items: ["Shopify"] },
    ],
  },
  {
    name: "Shopify Development",
    by: "BY AUTOMATOS",
    desc: "An app architect, a storefront developer and an extension builder for your theme and apps.",
    groups: [
      { label: "AGENTS", items: ["App Architect", "Storefront Developer", "Extension Builder"] },
      { label: "REPORT TEMPLATES", items: ["Theme audit"] },
      { label: "CONNECTIONS", items: ["GitHub", "Shopify (dev store)"] },
    ],
  },
];
