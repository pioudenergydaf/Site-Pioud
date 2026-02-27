type PartnersMarqueeProps = {
  partners: string[];
};

export function PartnersMarquee({ partners }: PartnersMarqueeProps) {
  const repeated = [...partners, ...partners];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white py-5 shadow-lg shadow-[#0f2b46]/5">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f8fafc] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f8fafc] to-transparent" />
      <div className="marquee-track flex min-w-max items-center gap-5">
        {repeated.map((partner, index) => (
          <span
            key={`${partner}-${index}`}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600"
          >
            {partner}
          </span>
        ))}
      </div>
    </div>
  );
}
