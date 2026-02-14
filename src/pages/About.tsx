import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap, Rocket, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

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

const About = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24 pb-16">
                {/* Header Section */}
                <section className="container mx-auto px-4 max-w-7xl mb-24">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                                <Users className="w-4 h-4" />
                                <span>About Automatos AI</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight">
                                Shaping the Future <span className="text-primary">[with AI]</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                        >
                            We’re an AI agency committed to building intelligent solutions that empower businesses to scale, innovate, and achieve measurable growth.
                        </motion.p>
                    </div>
                </section>

                {/* Values / Grid Section */}
                <section className="container mx-auto px-4 max-w-7xl mb-24">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1: Mission */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                <Rocket className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                To democratize access to advanced artificial intelligence, enabling businesses of all sizes to automate complex workflows and unlock their full potential.
                            </p>
                        </motion.div>

                        {/* Card 2: Vision */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                A world where human creativity is amplified by intelligent automation, freeing people from repetitive tasks to focus on what truly matters—innovation.
                            </p>
                        </motion.div>

                        {/* Card 3: Values */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">Core Values</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Transparency & Trust
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Relentless Innovation
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Customer-Centricity
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* Team / Culture Section */}
                <section className="container mx-auto px-4 max-w-7xl">
                    <div className="relative bg-card border border-primary/20 rounded-2xl p-12 md:p-24 overflow-hidden text-center">
                        <InteractiveBackground />

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-semibold mb-6">Ready to Innovate?</h2>
                            <p className="text-muted-foreground text-lg mb-8">
                                Join us on our journey to reshape the future of business operations.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button size="lg" className="rounded-full px-8 text-base bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                                    Join Our Team
                                </Button>
                                <Button variant="outline" size="lg" className="rounded-full px-8 text-base border-primary/20 hover:bg-primary/5 bg-background/50 backdrop-blur-sm">
                                    Contact Us <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default About;
