import { ActionFunctionArgs } from "react-router";
import { handleAxiosError } from "../../shared/utils/handleAxiosError";
import { createMultiItemPickingList, createSingleItemPickingList } from "./api";
import { QueryClient } from "@tanstack/react-query";

interface ILocation {
  location: string;
  quantityInLocation: number;
}

interface IListItem {
  _id: string;
  locations: ILocation[];
  item: string;
  quantity: number;
}

interface IPickingListObj {
  _id: string;
  quantity: number;
  status: "unassigned" | "assigned" | "inProgress" | "completed";
  priority: "High" | "Medium" | "Low";
  createdAt: string; // Date as ISO string
  updatedAt: string; // Date as ISO string
  staff: string;
  listItems: IListItem[];
  notes: string;
}

interface IPickingList {
  success: string;
  message: string;
  pickingList: IPickingListObj;
}

export const createSingleItemOrderListAction =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    try {
      const safeParse = (value: FormDataEntryValue | null) => {
        try {
          return value ? JSON.parse(value as string) : null;
        } catch {
          return null;
        }
      };
      const data = await request.formData();
      const formData = {
        assignedTo: safeParse(data.get("assignedTo") as string),
        fromSection: safeParse(data.get("fromLocation") as string),
        toSection: safeParse(data.get("toLocation") as string),
        dispatcher: safeParse(data.get("dispatcher") as string),
        fromDate: safeParse(data.get("fromDate") as string),
        toDate: safeParse(data.get("toDate") as string),
        priority: safeParse(data.get("priority") as string),
        notes: safeParse(data.get("notes") as string),
        itemsInList: safeParse(data.get("numberOfItems") as string),
      };

      const list: IPickingList = await createSingleItemPickingList(formData);
      await queryClient.invalidateQueries({
        queryKey: ["item", list.pickingList._id],
      });
      return new Response(
        JSON.stringify({
          success: list.success,
          message: list.message,
          pickingList: list.pickingList,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleAxiosError(error);
    }
  };

export const createMultiItemOrderListAction =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    try {
      const safeParse = (value: FormDataEntryValue | null) => {
        try {
          return value ? JSON.parse(value as string) : null;
        } catch {
          return null;
        }
      };
      const data = await request.formData();
      const formData = {
        assignedTo: safeParse(data.get("assignedTo") as string),
        fromSection: safeParse(data.get("fromLocation") as string),
        toSection: safeParse(data.get("toLocation") as string),
        dispatcher: safeParse(data.get("dispatcher") as string),
        fromDate: safeParse(data.get("fromDate") as string),
        toDate: safeParse(data.get("toDate") as string),
        priority: safeParse(data.get("priority") as string),
        notes: safeParse(data.get("notes") as string),
        ordersInList: safeParse(data.get("numberOfOrders") as string),
      };
      console.log(formData);

      const list: IPickingList = await createMultiItemPickingList(formData);
      await queryClient.invalidateQueries({
        queryKey: ["multi-list", list.pickingList._id],
      });
      return new Response(
        JSON.stringify({
          success: list.success,
          message: list.message,
          pickingList: list.pickingList,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleAxiosError(error);
    }
  };
