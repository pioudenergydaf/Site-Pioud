type SectionHeadingProps = {
  title: string;
  description: string;
  centered?: boolean;
};

export function SectionHeading({
  title,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <h2 className="text-3xl font-bold text-[#0F2B46] sm:text-4xl">{title}</h2>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}
