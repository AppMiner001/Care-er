import { Link } from "@tanstack/react-router";

export function ForEmployers() {
  return (
    <section className="py-28 md:py-40 bg-[var(--color-surface)] border-y border-border/60">
      <div className="container-care grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <p className="eyebrow text-[var(--color-ink)]/60 mb-6">För arbetsgivare</p>
          <h2 className="display-lg text-[var(--color-ink)] text-balance">
            För organisationer som vill mer än att fylla en roll.
          </h2>
          <p className="mt-8 text-lg text-[var(--color-ink)]/70 max-w-lg text-pretty">
            Vi arbetar tätt med ledning och HR för att bygga team som lyfter
            varumärket varje dag — inte bara under introduktionen.
          </p>
          <Link
            to="/"
            hash="kontakt"
            className="mt-10 inline-flex items-center rounded-full bg-[var(--color-ink)] text-[var(--color-background)] px-7 py-4 text-sm font-medium hover:opacity-90"
          >
            Boka möte
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-4">
          {["Bemanning", "Rekrytering", "Utbildning", "Förändringsarbete"].map(
            (item) => (
              <li
                key={item}
                className="rounded-2xl border border-border/70 bg-[var(--color-background)] p-7 text-[var(--color-ink)]"
              >
                <span className="block text-xs tracking-[0.18em] uppercase text-[var(--color-ink)]/40 mb-3">
                  Område
                </span>
                <span className="text-xl font-medium">{item}</span>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}

export function ForCandidates() {
  const items = [
    { t: "Support", d: "Du får ett team som har din rygg." },
    { t: "Utveckling", d: "Träning som faktiskt gör skillnad." },
    { t: "Tillväxt", d: "Vägar framåt vi bygger tillsammans." },
    { t: "Tillhörighet", d: "En kultur du vill stanna i." },
  ];
  return (
    <section className="py-28 md:py-40">
      <div className="container-care">
        <div className="max-w-3xl mb-16">
          <p className="eyebrow text-[var(--color-ink)]/60 mb-6">För kandidater</p>
          <h2 className="display-xl text-[var(--color-ink)] text-balance">
            Karriär börjar med människor.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((i) => (
            <div
              key={i.t}
              className="rounded-3xl border border-border/70 p-8 hover:border-[var(--color-ink)]/40 transition-colors"
            >
              <h3 className="text-2xl font-semibold text-[var(--color-ink)] mb-3">
                {i.t}
              </h3>
              <p className="text-[var(--color-ink)]/65">{i.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link
            to="/"
            hash="kontakt"
            className="inline-flex items-center rounded-full border border-[var(--color-ink)]/20 text-[var(--color-ink)] px-7 py-4 text-sm font-medium hover:border-[var(--color-ink)]/60"
          >
            Se möjligheter
          </Link>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="relative py-28 md:py-44 overflow-hidden">
      <svg
        className="absolute -right-32 top-10 w-[680px] h-[680px] text-[var(--color-ink)]/[0.04] pointer-events-none"
        viewBox="0 0 600 600"
        aria-hidden
      >
        <circle cx="300" cy="300" r="260" fill="currentColor" />
        <line x1="40" y1="560" x2="560" y2="40" stroke="currentColor" strokeWidth="2" />
        <circle cx="120" cy="120" r="80" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      <div className="container-care relative">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-ink)]/60 mb-8">Om care-er</p>
          <h2 className="display-lg text-[var(--color-ink)] mb-10 text-balance">
            Byggt från grunden. Precis som logotypen.
          </h2>
          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-[var(--color-ink)]/75 text-pretty">
            <p>
              care-er är inte hämtat ur ett bibliotek. Det är byggt — bokstav
              för bokstav, beteende för beteende — från geometriska grundformer.
            </p>
            <p>
              Cirklar för värme och mänsklig närvaro. Raka snitt för struktur,
              precision och professionell tyngd. Det är ett hantverk som speglar
              exakt vad vi gör för våra kunder: tar något komplext, strukturerar
              det metodiskt och formar det till något som håller.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
