/*
  The product wordmark: the Automatos sailboat, "Automatos" in the serif,
  "Studio" in the serif italic. The company brand, Automatos AI, sits in the
  footer as "Powered by Automatos AI".
*/
export const StudioWordmark = ({ size = "md" }: { size?: "sm" | "md" }) => {
  const mark = size === "sm" ? "h-6 w-6" : "h-7 w-7";
  const text = size === "sm" ? "text-lg" : "text-xl";
  return (
    <span className="inline-flex items-center gap-2.5">
      <img src="/brand/automatos-mark-hi.png" alt="" className={`${mark} object-contain`} />
      <span className={`${text} font-serif leading-none tracking-tight text-foreground`}>
        Automatos <span className="italic">Studio</span>
      </span>
    </span>
  );
};
