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
        <div className="max-w-6xl">
          <p
            className="eyebrow text-[var(--color-background)]/55"
            style={{ opacity: ready ? 1 : 0, transition: "opacity 700ms ease 120ms" }}
          >
            Karriär
          </p>
          <h1
            className="mt-4 max-w-[11ch] text-balance md:mt-5"
            style={{
              fontSize: "clamp(2.85rem, 6.2vw, 6.5rem)",
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: "-0.045em",
              clipPath: ready ? "inset(0 -20px -30px 0)" : "inset(0 100% 0 0)",
              transition: ready ? "clip-path 1100ms cubic-bezier(0.16, 1, 0.3, 1) 240ms" : "none",
            }}
          >
            Ett jobb ska leda någonstans.
          </h1>

          <div
            className="mt-5 max-w-3xl md:mt-6"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "translateY(0)" : "translateY(12px)",
              transition:
                "opacity 850ms ease 820ms, transform 850ms cubic-bezier(0.16, 1, 0.3, 1) 820ms",
            }}
          >
            <p
              className="text-balance text-[var(--color-background)]/80"
              style={{
                fontSize: "clamp(1.15rem, 2vw, 1.8rem)",
                fontWeight: 300,
                lineHeight: 1.28,
                letterSpacing: "-0.02em",
              }}
            >
              Inte bara till nästa lön.
              <br />
              Utan till nästa version av dig.
            </p>
            <div
              className="mt-5 max-w-[68ch] space-y-2 text-[var(--color-background)]/64 md:space-y-3"
              style={{
                fontSize: "clamp(0.9rem, 1.15vw, 1.08rem)",
                fontWeight: 300,
                lineHeight: 1.5,
              }}
            >
              <p>
                Vi arbetar med företag som vet hur mycket som avgörs i kundmötet — och som
                investerar i människorna som möter kunderna.
              </p>
              <p>Därför letar vi inte bara efter människor som kan göra jobbet.</p>
              <p className="font-semibold text-[var(--color-background)]/92">
                Vi letar efter människor som förstår att ett enda kundmöte kan förändra vad en kund
                känner för ett helt företag.
              </p>
            </div>
            <div className="mt-5 md:mt-6">
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
    <section className="py-16 md:py-36">
      <div className="container-care">
        <div ref={ref} data-reveal className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <h2 className="display-lg max-w-[12ch] text-balance text-[var(--color-ink)]">
            Kundmötet kan ta dig långt.
          </h2>
          <div className="max-w-[68ch] space-y-5 text-base leading-[1.75] text-[var(--color-ink)]/67 md:text-lg">
            <p>
              Att förstå människor. Lösa problem. Skapa förtroende. Sälja. Förklara. Hantera
              missnöje. Ta ansvar. Få någon att vilja komma tillbaka.
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
            <p>Och företag som förstår värdet av människorna som gör jobbet.</p>
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
      className="relative overflow-hidden py-20 text-[var(--color-background)] md:py-40"
      style={{ background: DARK_BACKGROUND }}
    >
      <AmbientBackground />
      <div className="container-care relative z-10">
        <div ref={ref} data-reveal>
          <p
            className="text-[var(--color-background)]/42"
            style={{
              fontSize: "clamp(2.3rem, 6.2vw, 6.5rem)",
              fontWeight: 300,
              lineHeight: 0.98,
              letterSpacing: "-0.04em",
            }}
          >
            Du representerar inte bara ett företag.
          </p>
          <h2
            className="mt-3 text-[var(--color-background)]"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 10rem)",
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: "-0.05em",
            }}
          >
            Du bygger det.
          </h2>

          <div className="mt-16 grid gap-12 lg:mt-28 lg:grid-cols-2 lg:gap-24">
            <div className="max-w-[62ch] space-y-5 text-base leading-[1.75] text-[var(--color-background)]/66 md:text-lg">
              <p className="font-semibold text-[var(--color-background)]/92">
                Du har fått förtroendet att arbeta med något av det mest värdefulla företaget har:
                sina kunder.
              </p>
              <p>
                Varje gång du möter en kund. Välkomnar. Hjälper. Säljer. Förklarar. Löser ett
                problem. Lämnar över något kunden längtat efter. Eller bara lyssnar.
              </p>
              <p>Eller möter någon som är riktigt förbannad.</p>
              <p>Då händer något med kundens bild av företaget.</p>
              <p className="font-semibold text-[var(--color-background)]/92">
                Varumärken byggs inte bara genom det företag säger.
                <br />
                De byggs genom det människor upplever.
              </p>
            </div>
            <div className="max-w-[62ch] space-y-5 text-base leading-[1.75] text-[var(--color-background)]/66 md:text-lg lg:pt-16">
              <p>Och ofta är det en människa i ett kundmöte som skapar den upplevelsen.</p>
              <p>Därför ser vi arbetet med kunderna som ett av företagets viktigaste jobb.</p>
              <p className="font-semibold text-[var(--color-background)]/92">
                Och människorna som gör det som företagets viktigaste varumärkesbyggare.
              </p>
              <p>Ditt viktigaste uppdrag är därför större än själva arbetsuppgiften.</p>
              <p className="font-semibold text-[var(--color-background)]/92">
                Att lämna kunden med en känsla som gör att de vill välja företaget igen — utan att
                jämföra.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatWeSeeSection() {
  const headingRef = useReveal<HTMLDivElement>(0.12);
  const endingRef = useReveal<HTMLDivElement>(0.12);

  return (
    <section className="bg-[var(--color-surface)] py-16 md:py-36">
      <div className="container-care">
        <div ref={headingRef} data-reveal className="max-w-4xl">
          <h2 className="display-lg text-balance text-[var(--color-ink)]">
            Vi vill veta mer än vad du har gjort.
          </h2>
          <div className="mt-8 max-w-[66ch] space-y-3 text-base leading-relaxed text-[var(--color-ink)]/65 md:text-lg">
            <p>Ett CV berättar en del.</p>
            <p>Vi vill förstå mer.</p>
          </div>
        </div>

        <NumberedCardGrid items={perspectiveCards} className="mt-12 md:mt-20" />

        <div ref={endingRef} data-reveal className="mt-12 max-w-3xl md:mt-20">
          <p className="text-xl font-light leading-relaxed text-[var(--color-ink)]/65 md:text-2xl">
            Därför börjar vi inte bara i ditt CV.
          </p>
          <p
            className="mt-2 text-[var(--color-ink)]"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              fontWeight: 700,
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
            }}
          >
            Vi börjar i dig.
          </p>
        </div>
      </div>
    </section>
  );
}

