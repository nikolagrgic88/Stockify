import { lazy } from "react";

export const ActionedOrdersPage = lazy(
  () => import("../../actions/pages/ActionedOrdersPage")
);
export const ActionMultiOrdersPage = lazy(
  () => import("../../actions/pages/ActionMultiOrdersPage")
);
export const ActionsDashboardPage = lazy(
  () => import("../../actions/pages/ActionsDashboardPage")
);
export const ActionSingleOrdersPage = lazy(
  () => import("../../actions/pages/ActionSingleOrdersPage")
);
export const PickingListPage = lazy(
  () => import("../../actions/pages/PickingListPage")
);
