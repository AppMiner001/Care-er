import { createFileRoute } from "@tanstack/react-router";
import { CareerPage } from "@/components/CareerPage";

export const Route = createFileRoute("/karriar")({
  head: () => ({
    meta: [
      { title: "Karriär — care-er" },
      {
        name: "description",
        content:
          "Ett jobb ska leda någonstans. Bli en del av care-er och hitta roller där kundmötet bygger både människor och företag.",
      },
      { property: "og:title", content: "Karriär — care-er" },
      {
        property: "og:description",
        content:
          "Du är mer än ditt CV. Din care-er börjar med vem du är och fortsätter med vem du vill bli.",
      },
    ],
  }),
  component: CareerPage,
});
