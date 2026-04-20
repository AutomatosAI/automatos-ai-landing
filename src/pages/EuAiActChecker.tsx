import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/seo/SEO";
import {
  breadcrumbSchema,
  howToSchema,
  faqSchema,
} from "@/lib/seo/structured-data";
import {
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Ban,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

type RiskTier = "prohibited" | "high" | "limited" | "minimal";

interface Option {
  label: string;
  value: string;
  /** Tier this answer forces — takes precedence over later questions. */
  forces?: RiskTier;
  /** Articles this answer implicates. */
  articles?: string[];
  /** Implementation hint for the result page. */
  hint?: string;
}

interface Question {
  id: string;
  title: string;
  description: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    id: "domain",
    title: "What domain does your AI system operate in?",
    description:
      "Annex III of the EU AI Act lists domains that are automatically high-risk. Pick the closest match.",
    options: [
      {
        label: "Critical infrastructure (energy, water, transport, digital)",
        value: "critical-infra",
        forces: "high",
        articles: ["Art. 6", "Annex III §2"],
        hint: "Annex III §2 — systems used as safety components of critical infrastructure are classified high-risk.",
      },
      {
        label: "Employment, HR, recruiting, worker management",
        value: "hr",
        forces: "high",
        articles: ["Art. 6", "Annex III §4"],
        hint: "Annex III §4 — AI in recruitment, promotion, task allocation or monitoring of workers is high-risk.",
      },
      {
        label: "Education, admissions, or assessment of students",
        value: "education",
        forces: "high",
        articles: ["Art. 6", "Annex III §3"],
        hint: "Annex III §3 — AI used to determine access to education or evaluate learning outcomes is high-risk.",
      },
      {
        label: "Credit scoring, insurance, or essential private services",
        value: "finance",
        forces: "high",
        articles: ["Art. 6", "Annex III §5"],
        hint: "Annex III §5 — creditworthiness and risk assessment for essential services is high-risk.",
      },
      {
        label: "Law enforcement, migration, border control, justice",
        value: "law",
        forces: "high",
        articles: ["Art. 6", "Annex III §6–8"],
        hint: "Annex III §6–8 — law-enforcement, migration and judicial AI systems are high-risk.",
      },
      {
        label: "Healthcare, medical devices, or patient-facing diagnostics",
        value: "health",
        forces: "high",
        articles: ["Art. 6(1)(a)"],
        hint: "Safety component of a medical device → high-risk under Art. 6(1)(a).",
      },
      {
        label: "General business automation (marketing, support, ops)",
        value: "business",
        articles: ["Art. 50"],
      },
      {
        label: "Internal productivity / developer tooling",
        value: "internal",
      },
    ],
  },
  {
    id: "prohibited",
    title: "Does your system do any of the following?",
    description:
      "Article 5 lists practices that are banned outright. If any of these apply, the system cannot be deployed in the EU.",
    options: [
      {
        label: "Social scoring of individuals by public or private actors",
        value: "social-scoring",
        forces: "prohibited",
        articles: ["Art. 5(1)(c)"],
      },
      {
        label: "Manipulative techniques exploiting vulnerabilities",
        value: "manipulation",
        forces: "prohibited",
        articles: ["Art. 5(1)(a)–(b)"],
      },
      {
        label: "Real-time biometric identification in public spaces",
        value: "biometric",
        forces: "prohibited",
        articles: ["Art. 5(1)(h)"],
      },
      {
        label: "Emotion recognition at work or in education",
        value: "emotion",
        forces: "prohibited",
        articles: ["Art. 5(1)(f)"],
      },
      {
        label: "Predictive policing based solely on profiling",
        value: "predictive-policing",
        forces: "prohibited",
        articles: ["Art. 5(1)(d)"],
      },
      {
        label: "None of the above",
        value: "none",
      },
    ],
  },
  {
    id: "interaction",
    title: "How do end users interact with the system?",
    description:
      "Article 50 requires transparency when users interact with AI, receive AI-generated content, or could be misled.",
    options: [
      {
        label: "Users chat directly with an AI (chatbot, assistant, voicebot)",
        value: "direct-chat",
        forces: "limited",
        articles: ["Art. 50(1)"],
        hint: "Art. 50(1) — you must clearly inform users they are interacting with AI.",
      },
      {
        label: "AI generates content users consume (text, images, video)",
        value: "content-gen",
        forces: "limited",
        articles: ["Art. 50(2)", "Art. 50(4)"],
        hint: "Art. 50(2) + 50(4) — synthetic content must be machine-readable as AI-generated; deep-fakes must be labeled.",
      },
      {
        label: "AI runs in the background — no direct user-facing output",
        value: "background",
      },
      {
        label: "AI advises internal staff who then act on its recommendations",
        value: "internal-advice",
      },
    ],
  },
  {
    id: "data",
    title: "What kind of data does the system process?",
    description:
      "Article 10 sets data governance obligations for high-risk systems.",
    options: [
      {
        label: "Personal data of EU residents at scale",
        value: "pii",
        articles: ["Art. 10", "GDPR Art. 35"],
        hint: "Personal data at scale triggers Art. 10 data governance obligations and GDPR DPIA requirements.",
      },
      {
        label: "Special category data (health, biometric, political, etc.)",
        value: "special",
        articles: ["Art. 10(5)"],
        hint: "Special category data processing for bias mitigation is permitted under Art. 10(5) with strict safeguards.",
      },
      {
        label: "Anonymised or aggregate business data",
        value: "anonymised",
      },
      {
        label: "Public / synthetic data only",
        value: "public",
      },
    ],
  },
  {
    id: "oversight",
    title: "What level of human oversight exists over agent actions?",
    description:
      "Article 14 requires meaningful human oversight proportionate to the risk tier.",
    options: [
      {
        label: "Every material action is human-approved before execution",
        value: "approve-all",
        articles: ["Art. 14"],
      },
      {
        label: "Human-in-the-loop for high-stakes decisions only",
        value: "hitl-selective",
        articles: ["Art. 14"],
      },
      {
        label: "Human review after the fact (logs + audit)",
        value: "post-hoc",
        articles: ["Art. 14", "Art. 12"],
      },
      {
        label: "Fully autonomous — no human oversight today",
        value: "none",
        articles: ["Art. 14"],
        hint: "High-risk systems without human oversight cannot be deployed in the EU.",
      },
    ],
  },
];

