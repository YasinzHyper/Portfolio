"use client";

import { useState } from "react";
import skillData from "@/data/portfolio-skills.json";
import { assetPath } from "@/lib/portfolio-assets";
import { useProjectSelection, type ProjectId } from "@/components/portfolio/project-selection";
import { usePortfolioMotion } from "@/components/portfolio/motion-provider";
import { Reveal } from "@/components/portfolio/reveal";

const categories = ["All", "Languages", "Web/Frontend", "Backend", "Mobile", "AI/ML", "Cloud", "Databases", "DevTools"];
const projectIds: Record<string, ProjectId> = { AlgoAce: "algoace", schemafit: "schemafit", ossready: "ossready" };
const descriptions: Record<string, string> = {
  TypeScript: "Typed interfaces and tooling across my web projects and open-source CLIs.",
  Python: "Application logic, AI workflows, and APIs behind my learning and browser-extension projects.",
  "Next.js": "The application framework behind AlgoAce’s learning experience.",
  React: "Interactive product interfaces, from personalized learning to property discovery.",
  FastAPI: "Python APIs behind AlgoAce’s multi-agent learning workflows.",
  CrewAI: "Coordinating specialized agents in AlgoAce’s personalized learning experience.",
  Supabase: "Authentication and data foundations for AlgoAce.",
  PostgreSQL: "Relational data behind AlgoAce and part of my full-stack engineering toolkit.",
  "Node.js": "The runtime behind my open-source CLIs and the PrimeEstate backend.",
  "TensorFlow Lite": "On-device inference for IntelliCam’s real-time object detection.",
  Flutter: "Cross-platform mobile interfaces for IntelliCam.",
  Git: "Version control and collaboration across my software projects.",
};

export function SkillsSection() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState("TypeScript");
  const { selectProject } = useProjectSelection();
  const { paused } = usePortfolioMotion();
  const visible = skillData.filter(skill => category === "All" || skill.category === category);
  const skill = skillData.find(item => item.name === selected)!;
  function filter(next: string) {
    setCategory(next);
    const list = skillData.filter(item => next === "All" || item.category === next);
    if (!list.some(item => item.name === selected)) setSelected(list[0].name);
  }
  function explore(name: string) {
    const id = projectIds[name];
    if (id) selectProject(id);
    document.getElementById(id ? "projects" : "more-projects")?.scrollIntoView({ behavior: paused ? "instant" : "smooth", block: "start" });
  }
  return <section id="skills" className="section skills-section" aria-labelledby="skills-title"><div className="shell">
    <Reveal><div className="section-top"><span className="section-number">03 / SKILLS & TOOLS</span><span className="tiny-note">A TOOLKIT, NOT A SCORECARD</span></div><div className="section-title"><h2 id="skills-title">The right tools.<br/><span>For the right problem.</span></h2><p>Across interfaces, infrastructure, AI, and mobile. Pick a technology to see where it connects to my work.</p></div></Reveal>
    <div className="skill-filter" role="group" aria-label="Filter skills by category">{categories.map(item => <button key={item} onClick={() => filter(item)} aria-pressed={category === item}>{item === "Web/Frontend" ? "Frontend" : item}</button>)}</div>
    <div className="skills-layout"><div className="skill-grid">{visible.map(item => <button key={item.name} className="skill-tile" onClick={() => setSelected(item.name)} aria-pressed={selected === item.name} aria-label={`${item.name} — see project connections`}><span className="skill-glyph"><img src={assetPath(item.logo)} alt="" width="25" height="25" loading="lazy"/></span><span>{item.name}</span></button>)}</div>
      <aside className="skill-context" aria-live="polite"><span className="context-label">IN PRACTICE</span><div className="skill-emblem"><img src={assetPath(skill.logo)} alt="" width="32" height="32" /></div><h3>{skill.name}</h3><p>{descriptions[skill.name] ?? `${skill.name} is part of my ${skill.category.toLowerCase()} toolkit.`}</p><div className="context-projects">{skill.projects.length ? skill.projects.map(name => <button key={name} onClick={() => explore(name)}>{name} <span aria-hidden="true">↗</span></button>) : <span>Across my engineering toolkit</span>}</div><a className="text-link" href="#projects">Explore the work <span aria-hidden="true">↗</span></a></aside>
    </div><p className="skill-count" aria-live="polite">{visible.length} technologies shown{category === "All" ? " · Select one to explore its connections." : ` · ${category}`}</p>
  </div></section>;
}
