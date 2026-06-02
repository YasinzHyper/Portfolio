"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion as fmMotion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, AdaptiveDpr } from "@react-three/drei";
import { Button } from "@/components/ui/button"; // shadcn/ui
import { Badge } from "@/components/ui/badge"; // shadcn/ui
import { Github, Linkedin, Mail, ArrowRight, Zap, MapPin } from "lucide-react";
import { cn } from "@/lib/utils"; // shadcn util
import { motion } from "motion/react";

/**
 * HeroSection — modern, personalized, effects-heavy.
 * Uses Aceternity Background Beams as the ONLY background.
 * Adds typewriter and parallax. Keeps a lightweight R3F scene.
 */
export function HeroSection() {
  const [hover3D, setHover3D] = useState(false);
  const pointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll parallax for heading and 3D
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.6]);
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section id="home" ref={sectionRef} className="relative isolate min-h-[92vh] w-full overflow-hidden bg-[#070910]">
      {/* Background: Aceternity Background Beams ONLY */}
      <BackgroundBeams className="absolute inset-0 -z-20 opacity-25" />

      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 px-6 pb-16 pt-20 md:flex-row md:gap-8 md:pb-24 md:pt-24">
        {/* Text column */}
        <div className="relative z-10 max-w-xl md:max-w-2xl">
          <fmMotion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <Badge className="bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-teal-400/20 text-white font-semibold border border-white/20 hover:from-indigo-500/30 hover:via-fuchsia-500/30 hover:to-teal-400/30 hover:border-white/30 transition-all duration-300 backdrop-blur-sm text-sm">
                Mohammed Yasin Zuhayr
              </Badge>
              <Emblem />
            </div>

            <fmMotion.h1
              style={{ y: titleY, opacity: titleOpacity }}
              className="text-balance bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-4xl font-semibold leading-[1.05] text-transparent sm:text-5xl md:text-6xl"
            >
             Building reliable AI systems&nbsp;
              <br className="hidden sm:block" /> 
              and fast, impactful products.
            </fmMotion.h1>

            {/* Typewriter narrative */}
            <div className="mt-3 text-base text-white/80 sm:text-lg">
              <span className="text-white/60">I focus on </span>
              <Typewriter
                phrases={[
                  "full-stack apps that scale",
                  "reliable GenAI tooling",
                  "clean DX and strong UX",
                  "projects that actually ship",
                ]}
              />
            </div>

            <p className="mt-4 max-w-[60ch] text-pretty text-sm leading-relaxed text-white/70 sm:text-base">
              Full-stack & GenAI engineer. SDE Intern at <b>Oracle</b> (RPAS). Former Technology Apprentice at <b>Morgan Stanley</b>, AI Trainer at <b>xAI</b>, and Research Intern at <b>Samsung Research</b>. Creator of <b>AlgoAce</b> and <b>PrimeEstate</b>. I ship, measure, and iterate.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <ShimmerButton asChild>
                <Link href="https://drive.google.com/drive/folders/10MPwn8bCUmV8gc3X9Bymyd6Wk1SQIlsj?usp=sharing" target="_blank" rel="noopener noreferrer" aria-label="View résumé">
                  <span className="flex items-center gap-2">View résumé <ArrowRight className="h-4 w-4" /></span>
                </Link>
              </ShimmerButton>
              <Button asChild variant="secondary" className="backdrop-blur-md">
                <Link href="#contact" aria-label="Email Yasin" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Contact
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:border-white/50">
                <Link href="#projects">Explore projects</Link>
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4 text-white/70">
              <IconDock />
              <div className="hidden h-6 w-px bg-white/15 sm:block" />
              <Stat label="LeetCode" value="600+ solved (top 8%)" />
              <Dot />
              <Stat label="Research" value="Samsung" />
              <Dot />
              <Stat label="Now" value="Oracle · SDE Intern" />
            </div>
          </fmMotion.div>
        </div>

        {/* 3D column */}
        <fmMotion.div
          style={{ y: panelY }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 w-full max-w-[620px] shrink-0"
          onMouseEnter={() => setHover3D(true)}
          onMouseLeave={() => setHover3D(false)}
          onMouseMove={(e) => {
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // [-1,1]
            const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // [-1,1]
            pointer.current.x = x;
            pointer.current.y = y;
          }}
        >
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-2 shadow-2xl">
            <div className="pointer-events-none absolute -inset-[1.5px] rounded-[calc(1.5rem+2px)] bg-[radial-gradient(60%_120%_at_50%_0%,rgba(99,102,241,0.35),transparent_60%),radial-gradient(50%_60%_at_80%_40%,rgba(168,85,247,0.35),transparent_60%),radial-gradient(50%_60%_at_20%_60%,rgba(20,184,166,0.35),transparent_60%)] blur-2xl" />
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-black/40">
              <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                dpr={[1, 1.25]} // cap DPR to save VRAM
                gl={{ antialias: false, powerPreference: "low-power" }}
              >
                <ambientLight intensity={0.6} />
                <pointLight position={[6, 4, 6]} intensity={10} color={"#a78bfa"} />
                <pointLight position={[-6, -4, -6]} intensity={7} color={"#34d399"} />
                <AdaptiveDpr pixelated />
                <Float floatIntensity={1.2} rotationIntensity={0.6}>
                  <Rig hover={hover3D} pointer={pointer}>
                    <CodeOrb />
                  </Rig>
                </Float>
                <Stars count={400} radius={36} />
              </Canvas>
            </div>
          </div>
          {/* <fmMotion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-3 text-center text-xs text-white/60">
            Interactive 3D • Optimized • No external model files
          </fmMotion.div> */}
        </fmMotion.div>
      </div>

      {/* subtle scroll indicator */}
      <ScrollHint />
    </section>
  );
}

