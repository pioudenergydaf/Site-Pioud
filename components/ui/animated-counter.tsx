type AnimatedCounterProps = {
  value: number;
  suffix?: string;
};

export function AnimatedCounter({ value, suffix = "" }: AnimatedCounterProps) {
  const target = Math.max(0, value);

  return (
    <span className="font-display text-4xl font-light text-ink sm:text-5xl">
      {target}
      {suffix}
    </span>
  );
}
