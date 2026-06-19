import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// hero + 4 chain steps + why-care-er + services + proof + brand-statement
const TOTAL_SECTIONS = 9;

interface PageContextValue {
  completedSections: Set<string>;
  markComplete: (id: string) => void;
  depth: number;
}

const PageContext = createContext<PageContextValue>({
  completedSections: new Set(),
  markComplete: () => {},
  depth: 0,
});

export function PageProvider({ children }: { children: ReactNode }) {
  const [completedSections, setCompleted] = useState<Set<string>>(new Set());

  const markComplete = useCallback((id: string) => {
    setCompleted(prev => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const depth = Math.min(1, completedSections.size / TOTAL_SECTIONS);

  useEffect(() => {
    document.documentElement.style.setProperty("--page-depth", depth.toFixed(4));
  }, [depth]);

  useEffect(() => {
    const chainComplete =
      completedSections.has("chain-step-0") &&
      completedSections.has("chain-step-1") &&
      completedSections.has("chain-step-2") &&
      completedSections.has("chain-step-3");
    document.documentElement.style.setProperty("--chain-depth", chainComplete ? "1" : "0");
  }, [completedSections]);

  return (
    <PageContext.Provider value={{ completedSections, markComplete, depth }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}

export function useComplete(sectionId: string, threshold = 0.8) {
  const { markComplete } = usePageContext();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) markComplete(sectionId); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [sectionId, markComplete, threshold]);

  return ref;
}
