import React from "react";
import { useIsCurrentPage } from "../../shared";
import ActionCard from "../../shared/components/ActionCard";
import { Outlet } from "react-router";

const LocationDashboardPage: React.FC = () => {
  const isCurrentPage = useIsCurrentPage("/home/location");

  return (
    <div className="flex flex-col pl-10 justify-start w-full">
      {isCurrentPage && (
        <ul className="flex gap-5">
          <ActionCard children="Add Location" to="new-location" />
          <ActionCard children="Find Location" to="find-location" />
        </ul>
      )}

      <Outlet />
    </div>
  );
};

export default LocationDashboardPage;
