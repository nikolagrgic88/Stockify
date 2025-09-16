import { create } from "zustand";

import { persist } from "zustand/middleware";
import { User } from "../users/services/api";

interface SelectedUserProps {
  selectedUser: User | null;
  setSeletedUser: (user: User | null) => void;
}

export const useSelectedUserStore = create<SelectedUserProps>()(
  persist(
    (set) => ({
      selectedUser: null,
      setSeletedUser: (user) => set({ selectedUser: user }),
    }),
    { name: "selecteUser-storage" }
  )
);
