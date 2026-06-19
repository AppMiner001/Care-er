import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/Hero";
import { Proof } from "@/components/Proof";
import { Services } from "@/components/Services";
import { BrandStatement, WhyCareEr } from "@/components/WhySections";
import { ChainSection } from "@/components/ChainSection";
import { Contact } from "@/components/Contact";
import { PageProvider } from "@/context/PageContext";
import { PageSpine } from "@/components/PageSpine";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "care-er — Människor, beteenden och strukturer i kundmötet" },
      {
        name: "description",
        content:
          "care-er är ett nordiskt kompetenshus inom bemanning, rekrytering, utbildning och förändring. Vi bygger det som händer i mötet mellan människa och varumärke.",
      },
      { property: "og:title", content: "care-er" },
      {
        property: "og:description",
        content:
          "Bemanning, rekrytering, utbildning och change — byggt för det ögonblick där ett varumärke förtjänas eller förloras.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageProvider>
      <SiteHeader />
      <PageSpine />
      <main>
        <Hero />
        <ChainSection />
        <WhyCareEr />
        <Services />
        <Proof />
        <BrandStatement />
        <Contact />
      </main>
      <SiteFooter />
    </PageProvider>
  );
}
