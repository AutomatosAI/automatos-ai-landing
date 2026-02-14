import { motion } from "framer-motion";

const integrations = [
  { name: "Gmail", logo: "/logos/Gmail.png" },
  { name: "Dropbox", logo: "/logos/Dropbox.png" },
  { name: "Slack", logo: "/logos/Slack.png" },
  { name: "Notion", logo: "/logos/Notion.png" },
  { name: "Zapier", logo: "/logos/Zapier.png" },
  { name: "HubSpot", logo: "/logos/HubSpot.png" },
  { name: "Salesforce", logo: "/logos/Salesforce.png" },
  { name: "Google Drive", logo: "/logos/GoogleDrive.png" },
  // Duplicate for seamless marquee
  { name: "Gmail", logo: "/logos/Gmail.png" },
  { name: "Dropbox", logo: "/logos/Dropbox.png" },
  { name: "Slack", logo: "/logos/Slack.png" },
  { name: "Notion", logo: "/logos/Notion.png" },
];

export const IntegrationsSection = () => {
  return (
    <section id="integrations" className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
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
            Seamlessly Connected
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Unite your entire stack with over 850 integrations.
          </p>
        </motion.div>

        {/* Marquee */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex animate-marquee items-center opacity-80 hover:opacity-100 transition-opacity">
            {[...integrations, ...integrations].map((integration, index) => (
              <motion.div
                key={`${integration.name}-${index}`}
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0 mx-8"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl flex items-center justify-center hover:border-primary/50 hover:bg-card/80 transition-all p-4 shadow-sm group">
                  <img
                    src={integration.logo}
                    alt={integration.name}
                    className="w-full h-full object-contain transition-all duration-300 hover:scale-110"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
