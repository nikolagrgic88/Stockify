import { QueryClient } from "@tanstack/react-query";
import { fetchMovements } from "./api";

export const getAllMovementsLoader = (queryClient: QueryClient) => async () => {
  const movements = await queryClient.fetchQuery({
    queryKey: ["movements"],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      fetchMovements({ signal }),
  });
  queryClient.setQueryData(["movements"], movements);


  return movements;
};
