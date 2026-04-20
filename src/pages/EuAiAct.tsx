import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShieldCheck,
  Eye,
  UserCheck,
  FileText,
  ArrowRight,
} from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Prohibited-practice guardrails",
    body: "Platform-wide controls prevent agents from being used for social scoring, manipulative AI, biometric categorization and other practices prohibited under Article 5. Always on. Not opt-in.",
  },
  {
    icon: Eye,
    title: "Transparency to end users",
    body: "Chatbot, voice and widget surfaces carry clear AI-interaction markers in line with Article 50. Deployers can configure stronger disclosures where their use case requires it.",
  },
  {
    icon: UserCheck,
    title: "Human oversight by design",
    body: "Mission approvals, step-level confirmations and kill switches give deployers meaningful human oversight over every agent action, as required by Article 14.",
  },
  {
    icon: FileText,
    title: "Logging, traceability, incident reporting",
    body: "Outcome telemetry, tamper-evident logs with configurable retention, and a serious-incident reporting workflow supporting Articles 12 and 73 obligations.",
  },
];

const articleMap = [
  {
    article: "Art. 5",
    obligation: "Prohibited practices",
    implementation:
      "Always-on platform guardrails block prohibited intents at the tool-router layer, regardless of workspace configuration.",
  },
  {
    article: "Art. 6 + Annex III",
    obligation: "High-risk classification",
    implementation:
      "Every agent, recipe and mission carries a risk tier (minimal, limited, high, prohibited) — auto-inferred from templates and enforced at runtime.",
  },
  {
    article: "Art. 9",
    obligation: "Risk management system",
    implementation:
      "Continuous verification and quality checks across the agent lifecycle, surfaced in the auditor posture dashboard.",
  },
  {
    article: "Art. 10",
    obligation: "Data governance",
    implementation:
      "Provenance tracking for retrieval corpora and any fine-tuned components, with clear lineage for deployer review.",
  },
  {
    article: "Art. 12",
    obligation: "Record-keeping and logging",
    implementation:
      "Automatic, tamper-evident logs with retention policies (180 days default, up to 10 years for high-risk deployments).",
  },
  {
    article: "Art. 13",
    obligation: "Transparency to deployer",
    implementation:
      "Auto-generated agent cards describe capabilities, limitations, expected input types and oversight requirements.",
  },
  {
    article: "Art. 14",
    obligation: "Human oversight",
    implementation:
      "Formalised approval flows, confirmation gates and kill switches. Mandatory for agents classified as high-risk.",
  },
  {
    article: "Art. 15",
    obligation: "Accuracy, robustness, cybersecurity",
    implementation:
      "Verification outputs and adversarial robustness checks feed automatically into conformity evidence.",
  },
  {
    article: "Art. 43",
    obligation: "Conformity assessment support",
    implementation:
      "Annex IV-style technical documentation generated per deployed agent, exportable as PDF for your auditor.",
  },
  {
    article: "Art. 50",
    obligation: "Transparency to end users",
    implementation:
      "AI-interaction disclosure built into every user-facing surface — chatbot, voice, widget SDK and mobile.",
  },
  {
    article: "Art. 53–55",
    obligation: "GPAI obligations",
    implementation:
      "Every model in the LLM provider marketplace carries provider-supplied AI Act disclosures (training data summary, copyright policy, technical documentation).",
  },
  {
    article: "Art. 73",
    obligation: "Serious incident reporting",
    implementation:
      "Dedicated incident workflow with 15-day notification support and integrations into existing monitoring.",
  },
];

const faqs = [
  {
    question: "Are you EU AI Act certified?",
    answer:
      "No — and nobody is yet. There is no notified certification body for most categories under the AI Act at the time of writing. We describe Automatos as 'aligned' with the AI Act, meaning our platform is designed around the obligations that the Act places on providers and supports deployers in meeting their own obligations.",
  },
  {
    question: "Who is the 'provider' and who is the 'deployer' here?",
    answer:
      "Under the AI Act, Automatos is a 'provider' of a general-purpose AI platform and supporting components. The tenant using Automatos to build and run agents is typically the 'deployer' of the resulting AI system. We cover provider-level obligations (prohibited practices, transparency to deployers, logging, documentation) and give you the tooling you need to meet your deployer-level obligations (risk assessment, human oversight, end-user transparency, incident reporting).",
  },
  {
    question: "What if my use case is high-risk under Annex III?",
    answer:
      "High-risk use cases (HR screening, credit scoring, critical infrastructure, education, law enforcement and others) carry additional obligations. Automatos supports these with explicit high-risk classification, mandatory human oversight, extended log retention, and Annex IV-style technical documentation. We strongly recommend engaging your own legal counsel before deploying any high-risk agent.",
  },
  {
    question: "Does this cover GDPR too?",
    answer:
      "The AI Act and GDPR are separate frameworks with overlapping concerns. Our AI Act posture addresses AI-specific obligations. GDPR compliance is covered by our Privacy Policy, data-processing agreements, and standard security controls. Enterprise customers receive a combined compliance pack covering both.",
  },
  {
    question: "When do these obligations take effect?",
    answer:
      "Prohibited practices have been banned since 2 February 2025. GPAI obligations have applied since 2 August 2025. High-risk system obligations fully apply from 2 August 2026. Full application for embedded high-risk systems is 2 August 2027. Automatos is designed to meet these deadlines in advance of when each obligation takes effect.",
  },
  {
    question: "How do I show my auditor our posture?",
    answer:
      "With the Compliance Pack add-on, you can generate time-boxed, read-only auditor share links showing your workspace's risk tiers, log retention, human-oversight events, and incident history. Contact us to enable the Compliance Pack for your workspace.",
  },
];