/** Decorative components **/
function Dot() {
  return <span className="mx-1 inline-block h-1.5 w-1.5 rounded-full bg-white/25 align-middle" />;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-white/50">{label}:</span>
      <span className="text-white/80">{value}</span>
    </div>
  );
}

function IconDock() {
  const items = [
    { href: "https://github.com/yasinzhyper", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/mohammed-yasin-zuhayr-249158157/", icon: Linkedin, label: "LinkedIn" },
    { href: "mailto:myasinzuhayr@gmail.com", icon: Mail, label: "Email" },
  ];
  return (
    <div className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 pr-2 backdrop-blur">
      {items.map(({ href, icon: Icon, label }) => (
        <Link key={href} href={href} target={href.startsWith('http') ? "_blank" : undefined} rel={href.startsWith('http') ? "noopener noreferrer" : undefined} aria-label={label} className="focus-ring">
          <span className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-white/80 transition-all hover:scale-[1.02] hover:bg-white/[0.06] hover:text-white">
            <Icon className="h-4 w-4" />
            <span className="hidden text-sm sm:block">{label}</span>
          </span>
        </Link>
      ))}
      <span className="ml-2 hidden rounded-full bg-emerald-400/15 px-2 py-1 text-[10px] text-emerald-300 ring-1 ring-emerald-400/20 sm:inline-flex">
        <Zap className="mr-1 h-3 w-3" /> Open to collab
      </span>
    </div>
  );
}

function Emblem() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/80 backdrop-blur">
      <MapPin className="h-3.5 w-3.5" /> Bengaluru • India
    </div>
  );
}

