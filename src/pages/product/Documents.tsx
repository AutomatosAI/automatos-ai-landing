import { ProductPage } from "@/components/product/ProductPage";
import { BrandKitDemo } from "@/components/demos/BrandKitDemo";

const Documents = () => (
  <ProductPage
    path="/documents"
    seoTitle="Documents, invoices and templates"
    seoDescription="Invoices, letters, proposals, reports and spreadsheets rendered from your one brand kit. A template studio with no code, and every output saved with a share link."
    eyebrow="Documents, invoices & templates"
    headline="Paperwork that looks like you made it."
    brandLine="Because your brand made it."
    lede="One brand kit: your logo, colours, type, voice and sign-off. Every PDF, Word document and spreadsheet renders from it. Ask for an invoice and get one you'd send, not a draft you'd fix."
    demo={{
      label: "REAL RENDERS, BY BRAND KIT",
      hint: "PAGE 1 OF EACH · STRAIGHT FROM STUDIO",
      node: <BrandKitDemo />,
    }}
    sections={[
      {
        eyebrow: "Deliverables",
        title: "A brand board, a report, a proposal, a letter.",
        body: "Made this morning, all from one kit. Every output lands with a thumbnail, the template it used and a share link that works without a login.",
        shot: {
          src: "/images/studio/06-deliverables.png",
          alt: "Deliverables showing a brand board, a trading report, a proposal and a letter, all in the same brand",
          caption: "Deliverables · a brand board, a report, a proposal and a letter made this morning, one kit",
        },
      },
      {
        eyebrow: "Brand kit",
        title: "Set it once. It reaches everything.",
        body: "Colour roles, a type scale, spacing, logo rules, currency and date style, tone words and a sign-off. Contrast is checked when you save.",
        points: [
          "Upload a logo and the kit fills itself from your profile",
          "Ask Auto for \"less orange\" or \"warmer\" and the Brand Designer proposes a change you approve",
          "Documents, spreadsheets and social posts read the same tokens",
        ],
        shot: {
          src: "/images/studio/08-brand-kit.png",
          alt: "The Brand kit page with the brand board",
          caption: "Deliverables · Brand kit",
        },
      },
      {
        eyebrow: "Template Studio",
        title: "Start from a layout, not a blank page.",
        body: "Letter, invoice, report, proposal, agreement, data sheet. Each starter is a complete branded layout with the fields an agent fills. Edit the blocks, keep the brand.",
        points: [
          "No code. Blocks, chips and a live preview",
          "A document with an unfilled field is never delivered",
          "\"Use with Auto\" writes the prompt for you",
        ],
        shot: {
          src: "/images/studio/22-template-editor.png",
          alt: "Template cards showing the fields each one needs: client, line items, totals, payment terms",
          caption: "Deliverables · Templates · each starter says exactly what an agent must fill",
        },
      },
      {
        eyebrow: "Outputs",
        title: "Every output in one place, with a link.",
        body: "Chat, a playbook, a scheduled job or a mission: whatever makes a document, it lands here. Add it to your knowledge only if you choose to.",
        shot: {
          src: "/images/studio/33-deliverables-scrolled.png",
          alt: "The Deliverables feed with reports and task reports",
          caption: "Deliverables · Outputs · every file with its report of what was checked",
        },
      },
    ]}
    runs={{
      title: "What you can ask for today",
      items: [
        "An invoice with line items, totals and your payment terms, as a PDF",
        "A letter on your letterhead, signed off the way you sign",
        "A proposal or a quote from your price list",
        "A monthly report with your numbers in your colours",
        "A spreadsheet export with your header and logo",
        "The same document every Monday, on a schedule",
      ],
    }}
    related={[
      { label: "Socials", href: "/socials" },
      { label: "Auto & agents", href: "/auto" },
      { label: "Marketplace", href: "/marketplace" },
    ]}
    ctaHeading={<>Upload a logo. <span className="brand-line">Send an invoice an hour later.</span></>}
    ctaSub="Join the waitlist and the brand kit is the first thing we set up with you."
  />
);

export default Documents;
