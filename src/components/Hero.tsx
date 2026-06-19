import { Link } from "@tanstack/react-router";
import { HeroAnimation } from "./HeroAnimation";

export function Hero() {
  return (
    <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">
      <div className="container-care grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-24 items-center">

        <div className="animate-fade-up">
          <p className="eyebrow text-[var(--color-ink)]/60 mb-8">
            Bemanning · Rekrytering · Utbildning · Change
          </p>
          <h1 className="display-xl text-[var(--color-ink)]">
            <span style={{ fontWeight: 500 }}>VARUMÄRKEN BYGGS AV</span>{" "}
            <span style={{ fontWeight: 700 }}>MÄNNISKOR.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl leading-relaxed text-[var(--color-ink)]/55" style={{ fontWeight: 300 }}>
            Från intryck till lojalitet.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/"
              hash="kontakt"
              className="inline-flex items-center rounded-full bg-[var(--color-ink)] text-[var(--color-background)] px-7 py-4 text-sm font-medium hover:opacity-90 transition"
            >
              Prata med oss
            </Link>
            <Link
              to="/"
              hash="tjanster"
              className="inline-flex items-center rounded-full border border-[var(--color-ink)]/20 text-[var(--color-ink)] px-7 py-4 text-sm font-medium hover:border-[var(--color-ink)]/60 transition"
            >
              Våra tjänster
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center animate-fade-in">
          <HeroAnimation />
        </div>

      </div>
    </section>
  );
}
