"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  to: number;
  prefix?: string;
  duration?: number;
  className?: string;
};

export function CountUp({ to, prefix = "", duration = 0.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const [value, setValue] = useState(shouldReduceMotion ? to : 0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, shouldReduceMotion, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
    </span>
  );
}
