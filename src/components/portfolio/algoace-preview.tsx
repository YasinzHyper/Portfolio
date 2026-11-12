"use client";

import { Fragment, useEffect, useId, useRef, useState } from "react";
import { assetPath } from "@/lib/portfolio-assets";
import { usePortfolioMotion } from "@/components/portfolio/motion-provider";

const topics = {
  arrays: { name: "Arrays", subtitle: "The foundations", label: "ARRAYS", title: "Find the pair that adds up.", question: "Given an array and a target, how can you find two values whose sum equals the target?", lead: "Remember what you have seen.", reasoning: "For each number, look for its complement: target − number. Store previously seen values in a hash map. This turns a repeated search into one pass through the array.", complexity: "Time O(n) · Additional space O(n)", graphic: "An array of 2, 7, 11 and 15, with 2 and 7 highlighted to make target 9." },
  graphs: { name: "Graphs", subtitle: "Explore connections", label: "GRAPHS", title: "Find the shortest path.", question: "In an unweighted graph, how would you find the fewest edges between two nodes?", lead: "Think in layers.", reasoning: "Breadth-first search explores one distance level at a time. A queue makes sure every node at distance d is explored before distance d + 1. Record each node’s predecessor to reconstruct the route.", complexity: "Time O(V + E) · Additional space O(V)", graphic: "A graph with a highlighted shortest path from A to D through B and C." },
  dynamic: { name: "Dynamic programming", subtitle: "Break it down", label: "DYNAMIC PROGRAMMING", title: "Build on a smaller answer.", question: "You can climb one or two steps at a time. How many different ways can you reach the top?", lead: "Two possibilities for the last step.", reasoning: "The final move arrives from either the previous step or the step before it: ways(n) = ways(n − 1) + ways(n − 2). Start with ways(0) = 1 and ways(1) = 1. Keep only the last two results.", complexity: "Time O(n) · Additional space O(1)", graphic: "A staircase annotated with 1, 2, 3 and 5 possible routes." },
} as const;
type Topic = keyof typeof topics;
type Theme = "light" | "dark";
type View = "experience" | "screens" | "architecture";
const screens: Record<string, { title: string; themes: Theme[]; description: string }> = {
  home: { title: "Home", themes: ["light", "dark"], description: "A clear starting point for roadmaps, curated problems, and progress tracking." },
  dashboard: { title: "Dashboard", themes: ["light", "dark"], description: "A personal overview of practice, an active roadmap, and the next topics to work on." },
  practice: { title: "Practice", themes: ["light"], description: "Mock interviews and timed coding challenges, informed by the topics that need attention." },
  roadmap: { title: "Roadmap", themes: ["light", "dark"], description: "A personalized learning roadmap with weekly progress, topics to focus on, and an AI coach review." },
};

function TopicDiagram({ topic }: { topic: Topic }) {
  if (topic === "arrays") return <svg viewBox="0 0 420 180" aria-hidden="true"><g className="aa-block">{[2, 7, 11, 15].map((value, index) => <rect key={value} className={index < 2 ? "hit" : ""} x={15 + index * 103} y="50" width="80" height="75" rx="10" />)}</g><g textAnchor="middle" fontSize="26" fontFamily="Consolas,monospace">{[2, 7, 11, 15].map((value, index) => <text key={value} x={55 + index * 103} y="97">{value}</text>)}</g><path className="aa-path-line" d="M55 42 V27 H158 V42" fill="none" strokeWidth="2" /><text x="210" y="160" textAnchor="middle" fontSize="12" fontFamily="Consolas,monospace">target = 9 / 2 + 7</text></svg>;
  if (topic === "dynamic") return <svg viewBox="0 0 420 180" aria-hidden="true"><path className="aa-graph-edge" d="M25 138 H105 V108 H185 V78 H265 V48 H345 V18 H400" fill="none" strokeWidth="3" /><path className="aa-path-line" d="M65 115 Q85 73 145 88 Q165 42 225 58 Q245 12 305 28" fill="none" strokeWidth="2" /><g textAnchor="middle" fontSize="22" fontFamily="Consolas,monospace">{[1, 2, 3, 5].map((value, index) => <text key={value} x={65 + index * 80} y={128 - index * 30}>{value}</text>)}</g><text x="210" y="166" textAnchor="middle" fontSize="11" fontFamily="Consolas,monospace">previous answer + the one before it</text></svg>;
  const nodes = [[45, 85, "A"], [150, 35, "B"], [270, 45, "C"], [375, 85, "D"], [150, 140, "E"], [270, 130, "F"]] as const;
  return <svg viewBox="0 0 420 180" aria-hidden="true"><path className="aa-graph-edge" d="M45 85 L150 35 L270 45 L375 85 M45 85 L150 140 L270 130 L375 85 M150 35 L150 140 M270 45 L270 130" fill="none" strokeWidth="2" /><path className="aa-path-line" d="M45 85 L150 35 L270 45 L375 85" fill="none" strokeWidth="3" /><g className="aa-node" strokeWidth="2">{nodes.map(([x, y, label]) => <circle key={label} cx={x} cy={y} r="19" />)}</g><g fontSize="13" textAnchor="middle" fontFamily="Arial">{nodes.map(([x, y, label]) => <text key={label} x={x} y={y + 5}>{label}</text>)}</g></svg>;
}