function ShimmerButton({ children, asChild = false }: { children: React.ReactNode; asChild?: boolean }) {
  // When asChild is true and the child is a <Link>, hoist its href to the wrapper
  if (asChild && React.isValidElement(children)) {
    const childEl = children as React.ReactElement<Record<string, unknown>>;
    const href: string | undefined = childEl.props?.href as string | undefined;
    const target: string | undefined = childEl.props?.target as string | undefined;
    const rel: string | undefined = childEl.props?.rel as string | undefined;
    const ariaLabel: string | undefined = childEl.props?.["aria-label"] as string | undefined;
    const inner = childEl.props?.children as React.ReactNode;

    return (
      <Link
        href={href ?? "#"}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className="relative inline-flex items-center justify-center overflow-hidden rounded-xl px-4 py-2 text-sm font-medium text-white focus-visible:outline-none"
      >
        <fmMotion.span
          initial={{ backgroundPositionX: 0 }}
          animate={{ backgroundPositionX: 300 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute inset-0 -z-10 bg-[length:300px_100%] bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-teal-400 opacity-80"
          style={{ backgroundImage: "linear-gradient(90deg,#6366f1, #a855f7, #14b8a6, #6366f1)" }}
        />
        <span className="relative z-10">{inner}</span>
        <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl ring-1 ring-white/20" />
      </Link>
    );
  }

  // Default button wrapper
  return (
    <button className="relative inline-flex items-center justify-center overflow-hidden rounded-xl px-4 py-2 text-sm font-medium text-white focus-visible:outline-none">
      <fmMotion.span
        initial={{ backgroundPositionX: 0 }}
        animate={{ backgroundPositionX: 300 }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="absolute inset-0 -z-10 bg-[length:300px_100%] bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-teal-400 opacity-80"
        style={{ backgroundImage: "linear-gradient(90deg,#6366f1, #a855f7, #14b8a6, #6366f1)" }}
      />
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl ring-1 ring-white/20" />
    </button>
  );
}

/** Typewriter effect **/
function Typewriter({
  phrases,
  speed = 35,
  eraseSpeed = 14,
  pause = 900,
}: {
  phrases: string[];
  speed?: number;
  eraseSpeed?: number;
  pause?: number;
}) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1); // 1 typing, -1 erasing
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const current = phrases[idx % phrases.length];
    const doneTyping = sub === current.length && dir === 1;
    const doneErasing = sub === 0 && dir === -1;

    const t = setTimeout(() => {
      if (doneTyping) {
        setDir(-1);
      } else if (doneErasing) {
        setDir(1);
        setIdx((p) => (p + 1) % phrases.length);
      } else {
        setSub((p) => p + dir);
      }
    }, doneTyping ? pause : doneErasing ? 300 : dir === 1 ? speed : eraseSpeed);
    return () => clearTimeout(t);
  }, [sub, dir, idx, phrases, speed, eraseSpeed, pause]);

  useEffect(() => {
    const c = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(c);
  }, []);

  const text = phrases[idx % phrases.length].slice(0, sub);
  return (
    <span className="font-medium tracking-tight text-white">
      {text}
      <span style={{ opacity: blink ? 1 : 0 }} className="ml-0.5 inline-block h-5 w-[2px] translate-y-[2px] bg-white/80 align-middle" />
    </span>
  );
}

function ScrollHint() {
  return (
    <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-white/50">
      <fmMotion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs backdrop-blur">
        Scroll
      </fmMotion.div>
    </div>
  );
}

/** 3D content **/
function CodeOrb() {
  const group = useRef<THREE.Group>(null!);
  const ring = useRef<THREE.Mesh>(null!);
  const inner = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.2;
    if (ring.current) ring.current.rotation.x = t * 0.42;
    if (inner.current) inner.current.rotation.y = -t * 0.38;
  });

  return (
    <group ref={group}>
      {/* Outer glowing ring */}
      <mesh ref={ring}>
        <torusGeometry args={[2.2, 0.08, 24, 96]} />
        <meshStandardMaterial emissive={new THREE.Color("#7c3aed")} emissiveIntensity={1.4} color="#a78bfa" metalness={0.3} roughness={0.28} />
      </mesh>

      {/* Inner code core */}
      <mesh ref={inner} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial color="#22d3ee" emissive="#06b6d4" emissiveIntensity={0.6} metalness={0.35} roughness={0.3} />
      </mesh>

      {/* Floating chips */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
        <Chip position={[2.7, 0.9, 0.6]} color="#34d399" />
        <Chip position={[-2.9, -0.6, -0.4]} color="#f472b6" />
        <Chip position={[0.2, 2.6, -0.8]} color="#60a5fa" />
      </Float>
    </group>
  );
}

function Rig({ children, hover, pointer }: { children: React.ReactNode; hover: boolean; pointer: React.MutableRefObject<{ x: number; y: number }>; }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(() => {
    if (!ref.current) return;
    const targetX = hover ? -pointer.current.y * 0.22 : 0; // tilt up/down
    const targetY = hover ? pointer.current.x * 0.3 : 0; // turn left/right

    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.08;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.08;

    const sTarget = hover ? 1.02 : 1;
    const s = ref.current.scale.x + (sTarget - ref.current.scale.x) * 0.08;
    ref.current.scale.setScalar(s);
  });
  return <group ref={ref}>{children}</group>;
}

function Chip({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.7, 0.1, 0.5]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.2} roughness={0.35} />
    </mesh>
  );
}

function Stars({ count = 400, radius = 30 }: { count?: number; radius?: number }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count, radius]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color={"#ffffff"} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

/**
 * Perf-optimized Aceternity Background Boxes
 * Faithful look, far fewer DOM nodes, no per-cell animations.
 */
