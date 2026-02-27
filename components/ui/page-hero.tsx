import Image from "next/image";
import Link from "next/link";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageUrl: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

function CtaLink({ href, label, className }: { href: string; label: string; className: string }) {
  const isExternal = href.startsWith("http");
  const isProtocolLink = href.startsWith("mailto:") || href.startsWith("tel:");

  if (isExternal || isProtocolLink) {
    return (
      <a
        href={href}
        className={className}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  imageUrl,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-20 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-semibold text-emerald-700">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-bold leading-tight text-[#0F2B46] sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-slate-600">
            {description}
          </p>
          <div className="flex flex-wrap gap-3">
            <CtaLink href={primaryCta.href} label={primaryCta.label} className="btn-primary" />
            {secondaryCta ? (
              <CtaLink
                href={secondaryCta.href}
                label={secondaryCta.label}
                className="btn-secondary"
              />
            ) : null}
          </div>
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-slate-200 shadow-2xl shadow-[#0f2b46]/10">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2b46]/45 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
