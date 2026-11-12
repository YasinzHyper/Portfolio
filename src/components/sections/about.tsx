import { Compass, Layers3, Repeat2 } from "lucide-react";
import { Reveal } from "@/components/portfolio/reveal";

const principles = [
  { Icon: Compass, title: "Start with something useful.", copy: "Products that solve a real annoyance. Interfaces that make the next step obvious." },
  { Icon: Layers3, title: "Build the whole picture.", copy: "From a considered interface to the APIs, data, and systems underneath it." },
  { Icon: Repeat2, title: "Make it work. Make it better.", copy: "Small iterations, real feedback, clear documentation, and reliable behavior." },
];

export function AboutSection() {
  return <section id="about" className="section shell about-section" aria-labelledby="about-title">
    <Reveal><div className="section-top"><span className="section-number">01 / ABOUT</span><span className="tiny-note">THE PERSON BEHIND THE CODE</span></div></Reveal>
    <div className="about-grid">
      <Reveal><h2 id="about-title">Curiosity in.<br/><span>Useful things out.</span></h2>
        <p className="lead">I’m Yasin, an engineer from Bengaluru. I like turning small ideas into things people can actually use.</p>
        <p className="body-copy">That curiosity took me from Information Science at Ramaiah Institute of Technology to research, AI training, enterprise software, and full-stack engineering. Today, I build platforms at onsemi and open-source tools of my own.</p>
        <p className="about-origin">School math contests got me hooked on problem-solving. I began with tiny web pages, then kept shipping class projects for friends who’d actually use them.</p>
        <div className="about-facts"><div><span>BASED IN</span><strong>Bengaluru, India</strong></div><div><span>FOCUS</span><strong>Full-stack · Reliable AI</strong></div></div>
      </Reveal>
      <Reveal className="principles">{principles.map(({ Icon, title, copy }) => <article key={title}><span className="principle-icon"><Icon size={21} aria-hidden="true" /></span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
        <div className="learning-note"><span className="live-dot"/> EXPLORING NOW<p>Workflow orchestration, Kubernetes, and systems that stay dependable as they grow.</p></div>
        <p className="body-copy experience-perspective">At xAI, I learned to build evaluation and tracing into AI features. Samsung’s on-device constraints taught me how to turn research ideas into practical systems.</p>
      </Reveal>
    </div>
  </section>;
}
