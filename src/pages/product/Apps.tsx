import { ProductPage, Screenshot } from "@/components/product/ProductPage";
import { LaptopAndPhone, PhonePair } from "@/components/product/DeviceShots";
import {
  GO_CHAT,
  GO_SHELF,
  HUD_CHAT,
  HUD_CHAT_PHONE,
  HUD_LISTENING,
  HUD_LISTENING_PHONE,
  HUD_LOOK_EDITOR_PHONE,
  PLAY_CHAT,
  PLAY_CHAT_PHONE,
  PLAY_FIRST_OPEN,
  PLAY_MENU_PHONE,
  PLAY_VOICE,
  STUDIO_CHAT,
} from "@/components/product/appShots";
import { DESIGN_KIT_URL } from "@/lib/links";

/*
  The ways to use Automatos: Studio on the web, the Play and HUD themes, voice,
  the Automatos Go phone app and the Design Kit. Grounded in automatos-ai main
  (Settings › Appearance › Themes, PRD-261), automatos-go (chat, Command Centre,
  push, hold to talk, three styles; beta) and automatos-design-kit (Apache-2.0,
  the automatos-theme CLI). Voice: hold to talk on every plan, live calls depend
  on the plan; never a price or a plan name here. Languages (Gerard, 27 Oct
  2026): Go talks in English and Portuguese (Brazil); the Kokoro
  voice speaks 9 languages; detection in about 100 languages waits for a GPU,
  so it is only ever "Coming".
*/
const HERO = (
  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
    <Screenshot shot={{ ...PLAY_FIRST_OPEN, caption: "Play · a new chat, with Auto" }} priority />
    <Screenshot shot={{ ...HUD_LISTENING, caption: "HUD · listening while you talk" }} priority />
  </div>
);

const Apps = () => (
  <ProductPage
    path="/apps"
    seoTitle="Apps, themes and voice"
    seoDescription="Use Automatos Studio in your browser in the Studio, Play or HUD theme, hold to talk to Auto, take Auto with you on Automatos Go, or build your own theme."
    eyebrow="Apps & themes"
    headline="Your Automatos, your way."
    brandLine="On the web, out loud and in your pocket."
    lede="Run your business from Studio in your browser. Choose the theme you work in, talk to Auto instead of typing, and take Auto with you on your phone. If no theme fits, make your own."
    heroMedia={HERO}
    sections={[
      {
        eyebrow: "Studio",
        title: "The web app you run your business from.",
        body: "Studio is where the work happens: you tell Auto what you need, agents pick up the jobs, and the board, your documents and your posts live in one workspace. Play, HUD, voice and the phone app all open that same workspace.",
        shot: { ...STUDIO_CHAT, caption: "Studio · chat, with the questions agents are asking on the right" },
      },
      {
        eyebrow: "Play",
        title: "Friendly and warm, with Auto on the page.",
        body: "Play puts Auto, our mascot, on the page with you. He reacts while he works and while he listens. Underneath it's the same Studio, with the same chats, board and documents, on a laptop or a phone.",
        media: (
          <LaptopAndPhone
            laptop={PLAY_CHAT}
            phone={PLAY_CHAT_PHONE}
            caption="Play · the same answer on a laptop and in a phone's browser"
          />
        ),
      },
      {
        eyebrow: "HUD",
        title: "A mission-control console for your business.",
        body: "HUD lays your workspace out like mission control: which agents are working, how far each mission has got, what needs you and what's next today, all at a glance. Hold space to talk, or type.",
        media: (
          <LaptopAndPhone
            laptop={HUD_CHAT}
            phone={HUD_CHAT_PHONE}
            caption="HUD · agents, the mission, what needs you and what's next"
          />
        ),
      },
      {
        eyebrow: "Voice",
        title: "Hold to talk. Auto answers out loud.",
        body: "Hold the mic, say what you need and let go. Auto replies on screen and out loud, in every theme and on your phone. Hold to talk comes with every plan; live voice calls come with supported plans. Coming: automatic language detection. Speak in any of about 100 languages without choosing first.",
        /* Points carry a check mark, so only what works today goes here; the coming item stays in the body. */
        points: [
          "Auto answers in the language you write or speak.",
          "Auto's natural voice is self-hosted and open source (Kokoro). It speaks 9 languages: English (US and UK), Spanish, French, Italian, Portuguese (Brazil), Hindi, Japanese and Mandarin. Self-hosted installs include it.",
        ],
        media: (
          <LaptopAndPhone
            laptop={PLAY_VOICE}
            phone={HUD_LISTENING_PHONE}
            caption="Voice · Auto speaking in Play, and listening in HUD on a phone"
          />
        ),
      },
      {
        eyebrow: "Automatos Go",
        title: "Auto in your pocket.",
        body: "Automatos Go is the phone app for your workspace. Chat with Auto, check the Command Centre, get a push notification when something needs you, hold to talk, and pick the Studio, Play or HUD style. Talk to Auto in English and Portuguese (Brazil), and switch with one tap. It's in beta now and coming to the App Store.",
        link: { label: "Join the waitlist", href: "#waitlist", primary: true },
        media: (
          <PhonePair
            first={GO_CHAT}
            second={GO_SHELF}
            caption="Automatos Go · a chat with Auto, and the shelf of what Auto made"
          />
        ),
      },
      {
        eyebrow: "Make your own",
        title: "Build a theme of your own.",
        body: "The Automatos Design Kit is open source under Apache-2.0. Start a theme in minutes with the automatos-theme command line, see it in your browser as you build, and pack it into one file you install from Settings › Appearance › Themes.",
        points: [
          "automatos-theme new starts a theme that builds and packs as it is",
          "automatos-theme check runs the checks the server runs on a theme",
          "Play and HUD ship in the kit as worked examples",
        ],
        link: { label: "The Design Kit on GitHub", href: DESIGN_KIT_URL },
        media: (
          <PhonePair
            first={HUD_LOOK_EDITOR_PHONE}
            second={PLAY_MENU_PHONE}
            caption="A theme reaches every page · HUD's look editor and Play's menu"
          />
        ),
      },
    ]}
    runs={{
      title: "Whichever way you come in",
      items: [
        "One workspace behind every theme, browser and phone",
        "Themes install from Settings › Appearance › Themes, and each person picks the one they work in",
        "Hold to talk on every plan, in every theme",
        "Live voice calls on supported plans",
        "Auto answers in the language you write or speak",
        "Coming: automatic language detection in about 100 languages",
        "Automatos Go is in beta now, coming to the App Store",
        "The Design Kit is open source under Apache-2.0",
      ],
    }}
    related={[
      { label: "Auto & agents", href: "/auto" },
      { label: "Command Centre", href: "/command-centre" },
      { label: "Marketplace", href: "/marketplace" },
    ]}
    ctaHeading={<>Pick a theme. <span className="brand-line">Take Auto with you.</span></>}
    ctaSub="Join the waitlist. Hosted beta opens November 2026."
  />
);

export default Apps;
