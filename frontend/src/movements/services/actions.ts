import { QueryClient } from "@tanstack/react-query";
import { ActionFunctionArgs } from "react-router";
import { handleAxiosError } from "../../shared/utils/handleAxiosError";
import { createMovement } from "./api";

export const moveItemAction =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    try {
      const formData = await request.formData();

      const fromLocationId = formData.get("fromLocationId") as string;
      const toLocationId = formData.get("toLocationId") as string;
      const userId = formData.get("userId") as string;
      const productId = formData.get("item") as string;
      const quantity = Number(formData.get("quantity"));
   

      if (
        !fromLocationId ||
        !toLocationId ||
        !userId ||
        !productId ||
        !quantity
      ) {
        throw new Error("Missing required form fields");
      }

      const movementData = {
        fromLocationId,
        toLocationId,
        userId,
        items: [{ productId, quantity }],
      };


      const movement = await createMovement(movementData);

      await queryClient.invalidateQueries({
        queryKey: ["movements"],
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: movement.message,
          movements: movement.newMovement,
          updatedLocation: movement.updatedLocation,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleAxiosError(error);
    }
  };
