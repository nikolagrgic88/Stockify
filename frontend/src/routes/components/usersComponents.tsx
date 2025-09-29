import { lazy } from "react";

export const AddUserPage = lazy(() => import("../../users/pages/AddUserPage"));
export const EditUserPage = lazy(
  () => import("../../users/pages/EditUserPage")
);
export const UsersDashboardPage = lazy(
  () => import("../../users/pages/UsersDashboardPage")
);
export const UserListPage = lazy(
  () => import("../../users/pages/UserListPage")
);