function LifeExperienceSection() {
  const ref = useReveal<HTMLDivElement>(0.1);

  return (
    <section className="py-16 md:py-36">
      <div className="container-care">
        <div ref={ref} data-reveal className="mx-auto max-w-6xl">
          <h2
            className="max-w-[15ch] text-balance text-[var(--color-ink)]"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 7.5rem)",
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: "-0.045em",
            }}
          >
            All erfarenhet står inte i ett CV.
          </h2>
          <div className="mt-12 grid gap-10 md:mt-20 lg:grid-cols-2 lg:gap-24">
            <div className="max-w-[64ch] space-y-4 text-base leading-[1.75] text-[var(--color-ink)]/66 md:text-lg">
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
            <div className="max-w-[56ch] self-end lg:pb-2">
              <p className="text-xl font-semibold leading-snug text-[var(--color-ink)] md:text-3xl">
                I ett kundmöte kan livserfarenhet vara yrkeskompetens.
              </p>
              <p className="mt-7 text-base leading-relaxed text-[var(--color-ink)]/65 md:text-lg">
                Hos oss ska erfarenhet inte räknas i år.
              </p>
              <p className="mt-2 text-xl font-semibold leading-snug text-[var(--color-ink)] md:text-3xl">
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
    <section className="border-y border-[var(--color-ink)]/[0.07] bg-[var(--color-surface)] py-16 md:py-36">
      <div className="container-care">
        <div ref={ref} data-reveal className="grid gap-12 lg:grid-cols-2 lg:gap-28">
          <div>
            <p
              className="text-[var(--color-ink)]/45"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                fontWeight: 300,
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
              }}
            >
              Du söker inte bara ett jobb.
            </p>
            <h2
              className="mt-3 text-[var(--color-ink)]"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                fontWeight: 700,
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
              }}
            >
              Du väljer också ett företag.
            </h2>
          </div>
          <div className="max-w-[66ch] space-y-5 self-end text-base leading-[1.75] text-[var(--color-ink)]/66 md:text-lg">
            <p>En rekrytering är inte ett företag som väljer en människa.</p>
            <p className="text-xl font-semibold text-[var(--color-ink)] md:text-2xl">
              Två parter väljer varandra.
            </p>
            <p>Du ska förstå jobbet, förväntningarna, kulturen och möjligheterna att utvecklas.</p>
            <p>Företaget ska förstå vem du är, vad du kan bidra med och vart du vill.</p>
            <p className="font-semibold text-[var(--color-ink)]">
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
    <section className="py-16 md:py-36">
      <div className="container-care">
        <div ref={ref} data-reveal className="mx-auto max-w-5xl">
          <h2 className="display-lg max-w-[15ch] text-balance text-[var(--color-ink)]">
            Din karriär behöver inte ske på samma plats.
          </h2>
          <div className="mt-10 grid gap-8 md:mt-16 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
            <div className="space-y-2 text-xl font-light leading-relaxed text-[var(--color-ink)]/62 md:text-2xl">
              <p>Ibland är nästa steg ett större ansvar.</p>
              <p>Ibland en ny roll.</p>
              <p>Ibland ett nytt företag.</p>
              <p>Och ibland trivs man precis där man är.</p>
            </div>
            <div className="max-w-[66ch] space-y-5 text-base leading-[1.75] text-[var(--color-ink)]/66 md:text-lg">
              <p className="font-semibold text-[var(--color-ink)]">
                En bra arbetsgivare ska ge plats för din ambition — vilken den än är.
              </p>
              <p>
                Därför arbetar vi med företag som vill vara en karriär-hubb för sina människor —
                oavsett om nästa steg sker inom företaget eller utanför det.
              </p>
              <p className="text-xl font-semibold text-[var(--color-ink)] md:text-2xl">
                Du behöver inte vilja vidare. Men du ska ha möjligheten.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PromisesSection() {
  const headingRef = useReveal<HTMLDivElement>(0.1);

  return (
    <section className="bg-[var(--color-surface)] py-16 md:py-36">
      <div className="container-care">
        <div ref={headingRef} data-reveal className="max-w-5xl">
          <p
            className="text-[var(--color-ink)]/45"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: 300,
              lineHeight: 0.98,
              letterSpacing: "-0.04em",
            }}
          >
            Vi lovar inte att du får jobbet.
          </p>
          <h2
            className="mt-3 text-[var(--color-ink)]"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: 700,
              lineHeight: 0.98,
              letterSpacing: "-0.04em",
            }}
          >
            Men vi kan lova hur du blir behandlad.
          </h2>
        </div>
        <NumberedCardGrid items={promises} className="mt-12 md:mt-24" />
      </div>
    </section>
  );
}

