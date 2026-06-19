import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/tjanster/rekrytering")({
  head: () => ({
    meta: [
      { title: "Rekrytering — care-er" },
      {
        name: "description",
        content:
          "Rekrytering av människor som passar kulturen, rollen och framtiden — inte bara CV-matchning.",
      },
      { property: "og:title", content: "Rekrytering — care-er" },
      {
        property: "og:description",
        content:
          "Långsiktig rekrytering byggd på kultur, beteende och varumärkesfit.",
      },
    ],
  }),
  component: () => (
    <ServicePage
      eyebrow="Tjänst 02"
      title="Rekrytering för det som finns kvar om tre år."
      lede="Människor som passar kulturen, rollen och framtiden. Vi rekryterar för långsiktig effekt — inte bara dagens behov."
      intro="Vår rekryteringsprocess är byggd för att hitta personer som inte bara klarar rollen, utan höjer den. Vi väger beteende, värdegrund och utvecklingspotential lika tungt som erfarenhet."
      pillars={[
        { title: "Kulturmatch", body: "Vi förstår er kultur i grunden — och söker personer som faktiskt stärker den." },
        { title: "Beteende före CV", body: "Strukturerade intervjuer som ser hur kandidaten faktiskt agerar i mötet." },
        { title: "Långsiktig fit", body: "Vi rekryterar för det företag ni vill bli, inte bara det ni är idag." },
        { title: "Transparent process", body: "Tydliga steg, tydliga besked — för både kandidat och uppdragsgivare." },
      ]}
      approach={[
        { step: "Steg 01", title: "Discovery", body: "Vi sätter rollprofilen tillsammans — krav, kontext och kultur." },
        { step: "Steg 02", title: "Sourcing", body: "Aktiv search i rätt nätverk, inte bara annonsering." },
        { step: "Steg 03", title: "Bedömning", body: "Strukturerade intervjuer, case och referenstagning." },
        { step: "Steg 04", title: "Landning", body: "Vi följer onboarding och check-ins under första halvåret." },
      ]}
      next={{ label: "Utbildning", to: "/tjanster/utbildning" }}
    />
  ),
});
