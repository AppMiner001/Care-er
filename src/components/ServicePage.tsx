import { Link } from "@tanstack/react-router";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Contact } from "./Contact";

export interface ServicePageProps {
  eyebrow: string;
  title: string;
  lede: string;
  intro: string;
  pillars: { title: string; body: string }[];
  approach: { step: string; title: string; body: string }[];
  next?: { label: string; to: "/tjanster/bemanning" | "/tjanster/rekrytering" | "/tjanster/utbildning" | "/tjanster/change" };
}

export function ServicePage(p: ServicePageProps) {
  return (
    <>
      <SiteHeader />
      <main className="pt-32">
        <section className="container-care pt-12 pb-24 md:pb-32">
          <Link to="/" className="text-sm text-[var(--color-ink)]/60 hover:text-[var(--color-ink)]">
            ← Tillbaka
          </Link>
          <p className="eyebrow text-[var(--color-ink)]/60 mt-10 mb-8">{p.eyebrow}</p>
          <h1 className="display-xl text-[var(--color-ink)] text-balance max-w-5xl">
            {p.title}
          </h1>
          <p className="mt-10 text-xl md:text-2xl leading-relaxed text-[var(--color-ink)]/70 max-w-3xl text-pretty">
            {p.lede}
          </p>
        </section>

        <section className="border-y border-border/60 py-24 md:py-32 bg-[var(--color-surface)]">
          <div className="container-care grid lg:grid-cols-[1fr_1.4fr] gap-16">
            <h2 className="display-md text-[var(--color-ink)]">Vad vi gör</h2>
            <p className="text-lg md:text-xl leading-relaxed text-[var(--color-ink)]/75 text-pretty">
              {p.intro}
            </p>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="container-care">
            <h2 className="display-md text-[var(--color-ink)] mb-16">Vad du får</h2>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
              {p.pillars.map((x, i) => (
                <div
                  key={x.title}
                  className="rounded-3xl border border-border/70 p-10 md:p-12"
                >
                  <span className="text-xs tracking-[0.2em] text-[var(--color-ink)]/40">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold text-[var(--color-ink)]">
                    {x.title}
                  </h3>
                  <p className="mt-4 text-[var(--color-ink)]/70 text-lg">{x.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 border-t border-border/60">
          <div className="container-care">
            <h2 className="display-md text-[var(--color-ink)] mb-16">Så arbetar vi</h2>
            <ol className="space-y-4 max-w-4xl">
              {p.approach.map((a) => (
                <li
                  key={a.step}
                  className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_220px_1fr] gap-6 md:gap-10 py-8 border-t border-border/60"
                >
                  <span className="text-sm tracking-[0.2em] uppercase text-[var(--color-ink)]/40">
                    {a.step}
                  </span>
                  <h3 className="text-xl font-medium text-[var(--color-ink)]">
                    {a.title}
                  </h3>
                  <p className="text-[var(--color-ink)]/70 text-lg md:col-start-3">
                    {a.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {p.next && (
          <section className="py-24 border-t border-border/60">
            <div className="container-care flex flex-wrap items-baseline justify-between gap-6">
              <p className="text-[var(--color-ink)]/60">Nästa tjänst</p>
              <Link
                to={p.next.to}
                className="display-md text-[var(--color-ink)] hover:opacity-70 transition"
              >
                {p.next.label} →
              </Link>
            </div>
          </section>
        )}

        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
