import { useEffect, useRef } from "react";

export function useReveal<T extends Element = HTMLElement>(
  threshold = 0.05,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reveal immediately if already in viewport (e.g. top-of-page elements)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.setAttribute("data-revealed", "");
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-revealed", "");
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px 60px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return ref;
}
