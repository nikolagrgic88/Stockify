import { locationLoader } from "../locations/services/loaders";
import { moveItemAction, getAllMovementsLoader } from "../movements";

import { queryClient } from "../shared";
import {
  MovementHistoryPage,
  MovementsDashboardPage,
  NewMovementPage,
} from "./components/movementsComponents";

export const movementRoutes = {
  path: "movements",
  element: <MovementsDashboardPage />,
  children: [
    {
      path: "new-movement",
      element: <NewMovementPage />,
      loader: locationLoader(queryClient),
      action: moveItemAction(queryClient),
    },
    {
      path: "movement-history",
      element: <MovementHistoryPage />,
      loader: getAllMovementsLoader(queryClient),
    },
  ],
};
