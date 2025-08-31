"use client";

import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio"; // keep media intuitive: fixed 16:10
import { Github, ExternalLink, ChevronLeft, ChevronRight, Sparkles, X, Play, Pause } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams"; // aceternity beams
import Image from "next/image";

// Tech icons (react-icons/si)
import { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiVite,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiHeroku,
  SiMongodb,
  SiPostgresql,
  SiSupabase,
  SiPython,
  SiFastapi,
  SiFlask,
  SiTensorflow,
  SiFlutter,
  SiDart,
  SiSocketdotio,
  SiVercel,
  SiShadcnui,
} from "react-icons/si";

// ------------------------------
// Data
// ------------------------------
export type Project = {
  id: string;
  title: string;
  tagline: string;
  period?: string;
  brief: string;
  bullets?: string[];
  stack: string[]; // tech names
  links?: { demo?: string; github?: string };
  media?: {
    image?: string; // preview image (shows on cards)
    video?: string; // video preview (shows in dialog)
    alt?: string; // alt text for accessibility
  };
};

const PROJECTS: Project[] = [
  {
    id: "algoace",
    title: "AlgoAce",
    tagline: "Multi-Agent RAG Framework for Personalized E-learning",
    period: "2024 — present",
    brief:
      "Full-Stack GenAI learning platform that provides personalized learning experiences, problem recommendations, detailed explanations and personalized feedback to help users with interview preparation.",
    bullets: [
      "Question generation + stepwise explanations",
      "Multiple agents working collaboratively",
      "FastAPI API with evaluation traces",
      "Auth + data layer on Supabase",
      "Problem recommendation engine that curates LeetCode problems, slashing user search time by 60%",
      "Interactive analytics dashboard to visualize progress, boosting challenge completion rates by 40%"
    ],
    stack: ["Next.js", "TypeScript", "React", "shadcn-ui", "TailwindCSS", "FastAPI", "Python", "Supabase", "PostgreSQL", "Vercel"],
    links: { demo: "https://github.com/YasinzHyper/AlgoAce", github: "https://github.com/YasinzHyper/AlgoAce" },
    media: {
      image: "/Portfolio/images/projects/algoace-preview.jpg",
      video: "/Portfolio/videos/projects/algoace-demo.mp4",
      alt: "AlgoAce dashboard showing AI-generated questions and explanations"
    },
  },
  {
    id: "primeestate",
    title: "PrimeEstate",
    tagline: "Real-estate marketplace with powerful search + real-time chat",
    period: "2023",
    brief:
      "Full-Stack platform for property discovery with search, chat, and role-based dashboards. Strong typing and ORM for maintainable backend.",
    bullets: [
      "Next.js app router + server actions",
      "Node/Express API with Prisma",
      "Realtime chat via Socket.io",
    ],
    stack: ["React", "JavaScript", "Vite", "TailwindCSS", "Node.js", "Express.js", "Prisma", "MongoDB", "Vercel", "Heroku", "Socket.io"],
    links: { demo: "https://prime-estate-rho.vercel.app/", github: "https://github.com/YasinzHyper/PrimeEstate" },
    media: {
      image: "/Portfolio/images/projects/primeestate-preview.jpg",
      alt: "PrimeEstate property listing interface with search filters"
    },
  },
  {
    id: "intellicam",
    title: "IntelliCam",
    tagline: "On-device vision with TFLite",
    period: "2022",
    brief:
      "Flutter app (Mobile) that runs TensorFlow Lite models on-device for real-time object detection and classification without network latency.",
    bullets: ["Real-time inference", "Camera pipeline optimized for mobile", "Material 3 UI"],
    stack: ["Flutter", "Dart", "TensorFlow"],
    links: { demo: "https://github.com/YasinzHyper/IntelliCam", github: "https://github.com/YasinzHyper/IntelliCam" },
    media: {
      image: "/Portfolio/images/projects/intellicam-preview.jpg",
      video: "/Portfolio/videos/projects/intellicam-demo.mp4",
      alt: "IntelliCam mobile app showing real-time object detection"
    },
  },
  {
    id: "darkguardian",
    title: "DarkGuardian",
    tagline: "Browser Extension to protect against dark patterns seen on the internet.",
    period: "2021",
    brief:
      "A Browser Extension to protect against dark patterns seen on the internet. Utilises a Flask App and chrome extension to detect dark patterns in e-commerce websites. Scrapes Data using Beautiful Soup 4 and processes the data using the fine-tuned BERT and LLAMA models to provide accurate results. Lightweight and auditable.",
    bullets: ["Flask microservice", "Chrome APIs", "Simple UX", "Data scraping with Beautiful Soup 4", "Fine-tuned BERT and LLAMA models to detect and classify dark patterns"],
    stack: ["React", "TypeScript", "Flask", "Python"],
    links: { demo: "https://github.com/sathya-pramodh/DarkGuardian", github: "https://github.com/sathya-pramodh/DarkGuardian" },
  },
];

