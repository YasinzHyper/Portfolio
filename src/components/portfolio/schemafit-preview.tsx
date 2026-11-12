"use client";

import { useEffect, useId, useRef, useState } from "react";
import { assetPath } from "@/lib/portfolio-assets";
import { usePortfolioMotion } from "@/components/portfolio/motion-provider";

const providers = {
  openai: { name: "OpenAI", logo: "openai", mode: "STRICT MODE", result: "5 errors", warnings: "3 warnings", mark: "×", badge: "REVIEW NEEDED", severity: "error", rules: ["openai/all-required", "openai/unsupported-format"], path: "M300 293 V321 Q300 338 283 338 H140 Q123 338 123 355 V382" },
  anthropic: { name: "Anthropic", logo: "anthropic", mode: "TOOL SCHEMAS", result: "9 errors", warnings: "1 warning", mark: "×", badge: "REVIEW NEEDED", severity: "error", rules: ["anthropic/no-recursive-schemas", "anthropic/no-numeric-constraints"], path: "M300 293 V382" },
  gemini: { name: "Gemini", logo: "googlegemini", mode: "STRUCTURED OUTPUT", result: "Compatible", warnings: "5 warnings", mark: "✓", badge: "WITH WARNINGS", severity: "warn", rules: ["gemini/undocumented-keyword"], path: "M300 293 V321 Q300 338 317 338 H460 Q477 338 477 355 V382" },
} as const;
type Provider = keyof typeof providers;

