"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils"; // shadcn util
import { Button } from "@/components/ui/button"; // shadcn/ui
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // shadcn/ui (generate if missing)
import { Menu, Github, Linkedin, Mail, FileText } from "lucide-react";

/**
 * Navbar — matches Hero theme. Floating when scrolled. Attached at top when at page start.
 * - Top-attached state at scrollY <= 2
 * - Floating glass dock state for scrollY > 2
 * - Progress bar on top edge
 * - Accessible mobile drawer
 */
export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    // Initial
    setAtTop(typeof window !== "undefined" ? window.scrollY <= 2 : true);
    const unsub = scrollY.on("change", (v) => setAtTop(v <= 2));
    return () => unsub();
  }, [scrollY]);

  // Scroll progress indicator
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.2 });

  // Container styles that morph between states
  const y = useTransform(scrollY, [0, 120], [0, 0]); // fixed at top, we morph styles only
  const radius = useTransform(scrollY, [0, 40], [0, 16]);
  const bgAlpha = useTransform(scrollY, [0, 40], [0.32, 0.75]);
  const borderOpacity = useTransform(scrollY, [0, 40], [0.0, 0.15]);
  const shadowOpacity = useTransform(scrollY, [0, 40], [0.0, 0.35]);
  const borderColor = useTransform(borderOpacity, (o) => `rgba(255,255,255,${o})`);
  const boxShadow = useTransform(shadowOpacity, (o) => `0 10px 30px rgba(0,0,0,${o})`);
  const bg = useMotionTemplate`rgba(7 9 16 / ${bgAlpha})`;

  const links = useMemo(
    () => [
      { href: "#home", label: "Home" },
      { href: "#about", label: "About" },
      { href: "#experience", label: "Experience" },
      { href: "#skills", label: "Skills" },
      { href: "#projects", label: "Projects" },
      { href: "#contact", label: "Contact" },
    ],
    []
  );

  return (
    <motion.nav
      style={{ y, borderRadius: radius }}
      className={cn(
        "fixed left-0 right-0 z-50",
        atTop ? "top-0" : "top-4",
        "mx-auto flex items-center justify-center px-3",
      )}
      aria-label="Primary"
    >
      {/* Progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className={cn(
          "pointer-events-none absolute left-0 right-0 origin-left",
          atTop ? "top-0" : "-top-1",
          "h-[2px] bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-teal-400/90",
        )}
      />
      <motion.div
        style={{
          backgroundColor: bg, // animate only the background alpha, not children opacity
          boxShadow,
          borderColor,
        }}
        className={cn(
          "relative w-full max-w-6xl",
          atTop ? "rounded-none" : "rounded-2xl",
          "border border-white/10 bg-transparent backdrop-blur",
        )}
      >
        <div className="flex items-center justify-between gap-2 px-3 py-2 md:px-4 md:py-2.5">
          {/* Brand */}
          <Link href="#home" className="group inline-flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-teal-400" />
            <span className="text-sm font-semibold tracking-tight text-white group-hover:opacity-90">
              Yasin • Dev
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <NavItem key={l.href} href={l.href} active={pathname === l.href}>
                {l.label}
              </NavItem>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <IconLink href="https://github.com/YasinzHyper" label="GitHub">
              <Github className="h-4 w-4" />
            </IconLink>
            <IconLink href="https://www.linkedin.com/in/mohammed-yasin-zuhayr-249158157/" label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </IconLink>
            <IconLink href="mailto:myasinzuhayr@gmail.com" label="Email">
              <Mail className="h-4 w-4" />
            </IconLink>
            <Button asChild size="sm" className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-teal-400 text-white">
              <Link href="https://drive.google.com/drive/folders/10MPwn8bCUmV8gc3X9Bymyd6Wk1SQIlsj?usp=sharing" target="_blank" rel="noopener noreferrer" aria-label="Resume">
                <FileText className="mr-1.5 h-4 w-4" /> Resume
              </Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white/90">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="border-white/10 bg-black/60 backdrop-blur">
                <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-2">
                  {links.map((l) => (
                    <Link key={l.href} href={l.href} className="rounded-xl px-3 py-2 text-white/90 hover:bg-white/10">
                      {l.label}
                    </Link>
                  ))}
                  <div className="mt-2 flex items-center gap-2">
                    <IconLink href="https://github.com/myasinzuhayr" label="GitHub">
                      <Github className="h-4 w-4" />
                    </IconLink>
                    <IconLink href="https://www.linkedin.com/in/myasinzuhayr/" label="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </IconLink>
                    <IconLink href="mailto:myasinzuhayr@gmail.com" label="Email">
                      <Mail className="h-4 w-4" />
                    </IconLink>
                    <Button asChild size="sm" className="ml-auto bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-teal-400 text-white">
                      <Link href="https://drive.google.com/drive/folders/10MPwn8bCUmV8gc3X9Bymyd6Wk1SQIlsj?usp=sharing" target="_blank" rel="noopener noreferrer" aria-label="Resume">
                        <FileText className="mr-1.5 h-4 w-4" /> Resume
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Accent hairline when attached */}
        {atTop ? (
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        ) : null}
      </motion.div>
    </motion.nav>
  );
}

function NavItem({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative rounded-lg px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white",
        active && "text-white",
      )}
    >
      {children}
      {/* underline on hover/active */}
      <motion.span
        layoutId={`nav-underline`}
        className={cn("pointer-events-none absolute left-2 right-2 -bottom-[2px] h-[2px] rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-teal-400", !active && "hidden group-hover:block")}
      />
    </Link>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const isExternal = href.startsWith('http') && !href.startsWith('mailto:');
  return (
    <Link 
      href={href} 
      target={isExternal ? "_blank" : undefined} 
      rel={isExternal ? "noopener noreferrer" : undefined} 
      aria-label={label} 
      className="inline-flex items-center justify-center rounded-lg p-2 text-white/80 hover:bg-white/10 hover:text-white"
    >
      {children}
    </Link>
  );
}
