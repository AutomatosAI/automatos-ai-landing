import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Personal",
    price: { monthly: 29, yearly: 24 },
    description: "Perfect for individuals automating daily tasks.",
    features: [
      { name: "Automatos RAG", included: true },
      { name: "Automatos Memory", included: true },
      { name: "Automatos Agents (Limted)", included: true },
      { name: "Automatos CodeGraph", included: false },
      { name: "Automatos NL2SQL", included: false },
    ],
    cta: "Join Waitlist",
    href: "#waitlist",
    popular: false,
  },
  {
    name: "Business",
    price: { monthly: 99, yearly: 79 },
    description: "For small teams building a digital workforce.",
    features: [
      { name: "Automatos RAG", included: true },
      { name: "Automatos Memory", included: true },
      { name: "Automatos Agents (Unlimited)", included: true },
      { name: "Automatos CodeGraph", included: true },
      { name: "Automatos NL2SQL", included: true },
    ],
    cta: "Join Waitlist",
    href: "#waitlist",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: "Custom", yearly: "Custom" },
    description: "Full-scale orchestration for large organizations.",
    features: [
      { name: "Automatos RAG", included: true },
      { name: "Automatos Memory", included: true },
      { name: "Automatos Agents", included: true },
      { name: "Automatos CodeGraph", included: true },
      { name: "Source Code License", included: true },
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
];

const steps = [
  { title: "Select", description: "Choose the package that fits your business goals." },
  { title: "Connect", description: "Share your project requirements so our team can tailor the solution." },
  { title: "Activate", description: "Get access to your package and start benefiting from our AI solutions." },
];

export const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">08</span>
          <span className="text-muted-foreground text-sm">Packages & Pricing</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Plans Designed for Every Stage
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're just starting out or ready to scale, our packages give you clear options without the confusion. Choose what fits your goals, and know exactly what you're getting.
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
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">{index + 1}</span>
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
              className={`relative bg-card border rounded-2xl p-8 ${plan.popular ? "border-primary shadow-lg shadow-primary/10" : "border-border"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
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
                      <Check className="w-5 h-5 text-primary" />
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