// Aceternity Background Beams (official SVG version)
export const BackgroundBeams = React.memo(({ className }: { className?: string }) => {
  const paths = [
      "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
      "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
      "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
      "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
      "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
      "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
      "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
      "M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
      "M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811",
      "M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803",
      "M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795",
      "M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787",
      "M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779",
      "M-289 -293C-289 -293 -221 112 243 239C707 366 775 771 775 771",
      "M-282 -301C-282 -301 -214 104 250 231C714 358 782 763 782 763",
      "M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755",
      "M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747",
      "M-261 -325C-261 -325 -193 80 271 207C735 334 803 739 803 739",
      "M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731",
      "M-247 -341C-247 -341 -179 64 285 191C749 318 817 723 817 723",
      "M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715",
      "M-233 -357C-233 -357 -165 48 299 175C763 302 831 707 831 707",
      "M-226 -365C-226 -365 -158 40 306 167C770 294 838 699 838 699",
      "M-219 -373C-219 -373 -151 32 313 159C777 286 845 691 845 691",
      "M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683",
      "M-205 -389C-205 -389 -137 16 327 143C791 270 859 675 859 675",
      "M-198 -397C-198 -397 -130 8 334 135C798 262 866 667 866 667",
      "M-191 -405C-191 -405 -123 0 341 127C805 254 873 659 873 659",
      "M-184 -413C-184 -413 -116 -8 348 119C812 246 880 651 880 651",
      "M-177 -421C-177 -421 -109 -16 355 111C819 238 887 643 887 643",
      "M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635",
      "M-163 -437C-163 -437 -95 -32 369 95C833 222 901 627 901 627",
      "M-156 -445C-156 -445 -88 -40 376 87C840 214 908 619 908 619",
      "M-149 -453C-149 -453 -81 -48 383 79C847 206 915 611 915 611",
      "M-142 -461C-142 -461 -74 -56 390 71C854 198 922 603 922 603",
      "M-135 -469C-135 -469 -67 -64 397 63C861 190 929 595 929 595",
      "M-128 -477C-128 -477 -60 -72 404 55C868 182 936 587 936 587",
      "M-121 -485C-121 -485 -53 -80 411 47C875 174 943 579 943 579",
      "M-114 -493C-114 -493 -46 -88 418 39C882 166 950 571 950 571",
      "M-107 -501C-107 -501 -39 -96 425 31C889 158 957 563 957 563",
      "M-100 -509C-100 -509 -32 -104 432 23C896 150 964 555 964 555",
      "M-93 -517C-93 -517 -25 -112 439 15C903 142 971 547 971 547",
      "M-86 -525C-86 -525 -18 -120 446 7C910 134 978 539 978 539",
      "M-79 -533C-79 -533 -11 -128 453 -1C917 126 985 531 985 531",
      "M-72 -541C-72 -541 -4 -136 460 -9C924 118 992 523 992 523",
      "M-65 -549C-65 -549 3 -144 467 -17C931 110 999 515 999 515",
      "M-58 -557C-58 -557 10 -152 474 -25C938 102 1006 507 1006 507",
      "M-51 -565C-51 -565 17 -160 481 -33C945 94 1013 499 1013 499",
      "M-44 -573C-44 -573 24 -168 488 -41C952 86 1020 491 1020 491",
      "M-37 -581C-37 -581 31 -176 495 -49C959 78 1027 483 1027 483",
      "M-30 -589C-30 -589 38 -184 502 -57C966 70 1034 475 1034 475",
      "M-23 -597C-23 -597 45 -192 509 -65C973 62 1041 467 1041 467",
      "M-16 -605C-16 -605 52 -200 516 -73C980 54 1048 459 1048 459",
      "M-9 -613C-9 -613 59 -208 523 -81C987 46 1055 451 1055 451",
      "M-2 -621C-2 -621 66 -216 530 -89C994 38 1062 443 1062 443",
      "M5 -629C5 -629 73 -224 537 -97C1001 30 1069 435 1069 435",
      "M12 -637C12 -637 80 -232 544 -105C1008 22 1076 427 1076 427",
      "M19 -645C19 -645 87 -240 551 -113C1015 14 1083 419 1083 419",
      "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
  ];
  return (
    <div className={cn("absolute inset-0 flex h-full w-full items-center justify-center [mask-repeat:no-repeat] [mask-size:40px]", className)}>
      <svg className="pointer-events-none absolute z-0 h-full w-full" width="100%" height="100%" viewBox="0 0 696 316" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779M-289 -293C-289 -293 -221 112 243 239C707 366 775 771 775 771M-282 -301C-282 -301 -214 104 250 231C714 358 782 763 782 763M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747M-261 -325C-261 -325 -193 80 271 207C735 334 803 739 803 739M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731M-247 -341C-247 -341 -179 64 285 191C749 318 817 723 817 723M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715M-233 -357C-233 -357 -165 48 299 175C763 302 831 707 831 707M-226 -365C-226 -365 -158 40 306 167C770 294 838 699 838 699M-219 -373C-219 -373 -151 32 313 159C777 286 845 691 845 691M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683M-205 -389C-205 -389 -137 16 327 143C791 270 859 675 859 675M-198 -397C-198 -397 -130 8 334 135C798 262 866 667 866 667M-191 -405C-191 -405 -123 0 341 127C805 254 873 659 873 659M-184 -413C-184 -413 -116 -8 348 119C812 246 880 651 880 651M-177 -421C-177 -421 -109 -16 355 111C819 238 887 643 887 643M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635M-163 -437C-163 -437 -95 -32 369 95C833 222 901 627 901 627M-156 -445C-156 -445 -88 -40 376 87C840 214 908 619 908 619M-149 -453C-149 -453 -81 -48 383 79C847 206 915 611 915 611M-142 -461C-142 -461 -74 -56 390 71C854 198 922 603 922 603M-135 -469C-135 -469 -67 -64 397 63C861 190 929 595 929 595M-128 -477C-128 -477 -60 -72 404 55C868 182 936 587 936 587M-121 -485C-121 -485 -53 -80 411 47C875 174 943 579 943 579M-114 -493C-114 -493 -46 -88 418 39C882 166 950 571 950 571M-107 -501C-107 -501 -39 -96 425 31C889 158 957 563 957 563M-100 -509C-100 -509 -32 -104 432 23C896 150 964 555 964 555M-93 -517C-93 -517 -25 -112 439 15C903 142 971 547 971 547M-86 -525C-86 -525 -18 -120 446 7C910 134 978 539 978 539M-79 -533C-79 -533 -11 -128 453 -1C917 126 985 531 985 531M-72 -541C-72 -541 -4 -136 460 -9C924 118 992 523 992 523M-65 -549C-65 -549 3 -144 467 -17C931 110 999 515 999 515M-58 -557C-58 -557 10 -152 474 -25C938 102 1006 507 1006 507M-51 -565C-51 -565 17 -160 481 -33C945 94 1013 499 1013 499M-44 -573C-44 -573 24 -168 488 -41C952 86 1020 491 1020 491M-37 -581C-37 -581 31 -176 495 -49C959 78 1027 483 1027 483M-30 -589C-30 -589 38 -184 502 -57C966 70 1034 475 1034 475M-23 -597C-23 -597 45 -192 509 -65C973 62 1041 467 1041 467M-16 -605C-16 -605 52 -200 516 -73C980 54 1048 459 1048 459M-9 -613C-9 -613 59 -208 523 -81C987 46 1055 451 1055 451M-2 -621C-2 -621 66 -216 530 -89C994 38 1062 443 1062 443M5 -629C5 -629 73 -224 537 -97C1001 30 1069 435 1069 435M12 -637C12 -637 80 -232 544 -105C1008 22 1076 427 1076 427M19 -645C19 -645 87 -240 551 -113C1015 14 1083 419 1083 419"
          stroke="url(#paint0_radial_242_278)" strokeOpacity="0.05" strokeWidth="0.5" />
        {paths.map((path, index) => (
          <motion.path key={`path-` + index} d={path} stroke={`url(#linearGradient-${index})`} strokeOpacity="0.4" strokeWidth="0.5" />
        ))}
        <defs>
          {paths.map((_, index) => (
            <motion.linearGradient id={`linearGradient-${index}`} key={`gradient-${index}`} initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }} animate={{ x1: ["0%", "100%"], x2: ["0%", "95%"], y1: ["0%", "100%"], y2: ["0%", `${93 + Math.random() * 8}%`] }} transition={{ duration: Math.random() * 10 + 10, ease: "easeInOut", repeat: Infinity, delay: Math.random() * 10 }}>
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop stopColor="#18CCFC" />
              <stop offset="32.5%" stopColor="#6344F5" />
              <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
            </motion.linearGradient>
          ))}
          <radialGradient id="paint0_radial_242_278" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)">
            <stop offset="0.0666667" stopColor="#d4d4d4" />
            <stop offset="0.243243" stopColor="#d4d4d4" />
            <stop offset="0.43594" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
});
BackgroundBeams.displayName = "BackgroundBeams";

/**
 * Utility: focus ring class
 */
const FocusRing = () => (
  <style>{`.focus-ring:focus-visible{outline:2px solid rgba(255,255,255,.35); outline-offset:2px; border-radius:12px}`}</style>
);
