"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath, portfolioLinks } from "@/lib/portfolio-assets";
import { usePortfolioMotion } from "./motion-provider";

const links = ["Home", "About", "Experience", "Skills", "Projects", "Contact"];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const menuRef = useRef<HTMLButtonElement>(null);
  const { paused, reducedMotion, toggleMotion } = usePortfolioMotion();
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) { setOpen(false); menuRef.current?.focus(); }
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [open]);
  useEffect(() => {
    const sections = links.map(label => document.getElementById(label.toLowerCase())).filter((node): node is HTMLElement => !!node);
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = Math.min(window.innerHeight * 0.3, 260);
      let current = sections[0]?.id ?? "home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) current = section.id;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Yasin, back to home"><span className="brand-icon" aria-hidden="true" />Yasin<span className="brand-dot">.</span>dev</a>
      <nav className={open ? "nav-open" : ""} id="main-nav" aria-label="Main navigation">
        {links.map(label => { const id = label.toLowerCase(); return <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => { setOpen(false); setActive(id); }}>{label}</a>; })}
      </nav>
      <div className="header-actions">
        <div className="header-socials" role="group" aria-label="Social profiles">
          <a href={portfolioLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" title="GitHub"><img src={assetPath("/portfolio/logos/github.svg")} width="17" height="17" alt="" /></a>
          <a href={portfolioLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn"><img src={assetPath("/portfolio/logos/linkedin.svg")} width="17" height="17" alt="" /></a>
        </div>
        <button className="header-motion" type="button" onClick={toggleMotion} disabled={reducedMotion} aria-pressed={paused} aria-label={reducedMotion ? "Reduced motion enabled" : paused ? "Resume animations" : "Pause animations"} title={reducedMotion ? "Using your reduced motion preference" : paused ? "Resume animations" : "Pause animations"}><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span></button>
        <a className="resume-link" href={portfolioLinks.resume} target="_blank" rel="noopener noreferrer">Résumé <span aria-hidden="true">↗</span></a>
        <button ref={menuRef} className="menu-toggle" type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}><span className="menu-label">Menu</span><span aria-hidden="true">{open ? "×" : "☰"}</span></button>
      </div>
    </header>
  </>;
}
