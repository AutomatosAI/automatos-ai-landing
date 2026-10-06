import { motion } from "framer-motion";

/* Only things you can check: the licence, the catalogue, the channels, the formats. */
const metrics = [
  { value: "Open", suffix: "Apache-2.0", label: "The whole platform is on GitHub. Run it hosted, or on your own machine." },
  { value: "1,000+", suffix: "Apps", label: "Connect Gmail, Shopify, Xero, Slack and the rest through your own accounts." },
  { value: "5", suffix: "Social channels", label: "LinkedIn, X, Instagram, TikTok and YouTube, from one plan and one approval." },
  { value: "1", suffix: "Brand kit", label: "PDF, Word, Excel, social image and video, all rendered from the same colours and type." },
];

export const MetricsSection = () => {
  return (
    <section id="metrics" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-accent font-mono text-sm">05</span>
          <span className="text-muted-foreground text-sm">The facts</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl max-w-4xl mx-auto">
            Nothing here is a benchmark. <span className="brand-line">You can check all of it.</span>
          </h2>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <span className="text-5xl sm:text-6xl font-serif text-foreground">
                  {metric.value}
                </span>
                <span className="text-lg font-mono text-accent">{metric.suffix}</span>
              </div>
              <p className="text-muted-foreground px-2">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
