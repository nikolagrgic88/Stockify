import { QueryClient } from "@tanstack/react-query";
import { ActionFunctionArgs } from "react-router";
import { createNewOrder } from "./api";
import { Order } from "../pages/NewOrderPage";
import { handleAxiosError } from "../../shared/utils/handleAxiosError";
import { createNewCombinedPickingList } from "../../actions/services/api";

export const newOrderAction =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    try {
      const formData = await request.formData();
      const shippingAddress = JSON.parse(
        formData.get("shippingAddress") as string
      ) as Order["customer"]["shippingAddress"];


      // Example combined object:
      const order = {
        items: JSON.parse(formData.get("items") as string),
        customer: {
          email: formData.get("email") as string,
          phoneNumber: formData.get("phoneNumber") as string,
          shippingAddress,
        },
        orderStatus: formData.get("orderStatus") as Order["orderStatus"],
        dispatcher: formData.get("dispatcher") as Order["dispatcher"],
      };

      const controller = new AbortController();
      const signal = controller.signal;
      const newOrder = await createNewOrder({ signal }, order);

      await queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard-stats"],
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: newOrder.message,
          newOrder: newOrder.createdOrder,
          errors: newOrder.errors,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleAxiosError(error);
    }
  };

export const actionCombinedPickingOrderAction =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    try {
      const formData = await request.formData();
      const pickingList = {
        asignTo: formData.get("asignTo") as string,
        priority: formData.get("priority") as string,
        notes: formData.get("notes") as string,
        orders: JSON.parse(formData.get("order") as string),
      };

      const controller = new AbortController();
      const signal = controller.signal;
      const newPickingList = await createNewCombinedPickingList(
        { signal },
        pickingList
      );

      await queryClient.invalidateQueries({
        queryKey: ["picking-lists"],
      });

      return new Response(
        JSON.stringify({
          success: newPickingList.success,
          message: newPickingList.message,
          pickingList: newPickingList.pickingList,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleAxiosError(error);
    }
  };
