"use client";

import { useEffect, useRef, useState } from "react";
import { usePortfolioMotion } from "@/components/portfolio/motion-provider";

const files = [
  ["README.md", "Project overview"],
  ["LICENSE", "License"],
  ["CONTRIBUTING.md", "Contributor guide"],
  ["CODE_OF_CONDUCT.md", "Community"],
  ["SECURITY.md", "Security policy"],
  [".github/workflows/ci.yml", "Continuous integration"],
  [".github/workflows/release.yml", "Release workflow"],
  [".github/ISSUE_TEMPLATE/bug_report.yml", "Issue template"],
] as const;

export function OssreadyPreview() {
  const [name, setName] = useState("my-next-idea");
  const [visible, setVisible] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { paused, reducedMotion } = usePortfolioMotion();
  const slug = name.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "") || "my-next-idea";

  useEffect(() => {
    if (!running) return;
    if (paused || reducedMotion) { setVisible(files.length); setRunning(false); return; }
    if (visible >= files.length) { setRunning(false); return; }
    timer.current = setTimeout(() => setVisible(value => value + 1), 130);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [running, visible, paused, reducedMotion]);

  return <div className="oss-preview">
    <div className="oss-toolbar"><span><i aria-hidden="true" />ossready</span><span>REPOSITORY ESSENTIALS</span></div>
    <div className="oss-story"><span className="oss-kicker">FROM EMPTY FOLDER</span><h4>Ready for<br /><em>the open.</em></h4><span className="oss-star" aria-hidden="true">✳</span><label htmlFor="oss-repo-name">Your next project</label><input id="oss-repo-name" value={name} onChange={event => setName(event.target.value)} maxLength={32} autoComplete="off" spellCheck={false} aria-describedby="oss-preview-note" /><div className="oss-command"><code>$ npx ossready init {slug} --dry-run</code></div><button type="button" className="oss-run" disabled={running} onClick={() => { if (timer.current) clearTimeout(timer.current); setVisible(0); if (paused || reducedMotion) setVisible(files.length); else setRunning(true); }}>{running ? "Planning the files…" : visible ? "Replay the scaffold" : "Preview the scaffold"}<span aria-hidden="true">{visible ? "↺" : "↗"}</span></button></div>
    <div className="oss-repo"><div className="oss-repo-heading"><span aria-hidden="true">▱</span><strong>{slug}/</strong><span>{visible ? `${visible} files shown` : "A blank canvas"}</span></div><div className="oss-files">{visible ? files.slice(0, visible).map(([file, purpose]) => <div className="oss-file" key={file}><span aria-hidden="true">↳</span><code>{file}</code><small>{purpose}</small></div>) : <p>A blank repository.<br /><span>Let’s give it a good beginning.</span></p>}</div><p className="oss-status" aria-live="polite">{running ? "PLANNING THE SCAFFOLD" : visible ? "PREVIEW COMPLETE / SELECTED FILES SHOWN" : "WAITING FOR YOUR IDEA"}</p></div>
    <p id="oss-preview-note" className="oss-disclosure">An interactive illustration of the file plan. No files are created.</p>
  </div>;
}
