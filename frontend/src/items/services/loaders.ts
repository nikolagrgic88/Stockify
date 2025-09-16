import { QueryClient } from "@tanstack/react-query";

import { fetchItems, fetchItemsById, ItemResponse } from "./api";

export const itemsByIdLoader = async (
  queryClient: QueryClient,
  itemId?: string | undefined
) => {
  const fetchItemsData = await queryClient.fetchQuery<ItemResponse>({
    queryKey: ["items", itemId],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      fetchItemsById({ signal, itemId }),
  });
  queryClient.setQueryData(["items", itemId], fetchItemsData);

  return fetchItemsData;
};
export const itemsLoader = async (queryClient: QueryClient) => {
  const fetchItemsData = await queryClient.fetchQuery<ItemResponse>({
    queryKey: ["items"],
    queryFn: ({ signal }: { signal: AbortSignal }) => fetchItems({ signal }),
  });
  queryClient.setQueryData(["items"], fetchItemsData);

  return fetchItemsData;
};
