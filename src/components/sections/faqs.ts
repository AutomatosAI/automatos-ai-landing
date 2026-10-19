import { EU_AI_ACT_URL } from "@/lib/links";
import type { FaqItem } from "@/lib/seo/structured-data";

/*
  The home page FAQ. The FAQPage structured data reads the same list, so what
  crawlers see matches the page; an item's link is rendered after its answer
  and its absolute URL is appended to the structured-data answer.
*/
export const HOME_FAQS: FaqItem[] = [
  {
    question: "How does the pricing work?",
    answer:
      "The local edition is free and open source, on your own keys or your Claude Code / CLI subscription. Hosted Studio opens as a beta in November with three plans: Own keys at $9 a month, Pro at $29 and Business at $99. That is beta pricing, not charged until billing opens. Own keys and Pro are the same platform: on Own keys the AI runs on your own keys and your provider bills you, while Pro includes monthly AI credits. Business adds seats, agents, video render minutes, voice and a larger credit allowance. New accounts get a one-time trial of 500 credits; a credit is one US cent of AI usage at our prices. During the beta, once the trial is used, the AI runs on your own Anthropic, OpenAI or OpenRouter key on every plan, and your provider bills you for it. Business is by invite during the beta. Included credits and top-ups start when billing opens. Enterprise is coming soon: contact us.",
  },
  {
    question: "Can I customise the agents?",
    answer:
      "Yes. Install an agent or a whole package from the marketplace, or build your own with a persona, skills and tools. Choose any model from the catalogue.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Encryption, per-workspace isolation, bring-your-own keys, and a full audit log of every agent action. Documents and vectors are stored on AWS in Ireland (eu-west-1).",
  },
  {
    question: "Do I need technical skills?",
    answer: "No. You talk to Auto in plain words. Developers can go deeper with custom skills, playbooks and API access.",
  },
  {
    question: "What if I need more than the standard integrations?",
    answer:
      "Over 1,000 apps connect through Composio with your own accounts. For anything bespoke, contact us about Enterprise, which is coming soon.",
  },
  {
    question: "Is Automatos EU AI Act compliant?",
    answer:
      "Not as a whole, and we won't claim it. EU AI Act work is in progress. Social posts wait for your approval before they publish, board work can be set to ask before it runs, and every action lands in an append-only audit log, all in the product today. The Article 50 notices and the marking of generated media are being built now. Our posture page says what is built and what isn't.",
    link: { label: "Our EU AI Act posture →", href: EU_AI_ACT_URL },
  },
];
