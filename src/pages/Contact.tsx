import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
    return (
        <div className="min-h-screen bg-background">
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
                                            <a href="mailto:hello@automatos.ai" className="text-muted-foreground hover:text-primary transition-colors">
                                                hello@automatos.ai
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">Visit Us</p>
                                            <p className="text-muted-foreground">
                                                123 Innovation Drive,<br />
                                                Tech Valley, CA 94043
                                            </p>
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

                            <form className="space-y-6 relative z-10">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="first-name" className="text-sm font-medium">First name</label>
                                        <Input id="first-name" placeholder="Jane" className="bg-background/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="last-name" className="text-sm font-medium">Last name</label>
                                        <Input id="last-name" placeholder="Doe" className="bg-background/50" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <Input id="email" type="email" placeholder="jane@example.com" className="bg-background/50" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us about your project..."
                                        className="min-h-[120px] bg-background/50 resize-none"
                                    />
                                </div>

                                <Button type="submit" size="lg" className="w-full rounded-full bg-primary hover:bg-primary/90">
                                    Send Message <Send className="w-4 h-4 ml-2" />
                                </Button>
                            </form>
                        </motion.div>

                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
