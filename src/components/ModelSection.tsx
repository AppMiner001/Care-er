import { useReveal } from "@/hooks/use-reveal";

const steps = [
  {
    num: "01",
    word: "Beteende",
    line1: "Det vi gör i varje möte.",
    line2: "Alltid mätbart. Alltid lärbart.",
    emergeDelay: undefined,
  },
  {
    num: "02",
    word: "Känsla",
    line1: "Kunden minns inte vad du sa.",
    line2: "De minns hur de kände sig.",
    emergeDelay: "120",
  },
  {
    num: "03",
    word: "Förtroende",
    line1: "Byggs i ett möte.",
    line2: "Kan rivas i nästa.",
    emergeDelay: "240",
  },
  {
    num: "04",
    word: "Lojalitet",
    line1: "De väljer er igen — utan att jämföra.",
    line2: "Det är vad ett kundmöte kan bli.",
    emergeDelay: "360",
  },
] as const;

export function ModelSection() {
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section
      className="bg-[var(--color-ink)] text-[var(--color-background)]"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 100% 0%, oklch(0.20 0.06 271) 0%, oklch(0.13 0.04 271) 55%)",
      }}
    >
      <div className="container-care py-28 md:py-52">

        <div className="grid lg:grid-cols-[1fr_1.7fr] gap-16 lg:gap-36 items-start">

          {/* Left — framing (sticky) */}
          <div className="lg:sticky lg:top-36">
            <div ref={headingRef} data-reveal>
              <p className="eyebrow text-[var(--color-background)]/28 mb-10">
                Modellen
              </p>
              <h2
                className="text-[var(--color-background)] text-balance"
                style={{
                  fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: "-0.038em",
                }}
              >
                En linje
              </h2>
              <h2
                className="text-[var(--color-background)]/38 text-balance"
                style={{
                  fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
                  fontWeight: 300,
                  lineHeight: 1.0,
                  letterSpacing: "-0.038em",
                }}
              >
                från handling
                <br />
                till lojalitet.
              </h2>
              <p
                className="mt-12 text-[var(--color-background)]/40 leading-relaxed max-w-[22ch] text-pretty"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", fontWeight: 300, lineHeight: 1.7 }}
              >
                Alla fyra tjänster är byggda kring samma modell — det är det
                som gör dem till ett system, inte en meny.
              </p>
            </div>
          </div>

          {/* Right — steps */}
          <div>
            {steps.map((step, i) => (
              <StepRow key={step.word} step={step} index={i} />
            ))}
            <ClosingStatement />
          </div>

        </div>
      </div>
    </section>
  );
}

function StepRow({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>(0.18);
  const delay = (index * 100) as 0 | 100 | 200 | 300;

  return (
    <div
      ref={ref}
      data-reveal
      data-delay={delay > 0 ? String(delay) : undefined}
      className="relative py-10 md:py-14 border-t border-[var(--color-background)]/[0.07] first:border-t-0 overflow-hidden"
    >
      {/* Ghost number */}
      <span
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--color-background)]/[0.035] font-bold leading-none pointer-events-none select-none"
        style={{
          fontSize: "clamp(6rem, 18vw, 16rem)",
          letterSpacing: "-0.05em",
        }}
      >
        {step.num}
      </span>

      <div className="relative grid grid-cols-[3rem_1fr] gap-x-8 items-start">
        {/* Step number */}
        <span
          className="text-[var(--color-background)]/22 font-semibold leading-none mt-2 tabular-nums"
          style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)", letterSpacing: "0.06em" }}
        >
          {step.num}
        </span>

        {/* Word — blur→sharp crystallise */}
        <div>
          <h3
            data-emerge
            data-emerge-delay={step.emergeDelay}
            className="text-[var(--color-background)] leading-none"
            style={{
              fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.038em",
            }}
          >
            {step.word}
          </h3>
          <p
            className="mt-6 text-[var(--color-background)]/58 leading-snug"
            style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)", fontWeight: 300 }}
          >
            {step.line1}
          </p>
          <p
            className="mt-1.5 text-[var(--color-background)]/30"
            style={{ fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)", fontWeight: 300 }}
          >
            {step.line2}
          </p>
        </div>
      </div>
    </div>
  );
}

function ClosingStatement() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-reveal
      className="mt-10 pt-10 border-t border-[var(--color-background)]/[0.07]"
    >
      <p
        className="text-[var(--color-background)]/52 text-pretty"
        style={{ fontSize: "clamp(1rem, 1.6vw, 1.15rem)", fontWeight: 300, maxWidth: "36ch", lineHeight: 1.7 }}
      >
        care-er är det enda kompetenshuset som bygger hela kedjan — inte bara
        rekryteringen, inte bara träningen, utan hur allt hänger ihop.
      </p>
    </div>
  );
}
