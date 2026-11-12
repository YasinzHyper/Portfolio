"use client";

/* eslint-disable @next/next/no-img-element -- Local SVG brand marks do not benefit from image optimization. */

import { useEffect, useRef, useState } from "react";
import { usePortfolioMotion } from "@/components/portfolio/motion-provider";
import { assetPath } from "@/lib/portfolio-assets";
import skills from "@/data/portfolio-skills.json";

type Experience = {
  id: string;
  company: string;
  shortName: string;
  shortRole: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  tech: string[];
  companyUrl: string;
  current?: boolean;
};

const experiences: Experience[] = [
  {
    "id": "onsemi",
    "company": "onsemi",
    "shortName": "onsemi",
    "shortRole": "Full Stack Engineer",
    "role": "Full Stack Engineer",
    "period": "Jul 2026 — Present",
    "current": true,
    "location": "Bengaluru · Hybrid",
    "highlights": [
      "Building a full-stack platform that unifies project management, simulation, and compliance checks for power module design, replacing a fragmented multi-tool workflow.",
      "Working across Next.js, Django, PostgreSQL, Airflow, and Kubernetes."
    ],
    "tech": [
      "Next.js",
      "Django",
      "PostgreSQL",
      "Airflow",
      "Kubernetes"
    ],
    "companyUrl": "https://www.onsemi.com/"
  },
  {
    "id": "oracle",
    "company": "Oracle",
    "shortName": "Oracle",
    "shortRole": "SDE Intern",
    "role": "SDE Intern",
    "period": "Jan 2026 — Jul 2026",
    "location": "Bengaluru · Hybrid",
    "highlights": [
      "Engineered 50+ automated test scenarios for Oracle RPAS, expanding defect detection coverage by 30% and significantly reducing escaped bugs in the C++/Java enterprise backend.",
      "Resolved 10+ high-severity bugs across RPAS server modules in C++ and Java, directly improving system stability in a large-scale retail planning platform.",
      "Built Codex-assisted workflows via MCP with custom RPAS skills for automated code review and test scripting, cutting manual debugging effort by 50%."
    ],
    "tech": [
      "C++",
      "Java",
      "Oracle DB",
      "PL/SQL",
      "Shell Scripting"
    ],
    "companyUrl": "https://www.oracle.com/"
  },
  {
    "id": "labelbox",
    "company": "LabelBox",
    "shortName": "LabelBox",
    "shortRole": "AI Trainer · Coding",
    "role": "AI Trainer (Coding)",
    "period": "July 2024 — Aug 2026",
    "location": "Remote",
    "highlights": [
      "Enhanced coding proficiency of frontier models for leading AI labs (Google Deepmind, OpenAI, etc.) through sophisticated prompt engineering and rigorous model evaluation methodologies"
    ],
    "tech": [
      "JavaScript",
      "Python",
      "Prompt Engineering",
      "Model Evaluation"
    ],
    "companyUrl": "https://labelbox.com/"
  },
  {
    "id": "morganstanley",
    "company": "Morgan Stanley",
    "shortName": "Morgan Stanley",
    "shortRole": "Technology Apprentice",
    "role": "Technology Apprentice (SDE Intern)",
    "period": "Aug 2025 — Dec 2025",
    "location": "Bengaluru · Hybrid",
    "highlights": [
      "Engineered an AI-powered PDF bulk processing system capable of handling 10k+ documents in parallel, cutting manual effort by 80% and operational cost by 75%.",
      "Modernized internal enterprise applications with React-based frontends and Spring Boot/FastAPI microservices, enhancing service uptime, modularity, and deployment efficiency."
    ],
    "tech": [
      "TypeScript",
      "Java",
      "React",
      "Spring Boot",
      "FastAPI",
      "Python"
    ],
    "companyUrl": "https://www.morganstanley.com/"
  },
  {
    "id": "xai",
    "company": "SpaceXAI (formerly xAI)",
    "shortName": "SpaceXAI (formerly xAI)",
    "shortRole": "AI Trainer",
    "role": "AI Trainer",
    "period": "Oct 2024 — Aug 2025",
    "location": "Remote",
    "highlights": [
      "Enhanced xAI's frontier LLMs, including Grok 3 and Grok 4 by creating and refining high-quality reasoning datasets that improved the model's decision-making capabilities",
      "Applied advanced prompt-engineering techniques to optimize system and user prompts, boosting response relevance and coherence",
      "Partnered with research and engineering teams on iterative testing cycles, model evaluations, and targeted dataset updates to address failure modes"
    ],
    "tech": [
      "Python",
      "RLHF",
      "SFT",
      "LLM Ops"
    ],
    "companyUrl": "https://x.ai/"
  },
  {
    "id": "samsung",
    "company": "Samsung Research Institute Bangalore",
    "shortName": "Samsung Research",
    "shortRole": "Project Intern",
    "role": "Project Intern",
    "period": "Aug 2024 — Jun 2025",
    "location": "Remote",
    "highlights": [
      "Engineered an Android app recommender leveraging app-usage sequence data, improving recommendation accuracy by 20%+ in internal benchmarks."
    ],
    "tech": [
      "Kotlin",
      "Android Studio",
      "Python",
      "TensorFlow",
      "Recommenders"
    ],
    "companyUrl": "https://research.samsung.com/sri-b"
  }
];
const courses = ["Machine Learning", "Distributed Systems", "Algorithms", "Networks", "OS", "DBMS"];
const techLogos: Record<string, string> = {
  ...Object.fromEntries(skills.map(skill => [skill.name, skill.logo])),
  "Oracle DB": "/portfolio/logos/oracle.svg",
};

