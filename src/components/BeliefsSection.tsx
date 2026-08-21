import { useReveal } from "@/hooks/use-reveal";

const beliefs = [
  {
    title: "Lojala kunder är ett strategiskt val.",
    paragraphs: [
      "Ni vill bygga ett företag som marknadsför sig med genuint nöjda och lojala kunder. Kunder som väljer er igen — utan att jämföra.",
      "Det är ett starkt varumärkes största tillgång.",
    ],
  },
  {
    title: "Kundmötet ska bygga karriärer.",
    paragraphs: [
      "Att ha mött, förstått och hjälpt kunder är en ovärderlig erfarenhet inför nästan varje framtida roll. Kunden är kravställaren, domaren och ytterst den som betalar.",
      "Erfarenheten från kundmötet ska vara en språngbräda till nästa ansvar.",
    ],
  },
] as const;

export function BeliefsSection() {
  const headingRef = useReveal<HTMLDivElement>(0.18);
  const conclusionRef = useReveal<HTMLDivElement>(0.18);

  return (
    <section className="bg-[var(--color-surface)] text-[var(--color-ink)] py-12 md:py-16">
      <div className="container-care">
        <div className="max-w-6xl">
          <div ref={headingRef} data-reveal>
            <p className="eyebrow text-[var(--color-ink)]/55 mb-4">Gemensam övertygelse</p>
            <h2
              data-emerge
              className="text-balance"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)",
                fontWeight: 700,
                lineHeight: 0.98,
                letterSpacing: "-0.038em",
              }}
            >
              Vi behöver tro på samma saker
            </h2>
            <p
              className="mt-4 md:mt-5 text-base md:text-lg leading-relaxed text-[var(--color-ink)]/65"
              style={{ fontWeight: 300 }}
            >
              För att göra verklig skillnad behöver vi vara överens om två saker.
            </p>
          </div>

          <div className="mt-7 md:mt-9 space-y-6 md:space-y-7">
            {beliefs.map((belief, index) => (
              <BeliefRow
                key={belief.title}
                belief={belief}
                delay={index === 0 ? "100" : "200"}
                emergeDelay={index === 0 ? "120" : "240"}
              />
            ))}
          </div>

          <div ref={conclusionRef} data-reveal data-delay="300" className="mt-7 md:mt-9">
            <p
              data-emerge
              data-emerge-delay="360"
              className="text-lg md:text-2xl leading-snug text-[var(--color-ink)] text-balance"
              style={{ fontWeight: 650, letterSpacing: "-0.02em" }}
            >
              Omtanke om kunden.
              <br />
              Karriär genom kundmötet.
              <br />
              Care and career.
            </p>
            <p
              className="mt-1 text-lg md:text-2xl leading-snug text-balance"
              style={{ fontWeight: 300, letterSpacing: "-0.02em" }}
            >
              Därför heter vi <strong style={{ fontWeight: 650 }}>care-er.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeliefRow({
  belief,
  delay,
  emergeDelay,
}: {
  belief: (typeof beliefs)[number];
  delay: "100" | "200";
  emergeDelay: "120" | "240";
}) {
  const ref = useReveal<HTMLElement>(0.18);

  return (
    <article ref={ref} data-reveal data-delay={delay}>
      <div>
        <h3
          data-emerge
          data-emerge-delay={emergeDelay}
          className="text-[var(--color-ink)] leading-[1.05] text-balance"
          style={{
            fontSize: "clamp(1.45rem, 2.2vw, 2rem)",
            fontWeight: 450,
            letterSpacing: "-0.02em",
          }}
        >
          {belief.title}
        </h3>
        <div className="mt-2 md:mt-3 space-y-2">
          {belief.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-sm md:text-base leading-relaxed text-[var(--color-ink)]/65 text-pretty"
              style={{ fontWeight: 300 }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
