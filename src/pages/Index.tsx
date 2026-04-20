import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ToolsSection } from "@/components/sections/ToolsSection";
import { MetricsSection } from "@/components/sections/MetricsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SupportSection } from "@/components/sections/SupportSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { IntegrationsSection } from "@/components/sections/IntegrationsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { VideoSection } from "@/components/sections/VideoSection";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { SEO } from "@/components/seo/SEO";
import {
  organizationSchema,
  websiteSchema,
  softwareApplicationSchema,
  faqSchema,
} from "@/lib/seo/structured-data";

const HOMEPAGE_FAQS = [
  {
    question: "What is Automatos AI?",
    answer:
      "Automatos AI is a multi-agent orchestration platform that lets non-engineers design, deploy and run teams of specialised AI agents. Agents have skills, tools, memory and a chosen LLM, and they collaborate on sequential missions (playbooks) to run real business operations — marketing, recruitment, research, e-commerce and more.",
  },
  {
    question: "How is Automatos different from ChatGPT or a chatbot?",
    answer:
      "ChatGPT answers questions. Automatos agents get work done. Each agent owns outcomes: they execute real actions via Composio tools (Gmail, Slack, LinkedIn, GitHub, Shopify and 250+ more), persist memory across runs, submit reports that other agents can read, and stop cleanly when a budget is hit. Automatos is a digital workforce, not a chat UI.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Flexible monthly plans from €29/mo for individuals, a Business tier with unlimited agents and advanced tools, and custom Enterprise quotes. Customers can Bring Their Own Key (BYOK) for any supported LLM provider to keep model choice and cost control.",
  },
  {
    question: "Which LLM providers does Automatos support?",
    answer:
      "OpenAI, Anthropic, Google, Grok (xAI), AWS Bedrock, Azure OpenAI, HuggingFace, and OpenRouter — giving access to 300+ models. Customers can mix providers per agent and bring their own API keys.",
  },
  {
    question: "Can I customise agents?",
    answer:
      "Yes. Choose a role and persona, assign skills, equip tools, pick an LLM, and attach documents or field memory. Install pre-built agents from the marketplace or author your own with a SKILL.md contract.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Enterprise-grade encryption, per-workspace isolation, BYOK support so customer API keys are encrypted and never shared, and a full audit log of every agent action. Workspaces cannot access each other's data.",
  },
  {
    question: "Do I need technical skills to use Automatos?",
    answer:
      "No. The Mission Zero onboarding wizard sets up your workspace, agents, tools and first mission end-to-end with natural language. Developers can go deeper with custom skills, playbooks and API access.",
  },
  {
    question: "How many tool integrations are supported?",
    answer:
      "Over 850 apps through Automatos Tools, including Composio (250+), native workspace tools (file I/O, git, shell, grep), and custom integrations on the Enterprise plan.",
  },
  {
    question: "Is Automatos EU AI Act compliant?",
    answer:
      "Automatos is aligned with the EU AI Act by design — prohibited-practice guardrails (Article 5), transparency markers on end-user surfaces (Article 50), human-in-the-loop oversight (Article 14), and tamper-evident logging with incident reporting (Articles 12 and 73). Full posture at /eu-ai-act.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        path="/"
        structuredData={[
          organizationSchema(),
          websiteSchema(),
          softwareApplicationSchema(),
          faqSchema(HOMEPAGE_FAQS),
        ]}
      />
      <Navbar />
      <main>
        <HeroSection />
        <VideoSection />
        <SolutionsSection />
        <HowItWorksSection />
        <IndustriesSection />
        <ToolsSection />
        <MetricsSection />
        <TestimonialsSection />
        <SupportSection />
        <PricingSection />
        <IntegrationsSection />
        <FAQSection />
        <BlogPreviewSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
