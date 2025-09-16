import { Navigate } from "react-router";
import {
  AuthPage,
  CompanyFormAction,
  CompanyLoginPage,
  UserFormAction,
  UserLoginPage,
} from "../auth";
import { companyLoginLoader, userLoginLoader } from "../auth/services/Loaders";

export const authRoutes = {
  path: "auth",
  element: <AuthPage />,

  children: [
    { index: true, element: <Navigate to="company" /> },
    {
      path: "company",
      element: <CompanyLoginPage />,
      action: CompanyFormAction,
      loader: companyLoginLoader,
    },
    {
      path: "user",
      element: <UserLoginPage />,
      action: UserFormAction,
      loader: userLoginLoader,
    },
  ],
};
