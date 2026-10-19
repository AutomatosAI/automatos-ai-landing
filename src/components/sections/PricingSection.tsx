import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { GITHUB_URL } from "@/lib/links";
import { SectionEyebrow } from "./SectionEyebrow";

/*
  Tiers map to the platform's plan keys basic / pro / business, shown as Own keys / Pro / Business.
  Own keys $9, Pro $29 and Business $99 a month; Enterprise coming soon. Beta pricing: not charged until billing opens.
  Copy is the facts sheet's standard block (19 Oct 2026). Own keys and Pro are the same service: never give
  Own keys fewer seats, agents, render minutes or features than Pro. The only difference is included credits.
*/
const plans = [
  {
    name: "Own keys",
    price: { monthly: 9 },
    description: "Everything in Pro, on your own Anthropic, OpenAI or OpenRouter keys. Your provider bills you for the AI.",
    features: [
      { name: "5 seats, 20 agents", included: true },
      { name: "60 minutes of video render a month", included: true },
    ],
    cta: "Join the waitlist",
    href: "#waitlist",
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 29 },
    description: "With monthly AI credits included, so you don't need keys of your own.",
    features: [
      { name: "5 seats, 20 agents", included: true },
      { name: "60 minutes of video render a month", included: true },
      { name: "Monthly AI credits included once billing opens", included: true },
    ],
    cta: "Join the waitlist",
    href: "#waitlist",
    popular: true,
  },
  {
    name: "Business",
    price: { monthly: 99 },
    description: "By invite during the beta: contact Automatos.",
    features: [
      { name: "25 seats, unlimited agents", included: true },
      { name: "240 minutes of video render a month", included: true },
      { name: "Voice", included: true },
      { name: "A larger monthly credit allowance once billing opens", included: true },
    ],
    cta: "Contact Automatos",
    href: "/contact",
    popular: false,
  },
];

/* Three ways to run Automatos Studio. */
const editions = [
  {
    name: "Local",
    badge: "OPEN SOURCE",
    badgeClass: "text-accent",
    text: "Free and open source (Apache 2.0), on your own machine today. It runs on your own keys or your Claude Code / CLI subscription.",
    cta: "Get it on GitHub",
    href: GITHUB_URL,
  },
  {
    name: "SaaS",
    badge: "BETA OPENS NOV 2026",
    badgeClass: "text-olive",
    text: "Hosted beta opens November 2026. Nothing to install: when your workspace opens, upload your logo and tell Auto what you need.",
    cta: "Join the waitlist",
    href: "#waitlist",
  },
  {
    name: "Enterprise",
    badge: "COMING SOON",
    badgeClass: "text-muted-foreground",
    text: "The same OS in your own cluster, with a licence, committed credits and consultancy. We're building it now. Tell us what you need.",
    cta: "Contact Automatos",
    href: "/contact",
  },
];

/* Internal routes go through the router, #anchors stay on the page, everything else opens in a new tab. */
const SmartLink = ({ href, className, children }: { href: string; className: string; children: ReactNode }) => {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  const external = !href.startsWith("#");
  return (
    <a
      href={href}
      className={className}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
};

export const PricingSection = () => {
  return (
    <section id="pricing" className="scroll-mt-16 border-t border-border">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-4 py-24 sm:px-8">
        <div className="flex flex-col items-center gap-3.5 text-center">
          <SectionEyebrow n="05" label="Plans" />
          <h2 className="m-0 text-4xl font-medium leading-[1.05] sm:text-5xl">
            Local, SaaS or Enterprise. <em className="font-normal">One Studio.</em>
          </h2>
          <p className="m-0 max-w-[680px] text-[17px] leading-relaxed text-muted-foreground">
            Run it free on your own machine today, or join the waitlist for hosted Studio: the beta opens November 2026.
            Enterprise in your own cluster is coming soon.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {editions.map((e) => (
            <div key={e.name} className="flex flex-col gap-2.5 rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="font-serif text-[26px]">{e.name}</span>
                <span className={cn("rounded-md bg-secondary px-2 py-[3px] font-mono text-[11px] tracking-[0.06em]", e.badgeClass)}>
                  {e.badge}
                </span>
              </div>
              <span className="text-[14.5px] leading-normal text-muted-foreground">{e.text}</span>
              <SmartLink href={e.href} className="mt-auto text-sm font-medium text-foreground hover:text-accent">
                {e.cta} →
              </SmartLink>
            </div>
          ))}
        </div>

        {/* Facts sheet 8b: the optional every-plan line; no widgets, AI-media accounts or custom development per tier. */}
        <p className="mx-auto max-w-[760px] text-center text-[15px] leading-relaxed text-foreground">
          Every plan: branded documents and templates, socials on five networks, and the marketplace's packages,
          Playbooks and plugins.
        </p>

        <div className="grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col gap-[18px] rounded-[18px] border bg-card p-8",
                plan.popular ? "border-foreground" : "border-border",
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  Recommended
                </span>
              )}
              <div className="flex flex-col gap-1.5">
                <span className="text-sm text-muted-foreground">{plan.name}</span>
                <span className="flex items-baseline gap-1">
                  <span className="font-serif text-[46px] leading-none">
                    {`$${plan.price.monthly}`}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </span>
                <span className="text-sm leading-normal text-muted-foreground">{plan.description}</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {plan.features.map((f) => (
                  <span key={f.name} className={cn("flex gap-2.5 text-[14.5px]", f.included ? "" : "opacity-45")}>
                    <span className={f.included ? "text-olive" : "text-muted-foreground"}>{f.included ? "✓" : "×"}</span>
                    {f.name}
                  </span>
                ))}
              </div>
              <SmartLink
                href={plan.href}
                className={cn(
                  "mt-auto rounded-full p-3 text-center text-[14.5px] font-medium transition-colors",
                  plan.popular ? "bg-foreground text-background hover:bg-foreground/90" : "bg-muted text-foreground hover:bg-muted/80",
                )}
              >
                {plan.cta} →
              </SmartLink>
            </div>
          ))}
        </div>

        <p className="mx-auto max-w-[760px] text-center text-sm leading-relaxed text-muted-foreground">
          New accounts start with a one-time 500-credit trial. A credit is one US cent of AI usage at Automatos prices.
          Beta pricing: not charged until billing opens. During the beta every plan runs on the trial and then on your own
          AI keys; monthly credits on Pro and Business start when billing opens. The local edition is free and open source
          (Apache 2.0), on your own keys or your Claude Code / CLI subscription.
        </p>
      </div>
    </section>
  );
};
