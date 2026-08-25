import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { BeliefsSection } from "@/components/BeliefsSection";
import { Services } from "@/components/Services";
import { ModelSection } from "@/components/ModelSection";
import { StatementSection } from "@/components/StatementSection";
import { Contact } from "@/components/Contact";
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

        {/* 2. The shared beliefs required for a meaningful partnership */}
        <BeliefsSection />

        {/* 3. What they sell — early, outcome-framed */}
        <Services />

        {/* 4. Why it works — the behavioral model */}
        <ModelSection />

        {/* 5. The statement — the moment that makes the site unforgettable */}
        <StatementSection />

        {/* 6. Invitation */}
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
