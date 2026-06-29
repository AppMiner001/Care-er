import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { ModelSection } from "@/components/ModelSection";
import { StatementSection } from "@/components/StatementSection";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "care-er — Service är strategi" },
      {
        name: "description",
        content:
          "care-er är ett nordiskt kompetenshus inom bemanning, rekrytering, utbildning och förändring. Vi bygger kompetensen, beteendena och strukturerna som gör service till konkurrensfördel.",
      },
      { property: "og:title", content: "care-er — Service är strategi" },
      {
        property: "og:description",
        content:
          "Kompetensen, beteendena och strukturerna som gör varje kundmöte till en konkurrensfördel — inte en slump.",
      },
    ],
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

        {/* 2. What they sell — early, outcome-framed */}
        <Services />

        {/* Transition ribbon — philosophy in motion */}
        <MarqueeStrip />

        {/* 3. Why it works — the behavioral model */}
        <ModelSection />

        {/* 4. The statement — the moment that makes the site unforgettable */}
        <StatementSection />

        {/* 5. Invitation */}
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
