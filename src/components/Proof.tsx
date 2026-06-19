import { useComplete } from "@/context/PageContext";

// TODO: Replace placeholder attribution with real client data before launch.
const testimonial = {
  quote:
    "care-er förstår vad ett kundmöte faktiskt kostar när det misslyckas. De levererade inte bara konsulter — de levererade beteenden som höjde hela teamets standard.",
  name: "Anna Lindqvist",
  title: "HR-direktör",
  company: "Nordic Retail Group",
};

export function Proof() {
  const ref = useComplete("proof", 0.5);

  return (
    <section ref={ref} id="section-proof" aria-label="Trovärdighet" className="border-y border-[var(--color-ink)]/10 py-16 md:py-24">
      <div className="container-care">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Metrics — 94% leads */}
          <div className="space-y-10">
            <div className="pb-10 border-b border-[var(--color-ink)]/10">
              <p
                className="leading-none tracking-[-0.04em] text-[var(--color-ink)]"
                style={{ fontSize: "clamp(4rem, 8vw, 6.5rem)", fontWeight: 700 }}
              >
                94%
              </p>
              <p className="mt-3 text-sm text-[var(--color-ink)]/55">Av uppdragen förlängs</p>
              <p className="mt-1.5 text-xs text-[var(--color-ink)]/35" style={{ fontWeight: 300 }}>
                Inte ett mål. En konsekvens.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <p
                  className="leading-none tracking-[-0.03em] text-[var(--color-ink)]"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600 }}
                >
                  340+
                </p>
                <p className="mt-2.5 text-sm text-[var(--color-ink)]/50">Genomförda uppdrag</p>
                <p className="mt-1 text-xs text-[var(--color-ink)]/30" style={{ fontWeight: 300 }}>
                  Samtliga med uppföljning efter avslut.
                </p>
              </div>
              <div>
                <p
                  className="leading-none tracking-[-0.03em] text-[var(--color-ink)]"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600 }}
                >
                  8 år
                </p>
                <p className="mt-2.5 text-sm text-[var(--color-ink)]/50">I branschen</p>
                <p className="mt-1 text-xs text-[var(--color-ink)]/30" style={{ fontWeight: 300 }}>
                  Tillräckligt länge för att veta vad som håller.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial — editorial blockquote */}
          <blockquote className="border-l-2 border-[var(--color-ink)]/20 pl-8">
            <p className="text-xl md:text-2xl leading-relaxed text-[var(--color-ink)]/75 text-pretty">
              {testimonial.quote}
            </p>
            <footer className="mt-10 flex items-center gap-4">
              <span className="block w-6 h-px bg-[var(--color-ink)]/25 shrink-0" />
              <cite className="text-sm text-[var(--color-ink)]/50 not-italic">
                <span className="font-medium text-[var(--color-ink)]/75">{testimonial.name}</span>
                {" "}· {testimonial.title}, {testimonial.company}
              </cite>
            </footer>
          </blockquote>

        </div>
      </div>
    </section>
  );
}
