import { RouteObject } from "react-router";
import {
  createNewItem,
  deleteItemAction,
  ItemDetailsPage,
  itemDetailsUpdateAction,
  ItemsDashboardPage,
  itemsLoader,
  NewItemPage,
} from "../items";
import FindItemsPage from "../items/pages/FindItemsPage ";
import { DeletePage, queryClient } from "../shared";
import { DELETE_ITEM } from "../shared/constants/dialogText";

export const itemsRoutes: RouteObject = {
  path: "items",
  element: <ItemsDashboardPage />,
  children: [
    {
      path: "find-item",
      element: <FindItemsPage />,
      loader: async () => itemsLoader(queryClient),
    },
    {
      path: ":itemId/details",
      element: <ItemDetailsPage />,
      action: itemDetailsUpdateAction(queryClient),
    },
    {
      path: "new-item",
      element: <NewItemPage />,
      action: createNewItem(queryClient),
    },
    {
      path: ":itemId/delete",
      element: <DeletePage dialogText={DELETE_ITEM} />,
      action: deleteItemAction(queryClient),
    },
  ],
};
