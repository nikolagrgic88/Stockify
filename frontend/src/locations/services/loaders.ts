import { QueryClient } from "@tanstack/react-query";
import { fetchLocation } from "./api";
import {
  fetchInventoryById,
  InventoryResponse,
} from "../../inventory/services/api";
import { LoaderFunctionArgs } from "react-router";

export const locationLoader = (queryClient: QueryClient) => async () => {
  const fetchLocations = await queryClient.fetchQuery({
    queryKey: ["locations"],
    queryFn: ({ signal }: { signal: AbortSignal }) => fetchLocation({ signal }),
  });
  queryClient.setQueryData(["locations"], fetchLocations);

  return fetchLocations;
};

export const inventoryLoaderById =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const locationId = params.locationId as string;
    const fetchLocation = await queryClient.fetchQuery<InventoryResponse>({
      queryKey: ["location", locationId],
      queryFn: ({ signal }: { signal: AbortSignal }) =>
        fetchInventoryById({ signal, locationId }),
    });
    queryClient.setQueryData(["location", locationId], fetchLocation);
    return fetchLocation;
  };
