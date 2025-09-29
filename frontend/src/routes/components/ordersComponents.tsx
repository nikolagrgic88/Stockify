import { lazy } from "react";

export const OrdersDashboardPage = lazy(
  () => import("../../orders/pages/OrdersDashboardPage")
);
export const OrdersPage = lazy(() => import("../../orders/pages/OrdersPage"));
export const NewOrderPage = lazy(
  () => import("../../orders/pages/NewOrderPage")
);
export const OrdersActionPage = lazy(
  () => import("../../orders/pages/OrderActionPage")
);
