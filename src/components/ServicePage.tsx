import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Contact } from "./Contact";
import { useReveal } from "@/hooks/use-reveal";

export interface ServicePageProps {
  eyebrow: string;
  title: string;
  lede: string;
  intro: string;
  pillars: { title: string; body: string }[];
  approach: { step: string; title: string; body: string }[];
  next?: {
    label: string;
    to:
      | "/tjanster/bemanning"
      | "/tjanster/rekrytering"
      | "/tjanster/utbildning"
      | "/tjanster/change";
  };
}

const HERO_BG = "oklch(0.075 0.030 271)";

export function ServicePage(p: ServicePageProps) {
  return (
    <>
      <SiteHeader forceDark />
      <main>
        <ServiceHero eyebrow={p.eyebrow} title={p.title} lede={p.lede} />
        <IntroSection intro={p.intro} />
        <PillarsSection pillars={p.pillars} />
        <ApproachSection approach={p.approach} />
        {p.next && <NextService label={p.next.label} to={p.next.to} />}
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

/* ── 1. Hero ──────────────────────────────────────────────────────────────── */

function ServiceHero({
  eyebrow,
  title,
  lede,
}: Pick<ServicePageProps, "eyebrow" | "title" | "lede">) {
  const num = eyebrow.replace("Tjänst ", "");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-center pt-24"
      style={{ background: HERO_BG }}
    >
      {/* Decorative layer — own overflow-hidden so text is never clipped */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 78% 58%, oklch(0.18 0.065 271 / 0.62) 0%, transparent 70%)",
            animation: "ambient-breathe 10s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 45% at 12% 80%, oklch(0.14 0.04 271 / 0.45) 0%, transparent 65%)",
            animation: "ambient-breathe 14s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Ghost service number — enormous watermark, bottom-right */}
      <span
        aria-hidden
        className="absolute right-0 bottom-0 font-bold leading-none select-none pointer-events-none"
        style={{
          fontSize: "clamp(14rem, 42vw, 40rem)",
          letterSpacing: "-0.06em",
          lineHeight: 0.78,
          color: "oklch(0.982 0.003 82 / 0.04)",
          opacity: ready ? 1 : 0,
          transition: "opacity 1600ms ease 500ms",
        }}
      >
        {num}
      </span>

      <div className="container-care relative z-10 py-20">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm animate-fade-in"
          style={{
            color: "oklch(0.982 0.003 82 / 0.32)",
            animationDelay: "80ms",
          }}
        >
          ← Hem
        </Link>

        {/* Eyebrow */}
        <p
          className="eyebrow mt-12 animate-fade-in"
          style={{
            color: "oklch(0.982 0.003 82 / 0.28)",
            animationDelay: "180ms",
          }}
        >
          {eyebrow}
        </p>

        {/* Title — wipes in from left */}
        <h1
          className="mt-6 text-balance"
          style={{
            fontSize: "clamp(2.75rem, 7vw, 6.5rem)",
            fontWeight: 700,
            lineHeight: 0.94,
            letterSpacing: "-0.04em",
            color: "oklch(0.982 0.003 82)",
            clipPath: ready ? "inset(0 -16px -24px 0)" : "inset(0 100% 0 0)",
            transition: ready
              ? "clip-path 1100ms cubic-bezier(0.16, 1, 0.3, 1) 320ms"
              : "none",
          }}
        >
          {title}
        </h1>

        {/* Divider */}
        <div
          aria-hidden
          className="mt-10 md:mt-12 h-px max-w-2xl"
          style={{
            background: "oklch(0.982 0.003 82 / 0.12)",
            animation: "draw-line 900ms cubic-bezier(0.16, 1, 0.3, 1) 900ms both",
          }}
        />

        {/* Lede */}
        <p
          className="mt-8 max-w-2xl text-pretty"
          style={{
            fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)",
            fontWeight: 300,
            lineHeight: 1.55,
            fontStyle: "italic",
            color: "oklch(0.982 0.003 82 / 0.58)",
            opacity: ready ? 1 : 0,
            transition: ready ? "opacity 900ms ease 1050ms" : "none",
          }}
        >
          {lede}
        </p>
      </div>
    </section>
  );
}

/* ── 2. Editorial intro ───────────────────────────────────────────────────── */

function IntroSection({ intro }: { intro: string }) {
  const ref = useReveal<HTMLParagraphElement>(0.2);

  return (
    <section className="py-28 md:py-44">
      <div className="container-care">
        <p
          className="eyebrow text-[var(--color-ink)]/30 mb-16"
          style={{ letterSpacing: "0.22em" }}
        >
          Vad vi gör
        </p>
        <p
          ref={ref}
          data-reveal
          className="text-[var(--color-ink)] text-pretty leading-snug"
          style={{
            fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            maxWidth: "28ch",
          }}
        >
          {intro}
        </p>
      </div>
    </section>
  );
}

/* ── 3. Pillars ───────────────────────────────────────────────────────────── */

function PillarsSection({ pillars }: { pillars: ServicePageProps["pillars"] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section className="py-28 md:py-40 border-t border-[var(--color-ink)]/[0.08]">
      <div className="container-care">
        <div ref={headingRef} data-reveal className="mb-20 md:mb-28">
          <p className="eyebrow text-[var(--color-ink)]/38 mb-5">Vad du får</p>
          <h2
            className="text-[var(--color-ink)]"
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
            }}
          >
            Fyra löften.
          </h2>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              color: "oklch(0.13 0.04 271 / 0.32)",
            }}
          >
            Alla mätbara.
          </h2>
        </div>

        {pillars.map((pillar, i) => (
          <PillarRow
            key={pillar.title}
            pillar={pillar}
            index={i}
            dimmed={activeIndex !== null && activeIndex !== i}
            isActive={activeIndex === i}
            onHover={() => setActiveIndex(i)}
            onLeave={() => setActiveIndex(null)}
          />
        ))}
      </div>
    </section>
  );
}

