import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const Cookies = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
                    <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-muted-foreground">
                        <p>Last updated: {new Date().toLocaleDateString()}</p>

                        <h2 className="text-2xl font-semibold text-foreground">1. What Are Cookies</h2>
                        <p>
                            Cookies are small text files that are properly stored on your computer or mobile device when you visit a website. They allow the website to remember your actions and preferences over a period of time.
                        </p>

                        <h2 className="text-2xl font-semibold text-foreground">2. How We Use Cookies</h2>
                        <p>
                            We use cookies to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Analyze our traffic and site performance.</li>
                            <li>Recognize you when you return to our website.</li>
                            <li>Personalize content and provide relevant advertising.</li>
                            <li>Enable certain functions of the Services.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-foreground">3. Promoting Safety and Security</h2>
                        <p>
                            We use cookies to help us keep your account, data, and the Automatos AI Services safe and secure.
                        </p>

                        <h2 className="text-2xl font-semibold text-foreground">4. Analytics and Advertising</h2>
                        <p>
                            We may use third-party analytics services to help us understand how users engage with our Services. These third parties may use cookies and similar technologies to collect information about your use of the Services and other websites and applications.
                        </p>

                        <h2 className="text-2xl font-semibold text-foreground">5. Your Choices</h2>
                        <p>
                            Most web browsers are set to accept cookies by default. You can usually choose to set your browser to remove or reject browser cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our Services.
                        </p>

                        <h2 className="text-2xl font-semibold text-foreground">6. Contact Us</h2>
                        <p>
                            If you have any questions about our use of cookies, please contact us at: <a href="mailto:privacy@automatos.ai" className="text-primary hover:underline">privacy@automatos.ai</a>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Cookies;
