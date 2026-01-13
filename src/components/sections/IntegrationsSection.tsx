import { motion } from "framer-motion";

const integrations = [
  { name: "Slack", logo: "S" },
  { name: "Notion", logo: "N" },
  { name: "Zapier", logo: "Z" },
  { name: "HubSpot", logo: "H" },
  { name: "Salesforce", logo: "SF" },
  { name: "Google", logo: "G" },
  { name: "Microsoft", logo: "M" },
  { name: "AWS", logo: "A" },
];

export const IntegrationsSection = () => {
  return (
    <section id="integrations" className="py-20 px-4 sm:px-6 lg:px-8 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-primary font-mono text-sm">09</span>
          <span className="text-muted-foreground text-sm">Integrations</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Integrates Effortlessly with Your Ecosystem
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our AI solutions integrate with popular tools, helping you stay connected, efficient, and future-ready.
          </p>
        </motion.div>

        {/* Marquee */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card to-transparent z-10" />
          
          <div className="flex animate-marquee">
            {[...integrations, ...integrations, ...integrations].map((integration, index) => (
              <motion.div
                key={`${integration.name}-${index}`}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 mx-6"
              >
                <div className="w-24 h-16 bg-background border border-border rounded-xl flex items-center justify-center hover:border-primary/30 transition-colors">
                  <span className="text-2xl font-bold text-muted-foreground">{integration.logo}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
