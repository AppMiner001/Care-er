import { useState, useEffect, useRef } from "react";

export function StatementSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center"
      style={{ background: "oklch(0.075 0.030 271)" }}
    >
      {/* Orbs */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 75% 55%, oklch(0.18 0.065 271 / 0.65) 0%, transparent 70%)",
            animation: "ambient-breathe 9s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 10% 85%, oklch(0.14 0.04 271 / 0.50) 0%, transparent 65%)",
            animation: "ambient-breathe 13s ease-in-out infinite reverse",
          }}
        />
      </div>

      <div className="container-care relative z-10 py-32 text-center">

        {/* Line 1 — wipes from left */}
        <p
          className="text-[var(--color-background)]/42 leading-[0.91] tracking-[-0.042em]"
          style={{
            fontSize: "clamp(3.25rem, 9.5vw, 8.5rem)",
            fontWeight: 300,
            clipPath: visible ? "inset(0 -16px -24px 0)" : "inset(0 100% 0 0)",
            transition: visible
              ? "clip-path 1100ms cubic-bezier(0.16, 1, 0.3, 1) 150ms"
              : "none",
          }}
        >
          I möten ni aldrig ser
        </p>

        {/* Line 2 — wipes 480ms after line 1 */}
        <p
          className="text-[var(--color-background)] leading-[0.91] tracking-[-0.042em]"
          style={{
            fontSize: "clamp(3.25rem, 9.5vw, 8.5rem)",
            fontWeight: 700,
            clipPath: visible ? "inset(0 -16px -24px 0)" : "inset(0 100% 0 0)",
            transition: visible
              ? "clip-path 1100ms cubic-bezier(0.16, 1, 0.3, 1) 630ms"
              : "none",
          }}
        >
          avgörs allt.
        </p>

        {/* Brand signature */}
        <p
          className="mt-16 eyebrow text-[var(--color-background)]/16"
          style={{
            opacity: visible ? 1 : 0,
            transition: visible ? "opacity 800ms ease 1400ms" : "none",
            letterSpacing: "0.28em",
          }}
        >
          care-er
        </p>

      </div>
    </section>
  );
}
