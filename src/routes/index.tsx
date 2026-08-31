import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { IntroSection } from "@/components/IntroSection";
import { BeliefsSection } from "@/components/BeliefsSection";
import { Services } from "@/components/Services";
import { ModelSection } from "@/components/ModelSection";
import { StatementSection } from "@/components/StatementSection";
import { absoluteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "care-er — Vi bygger kundlojalitet." },
      {
        name: "description",
        content:
          "care-er är ett nordiskt kompetenshus inom bemanning, rekrytering, utbildning och förändring. Vi bygger kompetensen, beteendena och strukturerna som gör service till konkurrensfördel.",
      },
      { property: "og:title", content: "care-er — Vi bygger kundlojalitet." },
      {
        property: "og:description",
        content:
          "Kompetensen, beteendena och strukturerna som gör varje kundmöte till en konkurrensfördel — inte en slump.",
      },
      { property: "og:url", content: absoluteUrl("/") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        {/* 1. Immediate clarity: what they do and why it matters */}
        <Hero />

        {/* 2. What care-er develops and how */}
        <IntroSection />

        {/* 3. The shared beliefs required for a meaningful partnership */}
        <BeliefsSection />

        {/* 4. What they sell — early, outcome-framed */}
        <Services />

        {/* 5. Why it works — the behavioral model */}
        <ModelSection />

        {/* 6. The statement — the moment that makes the site unforgettable */}
        <StatementSection />
      </main>
      <SiteFooter />
    </>
  );
}
