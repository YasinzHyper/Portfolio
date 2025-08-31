"use client";

import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

const ScrollProgress = ({ className }: { className?: string }) => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 h-1 bg-primary origin-[0%]",
        className
      )}
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;
