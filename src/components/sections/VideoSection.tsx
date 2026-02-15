import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Play } from "lucide-react";

export const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setHasStarted(true);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            See Automatos in Action
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover how autonomous AI agents work together to run your business — from idea to execution.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-background"
        >
          {/* Play overlay — shown until user clicks */}
          {!hasStarted && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm cursor-pointer group transition-colors hover:bg-black/30"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/90 group-hover:bg-primary flex items-center justify-center shadow-lg shadow-primary/30 transition-all group-hover:scale-105">
                <Play className="w-7 h-7 sm:w-9 sm:h-9 text-primary-foreground ml-1" />
              </div>
              <span className="mt-4 text-sm text-white/80 font-medium">Watch how it works</span>
            </button>
          )}

          <video
            ref={videoRef}
            src="/videos/automatos-intro.mp4"
            controls={hasStarted}
            preload="metadata"
            className="w-full aspect-video"
            onEnded={() => setHasStarted(false)}
          />
        </motion.div>
      </div>
    </section>
  );
};
