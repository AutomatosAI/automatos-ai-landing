import { motion, useReducedMotion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState, useRef, type ReactNode } from "react";
import { Clerk } from "@clerk/clerk-js";
import { SectionEyebrow } from "./SectionEyebrow";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

type CTASectionProps = {
  heading?: ReactNode;
  subheading?: string;
  eyebrowNumber?: string;
  eyebrowLabel?: string;
  showEyebrow?: boolean;
};

const defaultHeading = (
  <>
    Your brand, <em className="font-normal">run by a team you can see.</em>
  </>
);

export const CTASection = ({
  heading = defaultHeading,
  subheading = "Join the waitlist. When your workspace opens, upload a logo and tell Auto what you need.",
  eyebrowNumber = "11",
  eyebrowLabel = "Get started",
  showEyebrow = false,
}: CTASectionProps = {}) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clerkRef = useRef<Clerk | null>(null);
  const reduced = useReducedMotion();

  const getClerk = async () => {
    if (clerkRef.current) return clerkRef.current;
    if (!clerkPubKey) throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
    const clerk = new Clerk(clerkPubKey);
    await clerk.load();
    clerkRef.current = clerk;
    return clerk;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      const clerk = await getClerk();
      await clerk.joinWaitlist({ emailAddress: email });
      setSubmitted(true);
      setEmail("");
    } catch (err: unknown) {
      console.error("Waitlist error:", err);
      // Clerk errors carry a user-facing `errors` array; anything else (config, network) stays in the console.
      const e = err as { errors?: { longMessage?: string; message?: string }[] };
      const msg = e.errors?.[0]?.longMessage || e.errors?.[0]?.message || "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="waitlist" className="mx-auto max-w-[1280px] scroll-mt-16 px-4 pb-24 pt-6 sm:px-8">
      {showEyebrow && (
        <div className="mb-6">
          <SectionEyebrow n={eyebrowNumber} label={eyebrowLabel} />
        </div>
      )}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-5 rounded-[22px] border border-border bg-card px-6 py-14 text-center sm:px-12 sm:py-[72px]"
      >
        <h2 className="m-0 text-4xl font-medium leading-[1.05] sm:text-[54px]">{heading}</h2>
        <p className="m-0 max-w-[600px] text-[17px] text-muted-foreground">{subheading}</p>

        {submitted ? (
          <span className="font-serif text-[26px] text-olive" role="status">
            You're on the list. We'll email you when it's your turn.
          </span>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-[460px] flex-col gap-2.5 sm:flex-row">
            <input
              type="email"
              required
              aria-label="Email address"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="flex-1 rounded-full border border-border bg-secondary px-5 py-[13px] text-[15px] text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-primary px-[22px] py-[13px] text-[15px] font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Joining…
                </>
              ) : (
                "Join waitlist →"
              )}
            </button>
          </form>
        )}

        {error && (
          <p className="m-0 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        <span className="text-[12.5px] text-muted-foreground">No spam. We'll only email you when it's your turn.</span>
      </motion.div>
    </section>
  );
};