const TIER_RANK: Record<RiskTier, number> = {
  prohibited: 4,
  high: 3,
  limited: 2,
  minimal: 1,
};

interface TierProfile {
  label: string;
  color: string;
  ring: string;
  Icon: typeof ShieldCheck;
  summary: string;
  obligations: string[];
  automatosFit: string;
}

const TIER_PROFILES: Record<RiskTier, TierProfile> = {
  prohibited: {
    label: "Prohibited",
    color: "text-red-500",
    ring: "ring-red-500/30 border-red-500/40 bg-red-500/5",
    Icon: Ban,
    summary:
      "Your described use case falls under Article 5 prohibited practices. This system cannot be placed on the market or put into service in the EU.",
    obligations: [
      "Redesign the use case to remove the prohibited practice.",
      "Document the decision trail for your compliance register.",
      "If the system is already deployed, plan withdrawal before 2 February 2025 (entry into force of Art. 5).",
    ],
    automatosFit:
      "Automatos AI blocks prohibited intents at the tool-router layer, so prohibited behaviours cannot be reached even if an agent prompt attempts them.",
  },
  high: {
    label: "High risk",
    color: "text-orange-500",
    ring: "ring-orange-500/30 border-orange-500/40 bg-orange-500/5",
    Icon: ShieldAlert,
    summary:
      "Your system is classified high-risk. It can be deployed in the EU, but you must meet the full Chapter III provider/deployer obligations before placing it on the market.",
    obligations: [
      "Implement a risk-management system (Art. 9) across the lifecycle.",
      "Enforce data governance, lineage and bias mitigation (Art. 10).",
      "Keep tamper-evident logs with appropriate retention (Art. 12).",
      "Publish transparency and user instructions (Art. 13).",
      "Design meaningful human oversight (Art. 14).",
      "Meet accuracy, robustness and cybersecurity requirements (Art. 15).",
      "Register the system in the EU database (Art. 71) before deployment.",
      "Report serious incidents within statutory timelines (Art. 73).",
    ],
    automatosFit:
      "Automatos AI ships the platform controls for every Chapter III article — risk tiering, tamper-evident logs, human approval flows, incident reporting — so the compliance work becomes configuration rather than implementation.",
  },
  limited: {
    label: "Limited risk",
    color: "text-yellow-500",
    ring: "ring-yellow-500/30 border-yellow-500/40 bg-yellow-500/5",
    Icon: ShieldCheck,
    summary:
      "Your system falls under the transparency obligations of Article 50. No conformity assessment is required, but users must be clearly informed when they interact with AI or consume AI-generated content.",
    obligations: [
      "Clearly disclose AI interaction to users (Art. 50(1)).",
      "Mark AI-generated content as machine-readable synthetic (Art. 50(2)).",
      "Label deep-fakes and image/audio/video AI output (Art. 50(4)).",
      "Maintain logs sufficient to demonstrate transparency compliance.",
    ],
    automatosFit:
      "Automatos AI adds the required AI-interaction markers and synthetic-content tagging to chatbot, voice and widget surfaces by default.",
  },
  minimal: {
    label: "Minimal risk",
    color: "text-emerald-500",
    ring: "ring-emerald-500/30 border-emerald-500/40 bg-emerald-500/5",
    Icon: CheckCircle2,
    summary:
      "Your system sits in the minimal-risk tier. The EU AI Act imposes no mandatory obligations, but voluntary codes of conduct (Art. 95) and general AI literacy (Art. 4) still apply.",
    obligations: [
      "Adopt a voluntary code of conduct (Art. 95) to demonstrate good practice.",
      "Ensure staff operating the AI have sufficient AI literacy (Art. 4).",
      "Keep basic records so you can demonstrate your classification if challenged.",
    ],
    automatosFit:
      "Even in the minimal-risk tier, Automatos AI ships the logging, provenance and literacy tooling you need to defend the classification if a regulator asks.",
  },
};

