import { Navigate } from "react-router";
import { useCompanyState, useUserState } from "../../state";
import { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  requireCompany?: boolean;
}

export const ProtectedRoute = ({
  children,
  requireCompany,
}: ProtectedRouteProps) => {
  const user = useUserState((state) => state.isUserAuthenticated);
  const company = useCompanyState((state) => state.isCompanyAuthenticated);

  if (!user || (requireCompany && !company)) {
    return <Navigate to="/auth/company" replace />;
  }

  return children;
};
