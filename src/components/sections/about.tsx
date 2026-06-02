"use client";

import React from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlipWords } from "@/components/ui/flip-words";
import { Sparkles, Cpu, Gauge, Users, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function AboutSection() {
  // Words for the flip effect
  const words = ["an engineer", "a freelancer", "a full-stack developer", "a problem solver", "a creator", "an innovator"];

  // Four cards → story/identity instead of hype
  const highlights = [
    {
      icon: Wand2,
      title: "Where it started",
      description:
        "School math contests got me hooked on problem-solving. I began with tiny web pages, then kept shipping class projects for friends who'd actually use them.",
    },
    {
      icon: Cpu,
      title: "What I build",
      description:
        "Full-stack apps with Next.js, FastAPI, and Flutter. I add realtime or GenAI when it clearly helps—like AlgoAce (multi-agent RAG for DSA).",
    },
    {
      icon: Users,
      title: "How I work",
      description:
        "Small iterations, quick feedback, and clear docs. I prefer tracing and simple tests over assumptions, then polish UX so things feel fast and obvious.",
    },
    {
      icon: Gauge,
      title: "What I'm learning",
      description:
        "Deepening my systems engineering skills as an SDE Intern at Oracle, working on large-scale retail planning infrastructure and exploring distributed system design.",
    },
  ];

  return (
    <section
      id="about"
      className={cn(
        "relative isolate overflow-hidden py-20 md:py-24",
        "bg-[#070910]",
      )}
    >
      {/* Subtle gradient overlay similar to Hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#070910]/50 to-transparent"
      />

      {/* Subtle separators like Hero */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs text-white/70 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> About Me
          </div>
          <h2 className="text-balance bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-3xl font-semibold leading-tight text-transparent sm:text-4xl">
            How I got here
          </h2>
          <div className="mt-4 text-pretty text-white/75">
            I&apos;m Yasin —<FlipWords words={words} className="text-white font-medium"/>and final year student from Bengaluru who&apos;s always enjoyed turning
            small ideas into tools people can use. That curiosity led me to study ISE at <b>MSRIT</b>,
            spend a year at <b>xAI</b> as an AI Trainer, conduct research with <b>Samsung Research</b>,
            intern as a Technology Apprentice at <b>Morgan Stanley</b>,
            and now grow as an SDE Intern at <b>Oracle</b>.
            Along the way, I&apos;ve built <b>AlgoAce</b> (a multi-agent RAG platform for DSA learning) and <b>PrimeEstate</b> (end-to-end real-estate app: secure auth, listings, favorites, profiles, chat, and powerful search).
          </div>
        </motion.div>

        <div className="grid items-start gap-10 lg:grid-cols-2">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white/95">Why I build</h3>
              <p className="text-white/75">
                I&apos;ve always liked the feeling of making something that solves a
                real annoyance—first for myself, then for classmates and friends.
                That&apos;s still my compass: start small, make it work, and keep
                improving it with real feedback.
              </p>
              <p className="text-white/75">
                On the GenAI side, my time at xAI taught me to treat LLM features
                like any other system: add evaluation, tracing, and guardrails so
                they behave predictably. With Samsung, I learned how constraints
                like on-device compute shape practical recommender designs.
              </p>
            </div>

            {/* Milestones */}
            <div className="space-y-3">
              <h4 className="text-lg font-medium text-white/90">Milestones</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                  Oracle · SDE Intern
                </Badge>
                <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                  Morgan Stanley · SDE Intern
                </Badge>
                <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                  xAI · AI Trainer
                </Badge>
                <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                  Samsung Research · Research Intern
                </Badge>
                <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                  Code to Give · Finalist
                </Badge>
                <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                  Creator · AlgoAce
                </Badge>
                <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                  Creator · PrimeEstate
                </Badge>
                <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                  Microsoft · Learn Student Ambassador
                </Badge>
                <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                  Cisco · Campus Ambassador 
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Highlights grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group"
              >
                <Card className="relative h-full overflow-hidden rounded-2xl border-white/10 bg-white/[0.05] backdrop-blur transition-transform hover:-translate-y-0.5">
                  {/* Shine */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(600px 200px at var(--x,50%) -10%, rgba(255,255,255,0.12), transparent 60%)",
                    }}
                  />
                  <CardHeader className="pb-3">
                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                      <h.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-base text-white/95">{h.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-white/75">{h.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats strip — grounded, not hypey */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-16 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 text-center sm:grid-cols-3 md:grid-cols-6"
        >
          {[
            { k: "City", v: "Bengaluru" },
            { k: "School", v: "MSRIT · ISE" },
            { k: "Focus", v: "Full-stack · GenAI" },
            { k: "LeetCode", v: "600+ (Top ~8%)" },
            { k: "Research", v: "Samsung PRISM" },
            { k: "Now", v: "Oracle · SDE Intern" },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-white/80"
            >
              <div className="text-xs uppercase tracking-wide text-white/50">{s.k}</div>
              <div className="mt-1 text-sm">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// pointer-tracked shine for cards
if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    document.querySelectorAll<HTMLElement>(".group").forEach((el) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      el.style.setProperty("--x", `${x}%`);
    });
  });
}
