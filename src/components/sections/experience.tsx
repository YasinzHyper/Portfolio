"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BackgroundBeams } from "@/components/ui/background-beams"; // already in project
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Award,
  ChevronDown,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// ------------------------------------------------------------------
// Data (personalized from your resume)
// ------------------------------------------------------------------

type Experience = {
  org: string;
  role: string;
  period: string;
  location?: string;
  highlights: string[];
  tech?: string[];
  companyUrl?: string;
  logoUrl?: string;
};

type Education = {
  school: string;
  degree: string;
  period: string;
  location?: string;
  gpa?: string;
  courses?: string[];
};

const EXPERIENCES: Experience[] = [
  {
    org: "Oracle",
    role: "SDE Intern",
    period: "Jan 2026 — Present",
    location: "Bengaluru · Hybrid",
    highlights: [
      "Part of the RPAS (Retail Predictive Analytics Server) backend team under RGBU, supporting large-scale retail planning systems",
      "Contributing to core server components using C++, Java, PL/SQL, and Oracle DB in a high-performance enterprise environment",
    ],
    tech: ["C++", "Java", "Oracle DB", "PL/SQL", "Shell Scripting"],
    companyUrl: "https://www.oracle.com/",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5eRETWKNQ0IuSETVDffHht0BpBthJtTH9Fg&s",
  },
  {
    org: "Morgan Stanley",
    role: "Technology Apprentice (SDE Intern)",
    period: "Aug 2025 — Dec 2025",
    location: "Bengaluru · Hybrid",
    highlights: [
      "Modernizing enterprise applications on the Application-Development track",
      "Full-stack delivery with CI/CD and DevOps within firm standards",
    ],
    tech: ["TypeScript", "Java", "React", "Python", "CI/CD"],
    companyUrl: "https://www.morganstanley.com/",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg4b2xFrY7mhOS9pGOnckG88R0ZzHpzYZ7hA&s",
  },
  {
    org: "LabelBox",
    role: "AI Trainer (Coding)",
    period: "July 2024 — Present",
    location: "Remote",
    highlights: [
      "Enhanced coding proficiency of frontier models for leading AI labs (Google Deepmind, OpenAI, etc.) through sophisticated prompt engineering and rigorous model evaluation methodologies",
    ],
    tech: ["JavaScript", "Python", "Prompt Engineering", "Model Evaluation"],
    companyUrl: "https://labelbox.com/",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSveVLbjIDVSUEXOEgR3tGuZh2FFkxvy99L5A&s",
  },
  {
    org: "xAI",
    role: "AI Trainer",
    period: "Oct 2024 — Aug 2025",
    location: "Remote",
    highlights: [
      "Enhanced xAI's frontier LLMs, including Grok 3 and Grok 4 by creating and refining high-quality reasoning datasets that improved the model's decision-making capabilities",
      "Applied advanced prompt-engineering techniques to optimize system and user prompts, boosting response relevance and coherence",
      "Partnered with research and engineering teams on iterative testing cycles, model evaluations, and targeted dataset updates to address failure modes"
    ],
    tech: ["Python", "RLHF", "SFT", "LLM Ops"],
    companyUrl: "https://x.ai/",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROcXRdeEoeB-Kl449XzrchCvGwxDaTRltKSg&s",
  },
  {
    org: "Samsung Research Institute Bangalore",
    role: "Project Intern",
    period: "Aug 2024 — Jun 2025",
    location: "Remote",
    highlights: [
      "Developed a recommender system for Android apps leveraging app usage sequence data, utilizing sequence modeling techniques to optimize user recommendations.",
    ],
    tech: ["Kotlin", "Android Studio", "Python", "TensorFlow", "Recommenders"],
    companyUrl: "https://research.samsung.com/sri-b",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoQxzNcB2CaxoIXleMEh5LxBYLdNFsofCYRg&s",
  },
];

const EDUCATION: Education = {
  school: "Ramaiah Institute of Technology",
  degree: "B.E. Information Science & Engineering",
  period: "2022 — 2026 (expected)",
  location: "Bengaluru, Karnataka",
  gpa: "CGPA 9.43",
  courses: [
    "Machine Learning",
    "Distributed Systems",
    "Algorithms",
    "Networks",
    "OS",
    "DBMS",
  ],
};

const ACHIEVEMENTS: string[] = [
  "600+ problems solved • top 8% on LeetCode",
  "Morgan Stanley Code to Give • 144 selected of 40k+ • Offered PPO for exceptional performance",
  "Dark Pattern Buster Hackathon campus finalist (Govt. of India)",
  "Microsoft Learn Student Ambassador • built campus community",
  "Cisco Campus Ambassador",
];

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export function ExperienceSection() {
  return (
    <TooltipProvider delayDuration={150}>
      <section
        id="experience"
        className={cn(
          "relative isolate overflow-hidden py-20 md:py-24",
          // "bg-gradient-to-b from-[#0A0B10] via-[#0B1020] to-[#0A0B10]",
          "bg-[#070910]",
        )}
      >
        {/* subtle background lines and a faint beam to match other sections */}
        <BackgroundBeams className="absolute inset-0 -z-20 opacity-20" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_50%_-10%,rgba(255,255,255,0.06),transparent_60%)]" />

        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45 }}
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs text-white/70 backdrop-blur">
              <Briefcase className="h-3.5 w-3.5" /> Experience & Education
            </div>
            <h2 className="text-balance bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-3xl font-semibold leading-tight text-transparent sm:text-4xl">
              My journey so far
            </h2>
          </motion.div>

          {/* Layout: timeline + side column */}
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            {/* Timeline */}
            <Timeline items={EXPERIENCES} />

            {/* Right column: Education + Achievements */}
            <aside className="space-y-6">
              <EduCard edu={EDUCATION} />
              <AchievementsCard items={ACHIEVEMENTS} />
            </aside>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}

