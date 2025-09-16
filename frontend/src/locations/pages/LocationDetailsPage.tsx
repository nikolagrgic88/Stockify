import { FC } from "react";
import { useParams } from "react-router";

import {
  fetchInventoryById,
  InventoryResponse,
} from "../../inventory/services/api";

import { useQuery } from "@tanstack/react-query";
import { BackButton, PageCard } from "../../shared";
import ItemsTable from "../../items/components/ItemsTable";
import LocationDetails from "../components/LocationDetails";
import { Typography } from "@mui/material";

const LocationDetailsPage: FC = () => {
  const { locationId } = useParams();

  const { data } = useQuery<InventoryResponse>({
    queryKey: ["location", locationId],
    queryFn: ({ signal }: { signal: AbortSignal }) => {
      if (!locationId) {
        throw new Error("Location ID is missing");
      }
      return fetchInventoryById({ signal, locationId });
    },
  });
  if (!data) {
    return <h1>No Location</h1>;
  }

  return (
    <PageCard>
      <div className="w-[80rem]">
        <Typography marginBottom={5} typography="h4" variant="h1" className="text-center">
          {data?.location.name.toUpperCase()}
        </Typography>
        <LocationDetails data={data?.location} form="PATCH" />
        <ItemsTable tableData={data} />
        <BackButton />
      </div>
    </PageCard>
  );
};

export default LocationDetailsPage;
