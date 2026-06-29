import { useReveal } from "@/hooks/use-reveal";

const steps = [
  {
    num: "01",
    word: "Beteende",
    line1: "Det vi gör i varje möte.",
    line2: "Det är där allt börjar.",
    emergeDelay: undefined,
  },
  {
    num: "02",
    word: "Känsla",
    line1: "Det är inte mötet kunden minns.",
    line2: "Det är känslan mötet lämnar efter sig.",
    emergeDelay: "120",
  },
  {
    num: "03",
    word: "Förtroende",
    line1: "Byggs i varje möte.",
    line2: "Kan raseras i nästa.",
    emergeDelay: "240",
  },
  {
    num: "04",
    word: "Lojalitet",
    line1: "De väljer dig igen – utan att jämföra.",
    line2: "Det är ett starkt varumärkes största tillgång.",
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
              <p className="eyebrow text-[var(--color-background)]/55 mb-10">
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
                Så byggs kundlojalitet.
              </h2>
              <p
                className="mt-12 text-[var(--color-background)]/40 leading-relaxed max-w-[22ch] text-pretty"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", fontWeight: 300, lineHeight: 1.7 }}
              >
                Beteenden skapar känslor. Känslor bygger förtroende. Förtroende skapar lojalitet.
              </p>
            </div>
          </div>

          {/* Right — steps */}
          <div>
            {steps.map((step, i) => (
              <StepRow key={step.word} step={step} index={i} />
            ))}
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
            className="mt-6 text-[var(--color-background)]/72 leading-snug"
            style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)", fontWeight: 300 }}
          >
            {step.line1}
          </p>
          <p
            className="mt-2 text-[var(--color-background)]/44"
            style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)", fontWeight: 300 }}
          >
            {step.line2}
          </p>
        </div>
      </div>
    </div>
  );
}

