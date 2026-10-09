import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });

const decodeHash = (hash: string): string | null => {
  try {
    return decodeURIComponent(hash.slice(1));
  } catch {
    return null;
  }
};

/*
  React Router keeps the scroll position between pages, so a footer link opened
  the next page at the bottom. A new page starts at the top (before it paints),
  or at its #anchor; a missing or malformed anchor falls back to the top. Back
  and forward (POP) are left to the browser so it restores where you were.
*/
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType === "POP") return;
    toTop();
    const id = hash ? decodeHash(hash) : null;
    if (!id) return;
    /* The target section can mount a tick after the route; look for it then. */
    const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 0);
    return () => window.clearTimeout(timer);
  }, [pathname, hash, navigationType]);

  return null;
};
