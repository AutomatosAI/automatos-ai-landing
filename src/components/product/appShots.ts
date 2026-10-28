import type { Shot } from "./ProductPage";

/*
  Captures for /apps and the Home strip. public/images/apps holds the 2x originals
  under their own names (polished versions will replace them under the same names)
  and the copies the site shows: laptop captures at 1440 wide (<name>-1440.png),
  phone captures at 390 wide (<name>-390.png or .jpg). After replacing an original,
  remake its copy with sips, e.g.
    sips --resampleWidth 1440 play-1440-chat-ember.png --out play-1440-chat-ember-1440.png
    sips --resampleWidth 390 play-390-chat-ember.png --out play-390-chat-ember-390.png
  Images are cached immutable for a year (server.js), so once a version is live, a
  changed image needs a new file name.
*/
const DIR = "/images/apps";

const laptop = (name: string, alt: string): Shot => ({ src: `${DIR}/${name}-1440.png`, alt, width: 1440, height: 900 });
const phone = (name: string, alt: string): Shot => ({ src: `${DIR}/${name}-390.png`, alt, width: 390, height: 844 });
/* Automatos Go captures come from an iPhone (945 x 2048) and keep their status bar. */
const goPhone = (name: string, alt: string): Shot => ({ src: `${DIR}/${name}-390.jpg`, alt, width: 390, height: 845 });

/* An existing Studio capture (public/images/studio), served at its 2x size like the other product pages. */
export const STUDIO_CHAT: Shot = {
  src: "/images/studio/01-auto-chat.png",
  alt: "Studio's chat: Auto making a branded invoice from one message, with the questions agents are asking on the right",
  width: 2880,
  height: 1800,
};

export const PLAY_FIRST_OPEN = laptop(
  "play-1440-first-open-ember",
  "The Play theme on a laptop: Auto, an orange robot mascot, says “Hi, I'm Auto.” above the message box of a new chat",
);
export const PLAY_CHAT = laptop(
  "play-1440-chat-ember",
  "The Play theme on a laptop: Auto answers a request for a light travel laptop with a laptop shortlist document, the mascot beside the chat",
);
export const PLAY_CHAT_PHONE = phone(
  "play-390-chat-ember",
  "The Play theme in a phone's browser: the same laptop shortlist answer, with Auto below it and the message box",
);
export const PLAY_VOICE = laptop(
  "play-1440-voice-speaking-ember",
  "The Play theme on a laptop while Auto speaks: the mascot is marked Speaking and Auto says two cards are waiting for approval",
);
export const PLAY_MENU_PHONE = phone(
  "play-390-menu-ember",
  "Play's menu in a phone's browser: Chat, Conversations, Command Centre, Assignments, Deliverables and the rest of Studio's pages",
);

export const HUD_CHAT = laptop(
  "hud-1440-chat-arc",
  "The HUD theme on a laptop: agents and the current mission on the left, Auto in a ring in the centre, and today's numbers, what needs you and what's next on the right",
);
export const HUD_CHAT_PHONE = phone(
  "hud-390-chat-arc",
  "The HUD theme in a phone's browser: Auto in a ring, the laptop shortlist answer and a hold-to-talk button",
);
export const HUD_LISTENING = laptop(
  "hud-1440-voice-listening-arc",
  "The HUD theme on a laptop while you talk: the mic is live, Auto is listening, and your question “What needs me on the board today?” sits under the ring",
);
export const HUD_LISTENING_PHONE = phone(
  "hud-390-voice-listening-forge",
  "The HUD theme in an orange look in a phone's browser: Auto listening to “What needs me on the board today?” above a hold-to-talk button",
);
export const HUD_LOOK_EDITOR_PHONE = phone(
  "hud-390-look-editor-arc",
  "HUD's look editor in a phone's browser: pick a look, then tune it, with a preview of Auto and three agents",
);

export const GO_CHAT = goPhone(
  "go-play-chat-laptop",
  "Automatos Go on an iPhone in the Play style: Auto's pick of three light laptops for travel, under a bar showing what needs you and a link to the Command Centre",
);
export const GO_SHELF = goPhone(
  "go-play-shelf-blog",
  "Automatos Go on an iPhone in the Play style: your shelf, showing the blog posts Auto wrote, newest first",
);
