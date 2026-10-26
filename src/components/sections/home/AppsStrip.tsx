import { Link } from "react-router-dom";
import { PhoneFrame } from "@/components/product/DeviceShots";
import { GO_CHAT, HUD_CHAT_PHONE, PLAY_CHAT_PHONE } from "@/components/product/appShots";

/* One strip to /apps: the themes, voice and the phone app. Unnumbered, so the Home sections keep their numbers. */
export const AppsStrip = () => (
  <section aria-labelledby="apps-strip-title" className="border-t border-border bg-card">
    <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-4 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
      <div className="flex max-w-[640px] flex-col gap-4">
        <span className="font-mono text-xs text-accent">APPS &amp; THEMES</span>
        <h2 id="apps-strip-title" className="m-0 text-3xl font-medium leading-[1.08] sm:text-[40px]">
          Studio, Play, HUD. <em className="font-normal">On the web and your phone.</em>
        </h2>
        <p className="m-0 text-[16.5px] leading-relaxed text-muted-foreground">
          Choose the theme you work in, hold to talk to Auto, and take Auto with you on Automatos Go, in beta now.
        </p>
        <Link
          to="/apps"
          className="mt-1 self-start whitespace-nowrap rounded-full border border-border px-5 py-3 text-[15px] font-medium text-foreground transition-colors hover:border-foreground"
        >
          See apps &amp; themes →
        </Link>
      </div>
      <div className="hidden items-start gap-4 lg:flex">
        <PhoneFrame shot={PLAY_CHAT_PHONE} size="sm" className="mt-8 w-[128px]" />
        <PhoneFrame shot={HUD_CHAT_PHONE} size="sm" className="w-[128px]" />
        <PhoneFrame shot={GO_CHAT} size="sm" className="mt-8 w-[128px]" />
      </div>
    </div>
  </section>
);
