import { lazy } from "react";

export const AuthPage = lazy(() => import("../../auth/pages/AuthPage"));
export const CompanyLoginPage = lazy(
  () => import("../../auth/pages/CompanyLoginPage")
);
export const UserLoginPage = lazy(
  () => import("../../auth/pages/UserLoginPage")
);
