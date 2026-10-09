import { useSearchParams } from "react-router-dom";
import { HeroBoard } from "./HeroBoard";
import { HeroDay } from "./HeroDay";
import { HeroTellAuto } from "./HeroTellAuto";

/*
  All three hero directions are built. 1a ships; ?hero=1b or ?hero=1c shows
  the others for review (the design file's floating switcher, minus the pill).
*/
const HEROES = { "1a": HeroTellAuto, "1b": HeroBoard, "1c": HeroDay } as const;

type HeroKey = keyof typeof HEROES;

const isHeroKey = (v: string | null): v is HeroKey => v !== null && v in HEROES;

export const HomeHero = () => {
  const [params] = useSearchParams();
  const key = params.get("hero");
  const Hero = HEROES[isHeroKey(key) ? key : "1a"];
  return (
    <section id="hero" className="mx-auto max-w-[1280px] px-4 pt-16 sm:px-8">
      <Hero />
    </section>
  );
};
