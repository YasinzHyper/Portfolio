"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { usePortfolioMotion } from "./motion-provider";

/** Visible without JS; only animate content that begins below the viewport. */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRef(false);
  const [waiting, setWaiting] = useState(false);
  const { paused } = usePortfolioMotion();
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (revealed.current || paused || !("IntersectionObserver" in window) || node.getBoundingClientRect().top < window.innerHeight) {
      revealed.current = true;
      setWaiting(false);
      return;
    }
    setWaiting(true);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { revealed.current = true; setWaiting(false); observer.disconnect(); }
    }, { threshold: 0.06, rootMargin: "0px 0px 35px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [paused]);
  return <div ref={ref} className={`reveal ${waiting && !paused ? "reveal-waiting" : ""} ${className}`}>{children}</div>;
}
