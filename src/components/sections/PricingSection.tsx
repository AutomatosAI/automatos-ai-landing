import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { GITHUB_URL, SIGN_IN_URL } from "@/lib/links";
import { SectionEyebrow } from "./SectionEyebrow";

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
    price: null,
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

/* Three ways to run Automatos Studio. */
const editions = [
  {
    name: "Local",
    badge: "OPEN SOURCE",
    badgeClass: "text-accent",
    text: "Free, on your own machine, Apache-2.0. Agents work on your own Claude Code or other CLI subscription.",
    cta: "Get it on GitHub",
    href: GITHUB_URL,
  },
  {
    name: "SaaS",
    badge: "LIVE",
    badgeClass: "text-olive",
    text: "Hosted Automatos Studio. Nothing to install: sign in, upload your logo and tell Auto what you need.",
    cta: "Sign in",
    href: SIGN_IN_URL,
  },
  {
    name: "Enterprise",
    badge: "COMING",
    badgeClass: "text-muted-foreground",
    text: "The same OS in your own Kubernetes cluster, with single sign-on, cloud plugins and monitoring.",
    cta: "Talk to us",
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
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="scroll-mt-16 border-t border-border">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-4 py-24 sm:px-8">
        <div className="flex flex-col items-center gap-3.5 text-center">
          <SectionEyebrow n="05" label="Plans" />
          <h2 className="m-0 text-4xl font-medium leading-[1.05] sm:text-5xl">
            Local, SaaS or Enterprise. <em className="font-normal">One Studio.</em>
          </h2>
          <p className="m-0 max-w-[680px] text-[17px] leading-relaxed text-muted-foreground">
            Run it free on your own machine, use the hosted SaaS, or put it in your own cluster. On SaaS there are no
            seats and no tokens to count.
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

        <div className="flex items-center justify-center gap-3.5 text-sm">
          <span className={isYearly ? "text-muted-foreground" : "text-foreground"}>Monthly</span>
          <button
            type="button"
            role="switch"
            aria-checked={isYearly}
            aria-label="Bill yearly"
            onClick={() => setIsYearly((y) => !y)}
            className={cn("relative h-7 w-14 rounded-full transition-colors", isYearly ? "bg-foreground" : "bg-muted")}
          >
            <span
              className={cn(
                "absolute top-1 h-5 w-5 rounded-full bg-white transition-[left] duration-200",
                isYearly ? "left-8" : "left-1",
              )}
            />
          </button>
          <span className={isYearly ? "text-foreground" : "text-muted-foreground"}>Yearly (20% off)</span>
        </div>

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
                  Most people start here
                </span>
              )}
              <div className="flex flex-col gap-1.5">
                <span className="text-sm text-muted-foreground">{plan.name}</span>
                <span className="flex items-baseline gap-1">
                  <span className="font-serif text-[46px] leading-none">
                    {plan.price ? `€${isYearly ? plan.price.yearly : plan.price.monthly}` : "Custom"}
                  </span>
                  {plan.price && <span className="text-muted-foreground">/month</span>}
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
      </div>
    </section>
  );
};
