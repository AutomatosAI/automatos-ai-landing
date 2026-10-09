/* Ring sets for the hub hero (OsHub). Retired from this site's home (replaced by OsUnderneath); FAMILY_RINGS is for automatos.app, see REDESIGN-PLAN §7. */

export type Ring = {
  key: "os" | "studio" | "outlets";
  title: string;
  rx: number;
  ry: number;
  startDeg: number;
  colour: string;
  font: string;
  size: number;
  weight: number;
  items: string[];
};

const OS_RING: Omit<Ring, "rx" | "ry" | "startDeg"> = {
  key: "os",
  title: "The OS underneath",
  colour: "hsl(var(--olive))",
  font: "var(--font-mono)",
  size: 13,
  weight: 500,
  items: ["Auto", "Agents", "Memory", "RAG", "NL2SQL", "Graphs", "Analytics", "Harness"],
};

/*
  This site sells Studio only (family footer rule, 6 Oct 2026): two rings, the
  OS underneath and what you run in Studio. The family version, with every
  product Powered by Automatos, belongs on automatos.app: FAMILY_RINGS below.
*/
export const STUDIO_RINGS: Ring[] = [
  { ...OS_RING, rx: 190, ry: 122, startDeg: -67.5 },
  {
    key: "studio",
    title: "What you run in Studio",
    rx: 420,
    ry: 270,
    startDeg: -90,
    colour: "hsl(var(--accent))",
    font: "var(--font-sans)",
    size: 16,
    weight: 600,
    items: [
      "Command Centre",
      "Board",
      "Calendar",
      "Socials",
      "Documents",
      "Templates",
      "Brand kit",
      "Music",
      "Missions",
      "Playbooks",
      "Marketplace",
      "Integrations",
      "Channels",
    ],
  },
];

/* For automatos.app: the OS, Studio, and everything Powered by Automatos. */
export const FAMILY_RINGS: Ring[] = [
  { ...OS_RING, title: "The OS", rx: 175, ry: 112, startDeg: -67.5 },
  {
    key: "studio",
    title: "Run it in Studio",
    rx: 310,
    ry: 200,
    startDeg: -90,
    colour: "hsl(var(--foreground))",
    font: "var(--font-sans)",
    size: 14,
    weight: 400,
    items: ["Board", "Calendar", "Socials", "Documents", "Templates", "Brand kit", "Music", "Missions", "Playbooks"],
  },
  {
    key: "outlets",
    title: "Powered by Automatos",
    rx: 445,
    ry: 282,
    startDeg: -112.5,
    colour: "hsl(var(--accent))",
    font: "var(--font-sans)",
    size: 16,
    weight: 600,
    items: ["Studio", "Academy", "Market Intelligence", "Shopify", "Widgets", "BudStacks", "Enterprise", "Your app · API · MCP"],
  },
];
