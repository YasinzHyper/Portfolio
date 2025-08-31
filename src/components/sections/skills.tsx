"use client";

import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiOpenjdk,
  SiC,
  SiCplusplus,
  SiDart,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiVite,
  SiSass,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiFlask,
  SiFlutter,
  SiTensorflow,
  SiVercel,
  // Sicloud,
  SiHeroku,
  SiFirebase,
  SiSupabase,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiDocker,
  SiSocketdotio,
  SiAndroidstudio,
  SiLinux,
  SiKotlin,
  SiPostman,
  SiFigma,
  SiJenkins,
} from "react-icons/si";
import { Code2, Boxes, Cpu, Smartphone, Bot, Database, Cloud, Wrench, Layers } from "lucide-react";
import { RippleGrid } from "@/components/ui/ripple-grid";

/**
 * Compact Skills Section — icon grid, fast to scan, personalized.
 * Improvements:
 * - Clearer header and subtitle
 * - Real brand icons (react-icons/si)
 * - Better a11y (roles, aria-pressed, aria-labels)
 * - Reduced-motion safe marquee
 * - Mobile fallback shows "used in" without tooltips
 */
export function SkillsSection() {
  type Category =
    | "Languages"
    | "Web/Frontend"
    | "Backend"
    | "Mobile"
    | "AI/ML"
    | "Cloud"
    | "Databases"
    | "DevTools";

  type Skill = {
    name: string;
    category: Category;
    usedIn?: string[];
  };

  const coreStack = [
    "Next.js",
    "TypeScript",
    "React",
    "TailwindCSS",
    "Node.js",
    "FastAPI",
    "Supabase",
    "PostgreSQL",
    "Flutter",
    "TensorFlow Lite",
    "Vercel",
    "Azure",
  ];

  const skills: Skill[] = [
    // Languages
    { name: "JavaScript", category: "Languages", usedIn: ["PrimeEstate", "DarkGuardian"] },
    { name: "TypeScript", category: "Languages", usedIn: ["AlgoAce", "PrimeEstate"] },
    { name: "Python", category: "Languages", usedIn: ["AlgoAce", "DarkGuardian"] },
    { name: "Java", category: "Languages" },
    { name: "C", category: "Languages" },
    { name: "C++", category: "Languages" },
    { name: "Dart", category: "Languages", usedIn: ["IntelliCam"] },

    // Web / Frontend
    { name: "Next.js", category: "Web/Frontend", usedIn: ["AlgoAce"] },
    { name: "React", category: "Web/Frontend", usedIn: ["AlgoAce", "PrimeEstate"] },
    { name: "TailwindCSS", category: "Web/Frontend", usedIn: ["AlgoAce", "PrimeEstate"] },
    { name: "Vite", category: "Web/Frontend", usedIn: ["PrimeEstate"] },
    { name: "SCSS", category: "Web/Frontend" },

    // Backend
    { name: "Node.js", category: "Backend", usedIn: ["PrimeEstate"] },
    { name: "Express.js", category: "Backend", usedIn: ["PrimeEstate"] },
    { name: "FastAPI", category: "Backend", usedIn: ["AlgoAce"] },
    { name: "Flask", category: "Backend", usedIn: ["DarkGuardian"] },

    // Mobile
    { name: "Flutter", category: "Mobile", usedIn: ["IntelliCam"] },
    { name: "Kotlin", category: "Mobile" },

    // AI/ML
    { name: "TensorFlow", category: "AI/ML" },
    { name: "TensorFlow Lite", category: "AI/ML", usedIn: ["IntelliCam"] },
    { name: "CrewAI", category: "AI/ML", usedIn: ["AlgoAce"] },

    // Cloud
    { name: "Vercel", category: "Cloud", usedIn: ["AlgoAce"] },
    { name: "Azure", category: "Cloud" },
    { name: "Heroku", category: "Cloud" },
    { name: "Firebase", category: "Cloud" },

    // Databases
    { name: "Supabase", category: "Databases", usedIn: ["AlgoAce"] },
    { name: "MongoDB", category: "Databases", usedIn: ["PrimeEstate"] },
    { name: "PostgreSQL", category: "Databases" },
    { name: "MySQL", category: "Databases" },

    // Dev tools
    { name: "Git", category: "DevTools" },
    { name: "Docker", category: "DevTools" },
    { name: "Socket.io", category: "DevTools", usedIn: ["PrimeEstate"] },
    { name: "Android Studio", category: "DevTools", usedIn: ["IntelliCam"] },
    { name: "Unix/Linux", category: "DevTools" },
    { name: "VS Code", category: "DevTools" },
    { name: "Cursor", category: "DevTools" },
    { name: "Postman", category: "DevTools" },
    { name: "Figma", category: "DevTools" },
    { name: "Jenkins", category: "DevTools" },
  ];

  const categories: { key: Category; label: string; icon: React.ElementType }[] = [
    { key: "Languages", label: "Languages", icon: Code2 },
    { key: "Web/Frontend", label: "Web/Frontend", icon: Boxes },
    { key: "Backend", label: "Backend", icon: Cpu },
    { key: "Mobile", label: "Mobile", icon: Smartphone },
    { key: "AI/ML", label: "AI/ML", icon: Bot },
    { key: "Cloud", label: "Cloud", icon: Cloud },
    { key: "Databases", label: "Databases", icon: Database },
    { key: "DevTools", label: "DevTools", icon: Wrench },
  ];

  const [active, setActive] = useState<"All" | Category>("All");
  const filtered = useMemo(() => skills.filter((s) => (active === "All" ? true : s.category === active)), [active]);

  return (
    <section id="skills" className="relative isolate bg-gradient-to-b from-[#0A0B10] via-[#0B1020] to-[#0A0B10] py-20 md:py-24">
      {/* Animated background */}
      <RippleGrid className="absolute inset-0 -z-10 opacity-80" />
      
      {/* Additional overlay for depth */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(99,102,241,0.08),transparent_60%)]" />
      
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-8 max-w-3xl text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs text-white/70 backdrop-blur">
            <Layers className="h-3.5 w-3.5" />
            Stack & tools
          </div>
          <h2 className="text-balance bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-3xl font-semibold leading-tight text-transparent sm:text-4xl">
            Technologies I use
          </h2>
          <p className="mt-2 text-sm text-white/70">Core toolkit across web, AI, mobile, and cloud.</p>
        </motion.div>

        {/* Core stack marquee */}
        <div className="relative mb-6 overflow-hidden">
          <div className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0A0B10] to-transparent" />
          <div className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0A0B10] to-transparent" />
          <div className="marquee flex gap-2 pr-2 [--speed:30s] will-change-transform">
            {[...coreStack, ...coreStack].map((n, i) => (
              <Badge key={i} variant="secondary" className="bg-white/10 text-white">
                {n}
              </Badge>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div role="tablist" aria-label="Skill categories" className="mb-6 flex flex-wrap justify-center gap-2">
          <FilterChip role="tab" aria-pressed={active === "All"} active={active === "All"} onClick={() => setActive("All")}>
            All
          </FilterChip>
          {categories.map((c) => {
            const IconComponent = c.icon;
            return (
              <FilterChip
                key={c.key}
                role="tab"
                aria-pressed={active === c.key}
                active={active === c.key}
                onClick={() => setActive(c.key as "All" | Category)}
              >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <IconComponent className="mr-1.5 h-3.5 w-3.5" {...({} as any)} /> {c.label}
              </FilterChip>
            );
          })}
        </div>

        {/* Icon grid */}
        <TooltipProvider>
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="grid auto-rows-[88px] grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
          >
            {filtered.map((s) => (
              <li key={s.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      aria-label={`${s.name}${s.usedIn?.length ? `, used in ${s.usedIn.join(', ')}` : ''}`}
                      title={s.name}
                      className="group flex h-full w-full flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-2 text-center text-white/80 outline-none transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white/20"
                    >
                      <SkillIcon name={s.name} category={s.category} />
                      <span className="mt-1.5 line-clamp-1 text-[11px]">{s.name}</span>
                      {s.usedIn?.length ? (
                        <span className="mt-0.5 hidden text-[10px] text-white/60 sm:hidden">Used in: {s.usedIn.join(", ")}</span>
                      ) : null}
                    </button>
                  </TooltipTrigger>
                  {s.usedIn?.length ? (
                    <TooltipContent side="top" className="border-white/10 bg-black/80 text-white">
                      <div className="text-xs">Used in: {s.usedIn.join(", ")}</div>
                    </TooltipContent>
                  ) : null}
                </Tooltip>
              </li>
            ))}
          </motion.ul>
        </TooltipProvider>

        {/* Hint */}
        {/* <p className="mt-6 text-center text-xs text-white/60">Filter by category. Hover a tile to see projects. Motion respects system settings.</p> */}
      </div>

      {/* marquee keyframes + reduced motion */}
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}} .marquee{animation:marquee var(--speed) linear infinite} @media (prefers-reduced-motion:reduce){.marquee{animation:none}}`}</style>
    </section>
  );
}

function FilterChip({ active, onClick, children, ...rest }: { active?: boolean; onClick?: () => void; children: React.ReactNode } & React.ComponentProps<"button">) {
  return (
    <Button
      {...rest}
      onClick={onClick}
      size="sm"
      variant={active ? "default" : "ghost"}
      className={cn(
        "h-8 rounded-full px-3 text-xs",
        active
          ? "bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-teal-400 text-white"
          : "text-white/80 hover:bg-white/10 hover:text-white",
      )}
    >
      {children}
    </Button>
  );
}

// Brand tech icons using Simple Icons via react-icons
function SkillIcon({ name, category }: { name: string; category: string }) {
  const ICONS: Record<string, { Icon: IconType; color: string }> = {
    // Languages
    JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
    TypeScript: { Icon: SiTypescript, color: "#3178C6" },
    Python: { Icon: SiPython, color: "#3776AB" },
    Java: { Icon: SiOpenjdk, color: "#007396" },
    C: { Icon: SiC, color: "#A8B9CC" },
    "C++": { Icon: SiCplusplus, color: "#00599C" },
    Dart: { Icon: SiDart, color: "#0175C2" },

    // Web / Frontend
    React: { Icon: SiReact, color: "#61DAFB" },
    "Next.js": { Icon: SiNextdotjs, color: "#FFFFFF" },
    TailwindCSS: { Icon: SiTailwindcss, color: "#06B6D4" },
    Vite: { Icon: SiVite, color: "#646CFF" },
    SCSS: { Icon: SiSass, color: "#CC6699" },

    // Backend
    "Node.js": { Icon: SiNodedotjs, color: "#339933" },
    "Express.js": { Icon: SiExpress, color: "#FFFFFF" },
    FastAPI: { Icon: SiFastapi, color: "#009688" },
    Flask: { Icon: SiFlask, color: "#FFFFFF" },

    // Mobile
    Flutter: { Icon: SiFlutter, color: "#02569B" },
    Kotlin: { Icon: SiKotlin, color: "#7F52FF" },

    // AI/ML
    TensorFlow: { Icon: SiTensorflow, color: "#FF6F00" },
    "TensorFlow Lite": { Icon: SiTensorflow, color: "#FF6F00" },

    // Cloud
    Vercel: { Icon: SiVercel, color: "#FFFFFF" },
    Azure: { Icon: SiFirebase, color: "#0078D4" },
    Heroku: { Icon: SiHeroku, color: "#430098" },
    Firebase: { Icon: SiFirebase, color: "#FFCA28" },

    // Databases
    Supabase: { Icon: SiSupabase, color: "#3ECF8E" },
    MongoDB: { Icon: SiMongodb, color: "#47A248" },
    PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
    MySQL: { Icon: SiMysql, color: "#4479A1" },

    // DevTools
    Git: { Icon: SiGit, color: "#F05032" },
    Docker: { Icon: SiDocker, color: "#2496ED" },
    "Socket.io": { Icon: SiSocketdotio, color: "#010101" },
    "Android Studio": { Icon: SiAndroidstudio, color: "#3DDC84" },
    "Unix/Linux": { Icon: SiLinux, color: "#FCC624" },
    // "VS Code": { Icon: SiVisualstudio, color: "#007ACC" },
    // Cursor: { Icon: SiVisualstudio, color: "#000000" }, // Using VS Code icon as fallback for Cursor
    Postman: { Icon: SiPostman, color: "#FF6C37" },
    Figma: { Icon: SiFigma, color: "#F24E1E" },
    Jenkins: { Icon: SiJenkins, color: "#D33833" },
  };

  const entry = ICONS[name];

  if (entry) {
    const { Icon, color } = entry;
    return (
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.05]">
        <Icon className="h-5 w-5" style={{ color }} />
      </span>
    );
  }

  // Fallback to category glyph
  const catMap: Record<string, React.ElementType> = {
    Languages: Code2,
    "Web/Frontend": Boxes,
    Backend: Cpu,
    Mobile: Smartphone,
    "AI/ML": Bot,
    Cloud: Cloud,
    Databases: Database,
    DevTools: Wrench,
  };
  const FIcon = catMap[category] || Code2;
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-gradient-to-br from-white/10 to-white/[0.04]">
      <FIcon className="h-5 w-5 text-white/90" />
    </span>
  );
}
