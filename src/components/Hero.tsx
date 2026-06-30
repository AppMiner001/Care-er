import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useMagnetic } from "@/hooks/use-magnetic";

export function Hero() {
  const magneticRef = useMagnetic<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const vid = videoRef.current;
    if (!vid) return;

    // Required for older iOS Safari
    vid.setAttribute("webkit-playsinline", "");

    const tryPlay = () => void vid.play().catch(() => {});

    if (mq.matches) {
      vid.pause();
    } else {
      // load() resets the media element — critical for iOS autoplay
      vid.load();
      tryPlay();
      vid.addEventListener("canplay",    tryPlay, { once: true });
      vid.addEventListener("loadeddata", tryPlay, { once: true });
    }

    const handler = (e: MediaQueryListEvent) => {
      e.matches ? vid.pause() : tryPlay();
    };
    mq.addEventListener("change", handler);

    return () => {
      mq.removeEventListener("change", handler);
      vid.removeEventListener("canplay",    tryPlay);
      vid.removeEventListener("loadeddata", tryPlay);
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-20 md:pt-24 pb-0 overflow-hidden">

      {/* ── Video background ─────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        data-hero-video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero-poster.svg"
        aria-hidden
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* ── Gradient overlays (layered for full readability) ─────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {/* Base dark veil — ensures minimum contrast everywhere */}
        <div
          className="absolute inset-0"
          style={{ background: "oklch(0.08 0.028 271 / 0.58)" }}
        />
        {/* Left column accent — reinforces text area */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, oklch(0.07 0.025 271 / 0.55) 0%, oklch(0.07 0.025 271 / 0.20) 45%, transparent 70%)",
          }}
        />
        {/* Top fade — header legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.07 0.025 271 / 0.45) 0%, transparent 28%)",
          }}
        />
        {/* Bottom fade — CTA area */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.07 0.025 271 / 0.55) 0%, transparent 35%)",
          }}
        />
      </div>

      {/* ── Subtle dot grid (very faint over video) ─────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.982 0.003 82 / 0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="container-care relative z-10 flex-1">

        {/* Staircase headline — white on dark video */}
        <h1
          className="text-[var(--color-background)]"
          aria-label="Vi bygger det som händer i mötet mellan människa och varumärke."
        >
          <span
            className="block animate-fade-up"
            style={{
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 7vw, 7rem)",
              lineHeight: 0.93,
              letterSpacing: "-0.042em",
              animationDelay: "120ms",
            }}
          >
            Vi bygger det som
          </span>

          <span
            className="block animate-fade-up"
            style={{
              fontWeight: 300,
              fontSize: "clamp(2.5rem, 7vw, 7rem)",
              lineHeight: 0.93,
              letterSpacing: "-0.042em",
              animationDelay: "200ms",
            }}
          >
            händer i mötet
          </span>

          <span
            className="block animate-fade-up mt-2"
            style={{
              fontWeight: 700,
              fontSize: "clamp(1.125rem, 2.4vw, 2.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.028em",
              animationDelay: "310ms",
            }}
          >
            mellan människa och varumärke.
          </span>
        </h1>

        {/* Divider */}
        <div
          aria-hidden
          className="mt-7 md:mt-12 h-px max-w-2xl"
          style={{
            background: "oklch(0.982 0.003 82 / 0.18)",
            animation: "draw-line 900ms cubic-bezier(0.16, 1, 0.3, 1) 650ms both",
          }}
        />

        {/* Value proposition */}
        <p
          className="lead text-[var(--color-background)]/80 mt-6 md:mt-10 max-w-lg text-pretty animate-fade-up"
          style={{ animationDelay: "500ms", lineHeight: 1.65 }}
        >
          Varje kundmöte stärker eller försvagar relationen till ett varumärke.
          Därför utvecklar care-er människor, beteenden och arbetssätt som får
          kunder att komma tillbaka.
        </p>

        {/* Disciplines */}
        <p
          className="eyebrow text-[var(--color-background)]/32 mt-7 tracking-[0.20em] animate-fade-in"
          style={{ animationDelay: "640ms" }}
        >
          Bemanning · Rekrytering · Utbildning · Transformation
        </p>

        {/* CTAs */}
        <div
          className="mt-8 md:mt-10 flex flex-wrap items-center gap-5 md:gap-7 animate-fade-in"
          style={{ animationDelay: "750ms" }}
        >
          {/* Primary CTA — light button on dark video */}
          <div ref={magneticRef} style={{ display: "inline-flex" }}>
            <Link
              to="/"
              hash="kontakt"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "oklch(0.982 0.003 82)",
                color: "oklch(0.13 0.04 271)",
                padding: "0.875rem 1.75rem",
                borderRadius: "9999px",
                fontSize: "0.9rem",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                willChange: "transform",
                transition:
                  "opacity 250ms ease, transform 320ms cubic-bezier(0.16,1,0.3,1), box-shadow 320ms ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.opacity = "0.92";
                el.style.transform = "translateY(-1px)";
                el.style.boxShadow = "0 8px 28px oklch(0.982 0.003 82 / 0.22)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.opacity = "1";
                el.style.transform = "";
                el.style.boxShadow = "";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.transition = "transform 80ms ease";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.transition =
                  "transform 320ms cubic-bezier(0.16,1,0.3,1)";
              }}
            >
              Prata med oss
            </Link>
          </div>

          {/* Secondary CTA */}
          <Link
            to="/"
            hash="tjanster"
            className="group text-[var(--color-background)]/72 text-sm font-medium hover:text-[var(--color-background)] transition-colors duration-200 flex items-center gap-2 min-h-[44px]"
          >
            Se tjänster
            <span aria-hidden className="transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0.5">
              ↓
            </span>
          </Link>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-3 animate-fade-in hidden md:flex"
        style={{ animationDelay: "1400ms" }}
        aria-hidden
      >
        <span
          className="eyebrow text-[var(--color-background)]/22"
          style={{ letterSpacing: "0.28em", fontSize: "0.58rem" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-14 relative overflow-hidden"
          style={{ background: "oklch(0.982 0.003 82 / 0.12)" }}
        >
          <div
            className="absolute top-0 left-0 w-full h-5 rounded-full"
            style={{
              background: "oklch(0.982 0.003 82 / 0.50)",
              animation: "scroll-down 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
        </div>
      </div>

      <div className="pb-14 md:pb-28" />

    </section>
  );
}
