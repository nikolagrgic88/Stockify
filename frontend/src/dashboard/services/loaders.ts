import { QueryClient } from "@tanstack/react-query";
import { fetchDashboardStats } from "./api";

export const dashboardStatLoader = (queryClient: QueryClient) => async () => {
  const fetchLocations = await queryClient.fetchQuery({
    queryKey: ["dashboard-stats"],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      fetchDashboardStats(signal),
  });
  queryClient.setQueryData(["locations"], fetchLocations);

  return fetchLocations;
};
