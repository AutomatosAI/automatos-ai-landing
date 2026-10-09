import { ProductPage } from "@/components/product/ProductPage";
import { ApproveBeforeSlotDemo } from "@/components/demos/ApproveBeforeSlotDemo";

const Socials = () => (
  <ProductPage
    path="/socials"
    seoTitle="Socials that run on a plan"
    seoDescription="Plan a cadence, keep a content bank of real facts, make posts on the day, approve on the card, publish to LinkedIn, X, Instagram, TikTok and YouTube."
    eyebrow="Socials"
    headline="A month of posts without a month of evenings."
    brandLine="Made on the day. Approved by you."
    lede="Say how often: images daily, a video a week. The Social Media Director keeps a bank of real things to say about your business, makes each post on its day, and waits for your yes before anything goes out."
    demo={{
      label: "APPROVE BEFORE THE SLOT",
      hint: "A WEEK, PLAYING FAST",
      node: <ApproveBeforeSlotDemo />,
    }}
    sections={[
      {
        eyebrow: "Calendar",
        title: "A running plan, day by day.",
        body: "Planned, making, needs you, scheduled, posted. Every slot says where it stands.",
        shot: {
          src: "/images/studio/09-socials.png",
          alt: "The Socials calendar with planned, scheduled and posted items and a running plan",
          caption: "Deliverables · Socials · a running plan, day 3 of 7, with posts waiting for approval",
        },
      },
      {
        eyebrow: "Plans",
        title: "A cadence, not a content calendar you'll abandon.",
        body: "Tell Auto \"plan this week's socials\" and it drafts the plan from what it knows about you. Each slot takes the next unused topic, writes the post, renders it and queues it for you.",
        points: [
          "Daily, weekly or monthly rhythms",
          "A slot it can't make is skipped and recorded, never half-made",
          "An evening-before reminder of what's waiting",
        ],
        shot: {
          src: "/images/studio/18-socials-plans.png",
          alt: "The Plans view with a running plan and the Plan with Auto box",
          caption: "Socials · Plans · a running plan, day 3 of 7, and Plan with Auto",
        },
      },
      {
        eyebrow: "Content bank",
        title: "Real facts, with sources.",
        body: "Topics come from your documents, your deliverables, your website and your products. A claim needs a source or your say-so.",
        points: [
          "A weekly research playbook tops up the bank",
          "\"Never say\" rules from your brand voice",
          "Your own photos behind the words, or AI footage from your own accounts",
        ],
        shot: {
          src: "/images/studio/16-socials-editor.png",
          alt: "The post editor with the brief, Redraft with Auto, the format and a live Instagram preview",
          caption: "Socials · the editor · brief, format, channels and a live preview",
        },
      },
      {
        eyebrow: "Templates & render",
        title: "Nineteen starters, your brand on all of them.",
        body: "Title cards, stats, quotes, announcements, carousels, photo cards, before-and-after, and four video formats. A template that hardcodes a colour or a font is refused.",
        shot: {
          src: "/images/studio/34-templates-scrolled.png",
          alt: "Social image and video starters beside the document templates",
          caption: "Deliverables · Templates · photo cards, brand board and video starters",
        },
      },
      {
        eyebrow: "Approve & publish",
        title: "Approve on the card. It publishes on the slot.",
        body: "Approval is bound to the exact content you saw. Change a word and it comes back for a fresh yes. Then it goes out through accounts you connected yourself.",
        points: [
          "Series approval when you trust a plan",
          "A missed slot is marked, never silently posted late",
          "Agents draft. People publish. Always.",
        ],
        shot: {
          src: "/images/studio/20-socials-queue.png",
          alt: "The Queue: a post that needs you before its slot, with its rendered image",
          caption: "Socials · Queue · approve before the slot, or nothing posts",
        },
      },
    ]}
    runs={{
      title: "What runs on its own once a plan is approved",
      items: [
        "The next post is written and rendered on its day",
        "Weekly research refills the content bank",
        "Approved posts publish at their slot",
        "Health checks flag a low bank, a missing channel or a cap that's close",
        "Posted items are copied into your workspace files",
        "Render minutes and AI media spend are capped per plan",
      ],
    }}
    related={[
      { label: "Documents & templates", href: "/documents" },
      { label: "Auto & agents", href: "/auto" },
      { label: "Command Centre", href: "/command-centre" },
    ]}
    ctaHeading={<>Say how often. <span className="brand-line">Approve what comes back.</span></>}
    ctaSub="Join the waitlist. Connect the channels you already have and let the plan run."
  />
);

export default Socials;