interface Result {
  tier: RiskTier;
  articles: string[];
  hints: string[];
}

function computeResult(
  answers: Record<string, string>,
): Result | null {
  const picked: Option[] = [];
  for (const q of QUESTIONS) {
    const val = answers[q.id];
    if (!val) return null;
    const opt = q.options.find((o) => o.value === val);
    if (opt) picked.push(opt);
  }
  let tier: RiskTier = "minimal";
  const articles = new Set<string>();
  const hints: string[] = [];
  for (const opt of picked) {
    if (opt.forces && TIER_RANK[opt.forces] > TIER_RANK[tier]) {
      tier = opt.forces;
    }
    for (const a of opt.articles || []) articles.add(a);
    if (opt.hint) hints.push(opt.hint);
  }
  return { tier, articles: Array.from(articles), hints };
}

const CHECKER_FAQS = [
  {
    question: "Is this a substitute for legal advice?",
    answer:
      "No. This is an educational tool to help you orient to the EU AI Act. Your final classification should be confirmed with qualified legal counsel.",
  },
  {
    question: "When does the EU AI Act apply?",
    answer:
      "The Act entered into force on 1 August 2024. Prohibited-practice rules apply from 2 February 2025. General-purpose AI rules apply from 2 August 2025. Most high-risk obligations apply from 2 August 2026.",
  },
  {
    question: "How does Automatos AI help with compliance?",
    answer:
      "Automatos AI ships Chapter III controls as platform primitives — risk tiering, tamper-evident logs, human approvals, incident reporting, transparency markers — so compliance is configuration, not custom implementation.",
  },
  {
    question: "Does this checker store my answers?",
    answer:
      "No. The checker runs entirely in your browser. Nothing is sent to a server.",
  },
];

