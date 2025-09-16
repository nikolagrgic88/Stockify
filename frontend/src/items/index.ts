import { useFetchedItems } from "./hooks/useFetchedItems";
import {
  itemDetailsUpdateAction,
  createNewItem,
  deleteItemAction,
} from "./services/actions";
import { itemsLoader } from "./services/loaders";
import {
  Item,
  createItem,
  updateItem,
  fetchItems,
  deleteItemInLocation,
} from "./services/api";
import ItemsTable from "./components/ItemsTable";
import ItemsDashboardPage from "./pages/ItemsDashboardPage";
import FindItemsPage from "./pages/FindItemsPage ";
import ItemsContainer from "./components/ItemsContainer";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import NewItemPage from "./pages/NewItemPage";

export {
  ItemsDashboardPage,
  FindItemsPage,
  NewItemPage,
  ItemsContainer,
  ItemsTable,
  fetchItems,
  itemsLoader,
  ItemDetailsPage,
  itemDetailsUpdateAction,
  updateItem,
  createNewItem,
  createItem,
  deleteItemAction,
  deleteItemInLocation,
  useFetchedItems,
};
export type { Item };
