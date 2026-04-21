type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  className?: string;
  suffixClassName?: string;
};

export function AnimatedCounter({
  value,
  suffix = "",
  className,
  suffixClassName = "",
}: AnimatedCounterProps) {
  const target = Math.max(0, value);

  return (
    <span className={className ?? "font-display text-4xl font-light text-ink sm:text-5xl"}>
      {target}
      <span className={suffixClassName}>{suffix}</span>
    </span>
  );
}
