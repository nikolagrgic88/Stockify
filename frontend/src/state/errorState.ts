import { create } from "zustand";

type ErrorState = {
  message: string | null;
  type: "error" | "warning" | "info" | "success";
  statusCode: number | null;
  error: string;
  setError: (
    message: string,
    type: ErrorState["type"],
    statusCode: number,
    error: string
  ) => void;
  clearError: () => void;
};

export const useErrorState = create<ErrorState>((set) => ({
  message: null,
  type: "info",
  statusCode: null,
  error: "",
  setError: (message, type = "error", statusCode, error) =>
    set({ message, type, statusCode, error }),
  clearError: () => set({ message: null }),
}));