// ------------------------------------------------------------------
// Timeline (Aceternity-style, lightweight)
// ------------------------------------------------------------------
function Timeline({ items }: { items: Experience[] }) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));
  const [activeIndex, setActiveIndex] = useState(0);
  const [fillHeight, setFillHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  const toggleItem = (idx: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) {
        newSet.delete(idx);
      } else {
        newSet.add(idx);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const update = () => {
      const center = window.innerHeight * 0.35;
      let bestIdx = 0;
      let bestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - center);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      setActiveIndex(bestIdx);
      if (containerRef.current && itemRefs.current[bestIdx]) {
        const c = containerRef.current.getBoundingClientRect();
        const r = itemRefs.current[bestIdx]!.getBoundingClientRect();
        const h = Math.max(0, Math.min(r.top - c.top + r.height * 0.5, c.height));
        setFillHeight(h);
      }
    };

    update();
    const onScroll = () => requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll as EventListener);
      window.removeEventListener("resize", onScroll as EventListener);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {/* base line */}
      <div
        aria-hidden
        className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent sm:left-5"
      />
      {/* animated progress fill */}
      <div
        aria-hidden
        className="absolute left-4 top-0 w-px rounded bg-gradient-to-b from-fuchsia-400 via-indigo-400 to-transparent sm:left-5"
        style={{ height: fillHeight }}
      />

      <ul className="space-y-6">
        {items.map((it, idx) => (
          <li
            key={idx}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            className="relative pl-12 sm:pl-16"
          >
            {/* dot */}
            <span
              className={cn(
                "absolute left-0 top-2 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-white/10 text-white/70 sm:left-0",
                activeIndex === idx &&
                  "border-fuchsia-400/50 bg-fuchsia-400/10 text-fuchsia-200 shadow-[0_0_1rem_0.05rem_rgba(217,70,239,0.25)]",
              )}
            >
              <Briefcase className="h-4 w-4" />
            </span>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -2, scale: 1.01 }}
              className={cn(
                "group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur",
                "hover:border-white/20 hover:bg-white/[0.06]",
              )}
            >
              <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  {it.logoUrl && it.companyUrl ? (
                    <a
                      href={it.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 shrink-0 transition-transform hover:scale-110"
                    >
                      <img
                        src={it.logoUrl}
                        alt={`${it.org} logo`}
                        className="h-8 w-8 rounded-lg object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </a>
                  ) : null}
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white/95">{it.role}</h3>
                    <p className="text-sm text-white/80">{it.org}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-wide text-white/50">
                      <Calendar className="mr-1 inline-block h-3.5 w-3.5 align-[-2px]" /> {it.period}
                      {it.location ? (
                        <>
                          <span className="mx-2">•</span>
                          <MapPin className="mr-1 inline-block h-3.5 w-3.5 align-[-2px]" /> {it.location}
                        </>
                      ) : null}
                    </p>
                  </div>
                </div>
                {it.tech?.length ? (
                  <div className="flex shrink-0 flex-wrap gap-1.5">
                    {it.tech.slice(0, 4).map((t) => (
                      <Tooltip key={t}>
                        <TooltipTrigger asChild>
                          <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                            {t}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent side="top">{t}</TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                ) : null}
              </header>

              {/* expandable */}
              <button
                onClick={() => toggleItem(idx)}
                className="mt-3 inline-flex items-center gap-2 text-xs text-white/70 hover:text-white"
                aria-expanded={openItems.has(idx)}
              >
                {openItems.has(idx) ? "Hide details" : "Show details"}
                <ChevronDown className={cn("h-3 w-3 transition", openItems.has(idx) && "rotate-180")} />
              </button>

              <AnimatePresence initial={false}>
                {openItems.has(idx) ? (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-4 space-y-2 text-sm text-white/80">
                      {it.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ------------------------------------------------------------------
// Education card
// ------------------------------------------------------------------
function EduCard({ edu }: { edu: Education }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs text-white/70">
        <GraduationCap className="h-3.5 w-3.5" /> Education
      </div>
      <h3 className="text-lg font-semibold text-white/95">{edu.degree}</h3>
      <p className="text-sm text-white/80">{edu.school}</p>
      <p className="mt-1 text-[11px] uppercase tracking-wide text-white/50">
        <Calendar className="mr-1 inline-block h-3.5 w-3.5 align-[-2px]" /> {edu.period}
        <span className="mx-2">•</span>
        <MapPin className="mr-1 inline-block h-3.5 w-3.5 align-[-2px]" /> {edu.location}
      </p>
      {edu.gpa ? (
        <p className="mt-2 text-sm text-white/80">
          <span className="text-white/60">Result:</span> {edu.gpa}
        </p>
      ) : null}
      {edu.courses?.length ? (
        <div className="mt-4">
          <h4 className="mb-2 text-xs font-medium text-white/80">Relevant Coursework</h4>
          <div className="flex flex-wrap gap-1.5">
            {edu.courses.map((c) => (
              <Badge key={c} variant="outline" className="border-white/15 text-[10px] text-white/80">
                {c}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

// ------------------------------------------------------------------
// Achievements card
// ------------------------------------------------------------------
function AchievementsCard({ items }: { items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs text-white/70">
        <Award className="h-3.5 w-3.5" /> Achievements
      </div>
      <ul className="space-y-3 text-sm text-white/85">
        {items.map((a, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="flex items-start gap-2"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400" />
            <span>{a}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
