import { motion, useReducedMotion } from "framer-motion";
import { STUDIO_RINGS, type Ring } from "./osHubRings";

/*
  The hero hub: Automatos OS in the middle, three rings of dots around it.
    inner  · the OS modules (olive)
    middle · what you run in Studio (ink)
    outer  · everything Powered by Automatos (burnt orange)
  Spokes draw in, dots appear ring by ring, and pulses travel from the
  centre to the outer ring: Auto driving everything.
  SVG on md+; a grouped chip list on phones, where labels would be unreadable.
*/





const W = 1000;
const H = 660;
const CX = W / 2;
const CY = H / 2;
/* Side room so the longest outer labels never clip. */
const PAD = 115;

type Node = {
  ring: Ring;
  ringIndex: number;
  label: string;
  x: number;
  y: number;
  anchor: "start" | "middle" | "end";
  lx: number;
  ly: number;
  order: number;
};

const toRad = (d: number) => (d * Math.PI) / 180;

function layout(rings: Ring[]): Node[] {
  const nodes: Node[] = [];
  let order = 0;
  rings.forEach((ring, ringIndex) => {
    const step = 360 / ring.items.length;
    ring.items.forEach((label, i) => {
      const a = toRad(ring.startDeg + i * step);
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      const x = CX + ring.rx * cos;
      const y = CY + ring.ry * sin;
      const side = Math.abs(cos) < 0.2 ? "middle" : cos > 0 ? "start" : "end";
      const gap = 12;
      const lx = side === "middle" ? x : x + (cos > 0 ? gap : -gap);
      const ly = side === "middle" ? y + (sin > 0 ? 24 : -14) : y + 5;
      nodes.push({ ring, ringIndex, label, x, y, anchor: side, lx, ly, order: order++ });
    });
  });
  return nodes;
}


type OsHubProps = {
  rings?: Ring[];
  /** Small mono line under "Automatos" in the centre. */
  centreTag?: string;
};

export const OsHub = ({ rings = STUDIO_RINGS, centreTag = "STUDIO" }: OsHubProps) => {
  const reduce = useReducedMotion();
  const NODES = layout(rings);
  const outer = rings[rings.length - 1].key;
  const appear = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, scale: 0.4 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.45, delay, ease: "easeOut" as const },
        };

  return (
    <div className="relative">
      {/* Desktop / tablet: the hub */}
      <div className="hidden md:block">
        <svg viewBox={`${-PAD} 0 ${W + PAD * 2} ${H + 10}`} className="w-full h-auto" role="img" aria-label="Automatos at the centre, with the OS modules underneath and what you run around it">
          {/* Rings */}
          {rings.map((ring, i) => (
            <motion.ellipse
              key={ring.key}
              cx={CX}
              cy={CY}
              rx={ring.rx}
              ry={ring.ry}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth={1}
              strokeDasharray="2 6"
              {...(reduce
                ? {}
                : {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { duration: 0.8, delay: 0.2 + i * 0.25 },
                  })}
            />
          ))}

          {/* Spokes */}
          {NODES.map((n) => (
            <motion.line
              key={`spoke-${n.label}`}
              x1={CX}
              y1={CY}
              x2={n.x}
              y2={n.y}
              stroke="hsl(var(--muted-foreground))"
              strokeOpacity={n.ring.key === outer ? 0.28 : 0.16}
              strokeWidth={1}
              {...(reduce
                ? {}
                : {
                    initial: { pathLength: 0 },
                    animate: { pathLength: 1 },
                    transition: { duration: 0.6, delay: 0.6 + n.order * 0.06, ease: "easeOut" },
                  })}
            />
          ))}

          {/* Pulses: Auto driving every outlet */}
          {!reduce &&
            NODES.filter((n) => n.ring.key === outer).map((n, i) => (
              <motion.circle
                key={`pulse-${n.label}`}
                r={3}
                fill="hsl(var(--accent))"
                initial={{ cx: CX, cy: CY, opacity: 0 }}
                animate={{ cx: [CX, n.x], cy: [CY, n.y], opacity: [0, 1, 0] }}
                transition={{
                  duration: 2.2,
                  delay: 2.6 + i * 0.35,
                  repeat: Infinity,
                  repeatDelay: 2.4,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* Nodes + labels */}
          {NODES.map((n) => (
            <motion.g key={n.label} style={{ transformOrigin: `${n.x}px ${n.y}px` }} {...appear(0.8 + n.order * 0.06)}>
              <circle cx={n.x} cy={n.y} r={n.ring.key === outer ? 7 : 5} fill="hsl(var(--background))" stroke={n.ring.colour} strokeWidth={2} />
              <circle cx={n.x} cy={n.y} r={n.ring.key === outer ? 3 : 2} fill={n.ring.colour} />
              <text
                x={n.lx}
                y={n.ly}
                textAnchor={n.anchor}
                fill={n.ring.key === "os" ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))"}
                style={{ fontFamily: n.ring.font, fontSize: n.ring.size, fontWeight: n.ring.weight }}
              >
                {n.label}
              </text>
            </motion.g>
          ))}

          {/* Centre */}
          <motion.g style={{ transformOrigin: `${CX}px ${CY}px` }} {...appear(0)}>
            {!reduce && (
              <motion.circle
                cx={CX}
                cy={CY}
                r={74}
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth={1}
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: [0.5, 0], scale: [1, 1.35] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />
            )}
            <circle cx={CX} cy={CY} r={70} fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth={1.5} />
            <image href="/brand/automatos-mark-hi.png" x={CX - 22} y={CY - 38} width={44} height={44} />
            <text x={CX} y={CY + 26} textAnchor="middle" fill="hsl(var(--foreground))" style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 500 }}>
              Automatos
            </text>
            <text x={CX} y={CY + 44} textAnchor="middle" fill="hsl(var(--accent))" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 2 }}>
              {centreTag}
            </text>
          </motion.g>
        </svg>
      </div>

      {/* Phone: the same three groups as chips */}
      <div className="md:hidden space-y-6">
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-card border border-border flex flex-col items-center justify-center">
            <img src="/brand/automatos-mark-hi.png" alt="" className="w-8 h-8" />
            <span className="text-[10px] font-mono text-accent tracking-widest mt-1">{centreTag}</span>
          </div>
        </div>
        {[...rings].reverse().map((ring) => (
          <div key={ring.key}>
            <p className="text-xs font-mono text-muted-foreground text-center mb-2">{ring.title}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {ring.items.map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-full border border-border bg-card">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: ring.colour }} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="hidden md:flex items-center justify-center gap-8 mt-4 text-sm text-muted-foreground">
        {[...rings].reverse().map((ring) => (
          <span key={ring.key} className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: ring.colour }} />
            {ring.title}
          </span>
        ))}
      </div>
    </div>
  );
};
