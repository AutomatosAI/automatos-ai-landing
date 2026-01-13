import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Stethoscope, Building2, ShoppingCart, Megaphone, GraduationCap, Code } from "lucide-react";

const industries = [
  {
    id: "healthcare",
    label: "Healthcare & Life Sciences",
    icon: Stethoscope,
    features: [
      "Medical literature search (PubMed integration)",
      "Patient context management (HIPAA compliant)",
      "Clinical decision support agents",
      "Drug interaction checking",
    ],
    modules: "Modules: RAG + Memory + Agents",
  },
  {
    id: "finance",
    label: "Finance & Banking",
    icon: Building2,
    features: [
      "Risk assessment automation",
      "Fraud detection systems",
      "Customer service chatbots",
      "Regulatory compliance tools",
    ],
    modules: "Modules: Agents + Analytics + Security",
  },
  {
    id: "retail",
    label: "Retail & E-Commerce",
    icon: ShoppingCart,
    features: [
      "Personalized recommendations",
      "Inventory optimization",
      "Customer behavior analysis",
      "Dynamic pricing models",
    ],
    modules: "Modules: ML + Analytics + Personalization",
  },
  {
    id: "marketing",
    label: "Marketing & Advertising",
    icon: Megaphone,
    features: [
      "Campaign performance optimization",
      "Audience segmentation",
      "Content generation",
      "ROI prediction models",
    ],
    modules: "Modules: NLP + Analytics + Automation",
  },
  {
    id: "education",
    label: "Education & E-Learning",
    icon: GraduationCap,
    features: [
      "Personalized learning paths",
      "Student engagement analytics",
      "Automated grading systems",
      "Content recommendation",
    ],
    modules: "Modules: Personalization + Analytics",
  },
  {
    id: "developer",
    label: "Developer & Engineering",
    icon: Code,
    features: [
      "Code generation assistance",
      "Bug detection automation",
      "Documentation generation",
      "API integration tools",
    ],
    modules: "Modules: CodeGraph + NL2SQL + Agents",
  },
];

export const IndustriesSection = () => {
  const [activeIndustry, setActiveIndustry] = useState(industries[0]);

  return (
    <section id="industries" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">03</span>
          <span className="text-muted-foreground text-sm">Use Cases & Industries</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Where AI Meets Your Industry
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            From optimizing operations to enhancing customer experiences, we tailor intelligent solutions that create measurable impact in your field.
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
                className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
                  activeIndustry.id === industry.id
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
                className="bg-background border border-border rounded-3xl p-8"
              >
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

                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
