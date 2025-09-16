import { create } from "zustand";
import { Location } from "../locations";
import { persist } from "zustand/middleware";

interface SelectedLocationProps {
  selectedLocation: Location | null;
  setSeletedLocation: (location: Location | null) => void;
}

export const useSelectedLocationStore = create<SelectedLocationProps>()(
  persist(
    (set) => ({
      selectedLocation: null,
      setSeletedLocation: (location) => set({ selectedLocation: location }),
    }),
    { name: "selectedLocation-storage" }
  )
);
