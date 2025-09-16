import { actionsRoutes } from "./actionsRoutes";
import { authRoutes } from "./authRoutes";
import { notFound } from "./components/notFound";

import { homeRoutes } from "./homeRoutes";
import { inventoryRoutes } from "./inventoryRoutes";
import { itemsRoutes } from "./itemsRoutes";
import { locationRoutes } from "./locationRoutes";
import { movementRoutes } from "./movementsRoutes";
import { ordersRoutes } from "./ordersRoutes";
import { userRoutes } from "./userRoutes";
export const appRoutes = [
  authRoutes,
  homeRoutes,
  locationRoutes,
  itemsRoutes,
  userRoutes,
  inventoryRoutes,
  movementRoutes,
  ordersRoutes,
  actionsRoutes,
  {
    path: "*",
    loader: notFound,
  },
];
