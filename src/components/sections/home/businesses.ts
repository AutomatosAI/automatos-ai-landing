import { GITHUB_URL } from "@/lib/links";

/*
  "Who it's for": the six businesses from the v1 Industries section, copy
  carried over from the redesign branch. Portraits are AI illustrations (the
  card says so); each `made` is a real render from Studio (c1 test workspace).
*/
export type Business = {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
  modules: string;
  features: string[];
  logos: { src: string; name: string }[];
  link: { label: string; href: string };
  made: { src: string; alt: string };
};

const logo = (name: string, file = name) => ({ name, src: `/logos/${file}.png` });

export const BUSINESSES: Business[] = [
  {
    id: "owner",
    label: "The owner's assistant",
    image: "/images/use-cases/personal-assistant-800.jpg",
    imageAlt: "A business owner in orange headphones reading through papers at her desk",
    modules: "Auto + Board + Deliverables",
    features: [
      "Inbox and calendar through your own accounts",
      "Questions come back to you on the board",
      "Meeting notes as branded documents",
      "Reminders and scheduled jobs",
    ],
    logos: [logo("Gmail"), logo("Google Calendar", "GoogleCalendar"), logo("Zoom")],
    link: { label: "See Auto", href: "/auto" },
    made: { src: "/images/use-cases/made/owner-letter.jpg", alt: "A branded letter on the Automatos letterhead, rendered by Studio" },
  },
  {
    id: "shop-cafe",
    label: "Shop & café",
    image: "/images/use-cases/customer-support-800.jpg",
    imageAlt: "A café owner in an orange jumper and headphones, on a call",
    modules: "Socials + Brand kit + Templates",
    features: [
      "This week's posts, planned and made on the day",
      "Offers and menus as branded cards",
      "Customer replies you approve first",
      "A content bank with real facts, not filler",
    ],
    logos: [logo("Facebook"), logo("Google Business", "GoogleBusiness"), logo("Square")],
    link: { label: "See Socials", href: "/socials" },
    made: { src: "/images/use-cases/made/cafe-offer.jpg", alt: "Harbourline coffee offer post: £16/kg for the first 5 kg of Harbour Blend" },
  },
  {
    id: "accounting",
    label: "Accountant & bookkeeper",
    image: "/images/use-cases/accounting-800.jpg",
    imageAlt: "An accountant in orange headphones at a desk of ledgers, checking his phone",
    modules: "Templates + Brand kit + Deliverables",
    features: [
      "Invoices and letters from your templates",
      "Spreadsheets in your brand",
      "Line items filled by an agent, checked by you",
      "Every document saved with a share link",
    ],
    logos: [logo("Xero"), logo("QuickBooks", "Quickbooks"), logo("Stripe")],
    link: { label: "See Documents", href: "/documents" },
    made: { src: "/images/use-cases/made/accountant-post.jpg", alt: "Social card for an accountant: fixed fees, tax returns filed on time, a free first chat" },
  },
  {
    id: "salon-creator",
    label: "Salon, studio & creator",
    image: "/images/use-cases/social-media-800.jpg",
    imageAlt: "A creator in orange headphones thinking over a post on her phone",
    modules: "Socials + Media render + Brand kit",
    features: [
      "A cadence: images daily, a video a week",
      "Your photos behind the words",
      "Approve on the card, then it publishes",
      "LinkedIn, X, Instagram, TikTok, YouTube",
    ],
    logos: [logo("LinkedIn", "Linkedin"), logo("X"), logo("YouTube", "Youtube")],
    link: { label: "See Socials", href: "/socials" },
    made: { src: "/images/use-cases/made/salon-review.jpg", alt: "Review card: “Best haircut I've had in years. Friendly, on time, and they actually listened.”" },
  },
  {
    id: "shopify",
    label: "Shopify store",
    image: "/images/use-cases/ecommerce-800.jpg",
    imageAlt: "A store owner in orange headphones smiling at his laptop",
    modules: "Widgets + Packages + Socials",
    features: [
      "A chat widget on your store, in your brand",
      "Product descriptions and launch posts",
      "Your catalog, variants and stock in the knowledge graph",
      "Shopify agents from the marketplace",
    ],
    logos: [logo("Shopify"), logo("WooCommerce", "Woocommerce"), logo("PayPal")],
    link: { label: "See Your store", href: "/your-store" },
    made: { src: "/images/use-cases/made/shopify-highlights.jpg", alt: "Harbourline Coffee September highlights: retail bags sold, Harvest Club subscribers, wholesale cafés" },
  },
  {
    id: "developer",
    label: "Developer & agency",
    image: "/images/use-cases/developer-800.jpg",
    imageAlt: "A developer in orange headphones working at a desktop monitor",
    modules: "Sessions + Local edition + Marketplace",
    features: [
      "Agents run as sessions on your own CLI subscription",
      "The local edition on your machine",
      "Playbooks and packages you can publish",
      "Apache-2.0, on GitHub",
    ],
    logos: [logo("GitHub"), logo("GitLab"), logo("Docker")],
    link: { label: "Get it on GitHub", href: GITHUB_URL },
    made: { src: "/images/use-cases/made/developer-apache.jpg", alt: "Social card: Apache 2.0, self-host it with docker compose" },
  },
];
