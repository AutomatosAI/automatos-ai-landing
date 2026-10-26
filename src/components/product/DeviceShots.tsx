import { cn } from "@/lib/utils";
import type { Shot } from "./ProductPage";

/*
  Figures for captures taken on a phone: a phone frame (a rounded bezel in the
  board colours, so it reads as a device in both themes), a laptop capture with
  a phone in front of it, and a pair of phones. Captions are mono, as under
  every screenshot on the site.
*/

const CAPTION = "font-mono text-[12.5px] text-muted-foreground";

/* "sm" sits in front of a laptop capture; "md" stands on its own. */
const FRAME = {
  sm: { outer: "rounded-[14px] p-[3px] sm:rounded-[20px] sm:p-[5px]", inner: "rounded-[11px] sm:rounded-[15px]" },
  md: { outer: "rounded-[24px] p-1.5 sm:rounded-[30px] sm:p-2", inner: "rounded-[18px] sm:rounded-[22px]" },
} as const;

const ShotImage = ({ shot }: { shot: Shot }) => (
  <img
    src={shot.src}
    alt={shot.alt}
    width={shot.width}
    height={shot.height}
    loading="lazy"
    decoding="async"
    className="block h-auto w-full"
  />
);

export const PhoneFrame = ({ shot, size = "md", className }: { shot: Shot; size?: keyof typeof FRAME; className?: string }) => (
  <div className={cn("border border-board-border bg-board shadow-[0_12px_32px_rgba(0,0,0,.35)]", FRAME[size].outer, className)}>
    <div className={cn("overflow-hidden", FRAME[size].inner)}>
      <ShotImage shot={shot} />
    </div>
  </div>
);

/* The laptop capture on the right, the phone in front of its lower left corner, over the sidebar. */
export const LaptopAndPhone = ({ laptop, phone, caption }: { laptop: Shot; phone: Shot; caption: string }) => (
  <figure className="m-0 flex w-full flex-col gap-2.5">
    <div className="relative pb-[14%]">
      <div className="ml-auto w-[90%] rounded-2xl border border-border bg-card p-2">
        <div className="overflow-hidden rounded-[10px] bg-board">
          <ShotImage shot={laptop} />
        </div>
      </div>
      <PhoneFrame shot={phone} size="sm" className="absolute bottom-0 left-0 w-[25%]" />
    </div>
    <figcaption className={CAPTION}>{caption}</figcaption>
  </figure>
);

export const PhonePair = ({ first, second, caption }: { first: Shot; second: Shot; caption: string }) => (
  <figure className="m-0 flex w-full flex-col gap-4">
    <div className="flex items-start justify-center gap-4 sm:gap-6">
      <PhoneFrame shot={first} className="w-[44%] max-w-[250px]" />
      <PhoneFrame shot={second} className="mt-10 w-[44%] max-w-[250px] sm:mt-14" />
    </div>
    <figcaption className={cn(CAPTION, "text-center")}>{caption}</figcaption>
  </figure>
);
