import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the pricing work?",
    answer: "We offer flexible monthly plans starting at €29/mo for individuals. For larger teams, our Business plan provides unlimited agents and advanced tools. Enterprise plans are custom-quoted.",
  },
  {
    question: "Can I customize the agents?",
    answer: "Absolutely. You can choose from 400+ LLMs, add specialized skills, and equip custom tools. Our 'Automatos Agents' tool makes this easy.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes. We use enterprise-grade encryption and ensuring your proprietary data (and your customers' data) remains private and protected.",
  },
  {
    question: "Do I need technical skills to use Automatos?",
    answer: "No. Our platform is designed for ease of use. You can use natural language to interact with your data and pre-built recipes to automate workflows.",
  },
  {
    question: "What if I need more than standard integrations?",
    answer: "Our Automatos Tools supports over 850 apps. If you need something bespoke, our Enterprise plan allows for custom development.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">10</span>
          <span className="text-muted-foreground text-sm">Frequently Asked Questions</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Title, Description, CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Turning Questions Into Confidence
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              From exploring our AI solutions to getting started with your first project, we've got straightforward answers that clear the path forward.
            </p>
            <a href="#waitlist">
              <Button size="lg" className="rounded-full">
                Join the Waitlist
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </motion.div>

          {/* Right Column - FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