type Layout = "timeline" | "focus";

function CompanyLogo({ company, className = "" }: { company: Experience; className?: string }) {
  return <span className={`ex-logo ${className}`} data-company={company.id} aria-hidden="true">
    {/* Local vector brand marks remain sharp at every size and work in the static export. */}

    <img src={assetPath(`/portfolio/logos/${company.id}.svg`)} alt="" width={104} height={34} loading="lazy" />
  </span>;
}

function RoleContent({ role, focused = false }: { role: Experience; focused?: boolean }) {
  return <div className="ex-role-content">
    {focused && <><div className="ex-role-meta"><span className={role.current ? "ex-current" : "ex-past"}>{role.current ? "CURRENT ROLE" : "EXPERIENCE"}</span><span>{role.location}</span></div><h3>{role.role}</h3><div className="ex-role-sub"><a href={role.companyUrl} target="_blank" rel="noopener noreferrer">{role.shortName} <span aria-hidden="true">↗</span></a><span>{role.period}</span></div></>}
    {!focused && <div className="ex-detail-meta"><span>{role.location}</span><a href={role.companyUrl} target="_blank" rel="noopener noreferrer">{role.shortName} <span aria-hidden="true">↗</span></a></div>}
    <ul className="ex-highlights">{role.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
    <div className="ex-stack" aria-label={`Technologies used at ${role.shortName}`}>{role.tech.map(tech => <span key={tech}>{techLogos[tech] && <img src={assetPath(techLogos[tech])} alt="" width={15} height={15} loading="lazy" />}{tech}</span>)}</div>
  </div>;
}

function Education() {
  return <section className="ex-education" aria-labelledby="ex-education-title">
    <div className="ex-education-top"><span className="ex-kicker">EDUCATION / 2022 — 2026</span><span className="ex-education-symbol" aria-hidden="true">◇</span></div>
    <h3 id="ex-education-title">Ramaiah Institute of Technology</h3>
    <p>B.E. Information Science &amp; Engineering</p>
    <div className="ex-education-result"><span>Bengaluru, Karnataka</span><span><strong>9.30</strong> CGPA</span></div>
    <details className="ex-coursework"><summary>Relevant coursework <span aria-hidden="true">+</span></summary><ul>{courses.map(course => <li key={course}>{course}</li>)}</ul></details>
  </section>;
}

function Recognition() {
  return <section className="ex-recognition" id="achievements" aria-labelledby="ex-recognition-title">
    <div className="ex-recognition-heading"><span className="ex-kicker">BEYOND THE ROLE</span><h3 id="ex-recognition-title">Achievements<br /><span>&amp; community.</span></h3></div>
    <ol className="ex-milestones">
      <li><span className="ex-mark"><img src={assetPath("/portfolio/logos/leetcode.svg")} alt="" width={24} height={24} loading="lazy" /></span><div><h4>600+ problems solved</h4><p>Top 8% on LeetCode</p></div><span className="ex-milestone-tag">DSA</span></li>
      <li className="ex-give"><div><img className="ex-give-logo" src={assetPath("/portfolio/logos/morganstanley.svg")} alt="Morgan Stanley" width={100} height={17} loading="lazy" /><h4>Code to Give</h4><p>144 selected from 40k+.<br /><strong>PPO</strong> for exceptional performance.</p></div></li>
      <li><span className="ex-mark ex-line-mark" aria-hidden="true">◇</span><div><h4>Dark Pattern Buster</h4><p>Campus finalist · Govt. of India</p></div></li>
      <li><span className="ex-mark"><img src={assetPath("/portfolio/logos/microsoft.svg")} alt="" width={24} height={24} loading="lazy" /></span><div><h4>Microsoft Learn</h4><p>Student Ambassador<br />Built a campus community</p></div></li>
      <li><span className="ex-mark"><img src={assetPath("/portfolio/logos/cisco.svg")} alt="" width={24} height={24} loading="lazy" /></span><div><h4>Cisco</h4><p>Campus Ambassador</p></div></li>
    </ol>
  </section>;
}

/** A single scroll listener updates CSS properties; React only updates when the active row changes. */
function useTimelineProgress(layout: Layout, paused: boolean, reducedMotion: boolean) {
  const timelineRef = useRef<HTMLOListElement>(null);
  const markerRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const progressRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (layout !== "timeline") return;
    const timeline = timelineRef.current;
    if (!timeline) return;
    let frame = 0;
    let disposed = false;
    const measure = () => {
      frame = 0;
      if (disposed) return;
      const bounds = timeline.getBoundingClientRect();
      const centers = markerRefs.current.map(marker => {
        if (!marker) return 0;
        const rect = marker.getBoundingClientRect();
        return rect.top + rect.height / 2 - bounds.top;
      });
      if (centers.length !== experiences.length) return;
      const start = centers[0];
      const length = Math.max(0, centers[centers.length - 1] - start);
      timeline.style.setProperty("--ex-track-top", `${start}px`);
      timeline.style.setProperty("--ex-track-length", `${length}px`);
      if (!paused && !reducedMotion) {
        const readingLine = window.innerHeight * .42 - bounds.top;
        progressRef.current = Math.max(0, Math.min(length, readingLine - start));
        let nextActive = 0;
        let distance = Infinity;
        centers.forEach((center, index) => {
          const nextDistance = Math.abs(center - readingLine);
          if (nextDistance < distance) { distance = nextDistance; nextActive = index; }
        });
        setActiveIndex(previous => previous === nextActive ? previous : nextActive);
      }
      const progress = Math.min(progressRef.current, length);
      timeline.style.setProperty("--ex-progress", String(length ? progress / length : 0));
      timeline.style.setProperty("--ex-dot-y", `${progress}px`);
    };
    const schedule = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(measure);
    };
    const onScroll = () => { if (!paused && !reducedMotion) schedule(); };
    measure();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    observer?.observe(timeline);
    timeline.querySelectorAll(".ex-timeline-item").forEach(item => observer?.observe(item));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    document.fonts?.ready.then(() => { if (!disposed) schedule(); });
    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [layout, paused, reducedMotion]);
  return { timelineRef, markerRefs, activeIndex };
}

