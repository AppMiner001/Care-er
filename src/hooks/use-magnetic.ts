import { useEffect, useRef } from "react";

export function useMagnetic<T extends HTMLElement>(strength = 0.32, reach = 120) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < reach) {
        const pull = strength * (1 - dist / reach);
        el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
        el.style.transition = "transform 250ms cubic-bezier(0.16, 1, 0.3, 1)";
      } else {
        el.style.transform = "";
        el.style.transition = "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)";
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength, reach]);

  return ref;
}
