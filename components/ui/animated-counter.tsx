type AnimatedCounterProps = {
  value: number | string;
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
  const displayValue =
    typeof value === "number" ? Math.max(0, value).toString() : value;

  return (
    <span
      className={className ?? "font-display text-4xl font-light text-ink sm:text-5xl"}
      style={valueStyle}
    >
      {displayValue}
      <span className={suffixClassName} style={suffixStyle}>
        {suffix}
      </span>
    </span>
  );
}
