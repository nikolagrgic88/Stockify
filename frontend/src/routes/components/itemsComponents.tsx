import { lazy } from "react";

export const ItemsDashboardPage = lazy(
  () => import("../../items/pages/ItemsDashboardPage")
);
export const FindItemsPage = lazy(
  () => import("../../items/pages/FindItemsPage ")
);
export const ItemDetailsPage = lazy(
  () => import("../../items/pages/ItemDetailsPage")
);
export const NewItemPage = lazy(() => import("../../items/pages/NewItemPage"));
