/* The home page FAQ. The FAQPage structured data reads the same list, so what crawlers see matches the page. */
export const HOME_FAQS: { question: string; answer: string }[] = [
  {
    question: "How does the pricing work?",
    answer:
      "Three plans: Basic, Pro and Business. The price covers the platform, the renders and support. Agents use your own connected accounts and, where you have one, your own CLI subscription, so there is no token meter to watch.",
  },
  {
    question: "Can I customise the agents?",
    answer:
      "Yes. Install an agent or a whole package from the marketplace, or build your own with a persona, skills and tools. Choose any model from the catalogue.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Encryption, per-workspace isolation, bring-your-own keys, and a full audit log of every agent action.",
  },
  {
    question: "Do I need technical skills?",
    answer: "No. You talk to Auto in plain words. Developers can go deeper with custom skills, playbooks and API access.",
  },
  {
    question: "What if I need more than the standard integrations?",
    answer:
      "Over a thousand apps connect through your own accounts. For anything bespoke, the Business plan includes custom development.",
  },
  {
    question: "Is Automatos EU AI Act compliant?",
    answer:
      "Not as a whole yet, and we won't claim it. What's built: a person approves anything that spends money or publishes, actions are sorted into risk classes with matching oversight, every action goes to an append-only audit log, data is stored in the EU, and GDPR export and erasure work. The posture page says what's built and what isn't.",
  },
];
