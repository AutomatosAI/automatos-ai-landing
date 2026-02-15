import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { Clerk } from "@clerk/clerk-js";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export const CTASection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clerkRef = useRef<Clerk | null>(null);

  const getClerk = async () => {
    if (clerkRef.current) return clerkRef.current;
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
      await clerk.client?.signUp.create({ emailAddress: email });
      await clerk.client?.signUp.prepareEmailAddressVerification?.({ strategy: "email_code" });
      setSubmitted(true);
      setEmail("");
    } catch (err: any) {
      // If waitlist mode is active, Clerk may auto-add to waitlist
      const msg = err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "";
      if (msg.toLowerCase().includes("waitlist")) {
        setSubmitted(true);
        setEmail("");
        return;
      }
      // Try joinWaitlist as fallback
      try {
        const clerk = await getClerk();
        await clerk.joinWaitlist({ emailAddress: email });
        setSubmitted(true);
        setEmail("");
      } catch (innerErr: any) {
        const innerMsg = innerErr.errors?.[0]?.longMessage || innerErr.errors?.[0]?.message || "Something went wrong. Please try again.";
        setError(innerMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">11</span>
          <span className="text-muted-foreground text-sm">AI That Drives Impact</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-primary/20 rounded-2xl p-8 lg:p-16 text-center"
        >
          {!submitted ? (
            <>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Automate Your Success?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Join the future of work with Automatos. Start building your autonomous workforce today.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 w-full sm:w-auto px-5 py-3 rounded-full bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  className="rounded-full px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              {error && (
                <p className="text-sm text-red-400 mt-3">{error}</p>
              )}

              <p className="text-xs text-muted-foreground mt-4">
                No spam. We'll only email you when it's your turn.
              </p>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="py-4"
            >
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">You're on the list!</h2>
              <p className="text-muted-foreground text-lg">
                We'll be in touch soon. Thanks for your interest in Automatos.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
