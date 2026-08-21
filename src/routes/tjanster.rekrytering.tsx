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
        content: "Långsiktig rekrytering byggd på kultur, beteende och varumärkesfit.",
      },
    ],
  }),
  component: () => (
    <ServicePage
      eyebrow="Tjänst 01"
      title="Rekrytering för det som finns kvar om tre år."
      lede="En rekrytering handlar om mer än vem som klarar jobbet idag. Den handlar om vilken kultur, vilka beteenden och vilka kundmöten ni vill bygga för imorgon."
      intro="Vi börjar inte med CV:t. Vi börjar i verksamheten. Vilka människor behöver ni för att stärka kulturen, kundmötet och det företag ni vill vara om tre år? Först därefter börjar vi leta."
      insight={{
        title: "Kundmötesbaserad rekrytering™",
        lede: "Vi utgår från kompetensbaserad rekrytering — men börjar ett steg tidigare: i kundmötet.",
        paragraphs: [
          "Först definierar vi vilket kundmöte ni vill skapa och vilka beteenden det kräver. Därefter vilka kompetenser som behövs och hur de ska bedömas.",
          "Varje kandidat bedöms mot samma kravprofil — inte mot de andra kandidaterna.",
        ],
        sequence: ["Kundmötet", "Beteenden", "Kompetenser", "Kandidat"],
      }}
      pillars={[
        {
          title: "Kulturmatch",
          body: "Vi söker inte bara någon som passar in — utan någon som stärker kulturen och bidrar till vart ni är på väg.",
        },
        {
          title: "Beteende före CV",
          body: "Vi bedömer hur kandidaten faktiskt agerar — inte bara hur erfarenheten ser ut på papper.",
        },
        {
          title: "Rätt även om tre år.",
          body: "Vi rekryterar för det företag ni vill bli — inte bara för rollen ni behöver fylla idag.",
        },
        {
          title: "Trygga beslut",
          body: "Ni vet vad vi ser, hur vi bedömer och varför vi rekommenderar — hela vägen fram till beslut.",
        },
      ]}
      approach={[
        {
          step: "Steg 01",
          title: "Förstå",
          body: "Vi börjar i verksamheten — med rollen, kulturen och det ni vill åstadkomma.",
        },
        {
          step: "Steg 02",
          title: "Hitta",
          body: "Vi söker där rätt människor finns — inte bara där kandidater råkar söka jobb.",
        },
        {
          step: "Steg 03",
          title: "Välja",
          body: "Vi prövar det som faktiskt avgör om kandidaten kommer lyckas — beteenden, förmåga och potential.",
        },
        {
          step: "Steg 04",
          title: "Lyckas",
          body: "Vi utvecklar medarbetaren och verksamheten genom en trygg onboarding och täta check-ins under det första halvåret.",
        },
      ]}
      next={{ label: "Bemanning", to: "/tjanster/bemanning" }}
    />
  ),
});
