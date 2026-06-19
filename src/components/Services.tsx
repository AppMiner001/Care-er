import { Link } from "@tanstack/react-router";
import { useComplete } from "@/context/PageContext";

const services = [
  {
    title: "Bemanning",
    to: "/tjanster/bemanning" as const,
    lede: "Den vi skickar möter era kunder utan er som back-up. Det ögonblicket avgör.",
    body: "Vi väljer för det ögonblicket — inte för vad som imponerar i en presentation.",
  },
  {
    title: "Rekrytering",
    to: "/tjanster/rekrytering" as const,
    lede: "Vi rekryterar inte för intervjun. Vi rekryterar för kundmötet ingen av er ser.",
    body: "Det märks sex månader in — i kundmötet ingen av er ser.",
  },
  {
    title: "Utbildning",
    to: "/tjanster/utbildning" as const,
    lede: "De flesta träningsprogram förbereder för kursdagen. Vi tränar för vardagen efteråt.",
    body: "Lojalitet skapas i ögonblicket efter träningen — när ingen längre tittar.",
  },
  {
    title: "Change",
    to: "/tjanster/change" as const,
    lede: "Kultur är vad era medarbetare gör när chefen inte är i rummet.",
    body: "Vi bygger strukturer och beteenden som håller när projektet är slut — och vi har lämnat.",
  },
];

export function Services() {
  const ref = useComplete("services", 0.5);

  return (
    <section ref={ref} id="tjanster" className="py-32 md:py-48 scroll-mt-24">
      <div className="container-care">

        {/* Section header — eyebrow right, heading left on desktop */}
        <div className="grid md:grid-cols-[1fr_auto] md:items-start gap-6 mb-24 md:mb-32">
          <div className="order-2 md:order-1 max-w-2xl">
            <h2 className="display-lg text-[var(--color-ink)]" style={{ fontWeight: 700 }}>
              Fyra discipliner.
            </h2>
            <p className="display-lg text-[var(--color-ink)]/35" style={{ fontWeight: 300 }}>
              Det som händer när ingen ser.
            </p>
          </div>
          <p className="eyebrow text-[var(--color-ink)]/40 order-1 md:order-2 md:pt-3">
            Tjänster
          </p>
        </div>

        {/* Service list */}
        <div className="relative">
          {/* Vertical thread — connects four services as one system */}
          <div
            aria-hidden
            className="absolute hidden md:block top-0 bottom-0 w-px left-0"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, oklch(0.235 0.05 271 / 0.10) 8%, oklch(0.235 0.05 271 / 0.10) 92%, transparent 100%)"
            }}
          />
          {services.map((s, i) => (
            <Link
              key={s.title}
              to={s.to}
              className="service-link group grid grid-cols-[1fr_auto] md:grid-cols-[7rem_1fr_auto] lg:grid-cols-[9rem_1fr_auto] items-start gap-x-6 md:gap-x-12 py-14 md:py-20 border-t border-[var(--color-ink)]/[0.08] last:border-b last:border-[var(--color-ink)]/[0.08]"
            >
              {/* Oversized index number — desktop only */}
              <span
                aria-hidden
                className="hidden md:block font-semibold tracking-[-0.04em] leading-none select-none pt-1 text-[var(--color-ink)]/[0.07] group-hover:text-[var(--color-ink)]/[0.15] transition-colors duration-500"
                style={{ fontSize: "clamp(2.5rem, 4.5vw, 5rem)" }}
              >
                0{i + 1}
              </span>

              {/* Content */}
              <div>
                <h3 className="service-title display-lg text-[var(--color-ink)]/80 group-hover:text-[var(--color-ink)]">
                  {s.title}
                </h3>
                <p className="mt-6 text-lg md:text-xl leading-relaxed text-[var(--color-ink)]/55 max-w-xl text-pretty">
                  {s.lede}
                </p>
                <p className="mt-3 text-sm text-[var(--color-ink)]/35 max-w-xl">
                  {s.body}
                </p>
              </div>

              {/* Arrow */}
              <span className="self-start pt-2 text-xl text-[var(--color-ink)]/[0.18] group-hover:text-[var(--color-ink)]/55 group-hover:translate-x-2 transition-all duration-300">
                →
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
