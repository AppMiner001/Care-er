import { Link } from "@tanstack/react-router";
import { useMagnetic } from "@/hooks/use-magnetic";

export function Hero() {
  const magneticRef = useMagnetic<HTMLDivElement>();

  return (
    <section className="relative min-h-[96svh] flex flex-col justify-between pt-28 md:pt-36 pb-0">

      {/* Decorative layer — own overflow-hidden so text is never clipped */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.13 0.04 271 / 0.065) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Orb 1 — blue-violet, bottom-left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 8% 92%, oklch(0.75 0.055 265 / 0.13) 0%, transparent 68%)",
            animation: "ambient-breathe 11s ease-in-out infinite",
          }}
        />
        {/* Orb 2 — warm indigo, top-right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 92% 8%, oklch(0.78 0.040 280 / 0.09) 0%, transparent 65%)",
            animation: "ambient-breathe 14s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Main content */}
      <div className="container-care relative z-10 flex-1">

        <p
          className="eyebrow text-[var(--color-ink)]/40 mb-10 animate-fade-in"
          style={{ animationDelay: "80ms" }}
        >
          Nordiskt kompetenshus · Stockholm
        </p>

        {/* Staircase headline — each line lives at its own scale */}
        <h1 className="text-[var(--color-ink)]" aria-label="Service är strategi. Vi bygger den.">

          {/* Line 1 — massive, bold */}
          <span
            className="block animate-fade-up"
            style={{
              fontWeight: 700,
              fontSize: "clamp(3.75rem, 13vw, 12rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              animationDelay: "120ms",
            }}
          >
            Service
          </span>

          {/* Line 2 — same scale, light */}
          <span
            className="block animate-fade-up"
            style={{
              fontWeight: 300,
              fontSize: "clamp(3.75rem, 13vw, 12rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              animationDelay: "200ms",
            }}
          >
            är strategi.
          </span>

          {/* Line 3 — resolution, half scale */}
          <span
            className="block animate-fade-up mt-6 md:mt-8"
            style={{
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3.8vw, 3.5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              animationDelay: "310ms",
            }}
          >
            Vi bygger den.
          </span>
        </h1>

        {/* Animated divider — draws from left after headline settles */}
        <div
          aria-hidden
          className="mt-10 md:mt-12 h-px bg-[var(--color-ink)]/15 max-w-2xl"
          style={{
            animation: "draw-line 900ms cubic-bezier(0.16, 1, 0.3, 1) 650ms both",
          }}
        />

        {/* Value proposition */}
        <p
          className="lead text-[var(--color-ink)]/55 mt-8 md:mt-10 max-w-xl text-pretty animate-fade-up"
          style={{ animationDelay: "500ms" }}
        >
          Kompetensen, beteendena och strukturerna som gör varje kundmöte
          till en konkurrensfördel — inte en slump.
        </p>

        {/* Disciplines */}
        <p
          className="eyebrow text-[var(--color-ink)]/30 mt-7 tracking-[0.18em] animate-fade-in"
          style={{ animationDelay: "640ms" }}
        >
          Bemanning · Rekrytering · Utbildning · Change
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-wrap items-center gap-6 animate-fade-in"
          style={{ animationDelay: "750ms" }}
        >
          {/* Magnetic wrapper — button follows cursor on desktop */}
          <div ref={magneticRef} style={{ display: "inline-flex" }}>
            <Link to="/" hash="kontakt" className="btn-primary">
              Prata med oss
            </Link>
          </div>

          <Link
            to="/"
            hash="tjanster"
            className="text-[var(--color-ink)]/55 text-sm font-medium hover:text-[var(--color-ink)] transition-colors flex items-center gap-2"
          >
            Se tjänster <span>↓</span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator — travels down a vertical track */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in hidden md:flex"
        style={{ animationDelay: "1400ms" }}
        aria-hidden
      >
        <span
          className="eyebrow text-[var(--color-ink)]/20"
          style={{ letterSpacing: "0.25em", fontSize: "0.6rem" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-14 relative overflow-hidden"
          style={{ background: "oklch(0.13 0.04 271 / 0.08)" }}
        >
          <div
            className="absolute top-0 left-0 w-full h-5 rounded-full"
            style={{
              background: "oklch(0.13 0.04 271 / 0.35)",
              animation: "scroll-down 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
        </div>
      </div>

      {/* Bottom padding */}
      <div className="pb-20 md:pb-28" />

    </section>
  );
}
