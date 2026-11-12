"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AlgoAcePreview } from "@/components/portfolio/algoace-preview";
import { SchemafitPreview } from "@/components/portfolio/schemafit-preview";
import { OssreadyPreview } from "@/components/portfolio/ossready-preview";
import { useProjectSelection } from "@/components/portfolio/project-selection";
import { assetPath } from "@/lib/portfolio-assets";

const featured = {
  algoace: {
    name: "AlgoAce", category: "FULL-STACK / MULTI-AGENT RAG", title: <>A more personal<br />way to <em>learn.</em></>,
    description: "AlgoAce brings personalized roadmaps, algorithm practice, mock interviews, and progress tracking into one learning experience.",
    tags: ["Next.js", "TypeScript", "FastAPI", "CrewAI", "Supabase"],
    source: "https://github.com/YasinzHyper/AlgoAce", demo: "https://algoace-dev.vercel.app/",
    summary: "A multi-agent RAG learning platform for personalized interview preparation, recommendations, explanations, and feedback.",
    details: ["Specialized agents collaborate on question generation and stepwise explanations.", "FastAPI serves the backend and evaluation traces; Next.js and React power the interface.", "Supabase provides authentication and application data, with PostgreSQL underneath.", "The problem recommendation engine curates LeetCode problems, reducing user search time by 60%.", "The analytics dashboard visualizes progress, improving challenge completion rates by 40%."],
    fullStack: ["Next.js", "TypeScript", "React", "TailwindCSS", "FastAPI", "Python", "CrewAI", "Supabase", "PostgreSQL", "Vercel"],
  },
  schemafit: {
    name: "schemafit", category: "OPEN SOURCE / DEVELOPER TOOLS", title: <>Catch the mismatch.<br /><em>Before the API does.</em></>,
    description: "schemafit checks JSON Schemas against the structured-output rules of OpenAI, Anthropic, and Gemini. Clear findings, right in your terminal or CI.",
    tags: ["TypeScript", "Node.js", "JSON Schema", "Vitest"], source: "https://github.com/YasinzHyper/schemafit", demo: undefined,
    summary: "An open-source CLI and library for catching JSON Schema compatibility issues before they reach an LLM API.",
    details: ["Separate rule sets for OpenAI strict mode, Anthropic, and Gemini cover optional properties, recursion, constraints, formats, and size limits.", "Every rule cites provider documentation and its verification date; undocumented or risky constructs produce explanatory warnings.", "Finds schemas inside OpenAI tools and response_format, Anthropic tools, and MCP tool definitions.", "Each finding includes a JSON Pointer path and a concrete fix hint.", "Pretty or JSON output, stdin, meaningful exit codes, and --max-warnings support CI workflows.", "A typed lint API supports portability checks in tests. The package has zero runtime dependencies and a Vitest suite for each provider and the CLI."],
    fullStack: ["TypeScript", "Node.js", "JSON Schema", "Vitest", "GitHub Actions"],
  },
  ossready: {
    name: "ossready", category: "OPEN SOURCE / DEVELOPER EXPERIENCE", title: <>Good foundations.<br /><em>One command away.</em></>,
    description: "ossready scaffolds the essentials around a TypeScript project: licensing, contribution guides, CI, release workflows, and repository hygiene.",
    tags: ["TypeScript", "Node.js", "GitHub Actions", "Vitest"], source: "https://github.com/YasinzHyper/ossready", demo: undefined,
    summary: "A TypeScript CLI that gives a public repository the documentation, policies, and workflows it needs from the start.",
    details: ["One command scaffolds 17 files around a TypeScript project that builds.", "Includes GitHub Actions CI, a tag-triggered release workflow, CODEOWNERS, and weekly Dependabot updates for npm and Actions.", "Generates LICENSE, README, CONTRIBUTING, CHANGELOG, SECURITY, and CODE_OF_CONDUCT from project metadata.", "Supports MIT or Apache-2.0 licensing, and npm, pnpm, or bun.", "Use --dry-run to inspect the file plan and --force for deliberate overwrites.", "The publish workflow tests, builds, and releases to npm with provenance."],
    fullStack: ["TypeScript", "Node.js", "Vitest", "GitHub Actions"],
  },
};
const additional = {
  primeestate: { name: "PrimeEstate", symbol: "⌂", category: "FULL-STACK / WEB", summary: "Property discovery, search, and real-time conversations.", source: "https://github.com/YasinzHyper/PrimeEstate", demo: "https://prime-estate-rho.vercel.app/", details: ["A property marketplace with search, chat, and role-based dashboards.", "React and Vite power the interface, with a Node/Express API, Prisma, and MongoDB.", "Socket.io supports real-time conversations."], fullStack: ["React", "JavaScript", "Vite", "TailwindCSS", "Node.js", "Express.js", "Prisma", "MongoDB", "Socket.io"] },
  intellicam: { name: "IntelliCam", symbol: "◉", category: "MOBILE / ON-DEVICE AI", summary: "Real-time object detection, right on your device.", source: "https://github.com/YasinzHyper/IntelliCam", demo: undefined, details: ["A Flutter app that runs TensorFlow Lite models on-device for real-time object detection and classification.", "An optimized camera pipeline keeps inference local, without network latency.", "A Material 3 interface designed for mobile."], fullStack: ["Flutter", "Dart", "TensorFlow Lite"] },
  darkguardian: { name: "DarkGuardian", symbol: "◇", category: "AI / BROWSER EXTENSION", summary: "Helping people recognize dark patterns across the web.", source: "https://github.com/sathya-pramodh/DarkGuardian", demo: undefined, details: ["A Chrome extension and Flask service that detect and classify dark patterns in e-commerce websites.", "Beautiful Soup 4 extracts page content for processing.", "Fine-tuned BERT and LLAMA models support detection and classification."], fullStack: ["React", "TypeScript", "Flask", "Python"] },
};
const notes = { ...featured, ...additional };
type FeaturedId = keyof typeof featured;
type NotesId = keyof typeof notes;
const logoSlugs: Record<string, string> = { "Next.js": "nextdotjs", TypeScript: "typescript", React: "react", TailwindCSS: "tailwindcss", FastAPI: "fastapi", Python: "python", CrewAI: "crewai", Supabase: "supabase", PostgreSQL: "postgresql", Vercel: "vercel", "Node.js": "nodedotjs", JavaScript: "javascript", Vite: "vite", "Express.js": "express", MongoDB: "mongodb", "Socket.io": "socketdotio", Flutter: "flutter", Dart: "dart", "TensorFlow Lite": "tensorflow", Flask: "flask" };

