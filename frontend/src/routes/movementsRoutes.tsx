import { locationLoader } from "../locations/services/loaders";
import {
  MovementsDashboardPage,
  MovementHistoryPage,
  NewMovementPage,
  moveItemAction,
  getAllMovementsLoader,
} from "../movements";

import { queryClient } from "../shared";

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
