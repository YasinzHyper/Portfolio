"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/portfolio-assets";
import { usePortfolioMotion } from "@/components/portfolio/motion-provider";

const companies = [
  { name: "onsemi", logo: "onsemi", href: "https://www.onsemi.com/" },
  { name: "Oracle", logo: "oracle", href: "https://www.oracle.com/" },
  { name: "LabelBox", logo: "labelbox", href: "https://labelbox.com/" },
  { name: "Morgan Stanley", logo: "morganstanley", href: "https://www.morganstanley.com/" },
  { name: "xAI", logo: "xai", href: "https://x.ai/" },
  { name: "Samsung Research", logo: "samsung", href: "https://research.samsung.com/sri-b" },
];

export function HeroSection() {
  const visualRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [offscreen, setOffscreen] = useState(false);
  const { paused, reducedMotion, toggleMotion } = usePortfolioMotion();

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting), { rootMargin: "80px" });
    observer.observe(visual);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const visual = visualRef.current;
    const scene = sceneRef.current;
    if (!visual || !scene) return;
    let frame = 0;
    const reset = () => {
      window.cancelAnimationFrame(frame);
      scene.style.removeProperty("--h-rx"); scene.style.removeProperty("--h-ry");
    };
    if (paused || offscreen) { reset(); return; }
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || document.hidden) return;
      const bounds = visual.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -9;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        scene.style.setProperty("--h-rx", `${y.toFixed(2)}deg`);
        scene.style.setProperty("--h-ry", `${x.toFixed(2)}deg`);
      });
    };
    visual.addEventListener("pointermove", move, { passive: true });
    visual.addEventListener("pointerleave", reset);
    return () => { reset(); visual.removeEventListener("pointermove", move); visual.removeEventListener("pointerleave", reset); };
  }, [paused, offscreen]);

  return (
    <section className="combined-hero shell" id="home" aria-labelledby="hero-title">
      <div className="h-copy">
        <p className="h-eyebrow"><span className="h-status-dot" aria-hidden="true" />MOHAMMED YASIN ZUHAYR <span className="h-location">/ BENGALURU</span></p>
        <h1 id="hero-title">Useful products.<br />Reliable systems.<br /><span>Connected thinking.</span></h1>
        <p className="h-description">I build full-stack products, reliable AI systems, and tools that make other developers’ lives easier.</p>
        <div className="h-actions">
          <a className="button primary" href="#projects">Explore my work <span aria-hidden="true">↘</span></a>
          <a className="h-text-link" href="#contact">Let’s connect <span aria-hidden="true">↗</span></a>
        </div>
        <div className="h-current-role"><span className="h-status-dot" aria-hidden="true" /><span>NOW / FULL STACK ENGINEER AT <strong>onsemi</strong></span></div>
        <div className="h-socials">
          <a href="https://github.com/YasinzHyper" target="_blank" rel="noopener noreferrer"><img src={assetPath("/portfolio/logos/github.svg")} width="13" height="13" alt="" />GitHub <span aria-hidden="true">↗</span></a>
          <a href="https://linkedin.com/in/mohammed-yasin-zuhayr-249158157/" target="_blank" rel="noopener noreferrer"><img src={assetPath("/portfolio/logos/linkedin.svg")} width="13" height="13" alt="" />LinkedIn <span aria-hidden="true">↗</span></a>
          <a href="mailto:myasinzuhayr@gmail.com">Email <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="h-visual" ref={visualRef} data-hero-paused={paused || offscreen}>
        <div className="h-art" role="img" aria-label="A floating faceted crystal, encircled by violet and teal orbital paths connecting full-stack development, AI systems, and developer tools">
          <div className="h-perspective-grid" aria-hidden="true" />
          <div className="h-orbit-scene" ref={sceneRef} aria-hidden="true">
            <div className="h-orbit-ring h-one" /><div className="h-orbit-ring h-two" /><div className="h-orbit-ring h-three" />
            <div className="h-crystal">{Array.from({ length: 6 }, (_, index) => <div className={`h-facet h-f${index + 1}`} key={index} />)}</div>
            <div className="h-satellite h-s1" /><div className="h-satellite h-s2" /><div className="h-satellite h-s3" /><div className="h-floor-light" />
          </div>
          <div className="h-visual-label h-label-stack" aria-hidden="true"><span>⌘</span>Full-stack</div>
          <div className="h-visual-label h-label-ai" aria-hidden="true"><span>✳</span>AI systems</div>
          <div className="h-visual-label h-label-tools" aria-hidden="true"><span>⌁</span>Developer tools</div>
        </div>
        <div className="h-visual-caption">
          <span>THE CONNECTIONS MATTER.</span>
          <button type="button" onClick={toggleMotion} aria-pressed={paused} disabled={reducedMotion} aria-label={reducedMotion ? "Reduced motion enabled by your device" : paused ? "Play site animations" : "Pause site animations"}>
            {reducedMotion ? "Reduced motion on" : paused ? "Play motion" : "Pause motion"}<span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
          </button>
        </div>
      </div>
      <div className="h-experience-strip">
        <span>EXPERIENCE ACROSS</span>
        <div>{companies.map((company) => (
          <a className="company-wordmark" data-company={company.logo} key={company.logo} href={company.href} target="_blank" rel="noopener noreferrer" aria-label={company.name}>
            <img src={assetPath(`/portfolio/logos/${company.logo}.svg`)} width="100" height="28" alt={company.name} />
          </a>
        ))}</div>
        <a href="#experience">Explore the journey <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
