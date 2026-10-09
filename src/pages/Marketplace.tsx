import { ProductPage } from "@/components/product/ProductPage";
import { PackageInstallDemo } from "@/components/demos/PackageInstallDemo";

/*
  The six categories here are the ones the platform actually renders
  (Packages · Applications · Agents · Playbooks · LLMs · Capabilities).
  Templates is the seventh, in progress.
*/

const Marketplace = () => (
  <ProductPage
    path="/marketplace"
    seoTitle="Marketplace"
    seoDescription="Install a package and get the agents, playbooks, templates and connections it needs. Built by Automatos and by the community. Share what you build."
    eyebrow="Marketplace"
    headline="Install, don't build."
    brandLine="Lego, for a business."
    lede="A package is a starter team: the agents, the playbooks, the setup questions and the connections, installed together. Pick one that matches your business, answer a few questions, and the work starts."
    demo={{
      label: "INSTALL A PACKAGE",
      hint: "SANDBOXED TO YOUR WORKSPACE · REVERSIBLE",
      node: <PackageInstallDemo />,
    }}
    sections={[
      {
        eyebrow: "The shelf",
        title: "Packages first, then everything else.",
        body: "Applications, agents, playbooks, models and capabilities, built by Automatos and by the community.",
        shot: {
          src: "/images/studio/10-marketplace.png",
          alt: "The Community Marketplace with featured packages and the six category tabs",
          caption: "Marketplace · packages first, then applications, agents, playbooks, models and capabilities",
        },
      },
      {
        eyebrow: "Packages",
        title: "A whole team in one install.",
        body: "The Socials package brings the Social Media Director, the Brand Designer, four playbooks and a guided setup. Dependencies resolve themselves.",
        points: [
          "Setup questions, required connections and a first-week guide",
          "Everything sandboxed to your workspace and reversible",
          "Vertical packages: retail, hospitality, services, commerce",
        ],
        shot: {
          src: "/images/studio/27-marketplace-packages-scrolled.png",
          alt: "Starter teams for your business: Shopify Development, Shopify Management, Socials",
          caption: "Marketplace · Packages · starter teams, with their agents and playbooks",
        },
      },
      {
        eyebrow: "Playbooks",
        title: "Repeatable work, written down once.",
        body: "A playbook is a sequence an agent runs the same way every time: research, then write, then render the document, then email the link. Install one, edit it, or publish yours.",
        shot: {
          src: "/images/studio/24-marketplace-playbooks.png",
          alt: "The Playbooks tab of the marketplace",
          caption: "Marketplace · Playbooks",
        },
      },
      {
        eyebrow: "Applications, models, capabilities",
        title: "The rest of the shelf.",
        body: "Applications are the apps you connect. LLMs are the models an agent can think with. Capabilities are skills and plugins that teach an agent a trade.",
        points: [
          "Over a thousand applications through your own accounts",
          "Any model from the catalogue, routed per agent",
          "Skills imported from GitHub, scanned before they're listed",
        ],
        shot: {
          src: "/images/studio/26-marketplace-capabilities.png",
          alt: "The Capabilities tab: skills and plugins",
          caption: "Marketplace · Capabilities · the skills library, imported from GitHub",
        },
      },
      {
        eyebrow: "Templates",
        title: "Coming: the seventh shelf.",
        body: "Document and social templates shared by the community, rendered in your brand the moment you install them.",
        points: [
          "A shared template can't carry someone else's colours",
          "Publish from the Template Studio, install to yours",
          "Packages will ship with their paperwork included",
        ],
        shot: {
          src: "/images/studio/07-templates.png",
          alt: "Template Studio",
          caption: "Deliverables · Templates · the studio the shelf will publish from",
        },
      },
    ]}
    runs={{
      title: "What's on the shelf today",
      items: [
        "Packages: Socials, Shopify management, Shopify development",
        "Agents: Brand Designer, Social Media Director, the Shopify roster, and the community's",
        "Playbooks: weekly social posts, content bank research, brand kit from your website, and more",
        "Applications: the Composio catalogue, connected with your accounts",
        "LLMs: the OpenRouter catalogue plus NVIDIA and DeepSeek, bring your own key",
        "Capabilities: skills and plugins, admin-curated and scanned",
      ],
    }}
    related={[
      { label: "Auto & agents", href: "/auto" },
      { label: "Documents & templates", href: "/documents" },
      { label: "Socials", href: "/socials" },
    ]}
    ctaHeading={<>Pick a package. <span className="brand-line">Meet your team.</span></>}
    ctaSub="Join the waitlist. The first package we'll suggest is the one for your trade."
  />
);

export default Marketplace;
