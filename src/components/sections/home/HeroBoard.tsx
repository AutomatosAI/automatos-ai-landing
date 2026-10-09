import { BoardDemo } from "@/components/demos/BoardDemo";
import { HeroCtas, heroLede } from "./HeroCtas";

/* Hero 1b, "Watch the board fill": a centred headline over the live product board. */
export const HeroBoard = () => (
  <div>
    <div className="flex flex-col items-center gap-5 pt-12 text-center lg:pt-[72px]">
      <h1 className="m-0 max-w-[1000px] font-serif text-[40px] font-medium leading-[1.02] tracking-[-0.015em] sm:text-5xl lg:text-[66px]">
        Tell Auto what you need. <em className="font-normal">Watch the board fill.</em>
      </h1>
      <p className={`${heroLede} max-w-[640px]`}>
        Every job becomes a ticket. Agents pick it up, make it in your brand, and stop at your desk before anything goes
        out.
      </p>
      <HeroCtas />
    </div>
    <div className="mt-12">
      <BoardDemo variant="hero" />
    </div>
  </div>
);
