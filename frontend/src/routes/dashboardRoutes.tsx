import { Dashboard } from "../dashboard";
import { dashboardStatLoader } from "../dashboard/services/loaders";
import { queryClient } from "../shared";

export const dashboardRoutes = {
  path: "dashboard",
  element: <Dashboard />,
  loader: dashboardStatLoader(queryClient),
};
