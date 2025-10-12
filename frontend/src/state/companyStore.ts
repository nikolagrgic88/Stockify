import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompanyState {
  token: string;
  dbURI: string;
  name: string;
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
      name: "",
      isCompanyAuthenticated: false,
      setCompany: (company) =>
        set(() => ({
          name: company.name,
          token: company.token,
          dbURI: company.dbURI,
          isCompanyAuthenticated: true,
        })),
      logoutCompany: () =>
        set({
          isCompanyAuthenticated: false,
          dbURI: "",
          name: "",
          token: "",
        }),
      clearToken: () => set({ token: "" }),
    }),
    {
      name: "company-storage",
    }
  )
);
