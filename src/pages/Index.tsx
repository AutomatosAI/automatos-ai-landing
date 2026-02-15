import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ToolsSection } from "@/components/sections/ToolsSection";
import { MetricsSection } from "@/components/sections/MetricsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SupportSection } from "@/components/sections/SupportSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { IntegrationsSection } from "@/components/sections/IntegrationsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { VideoSection } from "@/components/sections/VideoSection";
import { WaitlistSection } from "@/components/sections/WaitlistSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <VideoSection />
        <SolutionsSection />
        <HowItWorksSection />
        <IndustriesSection />
        <ToolsSection />
        <MetricsSection />
        <TestimonialsSection />
        <SupportSection />
        <PricingSection />
        <IntegrationsSection />
        <FAQSection />
        <WaitlistSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
