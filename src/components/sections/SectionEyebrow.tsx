import { cn } from "@/lib/utils";

/* "01  The product": the mono number in accent, the label muted. */
export const SectionEyebrow = ({ n, label, className }: { n: string; label: string; className?: string }) => (
  <span className={cn("flex gap-3.5 text-sm", className)}>
    <span className="font-mono text-accent">{n}</span>
    <span className="text-muted-foreground">{label}</span>
  </span>
);
