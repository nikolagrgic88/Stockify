import { QueryClient } from "@tanstack/react-query";
import { fetchUsers } from "./api";

export const UserLoader = (queryClient: QueryClient) => async () => {
  const fetchedData = await queryClient.ensureQueryData({
    queryKey: ["users"],
    queryFn: ({ signal }: { signal: AbortSignal }) => fetchUsers({ signal }),
  });
  queryClient.setQueryData(["users"], fetchedData);
  return fetchedData;
};
