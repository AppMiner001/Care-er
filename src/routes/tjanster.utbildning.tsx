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
      lede="Service, beteende och utveckling som stärker mötet med kunden. Praktisk träning — inte föreläsningar utan eftermäle."
      intro="Vi bygger utbildningar som faktiskt förändrar hur människor agerar i mötet. Korta, intensiva format kombinerat med uppföljning i drift gör att beteendet sätter sig på riktigt."
      pillars={[
        { title: "Skarpa format", body: "Workshops, träning och coachning byggda kring era verkliga kundmöten." },
        { title: "Mätbart resultat", body: "Vi sätter beteendemål och följer upp — inte bara utvärderar känsla." },
        { title: "Ledarstöd", body: "Cheferna får verktyg att bära utbildningen vidare i vardagen." },
        { title: "Skalbart", body: "Från enskilda team till hela organisationer — samma kvalitet." },
      ]}
      approach={[
        { step: "Steg 01", title: "Nulägesanalys", body: "Vi observerar, lyssnar och kartlägger vad som faktiskt händer i mötet idag." },
        { step: "Steg 02", title: "Design", body: "Utbildning byggd kring era kunder, ert språk och era situationer." },
        { step: "Steg 03", title: "Träning", body: "Korta, intensiva pass som ger direkt övning." },
        { step: "Steg 04", title: "Förankring", body: "Coaching i drift så att beteendet håller över tid." },
      ]}
      next={{ label: "Change", to: "/tjanster/change" }}
    />
  ),
});
