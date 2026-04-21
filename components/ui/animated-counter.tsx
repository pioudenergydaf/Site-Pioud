type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  className?: string;
  suffixClassName?: string;
  valueStyle?: React.CSSProperties;
  suffixStyle?: React.CSSProperties;
};

export function AnimatedCounter({
  value,
  suffix = "",
  className,
  suffixClassName = "",
  valueStyle,
  suffixStyle,
}: AnimatedCounterProps) {
  const target = Math.max(0, value);

  return (
    <span
      className={className ?? "font-display text-4xl font-light text-ink sm:text-5xl"}
      style={valueStyle}
    >
      {target}
      <span className={suffixClassName} style={suffixStyle}>
        {suffix}
      </span>
    </span>
  );
}
