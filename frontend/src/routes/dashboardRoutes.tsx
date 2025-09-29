import { dashboardStatLoader } from "../dashboard/services/loaders";
import { queryClient } from "../shared";
import { Dashboard } from "./components/dashboardComponents";

export const dashboardRoutes = {
  path: "dashboard",
  element: <Dashboard />,
  loader: dashboardStatLoader(queryClient),
};
