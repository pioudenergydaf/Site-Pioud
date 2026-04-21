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
    <section className="relative overflow-hidden bg-cream pt-32">
      <div className="pointer-events-none absolute -right-20 top-20 h-[360px] w-[360px] rounded-pill bg-sage/70 blur-3xl" />
      <div className="pointer-events-none absolute -left-12 bottom-6 h-[280px] w-[280px] rounded-pill bg-lime-soft/60 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-20 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          <p className="inline-flex rounded-pill border border-ink/10 bg-white px-4 py-1 text-sm font-medium text-ink-muted">
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl font-light leading-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-ink-muted">
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
        <div className="relative min-h-[320px] overflow-hidden rounded-card-lg border border-ink/10 shadow-xl shadow-[0_16px_36px_rgba(31,58,46,0.12)]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/35 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