const EuAiAct = () => {
  const lastReviewed = "April 2026";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="EU AI Act Alignment"
        description="Automatos AI is aligned with the EU AI Act by design — prohibited-practice guardrails, transparency, human oversight, and logging built in. See our posture and article-by-article mapping."
        path="/eu-ai-act"
        structuredData={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "EU AI Act Alignment", url: "/eu-ai-act" },
          ]),
          faqSchema([
            {
              question: "Is Automatos AI compliant with the EU AI Act?",
              answer:
                "Automatos is aligned with the EU AI Act by design. The platform ships prohibited-practice guardrails (Article 5), transparency markers for end-user interactions (Article 50), human-in-the-loop oversight (Article 14), and tamper-evident logging with incident reporting (Articles 12 and 73). Deployer-level compliance depends on how you configure your specific use case.",
            },
            {
              question: "How does Automatos help with high-risk AI system classification?",
              answer:
                "Automatos provides mission-level risk classification, audit logs, and evidence export to support conformity assessment. We are customer #1 of our own compliance tooling.",
            },
            {
              question: "Where is Automatos data hosted?",
              answer:
                "Documents, vectors and workspace data are hosted in the EU (eu-west-1). Inference runs against the LLM provider the customer selects; BYOK customers keep full model-location control.",
            },
          ]),
        ]}
      />
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-mono mb-6">
              <ShieldCheck className="w-4 h-4" />
              EU AI Act posture
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Aligned with the EU AI Act — <span className="text-primary">[by design]</span>.
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Automatos AI is built around the obligations the EU AI Act places
              on AI providers and deployers. Prohibited-practice guardrails,
              transparency, human oversight and traceability are built in — not
              bolted on.
            </p>
            <p className="text-sm text-muted-foreground mt-4 italic">
              We describe Automatos as "aligned" rather than "certified". No
              notified certification body exists for most AI Act categories
              today — alignment means our platform is engineered to meet the
              Act's obligations as they come into force.
            </p>
          </motion.div>

          {/* Four pillars */}
          <section className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">
              Four pillars of our posture
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <pillar.icon className="w-7 h-7 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Article map */}
          <section className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Article-by-article mapping
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              How the AI Act's core obligations map onto concrete Automatos
              features. This is a living document — reviewed each quarter as
              guidance from the European AI Office evolves.
            </p>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="hidden md:grid md:grid-cols-[140px_220px_1fr] gap-4 px-6 py-4 bg-muted/50 font-mono text-xs text-muted-foreground uppercase tracking-wider">
                <div>Article</div>
                <div>Obligation</div>
                <div>Automatos implementation</div>
              </div>
              {articleMap.map((row, index) => (
                <div
                  key={row.article}
                  className={`grid md:grid-cols-[140px_220px_1fr] gap-2 md:gap-4 px-6 py-5 text-sm ${
                    index !== articleMap.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <div className="font-mono font-semibold text-primary">
                    {row.article}
                  </div>
                  <div className="font-medium">{row.obligation}</div>
                  <div className="text-muted-foreground leading-relaxed">
                    {row.implementation}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Provider vs deployer */}
          <section className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Provider vs. deployer — who covers what
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Under the AI Act, responsibilities are split between the
              "provider" of an AI system and the "deployer" using it. Here's
              how that split works for Automatos.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">
                  Automatos covers (provider)
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Prohibited-practice platform guardrails</li>
                  <li>• GPAI provider disclosures on hosted models</li>
                  <li>• Logging, traceability and tamper evidence</li>
                  <li>• Technical documentation generation</li>
                  <li>• Platform-level transparency to end users</li>
                  <li>• Security and cybersecurity of the platform</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3">
                  You cover (deployer)
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Classifying your specific use case</li>
                  <li>• Meaningful human oversight of agent actions</li>
                  <li>• Domain-specific risk assessment</li>
                  <li>• End-user disclosures in your workflow context</li>
                  <li>• Incident reporting to authorities where required</li>
                  <li>• Legal counsel for high-risk deployments</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">
              Common questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* CTA */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Need to show your auditor?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                The Automatos Compliance Pack gives you auditor share links,
                Annex IV-style documentation, quarterly conformity reports and
                dedicated compliance support. Talk to us about enabling it for
                your workspace.
              </p>
              <Link to="/contact?source=eu-ai-act">
                <Button size="lg" className="rounded-full">
                  Request Compliance Pack
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </section>

          {/* Disclaimer / meta */}
          <section className="text-xs text-muted-foreground border-t border-border pt-8">
            <p className="mb-2">
              Last reviewed: {lastReviewed}. This page describes design intent
              and platform capability — it does not constitute legal advice.
              Deployers remain responsible for their own compliance with the
              EU AI Act and applicable national law.
            </p>
            <p>
              Questions about our posture?{" "}
              <a
                href="mailto:compliance@automatos.app"
                className="text-primary hover:underline"
              >
                compliance@automatos.app
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EuAiAct;
