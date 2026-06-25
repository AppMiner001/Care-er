import { useEffect, useRef } from "react";

/**
 * Attaches `data-revealed` to the element when it enters the viewport.
 * Pair with the `[data-reveal]` / `[data-revealed]` CSS rules in styles.css.
 */
export function useReveal<T extends Element = HTMLElement>(
  threshold = 0.12,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-revealed", "");
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return ref;
}
