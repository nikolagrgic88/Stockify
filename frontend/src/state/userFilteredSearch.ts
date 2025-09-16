import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../users/services/api";

interface UserFilteredSearchState {
  userFilteredSearch: User[];
  setUserFilteredSearch: (data: User[]) => void;
}

export const useUserFilteredResultsState = create<UserFilteredSearchState>()(
  persist(
    (set) => ({
      userFilteredSearch: [],
      setUserFilteredSearch: (data: User[]) =>
        set({ userFilteredSearch: data }),
    }),
    {
      name: "userFilter-storage",
    }
  )
);
