import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { SEO } from "@/components/seo/SEO";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

type FormStatus = "idle" | "sending" | "success" | "error";

const Contact = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        setErrorMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, email, message }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setStatus("success");
            setFirstName("");
            setLastName("");
            setEmail("");
            setMessage("");
        } catch (err) {
            setStatus("error");
            setErrorMessage(err instanceof Error ? err.message : "Failed to send message");
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Contact"
                description="Get in touch with the Automatos AI team. Pilots, partnerships, support and press inquiries for the AI digital workforce platform."
                path="/contact"
                structuredData={[
                    breadcrumbSchema([
                        { name: "Home", url: "/" },
                        { name: "Contact", url: "/contact" },
                    ]),
                ]}
            />
            <Navbar />
            <main className="pt-24 pb-16">
                {/* Header Section */}
                <section className="container mx-auto px-4 max-w-7xl mb-16">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                                <MessageSquare className="w-4 h-4" />
                                <span>Get in Touch</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                                Let's <span className="text-primary">[Elevate]</span> Your Workflow
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                        >
                            Reach out to explore how our AI solutions can streamline, scale, and strengthen your operations.
                        </motion.p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="container mx-auto px-4 max-w-7xl">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">

                        {/* Left Column: Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-10"
                        >
                            <div className="bg-card border border-border rounded-3xl p-8 space-y-8 shadow-sm">
                                <div>
                                    <h3 className="text-2xl font-semibold mb-2">Contact Information</h3>
                                    <p className="text-muted-foreground">
                                        Have a question or need support? We're here to help.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">Email Us</p>
                                            <a href="mailto:Gerard@automatos.app" className="text-muted-foreground hover:text-primary transition-colors">
                                                Gerard@automatos.app
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">Call Us</p>
                                            <a href="tel:+447970433737" className="text-muted-foreground hover:text-primary transition-colors">
                                                +44 7970 433737
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-border">
                                    <p className="text-sm text-muted-foreground mb-4">Follow us for updates</p>
                                    <div className="flex gap-4">
                                        {[
                                            { name: "X (Twitter)", href: "https://x.com/automatosai" },
                                            { name: "Instagram", href: "https://www.instagram.com/automatosai" },
                                            { name: "LinkedIn", href: "https://www.linkedin.com/company/automatos-ai" },
                                            { name: "GitHub", href: "https://github.com/AutomatosAI/automatos-ai" },
                                        ].map((social) => (
                                            <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors text-sm font-medium">
                                                {social.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-card border border-border rounded-3xl p-8 shadow-sm relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                            <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>

                            {status === "success" ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                                    <CheckCircle className="w-12 h-12 text-green-500" />
                                    <h4 className="text-xl font-semibold">Message Sent</h4>
                                    <p className="text-muted-foreground">We'll get back to you as soon as possible.</p>
                                    <Button
                                        variant="outline"
                                        onClick={() => setStatus("idle")}
                                        className="mt-4 rounded-full"
                                    >
                                        Send Another Message
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="first-name" className="text-sm font-medium">First name</label>
                                            <Input
                                                id="first-name"
                                                placeholder="Jane"
                                                className="bg-background/50"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="last-name" className="text-sm font-medium">Last name</label>
                                            <Input
                                                id="last-name"
                                                placeholder="Doe"
                                                className="bg-background/50"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="jane@example.com"
                                            className="bg-background/50"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">Message</label>
                                        <Textarea
                                            id="message"
                                            placeholder="Tell us about your project..."
                                            className="min-h-[120px] bg-background/50 resize-none"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {status === "error" && (
                                        <div className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            <span>{errorMessage}</span>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full rounded-full bg-primary hover:bg-primary/90"
                                        disabled={status === "sending"}
                                    >
                                        {status === "sending" ? "Sending..." : "Send Message"}
                                        <Send className="w-4 h-4 ml-2" />
                                    </Button>
                                </form>
                            )}
                        </motion.div>

                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
