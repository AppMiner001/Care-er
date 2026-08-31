import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import {
  CompanyContactDialogContext,
  loadCompanyContactDialog,
  preloadCompanyContactDialog,
} from "@/context/company-contact-dialog";

const LazyCompanyContactDialog = lazy(loadCompanyContactDialog);

export function CompanyContactDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const openCompanyContactDialog = useCallback((returnFocus?: HTMLElement | null) => {
    preloadCompanyContactDialog();
    returnFocusRef.current =
      returnFocus ??
      (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    setOpen(true);
  }, []);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) return;

    const returnFocus = returnFocusRef.current;
    returnFocusRef.current = null;
    window.requestAnimationFrame(() => {
      if (returnFocus?.isConnected) returnFocus.focus();
    });
  }, []);

  useEffect(() => {
    const openFromLegacyHash = () => {
      if (window.location.hash !== "#kontakt") return;

      openCompanyContactDialog();
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    };

    openFromLegacyHash();
    window.addEventListener("hashchange", openFromLegacyHash);
    return () => window.removeEventListener("hashchange", openFromLegacyHash);
  }, [openCompanyContactDialog]);

  return (
    <CompanyContactDialogContext.Provider value={openCompanyContactDialog}>
      {children}
      {open ? (
        <Suspense fallback={null}>
          <LazyCompanyContactDialog open={open} onOpenChange={handleOpenChange} />
        </Suspense>
      ) : null}
    </CompanyContactDialogContext.Provider>
  );
}
