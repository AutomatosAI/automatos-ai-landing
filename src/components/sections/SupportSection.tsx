import { motion, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, UserCheck, BookOpen, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

// Interactive particle component
const InteractiveBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    
    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden rounded-2xl">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
      
      {/* Animated grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Interactive glow that follows mouse */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)',
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Floating orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/30 blur-xl"
          style={{
            width: 80 + i * 20,
            height: 80 + i * 20,
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            x: [0, 30 * (i % 2 === 0 ? 1 : -1), 0],
            y: [0, 20 * (i % 2 === 0 ? -1 : 1), 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
      
      {/* Animated lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={i}
            d={`M ${-100 + i * 50} ${300 + i * 30} Q ${200 + i * 100} ${100 - i * 20} ${500 + i * 50} ${250 + i * 40}`}
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
      
      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/30 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/20 to-transparent rounded-tr-full" />
    </div>
  );
};

export const SupportSection = () => {
  return (
    <section id="support" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">09</span>
          <span className="text-muted-foreground text-sm">Our Support</span>
        </div>

        <div className="relative bg-card border border-primary/20 rounded-2xl p-8 lg:p-12 overflow-hidden">
          <InteractiveBackground />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-start">
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
              <Button size="lg">
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
                  className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/30 transition-all"
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
      </div>
    </section>
  );
};
