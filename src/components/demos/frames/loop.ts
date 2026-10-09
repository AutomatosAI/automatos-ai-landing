/* Approvals that reset each time a looping demo starts over. */
export type LoopApprovals = { loop: number; ids: number[] };

export const noApprovals: LoopApprovals = { loop: 0, ids: [] };

export const approvalsIn = (a: LoopApprovals, loop: number): ReadonlySet<number> =>
  new Set(a.loop === loop ? a.ids : []);

export const withApproval = (a: LoopApprovals, loop: number, id: number): LoopApprovals => ({
  loop,
  ids: a.loop === loop ? [...a.ids, id] : [id],
});
