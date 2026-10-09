import { ProductPage } from "@/components/product/ProductPage";
import { StorefrontChatDemo } from "@/components/demos/StorefrontChatDemo";

/*
  Shopify + widgets. Claims are grounded in automatos-ai (orchestrator/api/shopify.py,
  api/widgets/*, seeds/seed_packages.py), automatos-shopify (theme blocks) and
  automatos-widget-sdk (loader 0.4.x). Research notes: 8 Oct 2026. Before launch:
  sync the Shopify skills into the platform and re-test the SDK against main.
*/
const WIDGET_SNIPPET = `<script src="https://widgets.automatos.app/v0/widget.global.js" defer crossorigin="anonymous"></script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    AutomatosWidget.init({
      apiKey: "ak_pub_…",        // locked to your domains
      widget: "chat",            // or "blog"
      position: "bottom-right",
      greeting: "Hi! Ask us anything.",
    });
  });
</script>`;

const GRAPH_SAMPLE = `shopify_product   Harbour Blend
├─ shopify_variant   1kg · Whole bean · £34.00 · 14 in stock
├─ shopify_variant   250g · Ground · £9.50 · 0 in stock
├─ in_collection     Blends
├─ by_vendor         Harbourline Roasters
└─ frequently_bought_with   V60 papers`;

const YourStore = () => (
  <ProductPage
    path="/your-store"
    seoTitle="Shopify app and website widgets"
    seoDescription="Connect your Shopify store and your catalog lands in your knowledge graph. Shopify agents answer shoppers, watch stock and write product copy; the chat and blog widgets put them on any site."
    eyebrow="Your store & site · early access"
    headline="Your store, run by your agents."
    brandLine="On Shopify, or any site with one script tag."
    lede="Connect your Shopify store and your products, variants and stock land in your knowledge graph. Shopify agents answer shoppers, watch inventory and write your product copy, and the chat and blog widgets put them on any website you run."
    demo={{
      label: "YOUR STOREFRONT, ANSWERED",
      hint: "SAMPLE STORE · ANSWERS COME FROM THE SYNCED CATALOG",
      node: <StorefrontChatDemo />,
    }}
    sections={[
      {
        eyebrow: "Your catalog, in the graph",
        title: "Agents that know every variant, size and stock level.",
        body: "Products, variants, collections, vendors and metafields sync into your workspace's knowledge graph the moment your store connects, and again whenever a product, collection or stock level changes. Agents answer from that graph, so a shopper gets the real size, price and stock, fast.",
        points: [
          "Re-syncs on Shopify's own product and inventory events",
          "Order history becomes “bought together” links, never customer records",
          "Ask Auto to re-sync or report on the last sync in plain words",
        ],
        code: { label: "WHAT THE AGENT SEES · SAMPLE, SYNCED FROM SHOPIFY", text: GRAPH_SAMPLE },
      },
      {
        eyebrow: "Shopify agents",
        title: "A store team from the marketplace.",
        body: "Shopify Management brings an operations manager, a support agent, an inventory watchdog and a business analyst, with weekly numbers, inventory status and customer-service reports. Shopify Development brings an app architect, a storefront developer and an extension builder for your theme.",
        points: [
          "Twelve Shopify agents, from support to SEO copy and gift finding",
          "Skills for order triage, returns, pricing, peak season and suppliers",
          "Each agent's model, skills and tools are yours to change",
        ],
        shot: {
          src: "/images/studio/23-marketplace-agents.png",
          alt: "The marketplace with the Shopify Support Agent featured and Shopify agents recommended",
          caption: "Marketplace · the Shopify Support Agent, with the Shopify roster beside it",
        },
      },
      {
        eyebrow: "The Shopify app",
        title: "Four blocks in your theme editor.",
        body: "Install Automatos from Shopify and four blocks appear in your theme: a support chat, product Q&A, a blog and a review summary. The chat knows which product, collection and cart the shopper is looking at, and can open the conversation itself when a cart sits idle. Prefer your own setup? Connect your store with your own Admin token instead.",
        points: [
          "Support chat with the page, product and cart in context",
          "Product Q&A on every product page",
          "Blog posts and review summaries rendered in your theme",
        ],
      },
      {
        eyebrow: "Widgets for any site",
        title: "One script tag. Your agents on your website.",
        body: "Not on Shopify? The same chat and blog widgets work on any site: WordPress, Wix, a static page or your own app. Paste the snippet, choose chat or blog, and set your colours. Visitors talk to the agents in your workspace, with the same memory and approvals as Studio.",
        points: [
          "Chat with a request-a-callback form, sent to Telegram, Slack, WhatsApp or a webhook",
          "A blog that lists your workspace's posts, in grid or list",
          "A React component for apps, a script tag for everything else",
        ],
        code: { label: "INSTALL · ANY WEBSITE", text: WIDGET_SNIPPET },
      },
      {
        eyebrow: "Safe by default",
        title: "Your keys, your domains, your yes.",
        body: "Widget keys only work on the domains you list, and a request without a known origin is refused. Traffic is rate-limited per key and per visitor. Anything that spends money, like a refund, waits for a person.",
        points: [
          "Revoke a key in Studio and every widget using it stops",
          "Callback phone numbers go to you, never into storage",
          "Refunds and price changes come to you as questions on the board",
        ],
        shot: {
          src: "/images/studio/31-cc-governance.png",
          alt: "Governance approvals with actions waiting for a human grant or deny",
          caption: "Command Centre · Governance · anything that spends money waits for a person",
        },
      },
    ]}
    runs={{
      title: "What runs once your store is connected",
      items: [
        "Your catalog re-syncs when a product, collection or stock level changes",
        "Shoppers get answers from your real variants, sizes and stock",
        "The inventory watchdog flags low stock before you run out",
        "Cross-sells come from what your customers actually buy together",
        "Weekly numbers, inventory status and a customer-service summary",
        "Refunds and anything else that spends money wait for your yes",
      ],
    }}
    related={[
      { label: "Marketplace", href: "/marketplace" },
      { label: "Integrations", href: "/integrations" },
      { label: "Socials", href: "/socials" },
    ]}
    ctaHeading={<>Connect your store. <span className="brand-line">Let the agents mind the shop.</span></>}
    ctaSub="Join the waitlist. Shopify and widget early access opens first."
  />
);

export default YourStore;
