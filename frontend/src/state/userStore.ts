import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserState {
  email: string;
  userName: string;
  auth: string;
  position: string;
  _id: string;
  isUserAuthenticated: boolean;
  setUser: (user: Omit<UserState, "setUser" | "logoutUser">) => void;
  logoutUser: () => void;
}

export const useUserState = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        email: "",
        userName: "",
        auth: "",
        position: "",
        isUserAuthenticated: false,
        _id: "",
        setUser: (u: Partial<UserState>) =>
          set({
            email: u.email || "",
            userName: u.userName || "",
            auth: u.auth || "",
            position: u.position || "",
            _id: u._id || "",
            isUserAuthenticated: true,
          }),
        logoutUser: () =>
          set({
            email: "",
            userName: "",
            auth: "",
            position: "",
            _id: "",
            isUserAuthenticated: false,
          }),
      }),
      {
        name: "user-storage",
        partialize: (state) => ({
          email: state.email,
          userName: state.userName,
          auth: state.auth,
          position: state.position,
          _id: state._id,
          isUserAuthenticated: state.isUserAuthenticated,
        }),
      }
    )
  )
);
