import { useQuery } from "@tanstack/react-query";
import { fetchItemsById, Item } from "../services/api";
import { useParams } from "react-router";
import ItemsContainer from "../components/ItemsContainer";
import { PageCard } from "../../shared";

const ItemDetailsPage = () => {
  const params = useParams();
  const itemId = params.itemId;

  const { data, isLoading } = useQuery({
    queryKey: ["item", itemId],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      fetchItemsById({ signal, itemId }),
  });
  const item = data?.products as unknown as Item;

  return (
    <PageCard>
      <div className="w-[70rem]flex justify-center">
        <ItemsContainer
          form={"POST"}
          state={item}
          isLoading={isLoading}
          isNewItem={false}
        />
      </div>
    </PageCard>
  );
};

export default ItemDetailsPage;
