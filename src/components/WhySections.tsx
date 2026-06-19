import { useEffect, useRef, useState } from "react";
import { useComplete, usePageContext } from "@/context/PageContext";

export function BrandStatement() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { markComplete } = usePageContext();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          markComplete("brand-statement");
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [markComplete]);

  return (
    <section ref={ref} className="py-40 md:py-64 border-y border-[var(--color-ink)]/10 overflow-hidden">
      <div className="container-care">
        <p
          className="leading-[0.92] tracking-[-0.04em] text-[var(--color-ink)]"
          style={{ fontSize: "clamp(3.5rem, 9vw, 8.5rem)" }}
        >
          <span
            className="block"
            style={{
              fontWeight: 700,
              opacity: visible ? 1 : 0,
              transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            Service
          </span>
          <span
            className="block"
            style={{
              fontWeight: 400,
              opacity: visible ? 1 : 0,
              transition: "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 700ms",
            }}
          >
            är strategi.
          </span>
        </p>
        <div className="mt-14 flex justify-end">
          <p
            className="eyebrow text-[var(--color-ink)]/30"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 600ms ease 1500ms",
            }}
          >
            care-er · Stockholm
          </p>
        </div>
      </div>
    </section>
  );
}

export function WhyCareEr() {
  const ref = useComplete("why-care-er", 0.6);

  return (
    <section ref={ref} id="section-why" className="py-28 md:py-40 border-b border-border/60">
      <div className="container-care grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div className="lg:sticky lg:top-32">
          <p className="eyebrow text-[var(--color-ink)]/60 mb-8">Varför care-er</p>
          <h2 className="display-xl text-[var(--color-ink)] text-balance">
            <span style={{ fontWeight: 700 }}>Det ögonblick</span>
            <br />
            <span className="text-[var(--color-ink)]/50" style={{ fontWeight: 300 }}>
              där varumärket byggs.
            </span>
          </h2>
        </div>
        <div className="space-y-8 text-lg md:text-xl leading-relaxed text-[var(--color-ink)]/80 text-pretty">
          <p>
            Det som händer mellan kund och medarbetare är inte en stödfunktion.
            Det är där varumärken byggs.
          </p>
          <p>
            care-er hjälper företag att skapa beteenden och strukturer som
            bygger förtroende och lojalitet — i varje möte, varje dag.
          </p>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { label: "Beteende", note: "Det vi gör i varje möte." },
  { label: "Känsla", note: "Det kunden bär med sig." },
  { label: "Förtroende", note: "Det som gör att de återvänder." },
  { label: "Lojalitet", note: "Det som bygger varumärket." },
];

export function ProcessModel() {
  return (
    <section className="py-28 md:py-40">
      <div className="container-care">
        <div className="max-w-3xl mb-20">
          <p className="eyebrow text-[var(--color-ink)]/60 mb-6">Modell</p>
          <h2 className="display-lg text-[var(--color-ink)] text-balance">
            En linje från handling till lojalitet.
          </h2>
        </div>

        <ol className="relative max-w-3xl mx-auto">
          <div className="absolute left-[11px] top-3 bottom-3 w-px bg-[var(--color-ink)]/15" aria-hidden />
          {steps.map((s, i) => (
            <li key={s.label} className="relative pl-12 pb-14 last:pb-0">
              <span
                className="absolute left-0 top-2 w-6 h-6 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-background)] flex items-center justify-center"
                aria-hidden
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-ink)]" />
              </span>
              <p className="text-xs tracking-[0.22em] uppercase text-[var(--color-ink)]/40 mb-2">
                Steg 0{i + 1}
              </p>
              <h3 className="display-md text-[var(--color-ink)]">{s.label}</h3>
              <p className="mt-3 text-[var(--color-ink)]/65 text-lg">{s.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
