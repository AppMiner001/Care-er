import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/tjanster/change")({
  head: () => ({
    meta: [
      { title: "Transformation — care-er" },
      {
        name: "description",
        content:
          "Förändring, struktur och utveckling som fungerar i vardagen — inte bara i powerpoint.",
      },
      { property: "og:title", content: "Change — care-er" },
      {
        property: "og:description",
        content:
          "Vi bygger förändring som håller efter att projektet är slut.",
      },
    ],
  }),
  component: () => (
    <ServicePage
      eyebrow="Tjänst 04"
      title="Förändring som lever vidare i varje kundmöte."
      lede="Struktur, beteende och utveckling som fungerar i vardagen. Vi designar förändring tillsammans med de som ska leva i den."
      intro="Vi arbetar med förändring där den gör verklig skillnad: i vardagen, i ledarskapet och i varje kundmöte. Vi bygger arbetssätt och strukturer som lever vidare långt efter projektets slut – och som får fler kunder att vilja komma tillbaka."
      pillars={[
        { title: "Strategi till handling", body: "Vi översätter strategin till konkreta beteenden och rutiner." },
        { title: "Ledarskap som håller", body: "Cheferna är bärarna — vi rustar dem för att driva förändringen själva." },
        { title: "Strukturer som håller", body: "Processer, mötesformer och uppföljning som lever vidare utan oss." },
        { title: "Mätbar effekt", body: "Vi följer rörelsen i siffror och beteenden — inte bara i workshoppar." },
      ]}
      approach={[
        { step: "Steg 01", title: "Lyssna", body: "Vi börjar i verkligheten — hos kunder, medarbetare och ledning." },
        { step: "Steg 02", title: "Forma", body: "Tydlig riktning, prioriterade rörelser och en plan som går att följa." },
        { step: "Steg 03", title: "Bygga", body: "Vi sjösätter tillsammans, lär längs vägen och justerar löpande." },
        { step: "Steg 04", title: "Släppa", body: "Vi lämnar över först när förändringen fungerar utan oss." },
      ]}
      next={{ label: "Bemanning", to: "/tjanster/bemanning" }}
    />
  ),
});
