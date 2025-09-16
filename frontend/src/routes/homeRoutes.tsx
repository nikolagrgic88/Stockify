import { RouteObject } from "react-router";
import { HomePage } from "../dashboard";
import { itemsRoutes } from "./itemsRoutes";
import { locationRoutes } from "./locationRoutes";
import { userRoutes } from "./userRoutes";
import { inventoryRoutes } from "./inventoryRoutes";
import { movementRoutes } from "./movementsRoutes";
import ErrorPage from "../shared/pages/ErrorPage";
import { ordersRoutes } from "./ordersRoutes";
import { actionsRoutes } from "./actionsRoutes";

import { dashboardRoutes } from "./dashboardRoutes";

import { requireAuthLoader } from "./services/loaders";

export const homeRoutes: RouteObject = {
  path: "home",
  element: <HomePage />,
  errorElement: <ErrorPage />,
  loader: requireAuthLoader,
  children: [
    dashboardRoutes,
    itemsRoutes,
    locationRoutes,
    inventoryRoutes,
    movementRoutes,
    userRoutes,
    ordersRoutes,
    actionsRoutes,
  ],
};
