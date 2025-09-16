import { FC } from "react";
import { BackButton, PageCard } from "../../shared";
import LocationTableDataHeader from "../components/LocationTable";
import { fetchLocation } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";

const FindLocationPage: FC = () => {
  const { data } = useQuery({
    queryKey: ["locations"],
    queryFn: ({ signal }: { signal: AbortSignal }) => fetchLocation({ signal }),
  });

  return (
    <PageCard>
      <div className="ml-5 mb-10 ">
        <LocationTableDataHeader locationData={data?.locations || []} />
        <Outlet />
        <BackButton />
      </div>
    </PageCard>
  );
};

export default FindLocationPage;
