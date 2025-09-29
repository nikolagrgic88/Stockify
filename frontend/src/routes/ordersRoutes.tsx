import { fetchAllOrdersLoader, newOrderAction } from "../orders";
import { actionCombinedPickingOrderAction } from "../orders/services/actions";
import { queryClient } from "../shared";
import {
  NewOrderPage,
  OrdersActionPage,
  OrdersDashboardPage,
  OrdersPage,
} from "./components/ordersComponents";

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
          element: <OrdersActionPage />,
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
