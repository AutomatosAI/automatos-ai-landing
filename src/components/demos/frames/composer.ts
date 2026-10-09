import type { Job } from "../data";
import type { Tone } from "../tones";

/* Hero 1a, "Tell Auto, live". All durations in ticks (TICK_MS each). */
export const COMPOSER = {
  charsPerTick: 3,
  stepsAt: 30,
  firstStepAt: 32,
  stepGap: 9,
  stepCheckAfter: 6,
  artefactAt: 60,
  askAt: 68,
  cycle: 120,
  holdAfterApprove: 28,
} as const;

/* Reduced motion renders this frame: typed, worked, waiting for you. */
export const COMPOSER_REST = 10_000;

export type ComposerState = {
  job: number;
  jobStart: number;
  locked: boolean;
  approvedAt: number | null;
};

export const initialComposer: ComposerState = { job: 0, jobStart: 0, locked: false, approvedAt: null };

/* Moves to the next job after a full cycle, or shortly after an approval. A picked job holds until approved. */
export function advanceComposer(s: ComposerState, t: number, jobCount: number): ComposerState {
  const doneHolding = s.approvedAt !== null && t - s.approvedAt > COMPOSER.holdAfterApprove;
  const cycled = !s.locked && s.approvedAt === null && t - s.jobStart > COMPOSER.cycle;
  if (!doneHolding && !cycled) return s;
  return { job: (s.job + 1) % jobCount, jobStart: t, locked: false, approvedAt: null };
}

export const pickJob = (job: number, t: number): ComposerState => ({ job, jobStart: t, locked: true, approvedAt: null });

export type ComposerStep = { text: string; shown: boolean; done: boolean };

export type ComposerFrame = {
  typed: string;
  typing: boolean;
  status: string;
  liveTone: Tone;
  showSteps: boolean;
  steps: ComposerStep[];
  showArtefact: boolean;
  showAsk: boolean;
};

export function composerFrame(job: Job, at: number, approved: boolean): ComposerFrame {
  const typedN = Math.min(job.prompt.length, at * COMPOSER.charsPerTick);
  const showAsk = at >= COMPOSER.askAt;
  const stepAt = (i: number) => COMPOSER.firstStepAt + i * COMPOSER.stepGap;
  let status = "LISTENING";
  if (approved) status = "SENT";
  else if (showAsk) status = "WAITING FOR YOU";
  else if (at >= COMPOSER.firstStepAt) status = "WORKING";
  return {
    typed: job.prompt.slice(0, typedN),
    typing: typedN < job.prompt.length,
    status,
    liveTone: showAsk && !approved ? "accent" : "olive",
    showSteps: at >= COMPOSER.stepsAt,
    steps: job.steps.map((text, i) => ({
      text,
      shown: at >= stepAt(i),
      done: at >= stepAt(i) + COMPOSER.stepCheckAfter,
    })),
    showArtefact: at >= COMPOSER.artefactAt,
    showAsk,
  };
}