const EuAiActChecker = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = useMemo(
    () => QUESTIONS.every((q) => !!answers[q.id]),
    [answers],
  );

  const result = useMemo(
    () => (submitted ? computeResult(answers) : null),
    [submitted, answers],
  );

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="EU AI Act Compliance Checker — Free Risk Classifier"
        description="Free 5-minute checker: classify your AI system under the EU AI Act (prohibited, high-risk, limited, minimal) and see which articles apply."
        path="/eu-ai-act/checker"
        structuredData={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "EU AI Act", url: "/eu-ai-act" },
            { name: "Compliance Checker", url: "/eu-ai-act/checker" },
          ]),
          howToSchema({
            name: "Classify your AI system under the EU AI Act",
            description:
              "A five-step questionnaire that returns your EU AI Act risk tier and the articles that apply.",
            steps: QUESTIONS.map((q) => ({
              name: q.title,
              text: q.description,
            })),
          }),
          faqSchema(CHECKER_FAQS),
        ]}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10 text-center space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Free tool</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              EU AI Act Compliance Checker
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Five questions. Get your risk tier, the articles that apply, and
              a concrete obligations checklist. No email required, nothing
              stored.
            </p>
          </motion.div>

          {!result && (
            <div className="space-y-6">
              {QUESTIONS.map((q, idx) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border border-border rounded-xl p-6 bg-card"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <Badge variant="secondary" className="shrink-0">
                      {idx + 1}
                    </Badge>
                    <div>
                      <h2 className="text-lg font-semibold">{q.title}</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {q.description}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {q.options.map((opt) => {
                      const active = answers[q.id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() =>
                            setAnswers((prev) => ({
                              ...prev,
                              [q.id]: opt.value,
                            }))
                          }
                          className={`text-left rounded-lg border p-3 text-sm transition-all ${
                            active
                              ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/40"
                              : "border-border hover:border-primary/40 hover:bg-muted/50"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}

              <div className="flex items-center justify-between gap-4 pt-4">
                <p className="text-xs text-muted-foreground">
                  {Object.keys(answers).length}/{QUESTIONS.length} answered.
                  Runs locally in your browser.
                </p>
                <Button
                  size="lg"
                  disabled={!allAnswered}
                  onClick={() => {
                    setSubmitted(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Get my classification
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {result && (
            <ResultPanel result={result} onReset={reset} />
          )}
        </section>

        <section className="container mx-auto px-4 max-w-3xl mt-16">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/40 border border-border text-sm text-muted-foreground">
            <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <p>
              This checker is educational. It is not legal advice and does not
              replace a full conformity assessment under the EU AI Act.
              Classifications are indicative based on the answers given.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

interface ResultPanelProps {
  result: Result;
  onReset: () => void;
}

const ResultPanel = ({ result, onReset }: ResultPanelProps) => {
  const profile = TIER_PROFILES[result.tier];
  const Icon = profile.Icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className={`rounded-xl border p-8 ring-1 ${profile.ring}`}>
        <div className="flex items-start gap-4">
          <Icon className={`w-10 h-10 shrink-0 ${profile.color}`} />
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Risk tier
            </p>
            <h2 className={`text-3xl font-bold ${profile.color}`}>
              {profile.label}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {profile.summary}
            </p>
          </div>
        </div>
      </div>

      {result.articles.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Articles to review
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.articles.map((a) => (
              <Badge key={a} variant="outline" className="text-sm">
                {a}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Your obligations checklist
        </h3>
        <ul className="space-y-2">
          {profile.obligations.map((o) => (
            <li key={o} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </div>

      {result.hints.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Why you landed here
          </h3>
          <ul className="space-y-2">
            {result.hints.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
          How Automatos AI helps
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {profile.automatosFit}
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/eu-ai-act">See the full compliance map</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">Talk to us about your deployment</Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <Button variant="ghost" onClick={onReset}>
          <RotateCcw className="w-4 h-4 mr-1" />
          Start over
        </Button>
        <p className="text-xs text-muted-foreground">
          Not legal advice. Confirm with qualified counsel.
        </p>
      </div>
    </motion.div>
  );
};

export default EuAiActChecker;
