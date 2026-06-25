import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";

const services = [
  {
    to: "/tjanster/bemanning" as const,
    title: "Bemanning",
    outcome: "Konsulter som beter sig som era egna — dag ett.",
    body: "Vi bemannar för kundmötet, inte för skiftet. Varje person briefas mot ert varumärke och er servicestandard innan de möter en enda kund.",
    index: "01",
  },
  {
    to: "/tjanster/rekrytering" as const,
    title: "Rekrytering",
    outcome: "Vi rekryterar inte för intervjun.",
    body: "Rätt person syns sex månader in — i det kundmöte ingen av er ser. Det är det vi väljer för.",
    index: "02",
  },
  {
    to: "/tjanster/utbildning" as const,
    title: "Utbildning",
    outcome: "Träning som håller när ingen tittar.",
    body: "De flesta program förbereder för kursdagen. Vi tränar för vardagen efteråt — när situationerna är oförutsedda och chefen inte är i rummet.",
    index: "03",
  },
  {
    to: "/tjanster/change" as const,
    title: "Change",
    outcome: "Kultur är vad folk gör när chefen inte ser.",
    body: "Vi bygger strukturer och beteenden som håller när projektet är slut och vi har lämnat. Det är det enda som räknas.",
    index: "04",
  },
] as const;

export function Services() {
  const headingRef = useReveal<HTMLDivElement>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="tjanster" className="py-28 md:py-40 scroll-mt-24">
      <div className="container-care">

        <div ref={headingRef} data-reveal className="mb-20 md:mb-28 max-w-2xl">
          <p className="eyebrow text-[var(--color-ink)]/45 mb-6">Tjänster</p>
          <h2 className="display-xl text-[var(--color-ink)]">
            <span style={{ fontWeight: 700 }}>Fyra discipliner.</span>
            <br />
            <span className="text-[var(--color-ink)]/35" style={{ fontWeight: 300 }}>
              En gemensam modell.
            </span>
          </h2>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute hidden md:block top-0 bottom-0 w-px left-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, oklch(0.13 0.04 271 / 0.10) 8%, oklch(0.13 0.04 271 / 0.10) 92%, transparent 100%)",
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
  isActive,
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
      className="service-row group grid md:grid-cols-[5rem_1fr_auto] items-start gap-x-8 md:gap-x-14 py-12 md:py-16 border-t border-[var(--color-ink)]/[0.08] last:border-b last:border-[var(--color-ink)]/[0.08]"
      style={{
        opacity: dimmed ? 0.38 : 1,
        transition: "opacity 350ms ease",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <span
        aria-hidden
        className="hidden md:block font-semibold leading-none text-[var(--color-ink)]/[0.08] group-hover:text-[var(--color-ink)]/[0.22] transition-colors duration-500 pt-1"
        style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", letterSpacing: "-0.04em" }}
      >
        {service.index}
      </span>

      <div>
        <h3 className="service-name display-md text-[var(--color-ink)]/75 group-hover:text-[var(--color-ink)]">
          {service.title}
        </h3>
        <p
          className="service-outcome mt-5 text-lg md:text-xl leading-snug max-w-xl text-pretty"
          style={{ fontStyle: "italic", fontWeight: 300 }}
        >
          {service.outcome}
        </p>
        <p className="mt-3 text-sm md:text-base text-[var(--color-ink)]/38 max-w-xl text-pretty leading-relaxed">
          {service.body}
        </p>
      </div>

      <span
        aria-hidden
        className="self-start pt-1.5 text-lg text-[var(--color-ink)]/[0.18] group-hover:text-[var(--color-ink)]/55 group-hover:translate-x-2 transition-all duration-300"
      >
        →
      </span>
    </Link>
  );
}
