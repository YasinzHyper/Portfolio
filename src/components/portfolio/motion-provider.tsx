"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type PortfolioMotion = { paused: boolean; reducedMotion: boolean; toggleMotion: () => void };
const MotionContext = createContext<PortfolioMotion | null>(null);
const preferenceKey = "yasin-portfolio-motion-paused";

/** One preference for the background, hero, timeline, and project scenes. */
export function PortfolioMotionProvider({ children }: { children: ReactNode }) {
  const [userPaused, setUserPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    try { setUserPaused(window.localStorage.getItem(preferenceKey) === "true"); } catch { /* Storage is optional. */ }
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  const paused = userPaused || reducedMotion;
  const toggleMotion = useCallback(() => {
    if (reducedMotion) return;
    setUserPaused((previous) => {
      const next = !previous;
      try { window.localStorage.setItem(preferenceKey, String(next)); } catch { /* Keep the in-session preference. */ }
      return next;
    });
  }, [reducedMotion]);

  useEffect(() => {
    document.body.classList.toggle("motion-paused", paused);
    return () => document.body.classList.remove("motion-paused");
  }, [paused]);

  useEffect(() => {
    const syncVisibility = () => document.body.classList.toggle("page-hidden", document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      document.removeEventListener("visibilitychange", syncVisibility);
      document.body.classList.remove("page-hidden");
    };
  }, []);

  const value = useMemo(() => ({ paused, reducedMotion, toggleMotion }), [paused, reducedMotion, toggleMotion]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function usePortfolioMotion(): PortfolioMotion {
  const context = useContext(MotionContext);
  if (!context) throw new Error("usePortfolioMotion must be used within PortfolioMotionProvider");
  return context;
}
