import { Location } from "./../../locations/services/api";

import { type Item } from "../../items";
import { API_INVENTORY_URL } from "../../shared";
import api from "../../shared/services/axiosInstance";

export type Inventory = Omit<Location, "products"> & {
  products: Array<Item>;
};

export type InventoryResponse = {
  message: string;
  location: Inventory;
};
export const fetchInventory = async ({ signal }: { signal: AbortSignal }) => {
  const url = `${API_INVENTORY_URL}/all`;
  const inventory = await api.get<Inventory[]>(url, {
    withCredentials: true,
    signal,
  });

  return inventory.data;
};

export const fetchInventoryById = async ({
  signal,
  locationId,
}: {
  signal: AbortSignal;
  locationId: string;
}) => {
  const url = `${API_INVENTORY_URL}/${locationId}`;
  const inventory = await api.get<InventoryResponse>(url, {
    withCredentials: true,
    signal,
  });
  console.log("API", inventory);

  return inventory.data;
};

export const addOrUpdateInventory = async ({
  signal,
  inventoryData,
  locationId,
}: {
  signal: AbortSignal;
  inventoryData: Location;
  locationId: string;
}) => {
  const url = `${API_INVENTORY_URL}/add-inventory/${locationId}`;
  const inventory = await api.post(url, inventoryData, {
    withCredentials: true,
    signal,
  });

  return inventory.data;
};

export const updateInventory = async ({
  signal,
  locationId,
  productId,
  quantity,
}: {
  signal: AbortSignal;
  locationId: string;
  productId: string;
  quantity: number;
}) => {
  const url = `${API_INVENTORY_URL}/update/${locationId}`;
  const invetnory = await api.post(
    url,
    { quantity, productId },
    { withCredentials: true, signal }
  );

  return invetnory.data;
};

export const deleteInventory = async ({
  signal,
  locationId,
}: {
  signal: AbortSignal;
  locationId: string;
}) => {
  const url = `${API_INVENTORY_URL}/delete/${locationId}`;
  return (await api.delete(url, { withCredentials: true, signal })).data;
  //   return inventory.data
};

export const deleteProductFromInventory = async ({
  signal,
  locationId,
  productId,
}: {
  signal: AbortSignal;
  locationId: string;
  productId: string;
}) => {
  const url = `${API_INVENTORY_URL}/${locationId}/delete-product/${productId}`;
  return (await api.delete(url, { withCredentials: true, signal })).data;
};
