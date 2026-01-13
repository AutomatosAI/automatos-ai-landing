import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "The team at Automatos helped us implement predictive analytics that revolutionized our workflow. We're now making data-driven decisions faster and more confidently than ever.",
    name: "David Mitchell",
    role: "Head of Operations at Radiate",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "Automatos transformed our customer support with AI chatbots that reduced response times by 50%. Their solutions are smart, seamless, and delivered measurable results from day one.",
    name: "Sarah Lawson",
    role: "COO at TechNova",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "Automatos's AI-driven personalization tools completely enhanced our e-learning platform. Student engagement and course completion rates have improved dramatically.",
    name: "Michael Stevenson",
    role: "Founder of LearnSphere",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "Thanks to Automatos's AI solutions, our campaigns are more targeted and efficient. Their expertise turned complex data into actionable insights that boosted engagement and ROI.",
    name: "Priya Kapoor",
    role: "Marketing Director at RetailHub",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "Working with Automatos was seamless. Their AI solutions for predictive healthcare insights allowed us to optimize operations and provide better outcomes for patients.",
    name: "Lina Thompson",
    role: "Product Manager at HealthWorks",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  },
];

const partners = [
  "TechNova", "Radiate", "LearnSphere", "RetailHub", "HealthWorks"
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">06</span>
          <span className="text-muted-foreground text-sm">Client Testimonials</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Trusted by Forward Thinking Businesses
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Hear directly from the people we've worked with. Their stories and experiences reflect the results we aim to deliver with every project.
          </p>
        </motion.div>

        {/* Partners Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm text-muted-foreground mb-4">Our Partners</p>
          <div className="flex flex-wrap gap-8 items-center">
            {partners.map((partner) => (
              <span key={partner} className="text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                {partner}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-3xl p-8 lg:p-12"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Image */}
                <div className="relative">
                  <div className="aspect-square max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <Quote className="w-10 h-10 text-primary/30 mb-6" />
                  <blockquote className="text-xl lg:text-2xl font-medium mb-8 leading-relaxed">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                  <div>
                    <p className="font-semibold text-lg">{testimonials[currentIndex].name}</p>
                    <p className="text-muted-foreground">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
