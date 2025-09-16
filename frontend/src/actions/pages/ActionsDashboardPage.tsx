import React from "react";
import { useIsCurrentPage } from "../../shared";
import ActionCard from "../../shared/components/ActionCard";
import { Outlet } from "react-router";

const ActionsDashboardPage: React.FC = () => {
  const isCurrentPage = useIsCurrentPage("/home/actions/orders");
  return (
    <div className="flex flex-col pl-10 justify-start w-full">
      {isCurrentPage && (
        <ul className="flex gap-5 ">
          <ActionCard children="Action Single Orders" to="single" />
          <ActionCard children="Action Multi Orders" to="multi" />

          <ActionCard children="Actioned Orders" to="history" />
        </ul>
      )}
      <Outlet />
    </div>
  );
};

export default ActionsDashboardPage;
