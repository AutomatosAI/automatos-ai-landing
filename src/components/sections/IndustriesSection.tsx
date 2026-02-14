import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Stethoscope, Building2, ShoppingCart, Megaphone, GraduationCap, Code } from "lucide-react";
import { UseCasePill } from "@/components/ui/use-case-pill";

const industries = [
  {
    id: "personal-assistant",
    label: "Personal Assistant",
    icon: Stethoscope,
    logos: ["/logos/Gmail.png", "/logos/GoogleCalendar.png", "/logos/Zoom.png"],
    image: "/images/use-cases/personal-assistant.jpg",
    features: [
      "Calendar Management",
      "Email Organization",
      "Meeting Summaries",
      "Priority Reminders",
    ],
    modules: "Modules: Memory + Tools + Agents",
  },
  {
    id: "customer-support",
    label: "Customer Support",
    icon: Megaphone,
    logos: ["/logos/Zendesk.png", "/logos/Intercom.png", "/logos/Salesforce.png"],
    image: "/images/use-cases/customer-support.jpg",
    features: [
      "24/7 Inquiry Handling",
      "Order Information Lookup",
      "FAQ Resolution",
      "Smart Escalation",
    ],
    modules: "Modules: RAG + Agents + Integrations",
  },
  {
    id: "accounting",
    label: "Accounting & Invoice",
    icon: Building2,
    logos: ["/logos/Xero.png", "/logos/Quickbooks.png", "/logos/Stripe.png"],
    image: "/images/use-cases/accounting.png",
    features: [
      "Invoice Recognition",
      "Data Extraction",
      "Purchase Order Review",
      "Transaction Logging",
    ],
    modules: "Modules: OCR + Agents + Database",
  },
  {
    id: "social-media",
    label: "Social Media Manager",
    icon: ShoppingCart, // Corrected icon mapping in next step if needed, keeping simple for now
    logos: ["/logos/Linkedin.png", "/logos/X.png", "/logos/Youtube.png"],
    image: "/images/use-cases/social-media.jpg",
    features: [
      "Trend Analysis",
      "Content Creation (Graphics/Video)",
      "Optimal Scheduling",
      "Performance Analytics",
    ],
    modules: "Modules: Content Gen + Analytics",
  },
  {
    id: "ecommerce",
    label: "E-commerce Manager",
    icon: ShoppingCart,
    logos: ["/logos/Shopify.png", "/logos/Woocommerce.png", "/logos/PayPal.png"],
    image: "/images/use-cases/ecommerce.jpg",
    features: [
      "Inventory Monitoring",
      "Product Descriptions",
      "Sales Analysis",
      "Customer Follow-ups",
    ],
    modules: "Modules: Data Analysis + Agents",
  },
  {
    id: "developer",
    label: "Develop & Engineer",
    icon: Code,
    logos: ["/logos/GitHub.png", "/logos/GitLab.png", "/logos/Docker.png"],
    image: "/images/use-cases/developer.png",
    features: [
      "Codebase intelligence",
      "Documentation search",
      "Code review automation",
      "DevOps agents",
    ],
    modules: "Modules: CodeGraph + Agents + RAG",
  },
];

export const IndustriesSection = () => {
  const [activeIndustry, setActiveIndustry] = useState(industries[0]);

  return (
    <section id="industries" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">03</span>
          <span className="text-muted-foreground text-sm">Use Cases</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Where AI Meets Your Needs
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Specialized agents ready to join your team today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Industry Tabs */}
          <div className="lg:col-span-1 space-y-2">
            {industries.map((industry) => (
              <motion.button
                key={industry.id}
                onClick={() => setActiveIndustry(industry)}
                whileHover={{ x: 4 }}
                className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all ${activeIndustry.id === industry.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-muted"
                  }`}
              >
                <industry.icon className="w-5 h-5" />
                <span className="font-medium">{industry.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Active Industry Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-2xl p-6 sm:p-8 overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <activeIndustry.icon className="w-8 h-8 text-primary" />
                      <h3 className="text-2xl font-bold">{activeIndustry.label}</h3>
                    </div>

                    <p className="text-sm text-primary font-mono mb-6">
                      {activeIndustry.modules}
                    </p>

                    <div className="mb-8">
                      <p className="text-muted-foreground font-medium mb-4">Features:</p>
                      <ul className="space-y-3">
                        {activeIndustry.features.map((feature, index) => (
                          <motion.li
                            key={feature}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <span className="text-primary mt-1">•</span>
                            <span className="text-muted-foreground">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-8">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-fit">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>

                      <UseCasePill logos={activeIndustry.logos} />
                    </div>
                  </div>

                  <div className="relative h-64 md:h-full min-h-[300px] rounded-2xl overflow-hidden shadow-lg border border-border/50">
                    <img
                      src={activeIndustry.image}
                      alt={activeIndustry.label}
                      className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
