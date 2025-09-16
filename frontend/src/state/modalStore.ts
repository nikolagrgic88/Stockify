import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModalState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const useModalState = create<ModalState>()(
  persist(
    (set) => ({
      isOpen: false,
      setIsOpen: (open: boolean) => set({ isOpen: open }),
    }),
    {
      name: "modal-storage",
    }
  )
);
