import { QueryClient } from "@tanstack/react-query";
import { fetchAllOrders } from "./api";

export const fetchAllOrdersLoader = (queryClient: QueryClient) => async () => {
  const orders = queryClient.fetchQuery({
    queryKey: ["orders"],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      fetchAllOrders({ signal }),
  });
  queryClient.setQueryData(["orders"], orders);
  return orders;
};
