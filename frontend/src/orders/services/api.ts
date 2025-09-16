import axios from "axios";
import { API_ORDERS_URL } from "../../shared/constants/urls";
import { Order } from "../pages/NewOrderPage";
import api from "../../shared/services/axiosInstance";

type OrderResponseProps = {
  message: string;
  orders: Order[];
};

// type CombinedPickingListProps = {
//   asignTo: string;
//   priority: string;
//   notes: string;
//   orders: string;
// };

export const fetchAllOrders = async ({ signal }: { signal?: AbortSignal }) => {
  const url = API_ORDERS_URL;
  const orders = await api.get(url, { withCredentials: true, signal });
  return orders.data as OrderResponseProps;
};

export const createNewOrder = async (
  { signal }: { signal?: AbortSignal },
  data: Order
) => {
  const url = `${API_ORDERS_URL}/new-order`;
  const newOrder = await api.post(url, data, {
    withCredentials: true,
    signal,
  });
  return newOrder.data;
};

// export const createNewCombinedPickingList = async (
//   { signal }: { signal?: AbortSignal },
//   data: CombinedPickingListProps
// ) => {
//   const url = `${API_PICKING_LIST_URL}/new/combined`;
//   const newList = await axios.post(url, data, {
//     withCredentials: true,
//     signal,
//   });
//   return newList.data;
// };
