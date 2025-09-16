import { deleteInvetoryInLocationAction } from "../items/services/actions";
import { DeletePage, queryClient } from "../shared";
import { DELETE_ITEM } from "../shared/constants/dialogText";

export const inventoryRoutes = {
  path: "inventory/:locationId/delete-product/:itemId",
  element: <DeletePage dialogText={DELETE_ITEM} />,
  action: deleteInvetoryInLocationAction(queryClient),
};
