import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

const Terms = () => {
    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Terms of Service"
                description="Automatos AI terms of service governing use of the platform."
                path="/terms"
                structuredData={[
                    breadcrumbSchema([
                        { name: "Home", url: "/" },
                        { name: "Terms of Service", url: "/terms" },
                    ]),
                ]}
            />
            <Navbar />
            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                    <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-muted-foreground">
                        <p>Last updated: 20 October 2026</p>

                        <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
                        <p>
                            Welcome to Automatos AI ("we," "our," or "us"). By accessing or using our website, services, and software (collectively, the "Services"), you agree to be bound by these Terms of Service.
                        </p>

                        <h2 className="text-2xl font-semibold text-foreground">2. Use of Services</h2>
                        <p>
                            You agree to use our Services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                        </p>

                        <h2 className="text-2xl font-semibold text-foreground">3. Intellectual Property</h2>
                        <p>
                            The Services and their original content, features, and functionality are owned by Automatos AI and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                        </p>

                        <h2 className="text-2xl font-semibold text-foreground">4. AI Notices and Your Duties</h2>
                        <p>
                            Parts of the Services are AI systems. Where the Services show people a notice that they are dealing with an AI, or add a machine-readable mark to content they generate, you must not remove, hide or alter that notice or mark. Where the Services let you reword a notice, you may do so only within the limits they set.
                        </p>
                        <p>
                            Where you use the Services as a deployer under the EU AI Act (Regulation (EU) 2024/1689), the deployer's duties under Article 50 are yours. They include disclosing deep fakes, and AI-generated or manipulated text you publish to inform the public on matters of public interest, where Article 50(4) requires it; and informing the people exposed to any emotion recognition or biometric categorisation system you operate, as Article 50(3) requires.
                        </p>
                        <p>
                            The Services may offer tools that help with these duties, such as AI labels and settings. Automatos AI offers them as help only: it does not take on your duties, and using the tools does not make them ours.
                        </p>

                        <h2 className="text-2xl font-semibold text-foreground">5. Limitation of Liability</h2>
                        <p>
                            In no event shall Automatos AI, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                        </p>

                        <h2 className="text-2xl font-semibold text-foreground">6. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
                        </p>

                        <h2 className="text-2xl font-semibold text-foreground">7. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at: <a href="mailto:legal@automatos.app" className="text-primary hover:underline">legal@automatos.app</a>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Terms;
