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
      {/* Orbs in their own overflow-hidden shell so they never clip text */}
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

      <div className="container-care relative z-10 py-32">

        {/* Line 1 — the anxiety; wipes in from left */}
        <p
          className="text-[var(--color-background)]/45 leading-[0.92] tracking-[-0.04em] text-balance"
          style={{
            fontSize: "clamp(3.25rem, 9.5vw, 8.5rem)",
            fontWeight: 300,
            clipPath: visible ? "inset(0 -16px -24px 0)" : "inset(0 100% 0 0)",
            transition: visible
              ? "clip-path 1050ms cubic-bezier(0.16, 1, 0.3, 1) 150ms"
              : "none",
          }}
        >
          I möten ni aldrig ser
        </p>

        {/* Line 2 — the consequence; wipes in 450ms after line 1 */}
        <p
          className="text-[var(--color-background)] leading-[0.92] tracking-[-0.04em]"
          style={{
            fontSize: "clamp(3.25rem, 9.5vw, 8.5rem)",
            fontWeight: 700,
            clipPath: visible ? "inset(0 -16px -24px 0)" : "inset(0 100% 0 0)",
            transition: visible
              ? "clip-path 1050ms cubic-bezier(0.16, 1, 0.3, 1) 600ms"
              : "none",
          }}
        >
          avgörs allt.
        </p>

        {/* Brand signature — fades in last */}
        <p
          className="mt-14 eyebrow text-[var(--color-background)]/18"
          style={{
            opacity: visible ? 1 : 0,
            transition: visible ? "opacity 700ms ease 1350ms" : "none",
          }}
        >
          care-er
        </p>

      </div>
    </section>
  );
}
