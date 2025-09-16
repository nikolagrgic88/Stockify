import {
  // ActionDashboardPage,
  ActionedOrdersPage,
  ActionMultiOrdersPage,
  ActionsDashboardPage,
  ActionSingleOrdersPage,
} from "../actions";
import PickingListPage from "../actions/pages/PickingListPage";
import {
  createMultiItemOrderListAction,
  createSingleItemOrderListAction,
} from "../actions/services/actions";
import { queryClient } from "../shared";

export const actionsRoutes = {
  path: "actions/Orders",
  element: <ActionsDashboardPage />,
  children: [
    {
      path: "single",
      element: <ActionSingleOrdersPage />,
      action: createSingleItemOrderListAction(queryClient),
    },
    {
      path: "multi",
      element: <ActionMultiOrdersPage />,
      action: createMultiItemOrderListAction(queryClient),
    },
    { path: "history", element: <ActionedOrdersPage /> },
    {
      path: ":id",
      element: <PickingListPage />,
    },
  ],
};