export function ExperienceSection() {
  const [layout, setLayout] = useState<Layout>("timeline");
  const [selected, setSelected] = useState("onsemi");
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(["onsemi"]));
  const { paused, reducedMotion } = usePortfolioMotion();
  const { timelineRef, markerRefs, activeIndex } = useTimelineProgress(layout, paused, reducedMotion);
  const focused = experiences.find(role => role.id === selected) ?? experiences[0];

  const toggle = (id: string) => {
    setExpanded(previous => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    setSelected(id);
  };

  return <section id="experience" className="section shell experience-refined" data-ex-layout={layout} data-ex-motion={paused || reducedMotion ? "off" : "on"} aria-labelledby="ex-title">
    <div className="section-top"><span className="section-number">02 / EXPERIENCE &amp; RECOGNITION</span><span className="tiny-note">LEARNING BY BUILDING</span></div>
    <div className="ex-heading"><div><h2 id="ex-title">Different teams.<br /><span>A growing perspective.</span></h2><p>Across products, research, and AI. A few chapters in the work so far.</p></div><div className="ex-layout-switch" role="group" aria-label="Experience layout"><button type="button" onClick={() => setLayout("timeline")} aria-pressed={layout === "timeline"}><span aria-hidden="true">≡</span>Timeline</button><button type="button" onClick={() => setLayout("focus")} aria-pressed={layout === "focus"}><span aria-hidden="true">▥</span>Career focus</button></div></div>
    <div className="ex-layout"><div className="ex-career-column">
      {layout === "timeline" ? <ol className="ex-timeline" ref={timelineRef} aria-label="Career timeline">
        <li className="ex-track-container" aria-hidden="true"><span className="ex-scroll-track"><span className="ex-progress-fill" /><span className="ex-travel-dot" /></span></li>
        {experiences.map((role, index) => <li key={role.id} className={`ex-timeline-item${activeIndex === index ? " ex-is-active" : ""}${activeIndex > index ? " ex-is-past" : ""}`} data-employer={role.id}>
          <span className="ex-row-marker" aria-hidden="true" ref={element => { markerRefs.current[index] = element; }} />
          <article className="ex-role-card"><h3 className="ex-timeline-heading"><button type="button" className="ex-role-toggle" aria-expanded={expanded.has(role.id)} aria-controls={`ex-details-${role.id}`} onClick={() => toggle(role.id)}><CompanyLogo company={role} /><span className="ex-summary-copy"><strong>{role.role}</strong><span>{role.shortName}{role.current && <i className="ex-current-label">Current</i>}</span></span><span className="ex-summary-period">{role.period}</span><span className="ex-expand" aria-hidden="true">+</span></button></h3><div id={`ex-details-${role.id}`} className="ex-role-details" hidden={!expanded.has(role.id)}><RoleContent role={role} /></div></article>
        </li>)}
      </ol> : <div className="ex-career-board"><div className="ex-company-rail" role="group" aria-label="Choose an employer">{experiences.map(role => <button type="button" key={role.id} className="ex-company" onClick={() => setSelected(role.id)} aria-pressed={selected === role.id} aria-controls="ex-focused-role"><CompanyLogo company={role} /><span><strong>{role.shortName}</strong><small>{role.shortRole}</small></span><b aria-hidden="true">↗</b></button>)}</div><div className="ex-focused-role" id="ex-focused-role" key={focused.id}><RoleContent role={focused} focused /></div></div>}
      <p className="ex-career-note"><span aria-hidden="true">↳</span>{layout === "timeline" ? "Follow the journey. Expand a role to explore the work." : "Select a company to explore the work."}</p>
    </div><aside className="ex-sidebar" aria-label="Education and recognition"><Education /><Recognition /></aside></div>
  </section>;
}
