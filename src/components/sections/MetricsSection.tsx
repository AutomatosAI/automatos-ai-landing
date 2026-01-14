import { motion } from "framer-motion";

const metrics = [
  { value: "85", suffix: "%", label: "faster customer resolutions" },
  { value: "3", suffix: "x", label: "ROI in first year" },
  { value: "92", suffix: "%", label: "higher user satisfaction" },
];

export const MetricsSection = () => {
  return (
    <section id="metrics" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">05</span>
          <span className="text-muted-foreground text-sm">Key Metrics</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold max-w-4xl">
            Powered by innovation and strategy, Automatos delivers AI-driven solutions that redefine how industries achieve success.
          </h2>
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
              <div className="flex items-baseline justify-center gap-1 mb-4">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="text-6xl sm:text-7xl lg:text-8xl font-bold text-primary"
                >
                  {metric.value}
                </motion.span>
                <span className="text-4xl sm:text-5xl font-bold text-primary">{metric.suffix}</span>
              </div>
              <p className="text-muted-foreground text-lg">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
