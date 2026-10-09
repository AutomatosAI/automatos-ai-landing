import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { ProductTour } from "@/components/sections/home/ProductTour";
import { WhoItsFor } from "@/components/sections/home/WhoItsFor";
import { OsUnderneath } from "@/components/sections/home/OsUnderneath";
import { ApprovalsSection } from "@/components/sections/home/ApprovalsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { HOME_FAQS } from "@/components/sections/faqs";
import { CTASection } from "@/components/sections/CTASection";
import { SEO } from "@/components/seo/SEO";
import {
  organizationSchema,
  websiteSchema,
  softwareApplicationSchema,
  faqSchema,
} from "@/lib/seo/structured-data";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        path="/"
        structuredData={[
          organizationSchema(),
          websiteSchema(),
          softwareApplicationSchema(),
          faqSchema(HOME_FAQS),
        ]}
      />
      <Navbar />
      <main>
        <HomeHero />
        <WhoItsFor />
        <ProductTour />
        <OsUnderneath />
        <ApprovalsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
