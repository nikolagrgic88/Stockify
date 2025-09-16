import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompanyState {
  dbURI: string;
  companyName: string;
  isCompanyAuthenticated: boolean;
  setCompany: (company: Partial<CompanyState>) => void;
  logoutCompany: () => void;
}

export const useCompanyState = create<CompanyState>()(
  persist(
    (set) => ({
      dbURI: "",
      companyName: "",
      isCompanyAuthenticated: false,
      setCompany: (company) =>
        set(() => ({ ...company, isCompanyAuthenticated: true })),
      logoutCompany: () =>
        set({ isCompanyAuthenticated: false, dbURI: "", companyName: "" }),
    }),
    {
      name: "company-storage",
    }
  )
);
