import {
  createItem,
  deleteItem,
  deleteItemInLocation,
  Item,
  updateItem,
} from "./api";
import { QueryClient } from "@tanstack/react-query";
import { ActionFunctionArgs } from "react-router";
import { handleAxiosError } from "../../shared/utils/handleAxiosError";

export const itemDetailsUpdateAction =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    try {
      const data = await request.formData();
      const category = data.get("category") as string;
      const locations = JSON.parse(data.get("locations") as string);

      const updatedItemDetails = {
        ...Object.fromEntries(data.entries()),
      } as unknown as Item;
      const { itemId } = params;
      if (!itemId) {
        console.error("Item ID is missing");
        return { error: "Item ID is missing" };
      }
      const quantity = locations.reduce(
        (prev: number, loc: { quantity: number }) => prev + loc.quantity,
        0
      );

      const updatedItem = await updateItem(itemId, {
        ...updatedItemDetails,
        totalQuantity: quantity,
        category: category?.split(","),
        locations: locations,
      });
      await queryClient.invalidateQueries({
        queryKey: ["item", itemId],
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: updatedItem.message,
          item: updatedItem.products,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      handleAxiosError(error);
    }
  };

export const createNewItem =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    try {
      const data = await request.formData();
      const category = data.get("category") as string;
      const locations = JSON.parse(data.get("locations") as string);
      const newItemDetails = {
        ...Object.fromEntries(data.entries()),
      } as unknown as Item;
      console.log(locations);

      const quantity = locations.reduce(
        (prev: number, loc: { quantity: number }) => prev + loc.quantity,
        0
      );
      newItemDetails.category = category.split(",");
      newItemDetails.locations = locations;
      newItemDetails.totalQuantity = quantity;
      newItemDetails.availableQuantity = quantity;

      const newItem = await createItem(newItemDetails);

      await queryClient.invalidateQueries({
        queryKey: ["items"],
      });
      return new Response(
        JSON.stringify({
          success: true,
          message: newItem.message,
          item: newItem.products,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      handleAxiosError(error);
    }
  };

export const deleteItemAction =
  (queryClient: QueryClient) =>
  async ({ params }: ActionFunctionArgs) => {
    try {
      const { itemId } = params;
      if (!itemId) {
        console.error("Item ID is missing");
        return { error: "Item ID is missing" };
      }

      await deleteItem(itemId);

      await queryClient.invalidateQueries({
        queryKey: ["items"],
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: "Item successfully deleted",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      handleAxiosError(error);
    }
  };

export const deleteInvetoryInLocationAction =
  (queryClient: QueryClient) =>
  async ({ params }: ActionFunctionArgs) => {
    try {
      const { itemId, locationId } = params;
      if (!itemId) {
        console.error("Item ID is missing");
        return { error: "Item ID is missing" };
      }
      if (!locationId) {
        console.error("Locaiton ID is missing");
        return { error: "Location ID is missing" };
      }
      await deleteItemInLocation(itemId, locationId);
      await queryClient.invalidateQueries({
        queryKey: ["items"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["item", itemId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["location", locationId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["locations"],
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: "Item successfully deleted",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      handleAxiosError(error);
    }
  };
