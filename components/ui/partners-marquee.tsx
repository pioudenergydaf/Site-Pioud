type PartnersMarqueeProps = {
  partners: string[];
};

export function PartnersMarquee({ partners }: PartnersMarqueeProps) {
  const repeated = [...partners, ...partners];

  return (
    <div className="relative overflow-hidden rounded-card border border-ink/10 bg-white py-5 shadow-lg shadow-[rgba(31,58,46,0.05)]">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream to-transparent" />
      <div className="marquee-track flex min-w-max items-center gap-5">
        {repeated.map((partner, index) => (
          <span
            key={`${partner}-${index}`}
            className="rounded-pill border border-ink/10 bg-cream-soft px-4 py-2 text-sm font-semibold text-ink-muted"
          >
            {partner}
          </span>
        ))}
      </div>
    </div>
  );
}
