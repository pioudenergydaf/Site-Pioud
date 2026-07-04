"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { type ReactNode, useRef } from "react";

type PopInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function PopIn({ children, className, delay = 0 }: PopInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={isInView ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {children}
    </motion.div>
  );
}
