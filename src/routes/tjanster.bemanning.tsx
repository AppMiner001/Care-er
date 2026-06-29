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
      eyebrow="Tjänst 01"
      title="Bemanning som syns i kundmötet — från dag ett."
      lede="Rätt människor när behovet uppstår. Vi bemannar med människor vars beteenden stärker kundmötet redan från första dagen."
      intro="Vi ser bemanning som en del av kundupplevelsen, inte en bemanningsrad i ett schema. Varje person vi placerar är förberedd, briefad och tränad för att skapa kundmöten som stärker ert varumärke – så att fler kunder vill komma tillbaka."
      pillars={[
        { title: "Snabb tillgång", body: "Kvalificerade konsulter på plats när behovet uppstår — utan att tumma på matchningen." },
        { title: "Förberedda från dag ett", body: "Varje konsult kommer briefad om er kultur, tonalitet och servicestandard." },
        { title: "Kvalitet i mötet", body: "Vi följer upp i drift — inte bara i timrapporter — och justerar tillsammans." },
        { title: "Växer med er", body: "Från enstaka pass till långa uppdrag och hela team i tillväxtfaser." },
      ]}
      approach={[
        { step: "Steg 01", title: "Förstå", body: "Vi förstår behovet, kulturen och vad ett bra möte betyder hos er." },
        { step: "Steg 02", title: "Matcha", body: "Vi väljer personer på beteende och rätt erfarenhet — inte bara CV." },
        { step: "Steg 03", title: "Förbereda", body: "Kort och skarp förberedelse som sätter standarden redan innan första passet." },
        { step: "Steg 04", title: "Följa upp", body: "Vi mäter, lyssnar och förbättrar löpande tillsammans med er." },
      ]}
      next={{ label: "Rekrytering", to: "/tjanster/rekrytering" }}
    />
  ),
});
