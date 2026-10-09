import { ProductPage } from "@/components/product/ProductPage";
import { IntegrationsSection } from "@/components/sections/IntegrationsSection";

const Integrations = () => (
  <ProductPage
    path="/integrations"
    seoTitle="Applications, integrations and channels"
    seoDescription="Connect the apps you already use through your own accounts: mail, calendar, Shopify, Xero, LinkedIn and a thousand more. Agents use them with your permission."
    eyebrow="Applications"
    headline="Your accounts. Your permission."
    brandLine="A thousand apps, no new logins to invent."
    lede="Automatos doesn't rebuild Gmail, Shopify or Xero. You connect the account once, and agents use it within the limits you set. Anything that moves money is on a deny list unless you say otherwise."
    hero={{
      src: "/images/studio/11-applications.png",
      alt: "The Applications catalogue",
      caption: "Tools & Integrations · the catalogue, connected through your own accounts",
    }}
    sections={[
      {
        eyebrow: "Connect",
        title: "One click, one account, one place to revoke it.",
        body: "Connections live in your workspace. Remove one and every agent loses it at once. Nothing is shared between customers.",
        points: [
          "Mail, calendar, storage, CRM, accounting, commerce, social",
          "Composio-managed OAuth, or your own app where a platform requires it",
          "Scoped per workspace, visible on the board when used",
        ],
        shot: {
          src: "/images/studio/11-applications.png",
          alt: "The Applications catalogue",
          caption: "Tools & Integrations",
        },
      },
      {
        eyebrow: "Channels",
        title: "Talk to Auto where you already talk.",
        body: "Connect a channel in Studio and Auto answers there, with the same agents, the same brand and the same approvals as in the app. Questions from agents can be answered from your phone.",
        points: [
          "Live: WhatsApp, Telegram, Slack and Discord",
          "Coming: Microsoft Teams, Google Chat, Signal, iMessage, IRC, Matrix and LINE",
          "A webhook channel for anything else",
        ],
      },
      {
        eyebrow: "Guardrails",
        title: "Agents can use a tool. They can't spend with it.",
        body: "Actions that purchase, bill or change account settings are denied by default across the platform. A deny-list read that fails refuses the action rather than allowing it.",
        points: [
          "Deny list checked on every call, cached for speed",
          "Publishing goes through approval, never straight from an agent",
          "Every tool call is in the activity feed with its cost",
        ],
        shot: {
          src: "/images/studio/31-cc-governance.png",
          alt: "Governance approvals: an unclassified action waiting for a human grant or deny",
          caption: "Command Centre · Governance · an action nobody classified waits for a person",
        },
        flip: true,
      },
    ]}
    related={[
      { label: "Marketplace", href: "/marketplace" },
      { label: "Socials", href: "/socials" },
    ]}
    ctaHeading={<>Connect what you have. <span className="brand-line">Keep the keys.</span></>}
    ctaSub="Join the waitlist. Your first connection takes a minute."
  />
);

export default Integrations;
