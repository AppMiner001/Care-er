import { usePageContext } from "@/context/PageContext";

const SPINE_ENTRIES = [
  { id: "chain-step-0",    word: "Beteende"   },
  { id: "chain-step-1",    word: "Känsla"     },
  { id: "chain-step-2",    word: "Förtroende" },
  { id: "chain-step-3",    word: "Lojalitet"  },
  { id: "proof",           word: "94%"        },
  { id: "brand-statement", word: "Strategi"   },
] as const;

const TOTAL = SPINE_ENTRIES.length;

export function PageSpine() {
  const { completedSections } = usePageContext();
  const newestId = [...completedSections].at(-1);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 right-0 z-40 w-7 hidden xl:block"
    >
      {/* Hairline axis */}
      <div
        className="absolute top-12 bottom-12 right-3 w-px"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.235 0.05 271 / 0.07) 15%, oklch(0.235 0.05 271 / 0.07) 85%, transparent)",
        }}
      />

      {/* Spine words accumulate at proportional viewport positions */}
      {SPINE_ENTRIES.map(({ id, word }, index) => {
        const isComplete = completedSections.has(id);
        const isNewest = id === newestId;
        const topPct = (index / (TOTAL - 1)) * 80 + 10;

        return (
          <span
            key={id}
            style={{
              position: "absolute",
              right: "1px",
              top: `${topPct}%`,
              writingMode: "vertical-lr",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              fontSize: "0.42rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "oklch(0.235 0.05 271)",
              opacity: isComplete ? (isNewest ? 0.48 : 0.20) : 0,
              transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