// ------------------------------
// Video Preview Component
// ------------------------------
function VideoPreview({ 
  videoSrc, 
  posterSrc, 
  alt, 
  title 
}: { 
  videoSrc: string; 
  posterSrc?: string; 
  alt: string; 
  title: string; 
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div 
      className="relative h-full w-full group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        className="h-full w-full object-cover"
        onEnded={handleVideoEnd}
        preload="metadata"
        muted
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Play/Pause Overlay */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300",
        showControls || !isPlaying ? "opacity-100" : "opacity-0"
      )}>
        <button
          onClick={togglePlay}
          className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur transition-all hover:scale-110 hover:bg-black/60"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 translate-x-0.5" />
          )}
        </button>
      </div>

      {/* Video Title Overlay */}
      {!isPlaying && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-lg bg-black/60 px-3 py-2 backdrop-blur">
            <div className="text-sm font-medium text-white">{title} Demo</div>
            <div className="text-xs text-white/80">Click to play</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ------------------------------
// Section
// ------------------------------
export function ProjectsSection() {
  const [active, setActive] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);

  const count = PROJECTS.length;

  const go = useCallback((dir: -1 | 1) => setActive((i) => (i + dir + count) % count), [count]);
  const goto = useCallback((i: number) => setActive(((i % count) + count) % count), [count]);

  const open = useCallback((id: string) => {
    const idx = PROJECTS.findIndex((p) => p.id === id);
    if (idx !== -1) setActive(idx);
    setOpenId(id);
  }, []);
  const close = useCallback(() => setOpenId(null), []);

  // Navigation within dialog
  const goDialog = useCallback((dir: -1 | 1) => {
    if (!openId) return;
    const currentIndex = PROJECTS.findIndex((p) => p.id === openId);
    if (currentIndex === -1) return;
    
    const newIndex = (currentIndex + dir + count) % count;
    const newProject = PROJECTS[newIndex];
    setActive(newIndex);
    setOpenId(newProject.id);
  }, [openId, count]);

  return (
    <section
      id="projects"
      className={cn(
        "relative isolate overflow-hidden py-20 md:py-28",
        "bg-[#070910]",
      )}
    >
      <BackgroundBeams className="absolute inset-0 -z-20 opacity-25" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_50%_-10%,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs text-white/70 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Selected work
          </div>
          <h2 className="text-balance bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-3xl font-semibold leading-tight text-transparent sm:text-4xl">
            Projects I’ve built
          </h2>
          {/* <p className="mt-2 text-sm text-white/70">Click a card for details. Drag or use arrows to browse.</p> */}
        </motion.div>

        {/* Side-by-side carousel */}
        <div className="relative">
          <div className="pointer-events-none absolute -top-10 right-0 z-10 flex gap-2 sm:-top-14">
            <Button size="icon" variant="ghost" className="pointer-events-auto border border-white/10 bg-white/[0.04] text-white/90 hover:bg-white/10" onClick={() => go(-1)} aria-label="Previous project">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="pointer-events-auto border border-white/10 bg-white/[0.04] text-white/90 hover:bg-white/10" onClick={() => go(1)} aria-label="Next project">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Carousel active={active} onActiveChange={goto} onOpen={open} />

          <div className="relative z-20 mt-8 flex justify-center gap-2">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goto(i)}
                className={cn(
                  "h-1.5 w-6 rounded-full border border-white/10 transition-colors",
                  active === i ? "bg-white/80" : "bg-white/[0.18] hover:bg-white/[0.28]",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <ProjectDialog openId={openId} onOpenChange={(o) => (o ? null : close())} onPrev={() => goDialog(-1)} onNext={() => goDialog(1)} />
    </section>
  );
}

// ------------------------------
// Carousel (side-by-side, uniform size, elevated center)
// ------------------------------
function Carousel({
  active,
  onActiveChange,
  onOpen,
}: {
  active: number;
  onActiveChange: (i: number) => void;
  onOpen: (id: string) => void;
}) {
  const TOTAL = PROJECTS.length;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cardW, setCardW] = useState(360);
  const [cardH, setCardH] = useState(520); // uniform height
  const [gap, setGap] = useState(18);

  // Responsive sizing via ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w < 500) {
        setCardW(300); setCardH(500); setGap(14);
      } else if (w < 800) {
        setCardW(330); setCardH(520); setGap(16);
      } else if (w < 1200) {
        setCardW(360); setCardH(540); setGap(18);
      } else {
        setCardW(400); setCardH(560); setGap(20);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const mod = (n: number, m: number) => ((n % m) + m) % m;
  const goBy = (delta: number) => onActiveChange(mod(active + delta, TOTAL));

  const nearestSide = (i: number) => {
    const raw = i - active;
    const wrapped = ((raw + Math.ceil(TOTAL / 2)) % TOTAL) - Math.ceil(TOTAL / 2);
    return wrapped; // 0 center, negative left, positive right
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); goBy(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); goBy(1); }
  };

  return (
    <motion.div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Projects Carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn("relative mx-auto w-full select-none focus:outline-none", "h-[560px] md:h-[600px] [perspective:1400px] overflow-visible")}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={(_, info) => {
        const threshold = 80;
        const v = info.velocity.x;
        if (v < -300 || info.offset.x < -threshold) goBy(1);
        else if (v > 300 || info.offset.x > threshold) goBy(-1);
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-y-6 left-0 z-10 w-12 sm:w-16 bg-gradient-to-r from-[#070910] to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-6 right-0 z-10 w-12 sm:w-16 bg-gradient-to-l from-[#070910] to-transparent" />

      {PROJECTS.map((p, i) => {
        const side = nearestSide(i);
        const clamped = Math.max(-3, Math.min(3, side));
        const x = clamped * (cardW + gap);
        const isCenter = clamped === 0;
        const depth = Math.abs(clamped);
        const scale = isCenter ? 1 : 1 - 0.05 * depth;
        const rotateY = isCenter ? 0 : clamped < 0 ? 12 : -12;
        const y = isCenter ? -6 : 10 * depth;
        const opacity = depth > 3 ? 0 : 1 - depth * 0.08;
        const brightness = isCenter ? 1 : 0.92 - depth * 0.06;

        return (
          <motion.article
            key={p.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${p.title}`}
            onClick={() => onOpen(p.id)}
            initial={false}
            whileHover={{ y: isCenter ? -18 : y - 2 }}
            style={{ left: "50%", top: "50%", filter: `brightness(${brightness})`, height: cardH }}
            animate={{ x, y, opacity, scale, rotateY, rotateX: isCenter ? 0 : -2, zIndex: 100 - depth }}
            transition={{ type: "spring", stiffness: 140, damping: 22 }}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 will-change-transform",
              "w-[min(92vw,420px)] sm:w-[min(80vw,380px)] md:w-[min(60vw,360px)] lg:w-[min(520px,400px)] cursor-pointer",
              "rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-2xl backdrop-blur",
              isCenter && "ring-1 ring-white/15 shadow-[0_18px_60px_-15px_rgba(99,102,241,0.35)]",
              "group [transform-style:preserve-3d]"
            )}
          >
            {isCenter ? (
              <div className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(99,102,241,0.25),transparent_60%)]" />
            ) : null}
            <CardCover project={p} fixedHeight={cardH - 40} />
          </motion.article>
        );
      })}
    </motion.div>
  );
}

// ------------------------------
// Card Cover — uniform internal layout
// ------------------------------
function CardCover({ project, fixedHeight }: { project: Project; fixedHeight: number }) {
  // internal layout: fixed preview height + flexible text area
  const previewH = Math.max(170, Math.min(240, Math.round(fixedHeight * 0.42)));
  return (
    <div className="flex h-full flex-col">
      {/* Media */}
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.04]" style={{ height: previewH }}>
        {project.media?.image ? (
          <Image 
            src={project.media.image} 
            alt={project.media.alt || `${project.title} preview`} 
            fill 
            className="object-cover" 
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-white/70 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-teal-400/10">
            {project.title} Preview
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_var(--x,50%)_-10%,rgba(255,255,255,0.18),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Text */}
      <div className="mt-4 flex min-h-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-white/95">{project.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-white/75">{project.tagline}</p>
            {project.period ? (
              <p className="mt-1 text-[11px] uppercase tracking-wide text-white/50">{project.period}</p>
            ) : null}
          </div>
          <div className="hidden gap-2 sm:flex flex-shrink-0">
            {project.links?.github ? (
              <Button size="icon" variant="ghost" asChild className="border border-white/10 bg-white/[0.04] text-white/90 hover:bg-white/10">
                <a href={project.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" onClick={(e) => e.stopPropagation()}>
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
            {project.links?.demo ? (
              <Button size="icon" variant="ghost" asChild className="border border-white/10 bg-white/[0.04] text-white/90 hover:bg-white/10">
                <a href={project.links.demo} target="_blank" rel="noreferrer" aria-label="Live demo" onClick={(e) => e.stopPropagation()}>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
          </div>
        </div>

        <p className="mt-3 line-clamp-4 text-sm text-white/80">{project.brief}</p>

        {/* Stack */}
        <div className="mt-auto flex flex-wrap gap-1.5 overflow-hidden">
          {project.stack.map((t) => (
            <TechPill key={t} name={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ------------------------------
// Dialog with details — fixed viewport height, no clipping
// ------------------------------
function ProjectDialog({
  openId,
  onOpenChange,
  onPrev,
  onNext,
}: {
  openId: string | null;
  onOpenChange: (open: boolean) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const project = openId ? PROJECTS.find((p) => p.id === openId) : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPrev();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onNext();
  };

  return (
    <Dialog open={!!openId} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 outline-none",
            // wide, responsive, scrollable
            "w-[96vw] md:w-[85vw] lg:w-[70vw] xl:w-[60vw] max-w-[1400px] max-h-[92svh] overflow-y-auto",
            "rounded-2xl border border-white/10 bg-black/90 p-0 shadow-2xl backdrop-blur"
          )}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") handlePrev(e as unknown as React.MouseEvent);
            if (e.key === "ArrowRight") handleNext(e as unknown as React.MouseEvent);
          }}
        >
          {project ? (
            <div className="w-full">
              {/* Header bar with close */}
              <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-white/10 bg-black/80 px-5 py-3 backdrop-blur">
                <DialogPrimitive.Title className="text-sm text-white/70">
                  Project {PROJECTS.findIndex((p) => p.id === openId) + 1} of {PROJECTS.length}
                </DialogPrimitive.Title>
                <DialogPrimitive.Close className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/80 hover:bg-white/10">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </div>

              {/* Row 1: Media preview */}
              <div className="px-5 pt-5">
                <AspectRatio ratio={16 / 9}>
                  <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] shadow-xl">
                    {project.media?.video ? (
                      <VideoPreview 
                        videoSrc={project.media.video}
                        posterSrc={project.media.image}
                        alt={project.media.alt || `${project.title} demo video`}
                        title={project.title}
                      />
                    ) : project.media?.image ? (
                      <Image 
                        src={project.media.image} 
                        alt={project.media.alt || `${project.title} screenshot`} 
                        fill 
                        className="object-cover" 
                      />
                    ) : (
                      <div className="relative h-full w-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-fuchsia-500/15 to-teal-400/15" />
                        <div className="absolute left-0 right-0 top-0 h-9 border-b border-white/10 bg-black/30 backdrop-blur flex items-center gap-2 px-3">
                          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                          <div className="ml-3 h-5 flex-1 rounded-md border border-white/10 bg-white/5" />
                        </div>
                        <div className="absolute inset-0 grid place-content-center text-center text-white/85">
                          <div className="text-lg font-semibold">{project.title}</div>
                          <div className="text-xs opacity-75">Project Preview</div>
                        </div>
                      </div>
                    )}
                  </div>
                </AspectRatio>
              </div>

              {/* Row 2: Content grid */}
              <div className="mx-auto w-full max-w-6xl px-5 py-6">
                {/* Title and meta */}
                <header className="mb-6">
                  <h3 className="text-2xl font-semibold text-white/95">{project.title}</h3>
                  <p className="mt-1 text-white/75">{project.tagline}</p>
                  {project.period && <p className="mt-1 text-xs uppercase tracking-wide text-white/50">{project.period}</p>}
                </header>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <section>
                    <h4 className="mb-3 text-sm font-medium text-white/90">Overview</h4>
                    <p className="text-sm leading-7 text-white/80">{project.brief}</p>
                  </section>

                  <section>
                    <h4 className="mb-3 text-sm font-medium text-white/90">Technology Stack</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((t) => (
                        <TechPill key={t} name={t} />
                      ))}
                    </div>
                  </section>

                  {project.bullets?.length ? (
                    <section className="md:col-span-2">
                      <h4 className="mb-3 text-sm font-medium text-white/90">Key Features</h4>
                      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {project.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/75">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {(project.links?.github || project.links?.demo) ? (
                    <section className="md:col-span-2">
                      <div className="flex flex-wrap gap-3">
                        {project.links?.github ? (
                          <Button size="sm" variant="ghost" asChild className="border border-white/15 bg-white/[0.06] text-white/90 hover:bg-white/[0.12] backdrop-blur">
                            <a href={project.links.github} target="_blank" rel="noreferrer">
                              <Github className="mr-2 h-4 w-4" /> GitHub
                            </a>
                          </Button>
                        ) : null}
                        {project.links?.demo ? (
                          <Button size="sm" variant="ghost" asChild className="border border-white/15 bg-white/[0.06] text-white/90 hover:bg-white/[0.12] backdrop-blur">
                            <a href={project.links.demo} target="_blank" rel="noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                            </a>
                          </Button>
                        ) : null}
                      </div>
                    </section>
                  ) : null}
                </div>
              </div>

              {/* Sticky footer controls */}
              <div className="sticky bottom-0 z-10 flex items-center justify-between gap-2 border-t border-white/10 bg-black/80 px-5 py-4 backdrop-blur">
                <div className="text-xs text-white/70">Use ← → or buttons</div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={handlePrev} className="border border-white/10 bg-white/[0.04] text-white/90 hover:bg-white/10">
                    <ChevronLeft className="mr-1 h-4 w-4" /> Prev
                  </Button>
                  <Button size="sm" variant="ghost" onClick={handleNext} className="border border-white/10 bg-white/[0.04] text-white/90 hover:bg-white/10">
                    Next <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </Dialog>
  );
}

// ------------------------------
// Tech badge
// ------------------------------
const ICONS: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  TailwindCSS: SiTailwindcss,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  JavaScript: SiJavascript,
  Vite: SiVite,
  Heroku: SiHeroku,
  Prisma: SiPrisma,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  Python: SiPython,
  FastAPI: SiFastapi,
  Flask: SiFlask,
  TensorFlow: SiTensorflow,
  Flutter: SiFlutter,
  Dart: SiDart,
  "Socket.io": SiSocketdotio,
  Vercel: SiVercel,
  "shadcn-ui": SiShadcnui,
};

function TechPill({ name }: { name: string }) {
  const Icon = ICONS[name];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/80 transition-colors hover:bg-white/[0.08]">
      {Icon ? <Icon className="h-3 w-3" /> : null}
      {name}
    </span>
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
