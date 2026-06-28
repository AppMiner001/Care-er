const PHRASE =
  "Service är strategi · Beteende skapar känsla · Känsla skapar förtroende · Förtroende skapar lojalitet · Lojalitet bygger varumärket · ";

const HIGHLIGHTED = new Set([
  "strategi",
  "känsla",
  "förtroende",
  "lojalitet",
  "varumärket",
]);

function Phrase() {
  const words = PHRASE.split(/(\s+)/);
  return (
    <span className="whitespace-nowrap">
      {words.map((token, i) => {
        const clean = token.toLowerCase().replace(/[· ]/g, "").trim();
        const bright = HIGHLIGHTED.has(clean);
        return (
          <span
            key={i}
            style={{
              color: bright
                ? "oklch(0.13 0.04 271 / 0.72)"
                : "oklch(0.13 0.04 271 / 0.18)",
              transition: "color 300ms ease",
            }}
          >
            {token}
          </span>
        );
      })}
    </span>
  );
}

export function MarqueeStrip() {
  return (
    <div
      className="marquee-wrap overflow-hidden border-y border-[var(--color-ink)]/[0.06]"
      aria-hidden
    >
      <div
        className="marquee-track py-5 select-none"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)",
          letterSpacing: "0.06em",
          fontWeight: 500,
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <Phrase key={i} />
        ))}
      </div>
    </div>
  );
}
