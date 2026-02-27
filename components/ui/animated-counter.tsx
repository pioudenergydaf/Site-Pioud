"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
};

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1400,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const rafId = useRef<number>();
  const startRef = useRef<number>();

  const target = useMemo(() => Math.max(0, value), [value]);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startRef.current) {
        startRef.current = timestamp;
      }

      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.floor(eased * target));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      startRef.current = undefined;
    };
  }, [duration, target]);

  return (
    <span className="text-4xl font-bold text-[#0F2B46] sm:text-5xl">
      {displayValue}
      {suffix}
    </span>
  );
}
