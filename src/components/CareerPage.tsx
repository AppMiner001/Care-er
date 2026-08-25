import { useEffect, useState } from "react";
import { CareerJoinDialog } from "./CareerJoinDialog";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { useReveal } from "@/hooks/use-reveal";

const DARK_BACKGROUND = "oklch(0.075 0.030 271)";

const perspectiveCards = [
  "Hur du möter människor.",
  "Hur du tänker.",
  "Hur du agerar när något blir svårt.",
  "Vad du vill lära dig.",
  "Vad du kan bli riktigt bra på.",
] as const;

const promises = [
  "Att bli sedd för mer än ditt CV.",
  "Att förstå jobbet innan du tackar ja.",
  "Att veta vad som förväntas av dig.",
  "Att få ett ärligt besked.",
  "Att bli behandlad med respekt — också när svaret är nej.",
] as const;

export function CareerPage() {
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <>
      <SiteHeader forceDark />
      <main id="main-content">
        <CareerHero onJoin={() => setJoinOpen(true)} />
        <CustomerMeetingSection />
        <BrandSection />
        <WhatWeSeeSection />
        <LifeExperienceSection />
        <TwoChooseSection />
        <CareerHubSection />
        <PromisesSection />
        <RelationshipSection onJoin={() => setJoinOpen(true)} />
        <CareerFinale />
      </main>
      <SiteFooter />
      <CareerJoinDialog open={joinOpen} onOpenChange={setJoinOpen} />
    </>
  );
}

