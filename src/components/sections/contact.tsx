"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath, portfolioLinks } from "@/lib/portfolio-assets";
import { Reveal } from "@/components/portfolio/reveal";

const modes = {
  Work: { title: "Let’s build something useful.", copy: "Tell me about the problem, the people it serves, and what you have in mind.", subject: "Let’s build something", body: "Hi Yasin,\n\nI’d like to discuss a project or opportunity with you.\n\n" },
  Learn: { title: "Always up for a good question.", copy: "Compare notes on full-stack development, AI systems, or something you’re learning.", subject: "Let’s exchange ideas", body: "Hi Yasin,\n\nI’d love to exchange ideas about " },
  Social: { title: "Say hello.", copy: "An interesting idea, a shared curiosity, or just a friendly introduction.", subject: "Hello Yasin", body: "Hi Yasin,\n\nI came across your portfolio and " },
};

export function ContactSection() {
  const [mode, setMode] = useState<keyof typeof modes>("Work");
  const [time, setTime] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    update(); const interval = setInterval(update, 60000);
    return () => { clearInterval(interval); if (timer.current) clearTimeout(timer.current); };
  }, []);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(portfolioLinks.email); setCopyStatus("Email copied"); }
    catch { setCopyStatus("Select the email address to copy it."); }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyStatus(""), 3000);
  }
  const selected = modes[mode];
  const mailto = `mailto:${portfolioLinks.email}?subject=${encodeURIComponent(selected.subject)}&body=${encodeURIComponent(selected.body)}`;
  return <section id="contact" className="section shell contact-section" aria-labelledby="contact-title">
    <Reveal><div className="section-top"><span className="section-number">05 / CONTACT</span><span className="tiny-note">GOOD THINGS START WITH A CONVERSATION</span></div></Reveal>
    <div className="contact-grid"><Reveal><h2 id="contact-title">Have something<br/><span>in mind?</span></h2><p className="lead">A product, a challenging problem,<br/>or just a good conversation.</p>
      <a className="contact-email" href={`mailto:${portfolioLinks.email}`}>{portfolioLinks.email} <span aria-hidden="true">↗</span></a>
      <div className="contact-utilities"><button onClick={copyEmail}>Copy email <span aria-hidden="true">⧉</span></button><a href={assetPath("/portfolio/yasin.vcf")} download="Mohammed-Yasin-Zuhayr.vcf">Save contact ↓</a><a href="tel:+918660798709">Call ↗</a></div><p className="copy-status" role="status">{copyStatus}</p>
      <div className="contact-profiles"><a href={portfolioLinks.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={portfolioLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href={portfolioLinks.resume} target="_blank" rel="noopener noreferrer">Résumé ↗</a></div>
    </Reveal><Reveal className="contact-card"><div className="contact-tabs" role="group" aria-label="Contact purpose">{(Object.keys(modes) as (keyof typeof modes)[]).map(name => <button key={name} onClick={() => setMode(name)} aria-pressed={mode === name}>{name}</button>)}</div><div aria-live="polite"><h3>{selected.title}</h3><p>{selected.copy}</p></div><a className="button primary" href={mailto}>Start a conversation <span aria-hidden="true">↗</span></a><div className="contact-status"><span className="live-dot"/><span>BENGALURU, INDIA</span><time>{time && `${time} IST`}</time></div></Reveal></div>
  </section>;
}
