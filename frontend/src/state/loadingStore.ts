import { persist } from "zustand/middleware";
import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}
export const useLoadingState = create<LoadingState>()(
  persist(
    (set) => ({
      isLoading: false,
      setIsLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    { name: "loading-state" }
  )
);
