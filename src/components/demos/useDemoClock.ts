import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* One tick of every demo, in ms. Durations in the frame functions are counted in ticks. */
export const TICK_MS = 110;

/*
  Drives one demo: a tick counter that runs only while the element is on
  screen and stops entirely when the visitor prefers reduced motion (the
  demo then renders its resting frame).
*/
export function useDemoClock<T extends Element = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion() ?? false;
  const [visible, setVisible] = useState(false);
  const [t, setT] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !visible) return;
    const id = window.setInterval(() => setT((x) => x + 1), TICK_MS);
    return () => window.clearInterval(id);
  }, [reduced, visible]);

  return { ref, t, reduced };
}

/* The typing caret blinks on a 6-tick cycle. */
export const caretOn = (t: number) => t % 6 < 3;
