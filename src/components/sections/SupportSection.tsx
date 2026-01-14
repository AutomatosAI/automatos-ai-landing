import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, UserCheck, BookOpen, Zap } from "lucide-react";

const supportFeatures = [
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Get round-the-clock support whenever you need it, ensuring smooth operations without downtime.",
  },
  {
    icon: Users,
    title: "Seamless Onboarding",
    description: "Our team guides you through every step of setup and training, making adoption simple and stress-free.",
  },
  {
    icon: UserCheck,
    title: "Dedicated Account Manager",
    description: "Work with a single point of contact who understands your business and ensures your needs are always met.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Hub",
    description: "Access a library of tutorials, FAQs, and best practices to keep your team confident and empowered.",
  },
  {
    icon: Zap,
    title: "Fast Response Guarantee",
    description: "Get quick answers and real solutions with guaranteed response times, keeping your projects moving swiftly.",
  },
];

export const SupportSection = () => {
  return (
    <section id="support" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">07</span>
          <span className="text-muted-foreground text-sm">Our Support</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Dedicated Support Every Step of the Way
            </h2>
            <p className="text-muted-foreground text-lg mb-4">
              We believe delivering AI solutions is only the beginning. That's why our support goes beyond the initial project launch.
            </p>
            <p className="text-muted-foreground text-lg mb-4">
              Whether you need quick answers or in-depth strategic advice, our team is always ready to step in.
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              With Automatos, you gain more than just a service provider—you gain a partner committed to your long-term success.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
              Connect With Us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <div className="space-y-4">
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
