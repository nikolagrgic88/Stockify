import { useEffect, useState } from "react";
import { queryClient } from "..";

type HookType<T> = {
  queryKey: string;
  fetcher: ({ signal }: { signal: AbortSignal }) => Promise<T>;
};

export function useFetchedData<T>({ queryKey, fetcher }: HookType<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await queryClient.fetchQuery({
          queryKey: [queryKey],
          queryFn: ({ signal }: { signal: AbortSignal }) => fetcher({ signal }),
        });
        setData(response);
      } catch (err) {
        setError(`Failed to fetch ${queryKey}`);
        console.error(err);
      }
    };
    fetch();
  }, [queryKey, fetcher]);

  return { data, error, setError };
}
