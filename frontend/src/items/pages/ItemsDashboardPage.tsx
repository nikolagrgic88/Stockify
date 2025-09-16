import { FC } from "react";
import { useIsCurrentPage } from "../../shared";
import ActionCard from "../../shared/components/ActionCard";
import { Outlet } from "react-router";

const ItemsDashboardPage: FC = () => {
  const isCurrentPage = useIsCurrentPage("/home/items");

  return (
    <div className="flex pl-10 justify-start w-full">
      {isCurrentPage && (
        <ul className="flex gap-5">
          <ActionCard children="Create New Item" to="new-item" />
          <ActionCard children="Items" to="find-item" />
        </ul>
      )}
      <Outlet />
    </div>
  );
};

export default ItemsDashboardPage;
