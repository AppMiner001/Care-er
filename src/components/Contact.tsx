import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { createMailtoHref } from "@/lib/mailto";

const NUDGES = [
  "Vi behöver kompetens inom kundservice nu",
  "Vi vill rekrytera rätt person för lång sikt",
  "Vi vill höja servicestandarden i hela teamet",
  "Vi genomgår en organisationsförändring",
];

export function Contact() {
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="kontakt"
      className="scroll-mt-24 bg-[var(--color-ink)] text-[var(--color-background)]"
    >
      <div className="container-care py-16 md:py-48">
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
            <p
              className="mt-8 lead text-[var(--color-background)]/72 max-w-sm text-pretty"
              style={{ lineHeight: 1.65 }}
            >
              Berätta var ni är. Vi berättar hur vi kan hjälpa. Vi återkommer inom 24 timmar.
            </p>

            {/* Direct contact */}
            <div className="mt-8 md:mt-12 space-y-3">
              <a
                href="mailto:hej@care-er.se"
                className="block text-sm text-[var(--color-background)]/75 hover:text-[var(--color-background)] transition-colors duration-200"
              >
                hej@care-er.se
              </a>
              <p className="text-sm text-[var(--color-background)]/65">
                Föreningsgatan 14
                <br />
                411 27 Göteborg
              </p>
              <a
                href="tel:+46317610800"
                className="block text-sm text-[var(--color-background)]/75 hover:text-[var(--color-background)] transition-colors duration-200"
              >
                031-761 08 00
              </a>
            </div>
          </div>

          {/* Right — form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const ref = useReveal<HTMLFormElement>();
  const [message, setMessage] = useState("");
  const [draftHref, setDraftHref] = useState<string | null>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("namn") ?? "").trim();
    const company = String(formData.get("foretag") ?? "").trim();
    const email = String(formData.get("epost") ?? "").trim();
    const formMessage = String(formData.get("meddelande") ?? "").trim();
    const href = createMailtoHref({
      to: "hej@care-er.se",
      subject: `Företagsförfrågan från ${company}`,
      body: [
        "Hej care-er,",
        "",
        "Jag vill gärna prata med er.",
        "",
        `Namn: ${name}`,
        `Företag: ${company}`,
        `E-post: ${email}`,
        "",
        "Vad vi vill åstadkomma:",
        formMessage,
        "",
        "Skapat via care-er.se",
      ].join("\n"),
    });

    setDraftHref(href);
    window.location.assign(href);
  };

  return (
    <form ref={ref} data-reveal data-delay="200" onSubmit={onSubmit} className="space-y-9">
      {(
        [
          {
            name: "namn",
            label: "Namn",
            type: "text",
            placeholder: "Ert namn",
            autoComplete: "name",
          },
          {
            name: "foretag",
            label: "Företag",
            type: "text",
            placeholder: "Organisation",
            autoComplete: "organization",
          },
          {
            name: "epost",
            label: "E-post",
            type: "email",
            placeholder: "er@foretag.se",
            autoComplete: "email",
          },
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
            autoComplete={f.autoComplete}
            maxLength={f.name === "epost" ? 254 : f.name === "foretag" ? 160 : 120}
            required
            placeholder={f.placeholder}
            onChange={() => {
              if (draftHref) setDraftHref(null);
            }}
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
          maxLength={1000}
          aria-describedby="meddelande-maxlangd"
          required
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            if (draftHref) setDraftHref(null);
          }}
          placeholder="Beskriv utmaningen eller behovet…"
          className="w-full bg-transparent border-b border-white/[0.18] focus:border-white/55 pb-3 text-[var(--color-background)] text-lg outline-none resize-none transition-all duration-300 placeholder:text-white/[0.25] placeholder:font-light"
        />
        <p
          id="meddelande-maxlangd"
          className="mt-2 text-right text-[0.65rem] tabular-nums text-[var(--color-background)]/45"
        >
          {message.length}/1000 tecken
        </p>
      </div>

      <div className="pt-1">
        <p className="text-[0.65rem] text-[var(--color-background)]/65 tracking-[0.20em] uppercase mb-3">
          Vanliga startpunkter
        </p>
        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-1">
          {NUDGES.map((nudge) => (
            <button
              key={nudge}
              type="button"
              onClick={() => {
                setMessage((current) => (current ? `${current}\n${nudge}` : nudge));
                if (draftHref) setDraftHref(null);
              }}
              className="w-full text-left text-xs text-[var(--color-background)]/65 hover:text-[var(--color-background)] pl-3 border-l border-[var(--color-background)]/[0.22] hover:border-[var(--color-background)]/60 transition-all duration-200 min-h-[38px] flex items-center"
              style={{ fontWeight: 300, lineHeight: 1.4 }}
            >
              {nudge}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-3">
        <p className="mb-4 max-w-lg text-xs leading-relaxed text-[var(--color-background)]/55">
          När du skickar mejlet behandlar vi uppgifterna enligt vår{" "}
          <Link className="underline underline-offset-2" to="/integritet">
            integritetsinformation
          </Link>
          .
        </p>
        <button
          type="submit"
          className="group/btn flex min-h-[44px] items-center gap-3 text-sm text-[var(--color-background)]/75 transition-colors duration-250 hover:text-[var(--color-background)]"
        >
          <span className="relative tracking-[0.10em] uppercase">
            Öppna mejlutkast
            <span className="absolute -bottom-px left-0 h-px w-0 bg-current transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:w-full" />
          </span>
          <span
            aria-hidden
            className="text-base transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1.5 group-hover/btn:-translate-y-0.5"
          >
            →
          </span>
        </button>
        {draftHref && (
          <p
            role="status"
            aria-live="polite"
            className="mt-5 max-w-lg text-sm leading-relaxed text-[var(--color-background)]/70"
          >
            Mejlutkastet ska nu vara öppet i ditt mejlprogram. Skicka det därifrån för att slutföra.
            Om inget öppnades kan du{" "}
            <a href={draftHref} className="underline underline-offset-2">
              öppna utkastet igen
            </a>{" "}
            eller mejla{" "}
            <a href="mailto:hej@care-er.se" className="underline underline-offset-2">
              hej@care-er.se
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
