import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const NUDGES = [
  "Vi behöver kompetens inom kundservice nu",
  "Vi vill rekrytera rätt person för lång sikt",
  "Vi vill höja servicestandarden i hela teamet",
  "Vi genomgår en organisationsförändring",
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="kontakt"
      className="scroll-mt-24 bg-[var(--color-ink)] text-[var(--color-background)]"
    >
      <div className="container-care py-28 md:py-48">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-36 items-start">

          {/* Left — framing */}
          <div ref={headingRef} data-reveal>
            <p className="eyebrow text-[var(--color-background)]/70 mb-8">Kontakt</p>
            <h2
              className="display-xl text-[var(--color-background)] text-balance"
              style={{ fontWeight: 300, letterSpacing: "-0.038em" }}
            >
              Låt oss börja
              <br />
              <span style={{ fontWeight: 700 }}>med ett samtal.</span>
            </h2>
            <p className="mt-8 lead text-[var(--color-background)]/72 max-w-sm text-pretty" style={{ lineHeight: 1.65 }}>
              Berätta var ni är. Vi berättar hur vi kan hjälpa. Vi återkommer inom 24 timmar.
            </p>

            {/* Direct contact */}
            <div className="mt-12 space-y-3">
              <a
                href="mailto:hej@care-er.se"
                className="block text-sm text-[var(--color-background)]/75 hover:text-[var(--color-background)] transition-colors duration-200"
              >
                hej@care-er.se
              </a>
              <p className="text-sm text-[var(--color-background)]/65">
                Föreningsgatan 14<br />411 27 Göteborg
              </p>
              <a
                href="tel:+46317610800"
                className="block text-sm text-[var(--color-background)]/75 hover:text-[var(--color-background)] transition-colors duration-200"
              >
                031-761 08 00
              </a>
            </div>

            {/* Context nudges */}
            <div className="mt-14 space-y-3">
              <p className="text-[0.65rem] text-[var(--color-background)]/65 tracking-[0.20em] uppercase mb-5">
                Vanliga startpunkter
              </p>
              {NUDGES.map((nudge) => (
                <button
                  key={nudge}
                  type="button"
                  onClick={() => setMessage((prev) => prev ? prev + "\n" + nudge : nudge)}
                  className="block w-full text-left text-sm text-[var(--color-background)]/70 hover:text-[var(--color-background)] pl-3 border-l border-[var(--color-background)]/[0.25] hover:border-[var(--color-background)]/60 transition-all duration-200 min-h-[44px] flex items-center"
                  style={{ fontWeight: 300, lineHeight: 1.55 }}
                >
                  {nudge}
                </button>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <ContactForm sent={sent} setSent={setSent} message={message} setMessage={setMessage} />

        </div>
      </div>
    </section>
  );
}

function ContactForm({
  sent,
  setSent,
  message,
  setMessage,
}: {
  sent: boolean;
  setSent: (v: boolean) => void;
  message: string;
  setMessage: (v: string) => void;
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
      className="space-y-9"
    >
      {(
        [
          { name: "namn",    label: "Namn",       type: "text",  placeholder: "Ert namn" },
          { name: "foretag", label: "Företag",    type: "text",  placeholder: "Organisation" },
          { name: "epost",   label: "E-post",     type: "email", placeholder: "er@foretag.se" },
        ] as const
      ).map((f) => (
        <div key={f.name} className="group/field">
          <label
            htmlFor={f.name}
            className="block text-[0.65rem] tracking-[0.20em] uppercase font-medium text-[var(--color-background)]/72 mb-3 transition-colors duration-200 group-focus-within/field:text-[var(--color-background)]/95"
          >
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            required
            placeholder={f.placeholder}
            className="w-full bg-transparent border-b border-white/[0.18] focus:border-white/55 pb-3 text-[var(--color-background)] text-lg outline-none transition-all duration-300 placeholder:text-white/[0.25] placeholder:font-light"
          />
        </div>
      ))}

      <div className="group/field">
        <label
          htmlFor="meddelande"
          className="block text-[0.65rem] tracking-[0.20em] uppercase font-medium text-[var(--color-background)]/72 mb-3 transition-colors duration-200 group-focus-within/field:text-[var(--color-background)]/95"
        >
          Vad vill ni åstadkomma?
        </label>
        <textarea
          id="meddelande"
          name="meddelande"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Beskriv utmaningen eller behovet…"
          className="w-full bg-transparent border-b border-white/[0.18] focus:border-white/55 pb-3 text-[var(--color-background)] text-lg outline-none resize-none transition-all duration-300 placeholder:text-white/[0.25] placeholder:font-light"
        />
      </div>

      <div className="pt-3">
        {sent ? (
          <div role="status" className="animate-fade-in">
            <p className="text-lg text-[var(--color-background)]" style={{ fontWeight: 300 }}>
              Tack — vi hör av oss.
            </p>
            <p className="mt-2 text-sm text-[var(--color-background)]/65">
              Inom 24 timmar.
            </p>
          </div>
        ) : (
          <>
            <button
              type="submit"
              disabled={loading}
              className="group/btn flex items-center gap-3 text-sm text-[var(--color-background)]/75 hover:text-[var(--color-background)] transition-colors duration-250 disabled:opacity-35 disabled:cursor-not-allowed min-h-[44px]"
            >
              <span className="relative tracking-[0.10em] uppercase">
                {loading ? "Skickar…" : "Skicka"}
                <span className="absolute -bottom-px left-0 w-0 h-px bg-current transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:w-full" />
              </span>
              {!loading && (
                <span className="transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1.5 group-hover/btn:-translate-y-0.5 text-base">
                  →
                </span>
              )}
            </button>
            {error && (
              <p role="alert" className="mt-5 text-sm text-red-400">
                Något gick fel — mejla oss på{" "}
                <a href="mailto:hej@care-er.se" className="underline underline-offset-2">
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
