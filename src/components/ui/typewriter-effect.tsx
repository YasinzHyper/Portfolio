"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const fullText = currentWord.text;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        } else {
          // Start deleting after a pause
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 100 : 150);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className={cn("text-base sm:text-xl md:text-3xl lg:text-5xl font-bold", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="inline"
      >
        {words.map((word, idx) => (
          <div key={`word-${idx}`} className="inline">
            {idx <= currentWordIndex && (
              <span
                className={cn(
                  "text-black dark:text-white",
                  idx === currentWordIndex ? word.className : "",
                )}
              >
                {idx === currentWordIndex ? currentText : word.text}
                {idx < words.length - 1 && idx !== currentWordIndex && " "}
              </span>
            )}
          </div>
        ))}
        <motion.span
          animate={{
            opacity: showCursor ? 1 : 0,
          }}
          className={cn(
            "inline-block h-4 w-[4px] sm:h-6 sm:w-[6px] lg:h-10 lg:w-[10px] bg-blue-500 ml-1",
            cursorClassName
          )}
        />
      </motion.div>
    </div>
  );
};
