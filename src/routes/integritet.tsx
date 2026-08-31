import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { absoluteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/integritet")({
  head: () => ({
    meta: [
      { title: "Integritetspolicy — care-er" },
      {
        name: "description",
        content: "Så behandlar Care-er AB personuppgifter när du kontaktar oss.",
      },
      { property: "og:title", content: "Integritetspolicy — care-er" },
      { property: "og:url", content: absoluteUrl("/integritet") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/integritet") }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <SiteHeader forceDark />
      <div className="h-[4.25rem] bg-[var(--color-ink)]" aria-hidden />
      <main id="main-content" className="bg-[var(--color-background)] text-[var(--color-ink)]">
        <article className="container-care pb-24 pt-20 md:pb-36 md:pt-28">
          <header className="max-w-3xl">
            <h1 className="display-xl text-balance">Integritetspolicy</h1>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-ink)]/52 md:mt-8">
              <time dateTime="2026-08-28">Senast uppdaterad: 28 augusti 2026</time>
            </p>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-ink)]/68 md:text-xl">
              Care-er AB ansvarar för de personuppgifter som behandlas när du kontaktar oss via
              webbplatsen eller e-post.
            </p>
          </header>

          <div className="mt-16 max-w-3xl space-y-12 text-base leading-relaxed text-[var(--color-ink)]/72 md:mt-20 md:space-y-14 md:text-lg">
            <section>
              <h2 className="text-xl font-semibold text-[var(--color-ink)] md:text-2xl">
                Vilka uppgifter behandlar vi?
              </h2>
              <p className="mt-4">
                Vi behandlar de uppgifter du själv lämnar, exempelvis namn, kontaktuppgifter,
                företag och innehållet i ditt meddelande.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-ink)] md:text-2xl">
                Varför behandlar vi uppgifterna?
              </h2>
              <p className="mt-4">Vi använder uppgifterna för att kunna:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-[var(--color-ink)]/38">
                <li>besvara din förfrågan</li>
                <li>kontakta dig</li>
                <li>hantera en möjlig eller pågående kundrelation</li>
              </ul>
              <p className="mt-5">
                Behandlingen grundas på vårt berättigade intresse av att kunna kommunicera med
                personer som kontaktar oss. När kontakten gäller ett möjligt avtal kan behandlingen
                också vara nödvändig för att vidta åtgärder inför att ett avtal ingås.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-ink)] md:text-2xl">
                Hur länge sparar vi uppgifterna?
              </h2>
              <p className="mt-4">
                Vi sparar personuppgifterna så länge de behövs för att hantera kontakten och
                eventuell efterföljande relation. Uppgifter som behöver sparas enligt lag,
                exempelvis bokföringsunderlag, sparas så länge lagen kräver det.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-ink)] md:text-2xl">
                Vem får tillgång till uppgifterna?
              </h2>
              <p className="mt-4">
                Personuppgifter hanteras av Care-er AB och av de leverantörer vi använder för
                exempelvis webbplats, e-post och IT-tjänster. Leverantörer som behandlar
                personuppgifter för vår räkning får endast använda dem enligt våra instruktioner och
                gällande dataskyddsregler.
              </p>
              <p className="mt-4 font-medium text-[var(--color-ink)]">
                Vi säljer inte dina personuppgifter.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-ink)] md:text-2xl">
                Överföring utanför EU/EES
              </h2>
              <p className="mt-4">
                Vissa av våra leverantörer kan behandla personuppgifter utanför EU/EES. När det sker
                ser vi till att det finns en giltig rättslig grund och lämpliga skyddsåtgärder
                enligt gällande dataskyddslagstiftning.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-ink)] md:text-2xl">
                Dina rättigheter
              </h2>
              <p className="mt-4">
                Du har rätt att begära information om vilka personuppgifter vi behandlar om dig. Du
                kan också begära att felaktiga uppgifter rättas eller, i vissa fall, att uppgifter
                raderas eller att behandlingen begränsas.
              </p>
              <p className="mt-4">
                Du har även rätt att invända mot behandling som grundas på berättigat intresse.
              </p>
              <p className="mt-4">
                Om du anser att vi behandlar dina personuppgifter felaktigt har du rätt att lämna
                klagomål till Integritetsskyddsmyndigheten (IMY).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-ink)] md:text-2xl">Cookies</h2>
              <p className="mt-4">
                Vi använder endast cookies och liknande tekniker som behövs för att webbplatsen ska
                fungera, om inte annat anges på webbplatsen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-ink)] md:text-2xl">Kontakt</h2>
              <p className="mt-4">
                Har du frågor om hur vi behandlar personuppgifter är du välkommen att kontakta oss:
              </p>
              <address className="mt-5 not-italic">
                <strong className="font-semibold text-[var(--color-ink)]">Care-er AB</strong>
                <br />
                <a
                  className="underline underline-offset-4"
                  href="https://www.care-er.se/"
                  rel="home"
                >
                  www.care-er.se
                </a>
              </address>
            </section>

            <Link to="/" className="btn-primary w-fit">
              Till startsidan <span aria-hidden>→</span>
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
