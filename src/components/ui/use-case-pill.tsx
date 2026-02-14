import { motion } from "framer-motion";

interface UseCasePillProps {
    logos: string[];
}

export const UseCasePill = ({ logos }: UseCasePillProps) => {
    return (
        <div className="relative inline-block">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full translate-y-2 opacity-50" />

            {/* Pill Container */}
            <div className="relative bg-white dark:bg-card border border-border/50 shadow-md rounded-full px-4 py-2 flex items-center gap-3 z-10 h-10">
                {logos.map((logo, index) => (
                    <div key={index} className="relative group">
                        {/* Hover interaction */}
                        <motion.div
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            className="relative z-10 bg-white rounded-md p-1 shadow-sm border border-black/5 flex items-center justify-center"
                        >
                            <img
                                src={logo}
                                alt="Tool Logo"
                                className="w-4 h-4 object-contain"
                            />
                        </motion.div>
                    </div>
                ))}

                {/* Visual dots decoration - reduced size */}
                <div className="absolute -left-2 flex gap-0.5">
                    <div className="w-0.5 h-0.5 rounded-full bg-muted-foreground/30" />
                    <div className="w-0.5 h-0.5 rounded-full bg-muted-foreground/30" />
                </div>
                <div className="absolute -right-2 flex gap-0.5">
                    <div className="w-0.5 h-0.5 rounded-full bg-muted-foreground/30" />
                    <div className="w-0.5 h-0.5 rounded-full bg-muted-foreground/30" />
                </div>
            </div>
        </div>
    );
};
