import { FC, useEffect } from "react";
import ItemsTable from "../components/ItemsTable";
import { useQuery } from "@tanstack/react-query";
import { fetchItems } from "../services/api";
import { useItemLocationState } from "../../state/itemLocationStore";
import { BackButton, PageCard } from "../../shared";
import { Typography } from "@mui/material";

const FindItemsPage: FC = () => {
  const { data } = useQuery({
    queryKey: ["items"],
    queryFn: ({ signal }: { signal: AbortSignal }) => fetchItems({ signal }),
  });
  const { resetQuantity } = useItemLocationState((state) => state);
  useEffect(() => {
    resetQuantity();
  }, [resetQuantity]);

  return (
    <PageCard>
      <div className="flex flex-col w-[80rem]">
        <Typography
          variant="h1"
          typography="h4"
          className="text-center"
          marginBottom={5}
        >
          Inventory
        </Typography>
        <ItemsTable tableData={data?.products || []} isInventoryData={false} />
        <BackButton />
      </div>
    </PageCard>
  );
};

export default FindItemsPage;
