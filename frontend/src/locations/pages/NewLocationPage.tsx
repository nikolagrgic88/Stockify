import { FC } from "react";
import LocationsForm from "../components/LocationDetails";
import { BackButton, PageCard } from "../../shared";
import { Typography } from "@mui/material";

const NewLocationPage: FC = () => {
  return (
    <PageCard>
      <div className="w-[50rem] flex flex-col  gap-10">
        <Typography variant="h1" typography="h4" className="text-center">
          New Location
        </Typography>
        <LocationsForm form="POST" />
        <BackButton />
      </div>
    </PageCard>
  );
};

export default NewLocationPage;