export function AlgoAcePreview() {
  const [topic, setTopic] = useState<Topic>("graphs");
  const [reasoningOpen, setReasoningOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [view, setView] = useState<View>("experience");
  const [screen, setScreen] = useState("home");
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const zoomTrigger = useRef<HTMLButtonElement>(null);
  const { paused, reducedMotion } = usePortfolioMotion();
  const id = useId();
  const current = topics[topic];
  const capture = screens[screen];
  const imageTheme = capture.themes.includes(theme) ? theme : capture.themes[0];
  const imageSrc = assetPath(`/portfolio/screenshots/algoace-${screen}-${imageTheme}.png`);
  const imageAlt = `AlgoAce ${capture.title.toLowerCase()} screen in its ${imageTheme} theme`;
  const caption = `${capture.title} · ${imageTheme === "light" ? "Light" : "Dark"} theme`;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "80px" });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return <div ref={rootRef} className="aa-preview" data-aa-theme={theme} data-motion={paused || reducedMotion || !inView ? "paused" : "running"}>
    <div className="aa-topbar"><div className="aa-brand"><span aria-hidden="true">‹/›</span><strong>AlgoAce<small>DSA, made personal.</small></strong></div><button className="aa-theme-toggle" type="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={`Switch AlgoAce preview to ${theme === "light" ? "dark" : "light"} theme`}>◐ <span>{theme === "light" ? "Dark" : "Light"}</span></button></div>
    <div className="aa-view-tabs" role="group" aria-label="AlgoAce preview view">{([["experience", "Experience"], ["screens", "Actual UI"], ["architecture", "Under the hood"]] as const).map(([key, label]) => <button key={key} type="button" aria-pressed={view === key} aria-controls={`${id}-${key}`} onClick={() => setView(key)}>{label}{key === "screens" && <span aria-hidden="true">↗</span>}</button>)}</div>
    <div id={`${id}-experience`} className="aa-experience aa-view" hidden={view !== "experience"}>
      <div className="aa-learning-sidebar"><span className="aa-kicker">YOUR NEXT CHAPTER</span><h4>Build understanding.<br /><em>One idea at a time.</em></h4><p>A guided path from a learning goal to your next breakthrough.</p><div className="aa-learning-path" role="group" aria-label="Choose an AlgoAce sample topic">{(Object.keys(topics) as Topic[]).map((key, index) => <Fragment key={key}>{index > 0 && <i aria-hidden="true" />}<button type="button" aria-pressed={topic === key} onClick={() => { setTopic(key); setReasoningOpen(false); }}><span>{`0${index + 1}`}</span><span className="aa-topic-name">{topics[key].name}<small>{topics[key].subtitle}</small></span><b aria-hidden="true">{topic === key ? "→" : index === 0 ? "✓" : "＋"}</b></button></Fragment>)}</div><div className="aa-roadmap-note"><span aria-hidden="true">⌁</span><span>Your roadmap.<br /><strong>Your next step.</strong></span></div></div>
      <div className="aa-question"><div className="aa-question-meta"><span>{current.label}</span><span>GUIDED EXAMPLE</span></div><h4>{current.title}</h4><p>{current.question}</p><div className="aa-diagram" role="img" aria-label={current.graphic}><TopicDiagram topic={topic} /></div><button className="aa-explain" type="button" aria-expanded={reasoningOpen} aria-controls={`${id}-reasoning`} onClick={() => setReasoningOpen(!reasoningOpen)}>{reasoningOpen ? "Hide the reasoning" : "Explore the reasoning"}<span aria-hidden="true">{reasoningOpen ? "−" : "↗"}</span></button><div id={`${id}-reasoning`} className="aa-reasoning" hidden={!reasoningOpen}><strong>{current.lead}</strong>{current.reasoning}<code>{current.complexity}</code></div><div className="aa-feature-pills"><span>Personalized roadmap</span><span>AI coaching</span><span>Interview practice</span></div></div>
    </div>
    <div id={`${id}-screens`} className="aa-view aa-screens" hidden={view !== "screens"}>
      <div className="aa-screen-intro"><span className="aa-kicker">INSIDE THE REAL PRODUCT</span><h4>From a goal.<br /><em>To a daily practice.</em></h4><p>Explore the AlgoAce interface.</p></div>
      <div className="aa-screen-tabs" role="group" aria-label="Choose an actual AlgoAce screen">{Object.entries(screens).map(([key, capture]) => <button key={key} type="button" aria-pressed={screen === key} onClick={() => setScreen(key)}>{capture.title}</button>)}</div>
      <figure className="aa-screenshot"><button ref={zoomTrigger} type="button" onClick={() => dialogRef.current?.showModal()} aria-label="Enlarge actual AlgoAce screenshot"><img src={imageSrc} alt={imageAlt} width="1918" height="910" loading="lazy" /><span className="aa-zoom-badge">Explore full screen <b aria-hidden="true">↗</b></span></button><figcaption><span>{caption}</span><span>PRODUCT SCREENSHOT</span></figcaption></figure><p className="aa-screen-description">{capture.description}</p>{!capture.themes.includes(theme) && <p className="aa-available-note">This {capture.title.toLowerCase()} capture is available in {imageTheme} mode.</p>}
    </div>
    <div id={`${id}-architecture`} className="aa-view aa-architecture" hidden={view !== "architecture"}><div className="aa-architecture-heading"><span className="aa-kicker">HOW THE PIECES CONNECT</span><h4>One learning goal.<br /><em>A coordinated system.</em></h4><p>A conceptual view of the multi-agent RAG workflow.</p></div><div className="aa-system-flow">{[["01 / INTERFACE", "Next.js + React", "Learning goals and context"], ["02 / ORCHESTRATION", "FastAPI + CrewAI", "Coordinate retrieval and explanations"], ["03 / CONTEXT", "Supabase + PostgreSQL", "Authentication and application data"], ["04 / EXPERIENCE", "Personalized practice", "Questions, coaching, and feedback"]].map(([label, title, description], index) => <Fragment key={label}>{index > 0 && <i aria-hidden="true">↓</i>}<div className={index === 3 ? "aa-flow-output" : undefined}><small>{label}</small><strong>{title}</strong><p>{description}</p></div></Fragment>)}</div></div>
    <div className="aa-bottomline"><span className="aa-live-dot" aria-hidden="true" /><span>{view === "experience" ? "Interactive learning example" : view === "screens" ? "Actual product screenshots" : "Conceptual project architecture"}</span><a href="https://algoace-dev.vercel.app/" target="_blank" rel="noopener noreferrer">Open AlgoAce ↗</a></div>
    <dialog ref={dialogRef} className="aa-zoom-dialog" aria-labelledby={`${id}-zoom-title`} onClose={() => zoomTrigger.current?.focus()} onClick={event => { if (event.target !== event.currentTarget) return; const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close(); }}><div className="aa-zoom-toolbar"><div><span>ALGOACE / PRODUCT SCREEN</span><h3 id={`${id}-zoom-title`}>{caption}</h3></div><button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close AlgoAce screenshot">Close ×</button></div><img src={imageSrc} alt={imageAlt} width="1918" height="910" /><p className="aa-zoom-footer"><span>A closer look at the working product.</span><a href={imageSrc} target="_blank" rel="noopener noreferrer">Open full-resolution image ↗</a></p></dialog>
  </div>;
}
