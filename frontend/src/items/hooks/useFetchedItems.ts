import { useEffect, useState } from "react";
import { queryClient } from "../../shared";
import { fetchItems } from "../services/api";

export type ItemOption = {
  _id: string;
  title: string;
  totalQuantity: number;
  availableQuantity: number;
};

export const useFetchedItems = () => {
  const [items, setItems] = useState<ItemOption[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const itemsResponse = await queryClient.fetchQuery({
          queryKey: ["items"],
          queryFn: ({ signal }: { signal: AbortSignal }) =>
            fetchItems({ signal }),
        });

        setItems(itemsResponse.products as ItemOption[]);
      } catch (error) {
        setError("Failed to fetch items");
        console.error(error);
      }
    };
    fetch();
  }, []);

  return { items, error, setError };
};
