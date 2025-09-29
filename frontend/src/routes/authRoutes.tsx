import { Navigate } from "react-router";
import { CompanyFormAction, UserFormAction } from "../auth";
import { companyLoginLoader, userLoginLoader } from "../auth/services/Loaders";
import {
  AuthPage,
  CompanyLoginPage,
  UserLoginPage,
} from "./components/authComponents";

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
