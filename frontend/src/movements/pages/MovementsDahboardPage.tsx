import React from "react";
import ActionCard from "../../shared/components/ActionCard";
import { Outlet } from "react-router";
import { useIsCurrentPage } from "../../shared";

const MovementsDashboard: React.FC = () => {
  const isCurrentPage = useIsCurrentPage("/home/movements");

  return (
    <div className="flex flex-col pl-10 justify-start w-full">
      {isCurrentPage && (
        <ul className="flex gap-5">
          <ActionCard children="Move Item" to="new-movement" />
          <ActionCard children="Movements" to="movement-history" />
        </ul>
      )}

      <Outlet />
    </div>
  );
};

export default MovementsDashboard;