function Stack({ items }: { items: readonly string[] }) {
  return <div className="project-stack">{items.map(name => <span key={name}>{logoSlugs[name] && <img src={assetPath(`/portfolio/logos/${logoSlugs[name]}.svg`)} alt="" width="13" height="13" loading="lazy" />}{name}</span>)}</div>;
}

export function ProjectsSection() {
  const { project, selectProject } = useProjectSelection();
  const [selectedNotes, setSelectedNotes] = useState<NotesId | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const notesTrigger = useRef<HTMLButtonElement | null>(null);
  const id = useId();
  const note = notes[selectedNotes ?? project];

  useEffect(() => {
    let frame = 0;
    const readHash = () => {
      const key = window.location.hash.replace("#project-", "");
      if (!window.location.hash.startsWith("#project-") || !(key in featured)) return;
      selectProject(key as FeaturedId);
      frame = requestAnimationFrame(() => document.getElementById("projects")?.scrollIntoView({ behavior: "instant", block: "start" }));
    };
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("hashchange", readHash); };
  }, [selectProject]);

  useEffect(() => { if (selectedNotes && !dialog.current?.open) dialog.current?.showModal(); }, [selectedNotes]);

  return <section id="projects" className="section shell projects-section" aria-labelledby="projects-title">
    <div className="section-top"><span className="section-number">04 / SELECTED WORK</span><span className="tiny-note">IDEAS MADE TANGIBLE</span></div>
    <div className="section-title"><h2 id="projects-title">Built with intent.<br /><span>Made to be used.</span></h2><p>Products for learning. Tools for building. Explore the experience, then look under the hood.</p></div>
    <div className="project-tabs" role="group" aria-label="Featured project">{(Object.keys(featured) as FeaturedId[]).map((key, index) => <button type="button" key={key} aria-pressed={project === key} aria-controls={`project-${key}`} onClick={() => selectProject(key)}><small>0{index + 1}</small>{featured[key].name}<span aria-hidden="true">↗</span></button>)}</div>
    {(Object.keys(featured) as FeaturedId[]).map(key => { const data = featured[key]; return <article className="project-panel" id={`project-${key}`} key={key} hidden={project !== key} aria-label={data.name}>
      <div className="project-copy"><span className="project-category">{data.category}</span><h3>{data.title}</h3><p>{data.description}</p><Stack items={data.tags} /><div className="project-links">{data.demo && <a href={data.demo} target="_blank" rel="noopener noreferrer">Live project ↗</a>}<a href={data.source} target="_blank" rel="noopener noreferrer">{data.demo ? "Source ↗" : "Explore the source ↗"}</a></div><button className="project-notes-button" type="button" onClick={event => { notesTrigger.current = event.currentTarget; setSelectedNotes(key); }}>Read the build notes <span aria-hidden="true">+</span></button></div>
      {key === "algoace" ? <AlgoAcePreview /> : key === "schemafit" ? <SchemafitPreview /> : <OssreadyPreview />}
    </article>; })}
    <div className="other-work-head"><h3>More things I’ve made.</h3><span>A LITTLE MORE RANGE</span></div>
    <div className="other-work" id="more-projects">{(Object.keys(additional) as (keyof typeof additional)[]).map(key => { const data = additional[key]; return <article id={`more-project-${key}`} key={key}><span className="work-symbol" aria-hidden="true">{data.symbol}</span><div><span className="other-category">{data.category}</span><h4>{data.name}</h4><p>{data.summary}</p><div className="other-links"><button className="other-card-trigger" type="button" aria-label={`Read ${data.name} project details`} aria-haspopup="dialog" aria-controls={`${id}-notes`} onClick={event => { notesTrigger.current = event.currentTarget; setSelectedNotes(key); }}>Details +</button><a href={data.source} target="_blank" rel="noopener noreferrer" aria-label={`${data.name} source on GitHub`}>Source ↗</a>{data.demo && <a href={data.demo} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${data.name}`}>Live ↗</a>}</div></div></article>; })}</div>
    <dialog ref={dialog} id={`${id}-notes`} className="project-dialog" aria-labelledby={`${id}-title`} aria-describedby={`${id}-summary`} onClose={() => { setSelectedNotes(null); notesTrigger.current?.focus(); }} onClick={event => { if (event.target !== event.currentTarget) return; const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close(); }}>
      <div className="project-dialog-top"><span className="section-number">BEHIND THE BUILD</span><button type="button" aria-label="Close project notes" onClick={() => dialog.current?.close()}>Close ×</button></div><h2 id={`${id}-title`}>{note.name}</h2><p id={`${id}-summary`} className="project-dialog-intro">{note.summary}</p><ul>{note.details.map(detail => <li key={detail}>{detail}</li>)}</ul><Stack items={note.fullStack} /><div className="project-dialog-links"><a className="button primary" href={note.source} target="_blank" rel="noopener noreferrer">Explore the source ↗</a>{note.demo && <a href={note.demo} target="_blank" rel="noopener noreferrer">Visit the project ↗</a>}</div>
    </dialog>
  </section>;
}