function RelationshipSection({ onJoin }: { onJoin: () => void }) {
  const ref = useReveal<HTMLDivElement>(0.08);

  return (
    <section
      className="relative overflow-hidden py-20 text-[var(--color-background)] md:py-40"
      style={{ background: DARK_BACKGROUND }}
    >
      <AmbientBackground />
      <div className="container-care relative z-10">
        <div ref={ref} data-reveal>
          <p
            className="max-w-[19ch] text-balance text-[var(--color-background)]/42"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 6rem)",
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
              fontSize: "clamp(4rem, 12vw, 12rem)",
              fontWeight: 700,
              lineHeight: 0.86,
              letterSpacing: "-0.055em",
            }}
          >
            Den börjar.
          </h2>

          <div className="mt-14 max-w-[68ch] space-y-5 text-base leading-[1.75] text-[var(--color-background)]/66 md:mt-24 md:text-lg">
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
    <section className="flex min-h-[82svh] items-center py-20 md:py-32">
      <div className="container-care">
        <div ref={ref} data-reveal className="max-w-6xl">
          <p
            className="text-[var(--color-ink)]/42"
            style={{
              fontSize: "clamp(2.5rem, 6.4vw, 6.5rem)",
              fontWeight: 300,
              lineHeight: 0.98,
              letterSpacing: "-0.045em",
            }}
          >
            Du är mer än ditt CV.
            <br />
            Mer än din erfarenhet.
          </p>
          <h2
            className="mt-8 max-w-[18ch] text-balance text-[var(--color-ink)]"
            style={{
              fontSize: "clamp(2.5rem, 6.4vw, 6.5rem)",
              fontWeight: 700,
              lineHeight: 0.98,
              letterSpacing: "-0.045em",
            }}
          >
            Din care-er börjar med vem du är.
          </h2>
          <p
            className="mt-3 max-w-[18ch] text-balance text-[var(--color-ink)]"
            style={{
              fontSize: "clamp(2.5rem, 6.4vw, 6.5rem)",
              fontWeight: 700,
              lineHeight: 0.98,
              letterSpacing: "-0.045em",
            }}
          >
            Och fortsätter med vem du vill bli.
          </p>
          <p className="mt-12 text-lg font-semibold tracking-[-0.02em] text-[var(--color-ink)] md:mt-16 md:text-2xl">
            Care and career. care-er.
          </p>
        </div>
      </div>
    </section>
  );
}

function NumberedCardGrid({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <div
      className={`grid gap-px overflow-hidden border border-[var(--color-ink)]/[0.08] bg-[var(--color-ink)]/[0.08] md:grid-cols-2 ${className}`}
    >
      {items.map((item, index) => (
        <NumberedCard key={item} item={item} index={index} />
      ))}
    </div>
  );
}

function NumberedCard({ item, index }: { item: string; index: number }) {
  const ref = useReveal<HTMLDivElement>(0.14);
  const delay = Math.min(index * 100, 400);

  return (
    <div
      ref={ref}
      data-reveal
      data-delay={delay > 0 ? String(delay) : undefined}
      className={`relative min-h-56 overflow-hidden bg-[var(--color-background)] p-7 md:min-h-72 md:p-10 ${
        index === 4 ? "md:col-span-2" : ""
      }`}
    >
      <span
        aria-hidden
        className="absolute -bottom-8 right-1 select-none font-bold leading-none text-[var(--color-ink)]/[0.045] md:-bottom-12"
        style={{ fontSize: "clamp(7rem, 18vw, 15rem)", letterSpacing: "-0.06em" }}
      >
        0{index + 1}
      </span>
      <p
        className="relative z-10 max-w-[22ch] text-balance text-[var(--color-ink)]"
        style={{
          fontSize: "clamp(1.5rem, 2.7vw, 2.5rem)",
          fontWeight: 600,
          lineHeight: 1.12,
          letterSpacing: "-0.025em",
        }}
      >
        {item}
      </p>
    </div>
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
