"use client";

import { useState, useEffect } from "react";

/** Current `window.scrollY`, optionally capped (values above `cap` don't trigger re-renders). */
export function useScrollPosition(cap: number = Infinity): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollY(Math.min(window.scrollY, cap));
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cap]);

  return scrollY;
}