function CareerHero({ onJoin }: { onJoin: () => void }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-8 pt-24 text-[var(--color-background)] md:pb-10 md:pt-24"
      style={{ background: DARK_BACKGROUND }}
    >
      <AmbientBackground />
      <div className="container-care relative z-10">
        <div>
          <h1
            className="max-w-[12ch]"
            style={{
              fontSize: "clamp(3rem, 7.8vw, 9.4rem)",
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: "-0.045em",
              clipPath: ready ? "inset(0 -20px -30px 0)" : "inset(0 100% 0 0)",
              transition: ready ? "clip-path 1100ms cubic-bezier(0.16, 1, 0.3, 1) 120ms" : "none",
            }}
          >
            <span className="block">Ett jobb ska leda</span>
            <span className="block">dig framåt.</span>
          </h1>

          <div
            className="mt-6 md:mt-8"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "translateY(0)" : "translateY(12px)",
              transition:
                "opacity 850ms ease 620ms, transform 850ms cubic-bezier(0.16, 1, 0.3, 1) 620ms",
            }}
          >
            <p
              className="text-[var(--color-background)]/78"
              style={{
                fontSize: "clamp(1.45rem, 3.2vw, 3.75rem)",
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
              }}
            >
              Inte bara till nästa lön.
              <br />
              Utan till nästa version av dig.
            </p>
            <div
              className="mt-10 max-w-[74rem] space-y-4 text-[var(--color-background)]/72 md:mt-14 md:space-y-6"
              style={{
                fontSize: "clamp(1rem, 1.8vw, 2rem)",
                fontWeight: 300,
                lineHeight: 1.2,
                letterSpacing: "-0.025em",
              }}
            >
              <p>
                Vi arbetar med företag som vet att deras varumärke byggs i kundmötet — och
                investerar i människorna som vill få kunderna att längta tillbaka.
              </p>
              <p>Därför letar vi inte bara efter människor som kan göra jobbet.</p>
              <p className="font-semibold text-[var(--color-background)]/92">
                Vi letar efter människor som förstår att ett enda kundmöte kan förändra vad en kund
                känner för ett helt företag.
              </p>
            </div>
            <div className="mt-6 md:mt-8">
              <CareerCTA onClick={onJoin} light />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CustomerMeetingSection() {
  const ref = useReveal<HTMLDivElement>(0.12);

  return (
    <section className="py-16 lg:flex lg:min-h-[calc(100svh-4.25rem)] lg:items-center lg:py-20">
      <div className="container-care">
        <div
          ref={ref}
          data-reveal
          className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16 xl:gap-24"
        >
          <h2
            className="max-w-[12ch] text-balance text-[var(--color-ink)]"
            style={{
              fontSize: "clamp(2.4rem, 4vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
            }}
          >
            Kundmötet bygger karriärer.
          </h2>
          <div
            className="space-y-3 text-[var(--color-ink)]/72 md:space-y-4"
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.75rem)",
              fontWeight: 300,
              lineHeight: 1.22,
              letterSpacing: "-0.025em",
            }}
          >
            <p>
              Att förstå människor. Välkomna. Lösa problem. Skapa förtroende. Sälja. Förklara.
              Hantera missnöje. Ta ansvar. Få någon att vilja komma tillbaka.
            </p>
            <p>Det är inte ”bara kundservice”.</p>
            <p className="font-semibold text-[var(--color-ink)]">
              Det är kompetenser som utvecklar människor, bygger ledare och formar karriärer —
              samtidigt som de bygger företagets varumärke i varje kundmöte.
            </p>
            <p>
              Hos care-er möter du roller där människor möter kunder — före, under och efter
              affären.
            </p>
            <p>
              I telefon och digitalt. I butik, reception och kundmottagning. Vid en leverans, ett
              problem, ett köp eller ett ögonblick kunden kommer att minnas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandSection() {
  const ref = useReveal<HTMLDivElement>(0.08);

  return (
    <section
      className="relative min-h-[calc(100svh-4.25rem)] overflow-hidden py-24 text-[var(--color-background)] lg:py-28"
      style={{ background: DARK_BACKGROUND }}
    >
      <AmbientBackground />
      <div className="container-care relative z-10">
        <div ref={ref} data-reveal>
          <p
            className="text-[var(--color-background)]/42"
            style={{
              fontSize: "clamp(2.3rem, 5vw, 5.5rem)",
              fontWeight: 300,
              lineHeight: 0.98,
              letterSpacing: "-0.04em",
            }}
          >
            Du representerar inte bara ett företag.
          </p>
          <h2
            className="mt-2 text-[var(--color-background)]"
            style={{
              fontSize: "clamp(3.5rem, 8vw, 8rem)",
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: "-0.05em",
            }}
          >
            Du bygger det.
          </h2>

          <div
            className="mt-12 max-w-[50rem] space-y-5 text-[var(--color-background)]/72 md:mt-16 md:space-y-6"
            style={{
              fontSize: "clamp(1rem, 1.35vw, 1.5rem)",
              fontWeight: 300,
              lineHeight: 1.5,
              letterSpacing: "-0.022em",
            }}
          >
            <p className="font-semibold text-[var(--color-background)]/94">
              Du har fått förtroendet att arbeta med något av det mest värdefulla företaget har:
              sina kunder.
            </p>
            <p>
              Varje gång du möter en kund. Välkomnar. Hjälper. Säljer. Förklarar. Löser ett problem.
              Lämnar över något kunden längtat efter. Eller bara lyssnar. Eller möter någon som är
              riktigt förbannad. Då händer något med kundens bild av företaget.
            </p>
            <p className="font-semibold text-[var(--color-background)]/94">
              Varumärken byggs inte bara genom vad företag säger.
              <br />
              De byggs genom det människor upplever.
            </p>
            <p>
              Och ofta är det en människa i ett kundmöte som skapar den upplevelsen. Därför ser vi
              arbetet med kunderna som ett av företagets viktigaste jobb.
            </p>
            <p className="font-semibold text-[var(--color-background)]/94">
              Och människorna som gör det är företagens viktigaste varumärkesbyggare.
            </p>
            <p>Ditt viktigaste uppdrag är därför större än själva arbetsuppgiften.</p>
            <p
              className="pt-4 font-semibold text-[var(--color-background)]/96 md:pt-6"
              style={{ fontSize: "clamp(1.2rem, 1.7vw, 1.9rem)", lineHeight: 1.3 }}
            >
              Att lämna kunden med en känsla som gör att kunden vill välja företaget igen — utan att
              jämföra.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatWeSeeSection() {
  const ref = useReveal<HTMLDivElement>(0.12);

  return (
    <section className="bg-[var(--color-background)] py-16 lg:flex lg:min-h-[calc(100svh-4.25rem)] lg:items-center lg:py-20">
      <div className="container-care lg:-translate-y-8">
        <div
          ref={ref}
          data-reveal
          className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16 xl:gap-24"
        >
          <div>
            <p
              className="text-[var(--color-ink)]"
              style={{
                fontSize: "clamp(2.3rem, 4vw, 4rem)",
                fontWeight: 300,
                lineHeight: 1.42,
                letterSpacing: "-0.035em",
              }}
            >
              Vi vill veta mer än vad du har gjort.
            </p>
            <h2
              className="mt-1 text-[var(--color-ink)]"
              style={{
                fontSize: "clamp(2.3rem, 4vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
              }}
            >
              Vi vill förstå vem du är.
            </h2>
          </div>
          <div
            className="text-[var(--color-ink)]/76"
            style={{
              fontSize: "clamp(1.15rem, 2.1vw, 2rem)",
              fontWeight: 300,
              lineHeight: 1.36,
              letterSpacing: "-0.025em",
            }}
          >
            <div className="space-y-5 md:space-y-7">
              {perspectiveCards.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
            <div className="mt-10 md:mt-14">
              <p>Därför börjar vi inte med ditt CV.</p>
              <p className="mt-2 font-semibold text-[var(--color-ink)]">Vi börjar med dig.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LifeExperienceSection() {
  const ref = useReveal<HTMLDivElement>(0.1);

  return (
    <section className="bg-[var(--color-surface)] py-16 lg:flex lg:min-h-[calc(100svh-4.25rem)] lg:items-center lg:py-20">
      <div className="container-care">
        <div
          ref={ref}
          data-reveal
          className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16 xl:gap-24"
        >
          <h2
            className="max-w-[12ch] text-balance text-[var(--color-ink)]"
            style={{
              fontSize: "clamp(2.4rem, 4vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
            }}
          >
            All erfarenhet står inte i ett CV.
          </h2>
          <div
            className="text-[var(--color-ink)]/68"
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.75rem)",
              fontWeight: 300,
              lineHeight: 1.25,
              letterSpacing: "-0.025em",
            }}
          >
            <div className="space-y-3 md:space-y-4">
              <p>Vissa saker lär man sig på en utbildning.</p>
              <p>Andra lär man sig genom att arbeta.</p>
              <p>Och en del lär man sig helt enkelt genom att ha levt.</p>
              <p>
                Att läsa människor.
                <br />
                Behålla lugnet.
                <br />
                Veta när man ska prata och när man ska lyssna.
                <br />
                Ha tålamod.
                <br />
                Hantera konflikter utan att själv bli en del av dem.
              </p>
            </div>
            <div className="mt-10 md:mt-14">
              <p
                className="text-[var(--color-ink)]"
                style={{ fontSize: "clamp(1.2rem, 2vw, 2rem)" }}
              >
                I ett kundmöte kan livserfarenhet vara yrkeskompetens.
              </p>
              <p className="mt-3 text-[var(--color-ink)]">
                Hos oss ska erfarenhet inte räknas i år.
              </p>
              <p
                className="mt-3 font-semibold text-[var(--color-ink)]"
                style={{ fontSize: "clamp(1.25rem, 2vw, 2.05rem)" }}
              >
                Den ska räknas i vad du kan göra med den.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TwoChooseSection() {
  const ref = useReveal<HTMLDivElement>(0.1);

  return (
    <section className="border-y border-[var(--color-ink)]/[0.07] py-16 lg:flex lg:min-h-[calc(100svh-4.25rem)] lg:items-center lg:py-20">
      <div className="container-care">
        <div
          ref={ref}
          data-reveal
          className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16 xl:gap-24"
        >
          <div>
            <p
              className="text-[var(--color-ink)]/45"
              style={{
                fontSize: "clamp(2.35rem, 4vw, 4rem)",
                fontWeight: 300,
                lineHeight: 1.32,
                letterSpacing: "-0.035em",
              }}
            >
              Du söker inte bara ett jobb.
            </p>
            <h2
              className="mt-3 text-[var(--color-ink)]"
              style={{
                fontSize: "clamp(2.35rem, 4vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
              }}
            >
              Du väljer också ett företag.
            </h2>
          </div>
          <div
            className="space-y-4 text-[var(--color-ink)]/68"
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.75rem)",
              fontWeight: 300,
              lineHeight: 1.25,
              letterSpacing: "-0.025em",
            }}
          >
            <p className="font-semibold text-[var(--color-ink)]">
              En rekrytering är inte ett företag som väljer en människa.
            </p>
            <p className="font-semibold text-[var(--color-ink)]">Två parter väljer varandra.</p>
            <p>Du ska förstå jobbet, förväntningarna, kulturen och möjligheterna att utvecklas.</p>
            <p>Företaget ska förstå vem du är, vad du kan bidra med och vart du vill.</p>
            <p
              className="pt-6 font-semibold text-[var(--color-ink)]"
              style={{ fontSize: "clamp(1.25rem, 2vw, 2.05rem)" }}
            >
              Det ska kännas rätt från båda håll.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CareerHubSection() {
  const ref = useReveal<HTMLDivElement>(0.1);

  return (
    <section className="bg-[var(--color-surface)] py-16 lg:flex lg:min-h-[calc(100svh-4.25rem)] lg:items-center lg:py-20">
      <div className="container-care">
        <div
          ref={ref}
          data-reveal
          className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16 xl:gap-24"
        >
          <h2
            className="max-w-[14ch] text-balance text-[var(--color-ink)]"
            style={{
              fontSize: "clamp(2.4rem, 4vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
            }}
          >
            Din karriär behöver inte ske på samma plats.
          </h2>
          <div
            className="text-[var(--color-ink)]/68"
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.75rem)",
              fontWeight: 300,
              lineHeight: 1.25,
              letterSpacing: "-0.025em",
            }}
          >
            <div className="space-y-3 md:space-y-4">
              <p>Ibland är nästa steg ett större ansvar.</p>
              <p>Ibland en ny roll.</p>
              <p>Ibland ett nytt företag.</p>
              <p>Och ibland trivs man precis där man är.</p>
            </div>
            <div className="mt-5 space-y-4 md:mt-6">
              <p>En bra arbetsgivare ska ge plats för din ambition — vilken den än är.</p>
              <p>
                Därför arbetar vi med företag som vill vara en karriärhubb för sina medarbetare —
                oavsett om nästa steg sker inom företaget eller utanför det.
              </p>
              <p
                className="pt-5 text-[var(--color-ink)]"
                style={{ fontSize: "clamp(1.2rem, 2vw, 2rem)" }}
              >
                Du behöver inte vilja vidare.
                <br />
                <span className="font-semibold">Men du ska ha möjligheten.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PromisesSection() {
  const ref = useReveal<HTMLDivElement>(0.1);

  return (
    <section className="py-16 lg:flex lg:min-h-[calc(100svh-4.25rem)] lg:items-center lg:py-20">
      <div className="container-care">
        <div
          ref={ref}
          data-reveal
          className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16 xl:gap-24"
        >
          <div>
            <p
              className="text-[var(--color-ink)]"
              style={{
                fontSize: "clamp(2.35rem, 4vw, 4rem)",
                fontWeight: 300,
                lineHeight: 1.3,
                letterSpacing: "-0.035em",
              }}
            >
              Vi lovar inte att du får jobbet.
            </p>
            <h2
              className="mt-2 text-[var(--color-ink)]"
              style={{
                fontSize: "clamp(2.35rem, 4vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
              }}
            >
              Men vi kan lova hur du blir behandlad.
            </h2>
          </div>
          <div
            className="space-y-4 text-[var(--color-ink)]/68 md:space-y-5"
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.75rem)",
              fontWeight: 300,
              lineHeight: 1.25,
              letterSpacing: "-0.025em",
            }}
          >
            {promises.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RelationshipSection({ onJoin }: { onJoin: () => void }) {
  const ref = useReveal<HTMLDivElement>(0.08);

  return (
    <section
      className="relative min-h-[calc(100svh-4.25rem)] overflow-hidden py-20 text-[var(--color-background)] lg:py-24"
      style={{ background: DARK_BACKGROUND }}
    >
      <AmbientBackground />
      <div className="container-care relative z-10">
        <div ref={ref} data-reveal>
          <p
            className="max-w-[22ch] text-balance text-[var(--color-background)]/72"
            style={{
              fontSize: "clamp(2.6rem, 5.2vw, 6.2rem)",
              fontWeight: 300,
              lineHeight: 0.98,
              letterSpacing: "-0.04em",
            }}
          >
            Får du ett jobb genom oss börjar inte vår relation ta slut.
          </p>
          <h2
            className="mt-3 text-[var(--color-background)]"
            style={{
              fontSize: "clamp(4rem, 8vw, 9.5rem)",
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-0.055em",
            }}
          >
            Den börjar.
          </h2>

          <div
            className="mt-10 max-w-[56rem] space-y-5 text-[var(--color-background)]/72 md:mt-14 md:space-y-6"
            style={{
              fontSize: "clamp(1rem, 1.55vw, 1.7rem)",
              fontWeight: 300,
              lineHeight: 1.45,
              letterSpacing: "-0.022em",
            }}
          >
            <p className="font-semibold text-[var(--color-background)]/92">
              Vi vill gärna finnas kvar även efter att jobbet är ditt.
            </p>
            <p>
              Kanske genom en ny möjlighet. Ny kunskap. Ett samtal. Eller bara genom att vi finns
              där när du börjar fundera på vad som kommer sedan.
            </p>
            <p>
              Du kanske söker jobb idag.
              <br />
              Du kanske trivs precis där du är imorgon.
              <br />
              Och om några år kanske du är redo för någonting helt annat.
            </p>
            <p className="font-semibold text-[var(--color-background)]/92">
              Vi vill gärna känna dig då också.
            </p>
          </div>
          <div className="mt-9">
            <CareerCTA onClick={onJoin} light />
          </div>
        </div>
      </div>
    </section>
  );
}

function CareerFinale() {
  const ref = useReveal<HTMLDivElement>(0.15);

  return (
    <section className="flex min-h-[78svh] items-center bg-[var(--color-background)] py-20 md:min-h-[calc(100svh-4.25rem)] md:py-24">
      <div className="container-care">
        <div ref={ref} data-reveal className="text-center">
          <p
            className="text-[clamp(2.5rem,5.3vw,6.4rem)] text-[var(--color-ink)]/62 lg:text-[clamp(3rem,4.6vw,5.5rem)]"
            style={{
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: "-0.045em",
            }}
          >
            Din care-er börjar med vem du är.
          </p>
          <h2
            className="mt-8 text-balance text-[clamp(2.5rem,5.3vw,6.4rem)] text-[var(--color-ink)] lg:whitespace-nowrap lg:text-[clamp(3rem,4.6vw,5.5rem)]"
            style={{
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.045em",
            }}
          >
            Och fortsätter med vem du vill bli.
          </h2>
        </div>
      </div>
    </section>
  );
}

function CareerCTA({ onClick, light = false }: { onClick: () => void; light?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-12 items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 ${
        light
          ? "bg-[var(--color-background)] text-[var(--color-ink)] hover:bg-white focus-visible:outline-[var(--color-background)]"
          : "bg-[var(--color-ink)] text-[var(--color-background)] focus-visible:outline-[var(--color-ink)]"
      }`}
    >
      <span>Bli en del av care-er</span>
      <span aria-hidden>→</span>
    </button>
  );
}

function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 68% 58% at 82% 48%, oklch(0.18 0.065 271 / 0.58) 0%, transparent 70%)",
          animation: "ambient-breathe 11s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 48% 44% at 10% 88%, oklch(0.14 0.04 271 / 0.42) 0%, transparent 66%)",
          animation: "ambient-breathe 15s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}
