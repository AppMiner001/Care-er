import { useState } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="kontakt" className="scroll-mt-24 bg-[var(--color-ink)] text-[var(--color-background)]">
      <div className="container-care py-28 md:py-44">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24">
          <div>
            <p className="eyebrow text-[var(--color-background)]/50 mb-8">Kontakt</p>
            <h2 className="display-xl text-balance" style={{ fontWeight: 300 }}>Berätta vad ni vill bygga.</h2>
            <p className="mt-8 text-lg text-[var(--color-background)]/70 max-w-md text-pretty">
              Vi återkommer inom 24 timmar med konkreta nästa steg.
            </p>
            <div className="mt-12 space-y-2 text-[var(--color-background)]/70">
              <p>hej@care-er.se</p>
              <p>Stockholm, Sverige</p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-6"
          >
            {(
              [
                { name: "namn", label: "Namn", type: "text" },
                { name: "foretag", label: "Företag", type: "text" },
                { name: "epost", label: "E-post", type: "email" },
              ] as const
            ).map((f) => (
              <div key={f.name}>
                <label
                  htmlFor={f.name}
                  className="block text-xs tracking-[0.2em] uppercase text-[var(--color-background)]/50 mb-3"
                >
                  {f.label}
                </label>
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  required
                  className="w-full bg-transparent border-b border-white/20 focus:border-white pb-3 text-lg outline-none transition-colors placeholder:text-white/30"
                />
              </div>
            ))}
            <div>
              <label
                htmlFor="meddelande"
                className="block text-xs tracking-[0.2em] uppercase text-[var(--color-background)]/50 mb-3"
              >
                Meddelande
              </label>
              <textarea
                id="meddelande"
                name="meddelande"
                rows={4}
                required
                className="w-full bg-transparent border-b border-white/20 focus:border-white pb-3 text-lg outline-none resize-none transition-colors"
              />
            </div>
            <div className="pt-4 flex items-center gap-6">
              <button
                type="submit"
                disabled={sent}
                className="group flex items-center gap-3 text-sm tracking-[0.06em] uppercase text-[var(--color-background)]/60 hover:text-[var(--color-background)] disabled:opacity-40 transition-colors duration-200"
              >
                {sent ? (
                  <span>Tack — vi hör av oss</span>
                ) : (
                  <>
                    <span>Starta dialog</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </>
                )}
              </button>
              {sent && (
                <p className="text-sm text-[var(--color-background)]/60 animate-fade-in">
                  Vi återkommer inom kort.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
