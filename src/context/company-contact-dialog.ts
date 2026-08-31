import { createContext, useContext } from "react";

export type OpenCompanyContactDialog = (returnFocus?: HTMLElement | null) => void;

export const CompanyContactDialogContext = createContext<OpenCompanyContactDialog | null>(null);

export const loadCompanyContactDialog = () =>
  import("@/components/Contact").then(({ CompanyContactDialog }) => ({
    default: CompanyContactDialog,
  }));

export function preloadCompanyContactDialog() {
  void loadCompanyContactDialog();
}

export function useCompanyContactDialog() {
  const context = useContext(CompanyContactDialogContext);
  if (!context) {
    throw new Error("useCompanyContactDialog must be used within CompanyContactDialogProvider");
  }
  return context;
}
