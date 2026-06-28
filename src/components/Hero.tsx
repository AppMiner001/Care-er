import { Link } from "@tanstack/react-router";
import { useMagnetic } from "@/hooks/use-magnetic";

export function Hero() {
  const magneticRef = useMagnetic<HTMLDivElement>();

  return (
    <section className="relative min-h-[96svh] flex flex-col justify-between pt-28 md:pt-36 pb-0">

      {/* Decorative layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.13 0.04 271 / 0.055) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 8% 92%, oklch(0.75 0.055 265 / 0.12) 0%, transparent 68%)",
            animation: "ambient-breathe 11s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 92% 8%, oklch(0.78 0.040 280 / 0.08) 0%, transparent 65%)",
            animation: "ambient-breathe 14s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Main content */}
      <div className="container-care relative z-10 flex-1">

        <p
          className="eyebrow text-[var(--color-ink)]/35 mb-10 animate-fade-in"
          style={{ animationDelay: "80ms" }}
        >
          Nordiskt kompetenshus · Stockholm
        </p>

        {/* Staircase headline */}
        <h1 className="text-[var(--color-ink)]" aria-label="Service är strategi. Vi bygger den.">

          <span
            className="block animate-fade-up"
            style={{
              fontWeight: 700,
              fontSize: "clamp(3.75rem, 13vw, 12rem)",
              lineHeight: 0.91,
              letterSpacing: "-0.042em",
              animationDelay: "120ms",
            }}
          >
            Service
          </span>

          <span
            className="block animate-fade-up"
            style={{
              fontWeight: 300,
              fontSize: "clamp(3.75rem, 13vw, 12rem)",
              lineHeight: 0.91,
              letterSpacing: "-0.042em",
              animationDelay: "200ms",
            }}
          >
            är strategi.
          </span>

          <span
            className="block animate-fade-up mt-6 md:mt-8"
            style={{
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3.8vw, 3.5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.028em",
              animationDelay: "310ms",
            }}
          >
            Vi bygger den.
          </span>
        </h1>

        {/* Divider */}
        <div
          aria-hidden
          className="mt-10 md:mt-12 h-px bg-[var(--color-ink)]/12 max-w-2xl"
          style={{
            animation: "draw-line 900ms cubic-bezier(0.16, 1, 0.3, 1) 650ms both",
          }}
        />

        {/* Value proposition */}
        <p
          className="lead text-[var(--color-ink)]/50 mt-8 md:mt-10 max-w-lg text-pretty animate-fade-up"
          style={{ animationDelay: "500ms", lineHeight: 1.65 }}
        >
          Kompetensen, beteendena och strukturerna som gör varje kundmöte
          till en konkurrensfördel — inte en slump.
        </p>

        {/* Disciplines */}
        <p
          className="eyebrow text-[var(--color-ink)]/28 mt-7 tracking-[0.20em] animate-fade-in"
          style={{ animationDelay: "640ms" }}
        >
          Bemanning · Rekrytering · Utbildning · Transformation
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-wrap items-center gap-7 animate-fade-in"
          style={{ animationDelay: "750ms" }}
        >
          <div ref={magneticRef} style={{ display: "inline-flex" }}>
            <Link to="/" hash="kontakt" className="btn-primary">
              Prata med oss
            </Link>
          </div>

          <Link
            to="/"
            hash="tjanster"
            className="group text-[var(--color-ink)]/48 text-sm font-medium hover:text-[var(--color-ink)] transition-colors duration-200 flex items-center gap-2"
          >
            Se tjänster
            <span className="transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0.5">
              ↓
            </span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in hidden md:flex"
        style={{ animationDelay: "1400ms" }}
        aria-hidden
      >
        <span
          className="eyebrow text-[var(--color-ink)]/18"
          style={{ letterSpacing: "0.28em", fontSize: "0.58rem" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-14 relative overflow-hidden"
          style={{ background: "oklch(0.13 0.04 271 / 0.07)" }}
        >
          <div
            className="absolute top-0 left-0 w-full h-5 rounded-full"
            style={{
              background: "oklch(0.13 0.04 271 / 0.32)",
              animation: "scroll-down 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
        </div>
      </div>

      <div className="pb-20 md:pb-28" />

    </section>
  );
}