export function SchemafitPreview() {
  const [provider, setProvider] = useState<Provider>("openai");
  const [replayKey, setReplayKey] = useState(0);
  const [replaying, setReplaying] = useState(false);
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const pointerFrame = useRef<number>(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { paused, reducedMotion } = usePortfolioMotion();
  const traceId = useId().replace(/:/g, "");
  const motionAllowed = !paused && !reducedMotion && inView;
  const example = providers[provider];

  function replay() {
    if (!motionAllowed) return;
    if (timer.current) clearTimeout(timer.current);
    setReplaying(true);
    setReplayKey(value => value + 1);
    timer.current = setTimeout(() => setReplaying(false), 1800);
  }
  function resetTilt() {
    cancelAnimationFrame(pointerFrame.current);
    sceneRef.current?.style.setProperty("--sf-tilt-x", "0deg");
    sceneRef.current?.style.setProperty("--sf-tilt-y", "0deg");
  }
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "80px" });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);
  useEffect(() => { if (!motionAllowed) resetTilt(); }, [motionAllowed]);
  useEffect(() => () => { cancelAnimationFrame(pointerFrame.current); if (timer.current) clearTimeout(timer.current); }, []);

  return <div ref={rootRef} className={`sf-preview${replaying ? " sf-replaying" : ""}`} data-sf-provider={provider} data-motion={motionAllowed ? "running" : "paused"}>
    <div className="sf-topbar"><span><i aria-hidden="true" />SCHEMA COMPATIBILITY</span><button type="button" onClick={replay} disabled={!motionAllowed} aria-label="Replay schemafit pipeline animation">Trace the flow <span aria-hidden="true">↻</span></button></div>
    <div className="sf-scene" ref={sceneRef} onPointerMove={event => { if (!motionAllowed || event.pointerType === "touch") return; const rect = event.currentTarget.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width - .5; const y = (event.clientY - rect.top) / rect.height - .5; cancelAnimationFrame(pointerFrame.current); pointerFrame.current = requestAnimationFrame(() => { sceneRef.current?.style.setProperty("--sf-tilt-x", `${-y * 4}deg`); sceneRef.current?.style.setProperty("--sf-tilt-y", `${x * 5}deg`); }); }} onPointerLeave={resetTilt}>
      <div className="sf-scene-grid" aria-hidden="true" />
      {[["one", "01", "DEFINE"], ["two", "02", "CHECK"], ["three", "03", "ADAPT"]].map(([name, number, label]) => <div key={name} className={`sf-stage-label sf-label-${name}`} aria-hidden="true"><b>{number}</b><span>{label}</span></div>)}
      <svg key={replayKey} className="sf-connections" viewBox="0 0 600 450" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id={traceId} gradientUnits="userSpaceOnUse" x1="300" y1="151" x2="300" y2="195"><stop offset="0" stopColor="#bcafff" /><stop offset="1" stopColor="#74e4d3" /></linearGradient></defs><path className="sf-main-trace" d="M300 151 V195" style={{ stroke: `url(#${traceId})` }} />{(Object.keys(providers) as Provider[]).map(key => <path key={key} className={`sf-route${provider === key ? " is-active" : ""}`} d={providers[key].path} />)}<path className="sf-travel" d="M300 151 V195" /></svg>
      <div className="sf-input-plate sf-plate"><div className="sf-file-header"><span className="sf-file-glyph" aria-hidden="true">{"{ }"}</span><span>ticket.json</span><small>JSON SCHEMA</small></div><code><span className="sf-code-line"><i>01</i><b>{"{"}</b></span><span className="sf-code-line"><i>02</i>{"  "}<em>{'"type"'}</em>: <strong>{'"object"'}</strong>,</span><span className="sf-code-line"><i>03</i>{"  "}<em>{'"properties"'}</em>: <b>{"{ … }"}</b>,</span><span className="sf-code-line"><i>04</i>{"  "}<em>{'"required"'}</em>: <b>[ … ]</b></span><span className="sf-code-line"><i>05</i><b>{"}"}</b></span></code><span className="sf-plate-edge" aria-hidden="true" /></div>
      <div className="sf-engine-wrap"><div className="sf-engine-base" aria-hidden="true" /><div className="sf-engine sf-plate">{["tl", "tr", "bl", "br"].map(corner => <span key={corner} className={`sf-engine-pin sf-pin-${corner}`} aria-hidden="true" />)}<span className="sf-engine-kicker">ONE SCHEMA. THREE RULE SETS.</span><strong>schemafit<span>.</span></strong><span className="sf-engine-footer"><i aria-hidden="true" /> COMPATIBILITY ENGINE</span><div className="sf-engine-sheen" aria-hidden="true" /></div></div>
      <div className="sf-provider-row" role="group" aria-label="Choose schemafit provider output">{(Object.keys(providers) as Provider[]).map(key => { const entry = providers[key]; return <button key={key} type="button" aria-pressed={provider === key} onClick={() => { setProvider(key); replay(); }}><span className={`sf-provider-logo${key === "gemini" ? " sf-gemini-logo" : ""}`}><img src={assetPath(`/portfolio/logos/${entry.logo}.svg`)} alt="" width="23" height="23" /></span><strong>{entry.name}</strong><span className="sf-provider-mode">{entry.mode}</span><i aria-hidden="true" /></button>; })}</div>
    </div>
    <div className="sf-terminal" aria-live="polite" aria-atomic="true"><div className="sf-terminal-top"><span aria-hidden="true"><i /><i /><i /></span><span>EXAMPLE OUTPUT</span><span>{example.name.toUpperCase()}</span></div><div className="sf-terminal-body"><code className="sf-command"><span>$</span> npx schemafit examples/ticket.json</code><div className="sf-result-summary"><span className="sf-result-mark" aria-hidden="true">{example.mark}</span><strong>{example.result} <span>· {example.warnings}</span></strong><span className="sf-result-badge">{example.badge}</span></div><div className="sf-findings">{example.rules.map(rule => <div key={rule}><span>{example.severity}</span><code>{rule}</code></div>)}</div></div></div>
    <p className="sf-caption"><span aria-hidden="true">↳</span> Same input. Provider-specific findings.<small>Illustrative output. Explore the source for the complete rules and CLI.</small></p>
  </div>;
}
