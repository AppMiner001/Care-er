import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export function Contact() {
  const [sent, setSent] = useState(false);
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="kontakt"
      className="scroll-mt-24 bg-[var(--color-ink)] text-[var(--color-background)]"
    >
      <div className="container-care py-28 md:py-44">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-32 items-start">

          {/* Left — framing */}
          <div ref={headingRef} data-reveal>
            <p className="eyebrow text-[var(--color-background)]/55 mb-8">Kontakt</p>
            <h2
              className="display-xl text-[var(--color-background)] text-balance"
              style={{ fontWeight: 300 }}
            >
              Låt oss börja
              <br />
              <span style={{ fontWeight: 700 }}>med ett samtal.</span>
            </h2>
            <p className="mt-8 lead text-[var(--color-background)]/50 max-w-sm text-pretty">
              Berätta var ni är. Vi berättar hur vi kan hjälpa. Vi återkommer inom 24 timmar.
            </p>

            {/* Direct contact */}
            <div className="mt-12 space-y-3 text-[var(--color-background)]/60 text-sm">
              <a
                href="mailto:hej@care-er.se"
                className="block hover:text-[var(--color-background)]/80 transition-colors"
              >
                hej@care-er.se
              </a>
              <p>Stockholm, Sverige</p>
            </div>

            {/* Context nudges */}
            <div className="mt-14 space-y-3">
              <p className="text-xs text-[var(--color-background)]/45 tracking-[0.16em] uppercase mb-4">
                Vanliga startpunkter
              </p>
              {[
                "Vi behöver kompetens inom kundservice nu",
                "Vi vill rekrytera rätt person för lång sikt",
                "Vi vill höja servicestandarden i hela teamet",
                "Vi genomgår en organisationsförändring",
              ].map((nudge) => (
                <p
                  key={nudge}
                  className="text-sm text-[var(--color-background)]/50 pl-3 border-l border-[var(--color-background)]/[0.14]"
                >
                  {nudge}
                </p>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <ContactForm sent={sent} setSent={setSent} />

        </div>
      </div>
    </section>
  );
}

function ContactForm({
  sent,
  setSent,
}: {
  sent: boolean;
  setSent: (v: boolean) => void;
}) {
  const ref = useReveal<HTMLFormElement>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      ref={ref}
      data-reveal
      data-delay="200"
      onSubmit={onSubmit}
      className="space-y-8"
    >
      {(
        [
          { name: "namn",    label: "Namn",       type: "text",  placeholder: "Ert namn" },
          { name: "foretag", label: "Företag",    type: "text",  placeholder: "Organisation" },
          { name: "epost",   label: "E-post",     type: "email", placeholder: "er@foretag.se" },
        ] as const
      ).map((f) => (
        <div key={f.name} className="group">
          <label
            htmlFor={f.name}
            className="block eyebrow text-[var(--color-background)]/55 mb-3"
          >
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            required
            placeholder={f.placeholder}
            className="w-full bg-transparent border-b border-white/[0.20] focus:border-white/60 pb-3 text-[var(--color-background)] text-lg outline-none transition-colors placeholder:text-white/[0.30]"
          />
        </div>
      ))}

      <div>
        <label
          htmlFor="meddelande"
          className="block eyebrow text-[var(--color-background)]/55 mb-3"
        >
          Vad vill ni åstadkomma?
        </label>
        <textarea
          id="meddelande"
          name="meddelande"
          rows={4}
          required
          placeholder="Beskriv utmaningen eller behovet…"
          className="w-full bg-transparent border-b border-white/[0.20] focus:border-white/60 pb-3 text-[var(--color-background)] text-lg outline-none resize-none transition-colors placeholder:text-white/[0.30]"
        />
      </div>

      <div className="pt-4">
        {sent ? (
          <div className="animate-fade-in">
            <p className="text-lg text-[var(--color-background)]/80" style={{ fontWeight: 300 }}>
              Tack — vi hör av oss.
            </p>
            <p className="mt-2 text-sm text-[var(--color-background)]/40">
              Inom 24 timmar.
            </p>
          </div>
        ) : (
          <>
            <button
              type="submit"
              disabled={loading}
              className="group flex items-center gap-3 text-sm text-[var(--color-background)]/50 hover:text-[var(--color-background)] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="tracking-[0.08em] uppercase">
                {loading ? "Skickar…" : "Skicka"}
              </span>
              {!loading && (
                <span className="transition-transform duration-300 group-hover:translate-x-2 text-base">
                  →
                </span>
              )}
            </button>
            {error && (
              <p className="mt-4 text-sm text-red-400/80">
                Något gick fel — mejla oss på{" "}
                <a href="mailto:hej@care-er.se" className="underline">
                  hej@care-er.se
                </a>
              </p>
            )}
          </>
        )}
      </div>
    </form>
  );
}
