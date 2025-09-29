import { useEffect, useState } from "react";
import { queryClient } from "../../shared";
import { fetchLocation } from "../services/api";

export type LocationOption = {
  _id: string;
  name: string;
};

export const useFetchLocations = () => {
  const [locations, setLocations] = useState<LocationOption[]>([]);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsResponse = await queryClient.fetchQuery({
          queryKey: ["locations"],
          queryFn: ({ signal }: { signal: AbortSignal }) =>
            fetchLocation({ signal }),
        });
        setLocations(locationsResponse.locations as LocationOption[]);
       
      } catch (error) {
        setError("Failed to fetch locations");
        console.error(error);
      }
    };
    fetchLocations();
  }, []);

  return { locations, error, setError };
};
