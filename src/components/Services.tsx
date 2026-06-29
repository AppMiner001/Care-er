import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";

const services = [
  {
    to: "/tjanster/bemanning" as const,
    title: "Bemanning",
    outcome: "Rätt människor när behov uppstår.",
    body: "Kompetens som fungerar från dag ett.",
    index: "01",
  },
  {
    to: "/tjanster/rekrytering" as const,
    title: "Rekrytering",
    outcome: "Människor som passar kulturen, rollen och framtiden.",
    body: "Vi rekryterar för långsiktig effekt – inte bara rätt CV.",
    index: "02",
  },
  {
    to: "/tjanster/utbildning" as const,
    title: "Utbildning",
    outcome: "Service och beteenden som stärker varje kundmöte.",
    body: "Praktisk träning som märks i nästa kundkontakt.",
    index: "03",
  },
  {
    to: "/tjanster/change" as const,
    title: "Transformation",
    outcome: "Förändring som fungerar i vardagen.",
    body: "Vi bygger strukturer och beteenden som består när projektet är slut.",
    index: "04",
  },
] as const;

export function Services() {
  const headingRef = useReveal<HTMLDivElement>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="tjanster" className="py-28 md:py-44 scroll-mt-24">
      <div className="container-care">

        <div ref={headingRef} data-reveal className="mb-20 md:mb-32 max-w-2xl">
          <p className="eyebrow text-[var(--color-ink)]/60 mb-7">Tjänster</p>
          <h2 className="display-xl text-[var(--color-ink)]">
            <span style={{ fontWeight: 700 }}>Fyra discipliner.</span>
            <br />
            <span className="text-[var(--color-ink)]/50" style={{ fontWeight: 300 }}>
              Ett syfte.
            </span>
          </h2>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute hidden md:block top-0 bottom-0 w-px left-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, oklch(0.13 0.04 271 / 0.08) 6%, oklch(0.13 0.04 271 / 0.08) 94%, transparent 100%)",
            }}
          />
          {services.map((s, i) => (
            <ServiceRow
              key={s.title}
              service={s}
              delay={i * 100}
              dimmed={activeIndex !== null && activeIndex !== i}
              isActive={activeIndex === i}
              onHover={() => setActiveIndex(i)}
              onLeave={() => setActiveIndex(null)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function ServiceRow({
  service,
  delay,
  dimmed,
  isActive: _isActive,
  onHover,
  onLeave,
}: {
  service: (typeof services)[number];
  delay: number;
  dimmed: boolean;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const ref = useReveal<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      to={service.to}
      data-reveal
      data-delay={delay > 0 ? (String(delay) as "100" | "200" | "300") : undefined}
      className="service-row group grid md:grid-cols-[5rem_1fr_auto] items-start gap-x-8 md:gap-x-14 py-12 md:py-16 border-t border-[var(--color-ink)]/[0.07] last:border-b last:border-[var(--color-ink)]/[0.07]"
      style={{
        opacity: dimmed ? 0.32 : 1,
        transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Index number */}
      <span
        aria-hidden
        className="hidden md:block font-semibold leading-none text-[var(--color-ink)]/[0.09] group-hover:text-[var(--color-ink)]/[0.28] transition-colors duration-500 pt-1"
        style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", letterSpacing: "-0.04em" }}
      >
        {service.index}
      </span>

      {/* Content */}
      <div>
        <h3 className="service-name display-md text-[var(--color-ink)]/72 group-hover:text-[var(--color-ink)] transition-all duration-300 group-hover:translate-x-0.5">
          {service.title}
        </h3>
        <p
          className="service-outcome mt-5 text-lg md:text-xl leading-snug max-w-xl text-pretty"
          style={{ fontStyle: "italic", fontWeight: 300 }}
        >
          {service.outcome}
        </p>
        <p
          className="mt-3 text-sm md:text-base text-[var(--color-ink)]/65 group-hover:text-[var(--color-ink)]/85 max-w-2xl text-pretty leading-relaxed transition-colors duration-400"
          style={{ fontWeight: 300 }}
        >
          {service.body}
        </p>
      </div>

      {/* Arrow */}
      <span
        aria-hidden
        className="self-start pt-1.5 text-lg text-[var(--color-ink)]/[0.18] group-hover:text-[var(--color-ink)]/60 group-hover:translate-x-1.5 group-hover:-translate-y-0.5 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        →
      </span>
    </Link>
  );
}
