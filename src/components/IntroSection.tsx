import { useReveal } from "@/hooks/use-reveal";

export function IntroSection() {
  const sectionRef = useReveal<HTMLElement>(0.16);

  return (
    <section
      ref={sectionRef}
      data-reveal
      aria-labelledby="homepage-intro-title"
      className="bg-[var(--color-background)] text-[var(--color-ink)]"
    >
      <div className="container-care py-20 sm:py-24 md:py-32 lg:py-40">
        <div className="grid items-start gap-10 md:gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 xl:gap-28">
          <h2
            id="homepage-intro-title"
            data-emerge
            className="max-w-[14ch] text-balance"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: 700,
              lineHeight: 0.97,
              letterSpacing: "-0.04em",
            }}
          >
            Vi utvecklar människorna som möter era kunder.
          </h2>

          <div className="lg:pt-2">
            <p
              className="max-w-[42rem] text-lg leading-relaxed text-[var(--color-ink)]/68 text-pretty md:text-xl md:leading-[1.65]"
              style={{ fontWeight: 300 }}
            >
              Genom{" "}
              <strong className="font-semibold text-[var(--color-ink)]">
                Rekrytering, Bemanning, Utbildning och Transformation
              </strong>{" "}
              hjälper vi företag att hitta, utveckla och leda människorna som representerar
              varumärket i kundmötet.
            </p>

            <p className="mt-8 border-t border-[var(--color-ink)]/[0.08] pt-5 text-sm font-semibold leading-relaxed tracking-[0.01em] text-[var(--color-ink)]/78 sm:text-base md:mt-10 md:pt-6">
              Rekrytering · Bemanning · Utbildning · Transformation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
