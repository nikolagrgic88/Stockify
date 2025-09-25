import { API_PICKING_LIST_URL } from "../../shared/constants/urls";
import api from "../../shared/services/axiosInstance";

interface ItemsListFormValues {
  assignedTo: string;
  fromSection: string;
  toSection: string;
  dispatcher: string;
  fromDate: string;
  toDate: string;
  priority: string;
  notes: string;
}
interface SingleItemsListFormValues extends ItemsListFormValues {
  itemsInList: number;
}
interface MultiItemListFormValues extends ItemsListFormValues {
  ordersInList: number;
}
interface CombinedPickingListProps {
  asignTo: string;
  priority: string;
  notes: string;
  orders: string;
}
// interface PickingList{
// _id:string;
// quantity: number;
// status: "unassigned" | "assigned" | "inProgress" | "completed";
// priority: "high" | "medium" | "low";
// staff:string;
// }
//   _id: mongoose.Types.ObjectId;
//   quantity: number;
//   status: "unassigned" | "assigned" | "inProgress" | "completed";
//   priority: "high" | "medium" | "low";
//   createdAt: Date;
//   updatedAt: Date;
//   staff: mongoose.Types.ObjectId;
//   listItems: {
//     _id: mongoose.Types.ObjectId;
//     locations: {
//       location: mongoose.Types.ObjectId;
//       quantityInLocation: number;
//     }[];
//     item: mongoose.Types.ObjectId;
//     quantity: number;
//   }[];
//   notes: string;
// }

export const createSingleItemPickingList = async (
  formData: SingleItemsListFormValues
) => {
  const url = `${API_PICKING_LIST_URL}/lists/single`;
  const orderList = await api.post(url, formData, {
    withCredentials: true,
  });
  return orderList.data;
};

export const createMultiItemPickingList = async (
  formData: MultiItemListFormValues
) => {
  const url = `${API_PICKING_LIST_URL}/lists/multi`;
  const orderList = await api.post(url, formData, {
    withCredentials: true,
  });
  return orderList.data;
};

export const createNewCombinedPickingList = async (
  { signal }: { signal?: AbortSignal },
  data: CombinedPickingListProps
) => {
  const url = `${API_PICKING_LIST_URL}/new/combined`;
  const newList = await api.post(url, data, {
    withCredentials: true,
    signal,
  });
  return newList.data;
};
export const fetchPickingLists = async () => {
  const url = `${API_PICKING_LIST_URL}/lists/all`;
  const orderList = await api.get(url, {
    withCredentials: true,
  });
  return orderList.data;
};
