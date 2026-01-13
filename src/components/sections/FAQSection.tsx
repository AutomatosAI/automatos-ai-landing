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
    question: "What industries do you work with?",
    answer: "We work with businesses across a wide range of industries, including finance, retail, healthcare, education, and technology. Our AI solutions are adaptable and designed to create measurable impact in any sector.",
  },
  {
    question: "How quickly can I get started with Automatos?",
    answer: "Getting started is simple. After an initial consultation, we can begin implementation within 2-4 weeks depending on the complexity of your project. Our streamlined onboarding process ensures you see results quickly.",
  },
  {
    question: "Do I need technical expertise?",
    answer: "No technical expertise is required. Our solutions are designed to be user-friendly, and our team provides comprehensive training and ongoing support to ensure your team can leverage our AI tools effectively.",
  },
  {
    question: "What kind of support does Automatos offer?",
    answer: "We offer 24/7 support, dedicated account managers, comprehensive documentation, and a knowledge hub with tutorials and best practices. Our team is always available to help you maximize the value of our solutions.",
  },
  {
    question: "Can your solutions integrate with our systems?",
    answer: "Yes, our AI solutions are designed to integrate seamlessly with your existing tech stack. We support integrations with popular tools like Slack, Salesforce, HubSpot, and many more through our flexible API.",
  },
  {
    question: "How do I know which package suits best?",
    answer: "We recommend scheduling a consultation with our team. We'll assess your business needs, goals, and current infrastructure to recommend the package that delivers the best value for your specific situation.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">10</span>
          <span className="text-muted-foreground text-sm">Frequently Asked Questions</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Turning Questions Into Confidence
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            From exploring our AI solutions to getting started with your first project, we've got straightforward answers that clear the path forward.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
            Start Automating
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        {/* FAQ Accordion */}
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
                className="bg-card border border-border rounded-2xl px-6 data-[state=open]:border-primary/30"
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
    </section>
  );
};
