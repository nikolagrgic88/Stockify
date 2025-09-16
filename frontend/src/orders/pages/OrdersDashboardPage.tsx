import React from "react";
import { useIsCurrentPage } from "../../shared";
import ActionCard from "../../shared/components/ActionCard";
import { Outlet } from "react-router";

const OrdersDashboardPage: React.FC = () => {
  const isCurrentPage = useIsCurrentPage("/home/orders");
  return (
    <div className="flex flex-col pl-10 justify-start w-full">
      {isCurrentPage && (
        <ul className="flex gap-5  ">
          <ActionCard children="Create New Order" to="new-order" />
          <ActionCard children="Orders" to="all-orders" />
        </ul>
      )}

      <Outlet />
    </div>
  );
};

export default OrdersDashboardPage;
