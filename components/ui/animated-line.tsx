"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type AnimatedLineProps = {
  axis: "x" | "y";
  className?: string;
  duration?: number;
  delay?: number;
};

export function AnimatedLine({ axis, className, duration = 0.6, delay = 0 }: AnimatedLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className} />;
  }

  const scaleKey = axis === "x" ? "scaleX" : "scaleY";
  const origin = axis === "x" ? "left" : "top";

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ transformOrigin: origin }}
      initial={{ [scaleKey]: 0 }}
      animate={isInView ? { [scaleKey]: 1 } : undefined}
      transition={{ duration, ease: "easeOut", delay }}
    />
  );
}
