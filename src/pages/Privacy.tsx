import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                    <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-muted-foreground">
                        <p>Last updated: {new Date().toLocaleDateString()}</p>

                        <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
                        <p>
                            We collect information you provide directly to us when you use our Services, create an account, or communicate with us. This may include your name, email address, and any other information you choose to provide.
                        </p>

                        <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
                        <p>
                            We use the information we collect to provide, maintain, and improve our Services, to process your transactions, to send you related information, and to communicate with you about products, services, offers, and events.
                        </p>

                        <h2 className="text-2xl font-semibold text-foreground">3. Information Sharing</h2>
                        <p>
                            We do not share your personal information with third parties except as described in this policy or with your consent. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
                        </p>

                        <h2 className="text-2xl font-semibold text-foreground">4. Data Security</h2>
                        <p>
                            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
                        </p>

                        <h2 className="text-2xl font-semibold text-foreground">5. Your Choices</h2>
                        <p>
                            You may update, correct, or delete information about you at any time by logging into your online account or emailing us. You may also opt out of receiving promotional communications from us.
                        </p>

                        <h2 className="text-2xl font-semibold text-foreground">6. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@automatos.ai" className="text-primary hover:underline">privacy@automatos.ai</a>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Privacy;
