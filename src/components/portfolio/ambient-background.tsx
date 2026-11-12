"use client";

import { useEffect, useRef } from "react";
import { usePortfolioMotion } from "./motion-provider";

type Star = { x: number; y: number; radius: number; phase: number };
const streamPaths = [
  "M-140 180 C260 -110 475 90 250 345 S-60 730 380 1050",
  "M1570 30 C1030 30 1210 300 1380 430 S1030 770 1120 1090",
  "M-130 760 C250 920 410 450 850 690 S1280 1020 1570 700",
  "M-180 940 C150 620 520 880 920 570 S1390 240 1600 400",
] as const;

function seeded(index: number): number {
  const value = Math.sin(index * 93.7 + 7.4) * 43758.5453;
  return value - Math.floor(value);
}

/** A bounded canvas supplies points; lightweight SVG streams carry visible motion. */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsedRef = useRef(0);
  const { paused } = usePortfolioMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let animationFrame = 0;
    let resizeFrame = 0;
    let lastFrame = performance.now();
    let pointerX = -1000;
    let pointerY = -1000;
    const stopped = () => paused || document.hidden;

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i];
        const x = star.x + Math.sin(elapsedRef.current * 0.16 + star.phase) * 22;
        const y = star.y + Math.cos(elapsedRef.current * 0.12 + star.phase) * 18;
        const alpha = 0.24 + (0.5 + 0.5 * Math.sin(elapsedRef.current * 0.4 + star.phase)) * 0.32;
        context.fillStyle = `rgba(${i % 3 === 0 ? "124,215,204" : "180,169,230"},${alpha})`;
        context.beginPath(); context.arc(x, y, star.radius, 0, Math.PI * 2); context.fill();
        if (i % 3 === 0 && !stopped()) {
          const distance = Math.hypot(pointerX - x, pointerY - y);
          if (distance < 140) {
            context.strokeStyle = `rgba(169,153,241,${(1 - distance / 140) * 0.27})`;
            context.lineWidth = 0.8;
            context.beginPath(); context.moveTo(x, y); context.lineTo(pointerX, pointerY); context.stroke();
          }
        }
      }
    };

    const resize = () => {
      resizeFrame = 0;
      width = window.innerWidth; height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      stars = Array.from({ length: width < 600 ? 24 : 52 }, (_, index) => ({
        x: seeded(index + 1) * width, y: seeded(index + 122) * height,
        radius: 0.65 + seeded(index + 333) * 0.8, phase: seeded(index + 555) * Math.PI * 2,
      }));
      draw();
    };
    const tick = (time: number) => {
      animationFrame = 0;
      if (stopped()) return;
      // About 30 draws per second is sufficient for this slow background.
      if (time - lastFrame >= 32) {
        elapsedRef.current += Math.min((time - lastFrame) / 1000, 0.08);
        lastFrame = time; draw();
      }
      animationFrame = window.requestAnimationFrame(tick);
    };
    const syncVisibility = () => {
      window.cancelAnimationFrame(animationFrame); animationFrame = 0;
      lastFrame = performance.now();
      if (!stopped()) animationFrame = window.requestAnimationFrame(tick); else draw();
    };
    const scheduleResize = () => { if (!resizeFrame) resizeFrame = window.requestAnimationFrame(resize); };
    const handlePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch" || stopped()) return;
      pointerX = event.clientX; pointerY = event.clientY;
    };
    const clearPointer = () => { pointerX = -1000; pointerY = -1000; };

    resize(); syncVisibility();
    window.addEventListener("resize", scheduleResize, { passive: true });
    window.addEventListener("pointermove", handlePointer, { passive: true });
    document.addEventListener("pointerleave", clearPointer);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      window.cancelAnimationFrame(animationFrame); window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", scheduleResize);
      window.removeEventListener("pointermove", handlePointer);
      document.removeEventListener("pointerleave", clearPointer);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, [paused]);

  return (
    <div className="scene-backdrop" aria-hidden="true" data-motion-paused={paused}>
      <i className="ambient-cloud" /><i className="ambient-cloud" /><i className="ambient-cloud" />
      <svg className="ambient-streams" viewBox="0 0 1440 1000" preserveAspectRatio="none" focusable="false">
        {streamPaths.map((path, index) => <g className={`ambient-stream ambient-stream-${index + 1}`} key={path}>
          <path className="ambient-stream-rail" d={path} pathLength="1000" />
          <path className="ambient-stream-halo ambient-stream-travel" d={path} pathLength="1000" />
          <path className="ambient-stream-core ambient-stream-travel" d={path} pathLength="1000" />
        </g>)}
      </svg>
      <div className="ambient-grain" /><canvas ref={canvasRef} />
    </div>
  );
}
