import { AGENTS, REQUESTS } from "../data";
import type { Tone } from "../tones";

/* /auto: a request every ROUTER_CYCLE ticks; Auto reads, then the agent works for ROUTER_WORK ticks. */
export const ROUTER_CYCLE = 45;
export const ROUTER_READ = 8;
export const ROUTER_WORK = 26;
export const ROUTER_REST = 1000;

export type RouterState = { req: number; start: number; locked: boolean };

export const initialRouter: RouterState = { req: 0, start: 0, locked: false };

export function advanceRouter(s: RouterState, t: number): RouterState {
  if (s.locked || t - s.start <= ROUTER_CYCLE) return s;
  return { req: (s.req + 1) % REQUESTS.length, start: t, locked: false };
}

export type RouterAgent = { name: string; skills: string; active: boolean; tag: string; tone: Tone; progress: number };

export type RouterFrame = {
  say: string;
  agents: RouterAgent[];
  ticket: string;
  state: string;
  stateTone: Tone;
};

export function routerFrame(req: number, ra: number): RouterFrame {
  const r = REQUESTS[req];
  const reading = ra < ROUTER_READ;
  const progress = Math.min(1, Math.max(0, (ra - ROUTER_READ) / ROUTER_WORK));
  const finished = progress >= 1;
  let state = "IN PROGRESS";
  if (finished) state = "IN REVIEW · WAITING FOR YOU";
  else if (reading) state = "FILED";
  return {
    say: reading ? "Reading your request…" : r.reply,
    agents: AGENTS.map((a, i) => {
      const active = i === r.agent && !reading;
      let tag = "IDLE";
      let tone: Tone = "muted";
      if (active) {
        tag = finished ? "DONE · REVIEW" : "WORKING";
        tone = finished ? "olive" : "accent";
      }
      return { ...a, active, tag, tone, progress: active ? progress : 0 };
    }),
    ticket: `TICKET #${860 + req} · ${AGENTS[r.agent].name.toUpperCase()}`,
    state,
    stateTone: finished ? "accent" : "muted",
  };
}
