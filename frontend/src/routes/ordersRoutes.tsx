import {
  fetchAllOrdersLoader,
  newOrderAction,
  NewOrderPage,
  OrderActionPage,
  OrdersDashboardPage,
  OrdersPage,
} from "../orders";
import { actionCombinedPickingOrderAction } from "../orders/services/actions";
import { queryClient } from "../shared";

export const ordersRoutes = {
  path: "orders",
  element: <OrdersDashboardPage />,
  children: [
    {
      path: "all-orders",
      element: <OrdersPage />,
      loader: fetchAllOrdersLoader(queryClient),
      children: [
        {
          path: "new-action",
          element: <OrderActionPage />,
          action: actionCombinedPickingOrderAction(queryClient),
        },
      ],
    },
    {
      path: "new-order",
      element: <NewOrderPage />,
      action: newOrderAction(queryClient),
    },
  ],
};
