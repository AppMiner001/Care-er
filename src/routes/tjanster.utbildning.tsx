import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/tjanster/utbildning")({
  head: () => ({
    meta: [
      { title: "Utbildning — care-er" },
      {
        name: "description",
        content:
          "Utbildning i service, beteende och utveckling som syns direkt i nästa kundkontakt.",
      },
      { property: "og:title", content: "Utbildning — care-er" },
      {
        property: "og:description",
        content:
          "Praktisk träning i service och beteende — för team som möter kunder varje dag.",
      },
    ],
  }),
  component: () => (
    <ServicePage
      eyebrow="Tjänst 03"
      title="Utbildning som syns i nästa kundkontakt."
      lede="Service, beteenden och ledarskap som stärker varje kundmöte. Praktisk träning som förändrar beteenden – inte bara kunskap."
      intro="Vi bygger utbildningar som förändrar hur människor agerar i kundmötet. Korta, intensiva format kombinerat med uppföljning i vardagen gör att nya beteenden blir bestående – och får fler kunder att vilja komma tillbaka."
      pillars={[
        { title: "Skarpa format", body: "Workshops, träning och coachning byggda kring era verkliga kundmöten." },
        { title: "Mätbart resultat", body: "Vi mäter förändrade beteenden – inte bara hur utbildningen upplevdes." },
        { title: "Ledarstöd", body: "Cheferna får verktyg som gör att beteendet lever vidare efter utbildningen." },
        { title: "Bestående effekt", body: "Från enskilda team till hela organisationer — samma kvalitet." },
      ]}
      approach={[
        { step: "Steg 01", title: "Förstå", body: "Vi observerar, lyssnar och kartlägger vad som faktiskt händer i mötet idag." },
        { step: "Steg 02", title: "Träna", body: "Utbildning byggd kring era kunder, ert språk och era situationer." },
        { step: "Steg 03", title: "Förankra", body: "Korta och intensiva träningspass med direkt övning i verkliga kundmöten." },
        { step: "Steg 04", title: "Utveckla", body: "Vi följer upp i vardagen tills de nya beteendena blivit det naturliga sättet att möta kunder." },
      ]}
      next={{ label: "Transformation", to: "/tjanster/change" }}
    />
  ),
});
