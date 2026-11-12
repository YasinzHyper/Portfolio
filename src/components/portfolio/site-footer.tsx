"use client";

import { assetPath, portfolioLinks } from "@/lib/portfolio-assets";
import { usePortfolioMotion } from "./motion-provider";

export function SiteFooter() {
  const { paused, reducedMotion, toggleMotion } = usePortfolioMotion();
  return <footer className="shell site-footer">
    <a className="brand" href="#home">Yasin<span className="brand-dot">.</span>dev</a>
    <p>Thoughtfully built in Bengaluru.<br/><span>Always evolving.</span></p>
    <div className="footer-links">
      <a href={portfolioLinks.github} target="_blank" rel="noopener noreferrer"><img src={assetPath("/portfolio/logos/github.svg")} alt="" width="14" height="14" />GitHub ↗</a>
      <a href={portfolioLinks.linkedin} target="_blank" rel="noopener noreferrer"><img src={assetPath("/portfolio/logos/linkedin.svg")} alt="" width="14" height="14" />LinkedIn ↗</a>
      <button onClick={toggleMotion} disabled={reducedMotion} aria-pressed={paused}>{reducedMotion ? "Reduced motion on" : paused ? "Play motion ▷" : "Pause motion Ⅱ"}</button>
      <a href="#home">Back to top ↑</a>
    </div>
  </footer>;
}
