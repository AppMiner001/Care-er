import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/tjanster/bemanning")({
  head: () => ({
    meta: [
      { title: "Bemanning — care-er" },
      {
        name: "description",
        content:
          "Rätt människor när behov uppstår. Kompetens som fungerar från dag ett — bemanning byggd för kundmötet.",
      },
      { property: "og:title", content: "Bemanning — care-er" },
      {
        property: "og:description",
        content:
          "Bemanning från care-er — människor som lyfter varumärket från första passet.",
      },
    ],
  }),
  component: () => (
    <ServicePage
      eyebrow="Tjänst 02"
      title="Bemanning som syns i kundmötet — från dag ett."
      lede="Rätt människor när behovet uppstår. Vi bemannar med människor vars beteenden stärker kundmötet redan från första dagen."
      intro="Vi förstår verksamheten, kulturen och vad ni behöver innan vi börjar leta."
      pillars={[
        { title: "Rätt från början", body: "Vi förstår verksamheten, kulturen och behovet innan vi väljer vem som ska representera er." },
        { title: "Redo från dag ett", body: "Varje konsult kommer briefad om er kultur, tonalitet och servicestandard." },
        { title: "Kvalitet i varje möte", body: "Vi följer upp där det händer — i mötet med kunden — och justerar tillsammans." },
        { title: "Bättre över tid", body: "Vi följer upp, lär och förbättrar — så att varje uppdrag gör nästa ännu bättre." },
      ]}
      approach={[
        { step: "Steg 01", title: "Förstå", body: "Vi förstår behovet, kulturen och vad ett bra möte betyder hos er." },
        { step: "Steg 02", title: "Matcha", body: "Vi väljer personer på beteende och rätt erfarenhet — inte bara CV." },
        { step: "Steg 03", title: "Förbereda", body: "Kort och skarp förberedelse som sätter standarden redan innan första passet." },
        { step: "Steg 04", title: "Följa upp", body: "Vi mäter, lyssnar och förbättrar löpande tillsammans med er." },
      ]}
      next={{ label: "Utbildning", to: "/tjanster/utbildning" }}
    />
  ),
});
