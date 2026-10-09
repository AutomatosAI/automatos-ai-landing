/* The two hero actions, shared by all three hero variants. */
export const HeroCtas = () => (
  <div className="flex flex-wrap gap-3">
    <a
      href="#waitlist"
      className="rounded-full bg-primary px-6 py-3.5 text-[15px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
      Join the waitlist →
    </a>
    <a href="#pricing" className="rounded-full px-5 py-3.5 text-[15px] font-medium text-foreground hover:text-accent">
      See pricing
    </a>
  </div>
);

export const heroH1 = "m-0 font-serif text-[40px] font-medium leading-[1.02] tracking-[-0.015em] sm:text-5xl lg:text-[62px]";
export const heroLede = "m-0 text-[17px] leading-relaxed text-muted-foreground";