function PillarRow({
  pillar,
  index,
  dimmed,
  isActive,
  onHover,
  onLeave,
}: {
  pillar: { title: string; body: string };
  index: number;
  dimmed: boolean;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal
      data-delay={
        index > 0
          ? (String(index * 100) as "100" | "200" | "300")
          : undefined
      }
      className="group grid md:grid-cols-[4.5rem_1fr_1.5fr] items-start gap-x-10 md:gap-x-16 py-10 md:py-14 border-t border-[var(--color-ink)]/[0.08]"
      style={{
        opacity: dimmed ? 0.38 : 1,
        transition: "opacity 350ms ease",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <span
        className="hidden md:block font-bold leading-none pt-1 text-[var(--color-ink)]/[0.08] group-hover:text-[var(--color-ink)]/[0.20] transition-colors duration-400"
        style={{
          fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
          letterSpacing: "-0.04em",
        }}
      >
        0{index + 1}
      </span>
      <h3
        className="text-[var(--color-ink)]/75 group-hover:text-[var(--color-ink)] transition-colors duration-300"
        style={{
          fontSize: "clamp(1.5rem, 2.8vw, 2.5rem)",
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: "-0.022em",
        }}
      >
        {pillar.title}
      </h3>
      <p
        className="mt-4 md:mt-0 text-lg leading-relaxed text-pretty text-[var(--color-ink)]/60 group-hover:text-[var(--color-ink)]/80 transition-colors duration-300"
        style={{ fontWeight: 300 }}
      >
        {pillar.body}
      </p>
    </div>
  );
}

/* ── 4. Approach — dark, cinematic ───────────────────────────────────────── */

function ApproachSection({
  approach,
}: {
  approach: ServicePageProps["approach"];
}) {
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section className="py-28 md:py-48 border-t border-[var(--color-ink)]/[0.08]">
      <div className="container-care">
        <div ref={headingRef} data-reveal className="mb-20 md:mb-32">
          <p className="eyebrow text-[var(--color-ink)]/30 mb-6">
            Så arbetar vi
          </p>
          <h2
            className="text-[var(--color-ink)]"
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
            }}
          >
            Fyra steg.
          </h2>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              color: "oklch(0.13 0.04 271 / 0.32)",
            }}
          >
            Inga genvägar.
          </h2>
        </div>

        {approach.map((a, i) => (
          <ApproachStep key={a.step} item={a} index={i} />
        ))}
      </div>
    </section>
  );
}

function ApproachStep({
  item,
  index,
}: {
  item: { step: string; title: string; body: string };
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      data-reveal
      data-delay={
        index > 0
          ? (String(index * 100) as "100" | "200" | "300")
          : undefined
      }
      className="relative py-10 md:py-14 border-t border-[var(--color-ink)]/[0.07] overflow-hidden"
    >
      {/* Ghost step number */}
      <span
        aria-hidden
        className="absolute left-0 top-1/2 -translate-y-1/2 font-bold leading-none pointer-events-none select-none"
        style={{
          fontSize: "clamp(6rem, 18vw, 16rem)",
          letterSpacing: "-0.05em",
          color: "oklch(0.13 0.04 271 / 0.04)",
        }}
      >
        0{index + 1}
      </span>

      <div className="relative grid grid-cols-[3rem_1fr] gap-x-8 md:gap-x-12 items-start">
        <span
          className="text-[var(--color-ink)]/18 font-semibold leading-none mt-2"
          style={{ fontSize: "0.8rem", letterSpacing: "0.04em" }}
        >
          0{index + 1}
        </span>
        <div>
          <h3
            data-emerge
            data-emerge-delay={
              index > 0
                ? (String(index * 120) as "120" | "240" | "360")
                : undefined
            }
            className="text-[var(--color-ink)] leading-none"
            style={{
              fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            {item.title}
          </h3>
          <p
            className="mt-5 text-[var(--color-ink)]/45 leading-relaxed"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              fontWeight: 300,
            }}
          >
            {item.body}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── 5. Next service ─────────────────────────────────────────────────────── */

function NextService({
  label,
  to,
}: {
  label: string;
  to:
    | "/tjanster/bemanning"
    | "/tjanster/rekrytering"
    | "/tjanster/utbildning"
    | "/tjanster/change";
}) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="border-t border-[var(--color-ink)]/[0.08]">
      <div ref={ref} data-reveal>
        <Link
          to={to}
          className="group block container-care py-16 md:py-24"
        >
          <p className="eyebrow text-[var(--color-ink)]/30 mb-6 group-hover:text-[var(--color-ink)]/50 transition-colors duration-300">
            Nästa tjänst
          </p>
          <div className="flex items-end justify-between gap-6">
            <span
              className="text-[var(--color-ink)]/55 group-hover:text-[var(--color-ink)] transition-colors duration-400"
              style={{
                fontSize: "clamp(3rem, 10vw, 9rem)",
                fontWeight: 700,
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
              }}
            >
              {label}
            </span>
            <span
              className="text-4xl md:text-6xl shrink-0 mb-2 text-[var(--color-ink)]/18 group-hover:text-[var(--color-ink)]/60 inline-block transition-all duration-400 group-hover:translate-x-2 group-hover:-translate-y-1"
            >
              →
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
