import { motion } from "framer-motion";

const metrics = [
  { value: "No", suffix: "Lock-in", label: "Swap LLMs and tools as you please" },
  { value: "Cost", suffix: "Efficient", label: "Pay only for what you use" },
  { value: "Self", suffix: "Learning", label: "System improves with every interaction" },
];

export const MetricsSection = () => {
  return (
    <section id="metrics" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">05</span>
          <span className="text-muted-foreground text-sm">Key Metrics</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold max-w-4xl mx-auto">
            Smarter Every Day
          </h2>
          <p className="text-muted-foreground text-lg mt-4">
            Our goal is a self-optimizing system that saves you time and money.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex flex-col items-center justify-center gap-1 mb-4">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary"
                >
                  {metric.value}
                </motion.span>
                <span className="text-3xl sm:text-4xl font-bold text-primary/80">{metric.suffix}</span>
              </div>
              <p className="text-muted-foreground text-lg px-4">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
