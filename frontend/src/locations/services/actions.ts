import { addLocation, Location, NewLocation, removeLocation } from "./api";
import { updateLocation } from "./api";
import { ActionFunctionArgs } from "react-router";
import { QueryClient } from "@tanstack/react-query";
import { queryClient } from "../../shared";
import { handleAxiosError } from "../../shared/utils/handleAxiosError";

export const deleteLocationAction = async ({ params }: ActionFunctionArgs) => {
  try {
    const deletedLocation = await removeLocation(params.locationId as string);

    await queryClient.invalidateQueries({ queryKey: ["locations"] });
    return new Response(
      JSON.stringify({
        success: true,
        message: deletedLocation.message,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const updateLocationAction =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    try {
      const data = await request.formData();
      const locationDetails = Object.fromEntries(
        data.entries()
      ) as unknown as Location;

      const locationId = params.locationId as string;

      const updatedLocation = await updateLocation({
        locationId,
        locationData: locationDetails,
      });
      await queryClient.invalidateQueries({
        queryKey: ["location", locationId],
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: updatedLocation.message,
          location: updatedLocation.location,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleAxiosError(error);
    }
  };

export const createNewLocatioAction =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const { signal } = new AbortController();
    try {
      const data = await request.formData();
      const newLocationDetails: NewLocation = {
        aisle: data.get("aisle") as string,
        section: data.get("section") as string,
        sectionNumber: parseInt(data.get("sectionNumber") as string),
        column: data.get("column") as string,
        row: parseInt(data.get("row") as string),
        remarks: (data.get("description") as string) || "",
      };

      const newLocation = await addLocation({ signal, newLocationDetails });
      await queryClient.invalidateQueries({
        queryKey: ["locations"],
      });
      return new Response(
        JSON.stringify({
          success: true,
          message: newLocation.message,
          location: newLocation.location,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      return handleAxiosError(error);
    }
  };
