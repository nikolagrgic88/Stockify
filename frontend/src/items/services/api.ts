import axios from "axios";
import { Location } from "../../locations";
import { API_INVENTORY_URL, API_ITEMS_URL } from "../../shared/constants/urls";
import api from "../../shared/services/axiosInstance";

export type Item = {
  _id: string;
  title: string;
  sku: number;
  size: string;
  totalQuantity: number;
  availableQuantity: number;
  barcode: number;
  description: string;
  color: string;
  locations: { locationId: Location; quantity: number }[];
  category: string[];
};

export type ItemResponse = {
  message: string;
  products: Item[];
};

export const fetchItems = async ({ signal }: { signal: AbortSignal }) => {
  const url = API_ITEMS_URL;

  const items = await api.get<ItemResponse>(url, {
    withCredentials: true,
    signal,
  });
  console.log("DATA RECEIVED", items);
  return items.data;
};

export const fetchItemsById = async ({
  signal,
  itemId,
}: {
  signal: AbortSignal;
  itemId?: string;
}) => {
  const url = API_ITEMS_URL + `/${itemId}`;

  const items = await api.get<ItemResponse>(url, {
    withCredentials: true,
    signal,
  });

  return items.data;
};

export const updateItem = async (itemId: string, itemsData: Item) => {
  const url = `${API_ITEMS_URL}/${itemId}/updateProduct`;
  const item = await api.patch<ItemResponse>(
    url,
    { updates: itemsData },
    {
      withCredentials: true,
    }
  );
  return item.data;
};

export const createItem = async (itemsData: Item) => {
  const url = `${API_ITEMS_URL}/newProduct`;
  const newItem = await api.post(url, itemsData, {
    withCredentials: true,
  });
  return newItem.data;
};

export const deleteItem = async (itemId: string) => {
  const url = `${API_ITEMS_URL}/${itemId}/delete`;
  const deletedItem = await api.delete(url, { withCredentials: true });
  return deletedItem.data;
};

export const deleteItemInLocation = async (
  itemId: string,
  locationId: string
) => {
  const url = `${API_INVENTORY_URL}/${locationId}/delete-product/${itemId}`;
  const deletedItem = await api.delete(url, { withCredentials: true });
  return deletedItem.data;
};
