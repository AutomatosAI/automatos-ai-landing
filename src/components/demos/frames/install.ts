import type { MarketPackage } from "../data";

/* /marketplace: one item installs every INSTALL_TICKS_PER_ITEM ticks, group by group. */
export const INSTALL_TICKS_PER_ITEM = 4;

export type InstallItemState = "idle" | "pending" | "done";

export type InstallFrame = {
  groups: { label: string; items: { name: string; state: InstallItemState }[] }[];
  progress: number;
  button: string;
  finished: boolean;
  note: string;
};

/* elapsed = ticks since Install was clicked, or null if it hasn't been. */
export function installFrame(pkg: MarketPackage, elapsed: number | null): InstallFrame {
  const total = pkg.groups.reduce((n, g) => n + g.items.length, 0);
  const installed = elapsed === null ? -1 : elapsed / INSTALL_TICKS_PER_ITEM;
  const finished = installed >= total;
  let k = 0;
  const groups = pkg.groups.map((g) => ({
    label: g.label,
    items: g.items.map((name) => {
      k += 1;
      let state: InstallItemState = "idle";
      if (elapsed !== null) state = installed >= k ? "done" : "pending";
      return { name, state };
    }),
  }));
  let button = "Install";
  let note = "Installs into your workspace only. Remove it any time.";
  if (finished) {
    button = "Installed ✓";
    note = "Ready. Answer three setup questions and your first-week guide starts.";
  } else if (elapsed !== null) {
    button = "Installing…";
    note = "Resolving dependencies and connecting accounts…";
  }
  return { groups, progress: elapsed === null ? 0 : Math.min(1, installed / total), button, finished, note };
}
