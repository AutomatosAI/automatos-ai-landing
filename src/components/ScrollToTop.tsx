import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/*
  React Router keeps the scroll position between pages, so a footer link opened
  the next page at the bottom. A new page starts at the top, or at its #anchor;
  back and forward (POP) are left to the browser so it restores where you were.
*/
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "POP") return;
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 0);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash, navigationType]);

  return null;
};
