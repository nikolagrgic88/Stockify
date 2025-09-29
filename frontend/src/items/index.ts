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
import ItemsContainer from "./components/ItemsContainer";
import ItemDetailsPage from "./pages/ItemDetailsPage";

export {
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
