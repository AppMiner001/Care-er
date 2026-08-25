import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { absoluteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/integritet")({
  head: () => ({
    meta: [
      { title: "Integritet — care-er" },
      {
        name: "description",
        content: "Så hanterar Care er AB personuppgifter i kontakt- och karriärärenden.",
      },
      { property: "og:title", content: "Integritet — care-er" },
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
          <div className="max-w-3xl">
            <p className="eyebrow mb-6 text-[var(--color-ink)]/50">Integritet</p>
            <h1 className="display-xl text-balance">Så hanterar vi personuppgifter.</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-ink)]/68">
              Din integritet är viktig för oss. Här beskriver vi vilka personuppgifter Care er AB
              behandlar när du kontaktar oss och varför.
            </p>
          </div>

          <div className="mt-16 max-w-3xl space-y-12 text-base leading-relaxed text-[var(--color-ink)]/72 md:mt-20 md:text-lg">
            <section>
              <h2 className="text-xl font-semibold text-[var(--color-ink)] md:text-2xl">
                Personuppgiftsansvarig
              </h2>
              <p className="mt-4">
                Care er AB, organisationsnummer 559588-1540, Föreningsgatan 14, 411 27 Göteborg, är
                personuppgiftsansvarig. Frågor skickas till{" "}
                <a className="underline underline-offset-4" href="mailto:hej@care-er.se">
                  hej@care-er.se
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-ink)] md:text-2xl">
                Uppgifter vi behandlar
              </h2>
              <p className="mt-4">
                När du använder våra formulär behandlar vi de uppgifter du själv lämnar, exempelvis
                namn, företag, e-postadress, telefonnummer och meddelande. Vi behandlar också
                begränsade tekniska uppgifter som behövs för säker och tillförlitlig drift.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-ink)] md:text-2xl">
                Varför uppgifterna används
              </h2>
              <p className="mt-4">
                Uppgifterna används för att besvara företagsförfrågningar, hantera karriärkontakter,
                förebygga missbruk och följa upp den dialog du har inlett. Behandlingen grundas på
                vårt berättigade intresse av att kunna hantera dessa kontakter och, när det är
                relevant, åtgärder som föregår ett avtal. Uppgifterna används inte för
                marknadsföring utan ett separat medgivande.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-ink)] md:text-2xl">
                Lagring och leverantörer
              </h2>
              <p className="mt-4">
                Vi sparar uppgifterna endast så länge de behövs för kontakten, en pågående process
                eller för att uppfylla rättsliga skyldigheter. Tekniska leverantörer kan behandla
                uppgifter för vår räkning enligt personuppgiftsbiträdesavtal och tillämpliga
                dataskyddsregler. Om behandling sker utanför EU/EES används lämpliga skyddsåtgärder.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--color-ink)] md:text-2xl">
                Dina rättigheter
              </h2>
              <p className="mt-4">
                Du kan begära tillgång till, rättelse eller radering av dina uppgifter och invända
                mot viss behandling. Kontakta oss på{" "}
                <a className="underline underline-offset-4" href="mailto:hej@care-er.se">
                  hej@care-er.se
                </a>
                . Du har också rätt att lämna klagomål till Integritetsskyddsmyndigheten.
              </p>
            </section>

            <p className="border-t border-[var(--color-ink)]/10 pt-8 text-sm text-[var(--color-ink)]/48">
              Senast uppdaterad: 25 augusti 2026.
            </p>

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
