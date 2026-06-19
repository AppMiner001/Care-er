import { useEffect, useRef, useState, Fragment } from "react";
import { usePageContext } from "@/context/PageContext";

const steps = [
  {
    word: "Beteende",
    // Concrete scene, not a definition. Grounds the abstract word immediately.
    sub: "En sekund. En röst. En dörr som öppnas rätt.",
    // Closes the step by making causality explicit — this is where it starts.
    coda: "Det börjar alltid här.",
    next: "Känsla",
  },
  {
    word: "Känsla",
    // A truth the visitor already knows from experience. Instant recognition.
    sub: "De minns inte vad du sa. De minns hur de kände sig.",
    coda: null,
    next: "Förtroende",
  },
  {
    word: "Förtroende",
    // Two short sentences that create stakes. Can be won and lost.
    sub: "Byggs i ett möte. Kan rivas i nästa.",
    coda: null,
    next: "Lojalitet",
  },
  {
    word: "Lojalitet",
    // The payoff — concrete, commercial, emotionally specific.
    sub: "De väljer dig igen. Utan att jämföra.",
    // Closes the loop. Makes the visitor understand the whole section in one line.
    coda: "Det är vad ett kundmöte kan bli.",
    next: null,
  },
];

export function ChainSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [activationCounts, setActivationCounts] = useState<number[]>(() => steps.map(() => 0));
  const { markComplete } = usePageContext();

  useEffect(() => {
    setActivationCounts(prev => {
      const next = [...prev];
      next[active] = (next[active] ?? 0) + 1;
      return next;
    });
  }, [active]);

  useEffect(() => {
    const onScroll = () => {
      const el = outerRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      const p = Math.max(0, Math.min(1, -top / scrollable));
      const activeStep = Math.min(steps.length - 1, Math.floor(p * steps.length));
      const segmentSize = 1 / steps.length;
      const segmentStart = activeStep * segmentSize;
      const sp = Math.min(1, Math.max(0, (p - segmentStart) / segmentSize));
      setProgress(p);
      setActive(activeStep);
      setStepProgress(sp);

      // Argument accumulates as the visitor moves through the chain
      if (p > 0.01) markComplete("hero");
      if (activeStep >= 1) markComplete("chain-step-0");
      if (activeStep >= 2) markComplete("chain-step-1");
      if (activeStep >= 3) markComplete("chain-step-2");
      if (p >= 0.90) markComplete("chain-step-3");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [markComplete]);

  return (
    <div ref={outerRef} style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[var(--color-ink)]">

        {/* Scroll progress line */}
        <div className="absolute top-0 inset-x-0 h-px bg-[var(--color-background)]/10">
          <div
            className="h-full bg-[var(--color-background)]/30"
            style={{ width: `${progress * 100}%`, transition: "width 80ms linear" }}
          />
        </div>

        {/* Permanent thesis — anchors the section before the visitor reads a word */}
        <div className="absolute top-8 inset-x-0 pointer-events-none">
          <div className="container-care flex justify-end">
            <p className="eyebrow text-[var(--color-background)]/28">
              Service skapar lojalitet
            </p>
          </div>
        </div>

        {/* One panel per step */}
        {steps.map((step, i) => {
          const state =
            i === active ? "current" : i < active ? "past" : "future";
          const stepsBack = active - i;

          const ghostOpacity =
            state === "current" ? 1
            : state === "past" && stepsBack === 1
            ? Math.max(0.06, 0.55 - stepProgress * 0.52)
            : state === "past"
            ? Math.max(0.025, 0.085 - (stepsBack - 1) * 0.025)
            : 0;

          const ghostTransform =
            state === "current" ? "translateY(0) scale(1)"
            : state === "past" && stepsBack === 1
            ? `translateY(-${(stepProgress * 6).toFixed(1)}vh) scale(${(1 - stepProgress * 0.07).toFixed(2)})`
            : state === "past"
            ? `translateY(-${stepsBack * 6}vh) scale(${(1 - stepsBack * 0.07).toFixed(2)})`
            : "translateY(5vh) scale(1)";

          return (
            <div
              key={step.word}
              aria-hidden={state !== "current"}
              className="absolute inset-0 flex flex-col justify-center"
              style={{
                opacity: ghostOpacity,
                transform: ghostTransform,
                transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                pointerEvents: state === "current" ? "auto" : "none",
              }}
            >
              <div className="container-care">

                {/* Step index */}
                <p className="eyebrow text-[var(--color-background)]/25 mb-8 md:mb-12">
                  0{i + 1}&thinsp;/&thinsp;0{steps.length}
                </p>

                {/* The word — coalesces from wide tracking to tight on each activation */}
                <h2
                  key={`${i}-${activationCounts[i]}`}
                  className="font-semibold leading-[0.9] text-[var(--color-background)]"
                  style={{
                    fontSize: "clamp(3rem, 12vw, 12rem)",
                    letterSpacing: "-0.04em",
                    animation: state === "current"
                      ? "word-settle 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards"
                      : "none",
                  }}
                >
                  {step.word}
                </h2>

                {/* One strong line per step */}
                <p className="mt-8 md:mt-12 text-lg md:text-2xl text-[var(--color-background)]/60 max-w-lg leading-snug">
                  {step.sub}
                </p>

                {/* Coda — only on steps where it adds something essential */}
                {step.coda && (
                  <p className="mt-3 text-sm md:text-base text-[var(--color-background)]/30 max-w-lg">
                    {step.coda}
                  </p>
                )}

                {/* Causal connector — "→" not "Nästa", direction not navigation */}
                {step.next && (
                  <p className="mt-10 md:mt-14 text-sm text-[var(--color-background)]/22">
                    → {step.next}
                  </p>
                )}

              </div>
            </div>
          );
        })}

        {/* Chain navigator — bottom */}
        <div className="absolute bottom-10 inset-x-0">
          <div className="container-care">
            <div className="flex items-center gap-2 md:gap-3">
              {steps.map((step, i) => (
                <Fragment key={step.word}>
                  <span
                    className={`text-xs md:text-sm transition-all duration-500 ${
                      i === active
                        ? "text-[var(--color-background)] font-semibold"
                        : i < active
                        ? "text-[var(--color-background)]/40"
                        : "text-[var(--color-background)]/[0.18]"
                    }`}
                  >
                    {step.word}
                  </span>
                  {i < steps.length - 1 && (
                    <span
                      className={`text-xs transition-colors duration-500 ${
                        i < active
                          ? "text-[var(--color-background)]/25"
                          : "text-[var(--color-background)]/[0.12]"
                      }`}
                    >
                      →
                    </span>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
