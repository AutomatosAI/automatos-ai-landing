import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";

/* Tiers mirror the platform's config (basic / pro / business). Prices are placeholders: Gerard's call. */
const plans = [
  {
    name: "Basic",
    price: { monthly: 29, yearly: 24 },
    description: "One person, one brand, the paperwork and the feed handled.",
    features: [
      { name: "Auto plus the starter agents", included: true },
      { name: "Branded documents and templates", included: true },
      { name: "Socials on all five channels", included: true },
      { name: "10 minutes of video render a month", included: true },
      { name: "Marketplace packages", included: false },
    ],
    cta: "Join the waitlist",
    href: "#waitlist",
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 99, yearly: 79 },
    description: "A small team. More agents, more channels, packages from the marketplace.",
    features: [
      { name: "Everything in Basic", included: true },
      { name: "Marketplace packages and playbooks", included: true },
      { name: "60 minutes of video render a month", included: true },
      { name: "Your own AI media accounts, capped", included: true },
      { name: "Widgets for your site or store", included: true },
    ],
    cta: "Join the waitlist",
    href: "#waitlist",
    popular: true,
  },
  {
    name: "Business",
    price: { monthly: "Custom", yearly: "Custom" },
    description: "Several brands or sites, roles, and the option to run it on your own servers.",
    features: [
      { name: "Everything in Pro", included: true },
      { name: "240 minutes of video render a month", included: true },
      { name: "Roles and approvals per team", included: true },
      { name: "Self-hosted or local edition support", included: true },
      { name: "Source code licence", included: true },
    ],
    cta: "Talk to us",
    href: "/contact",
    popular: false,
  },
];

const steps = [
  { title: "Sign in", description: "Create a workspace. Upload your logo and the kit fills itself in." },
  { title: "Connect", description: "Link the accounts you already use: mail, calendar, Shopify, LinkedIn." },
  { title: "Tell Auto", description: "Ask for an invoice, a plan, a brand board. Approve what comes back." },
];

export const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-accent font-mono text-sm">08</span>
          <span className="text-muted-foreground text-sm">Plans</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4">
            One price. <span className="brand-line">No seats, no tokens to count.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Agents run on your own accounts and subscriptions where they can. What you pay us for is the platform, the renders and the support.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-mono">{index + 1}</span>
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm ${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-14 h-7 rounded-full transition-colors ${isYearly ? "bg-primary" : "bg-muted"
              }`}
          >
            <motion.div
              animate={{ x: isYearly ? 28 : 4 }}
              className="absolute top-1 w-5 h-5 bg-white rounded-full shadow"
            />
          </button>
          <span className={`text-sm ${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            Yearly (20% off)
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-card border rounded-2xl p-8 ${plan.popular ? "border-foreground" : "border-border"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most people start here
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-sm text-muted-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    {/* @ts-ignore */}
                    {typeof plan.price.monthly === 'number' ? `$${isYearly ? plan.price.yearly : plan.price.monthly}` : plan.price.monthly}
                  </span>
                  {/* @ts-ignore */}
                  {typeof plan.price.monthly === 'number' && <span className="text-muted-foreground">/month</span>}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.name} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-olive" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/30" />
                    )}
                    <span className={feature.included ? "text-foreground" : "text-muted-foreground/50"}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.href.startsWith("/") ? (
                <Link to={plan.href} className="w-full">
                  <Button
                    className={`w-full rounded-full ${plan.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                      }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : plan.href.startsWith("#") ? (
                <a href={plan.href} className="w-full">
                  <Button
                    className={`w-full rounded-full ${plan.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                      }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              ) : (
                <a href={plan.href} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button
                    className={`w-full rounded-full ${plan.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                      }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
