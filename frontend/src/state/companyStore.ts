import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompanyState {
  token: string;
  dbURI: string;
  companyName: string;
  companyId: string;
  isCompanyAuthenticated: boolean;
  setCompany: (company: Partial<CompanyState>) => void;
  logoutCompany: () => void;
  clearToken: () => void;
}

export const useCompanyState = create<CompanyState>()(
  persist(
    (set) => ({
      token: "",
      dbURI: "",
      companyName: "",
      isCompanyAuthenticated: false,
      companyId: "",
      setCompany: (company) =>
        set(() => ({
          companyName: company.companyName,
          token: company.token,
          dbURI: company.dbURI,
          companyId: company.companyId,
          isCompanyAuthenticated: true,
        })),
      logoutCompany: () =>
        set({ isCompanyAuthenticated: false, dbURI: "", companyName: "" }),
      clearToken: () => set({ token: "" }),
    }),
    {
      name: "company-storage",
    }
  )
);
