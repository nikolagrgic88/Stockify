import { Outlet } from "react-router";
import ActionCard from "../../shared/components/ActionCard";
import { useIsCurrentPage } from "../../shared";

const UsersDashboardPage: React.FC = () => {
  const isCurrentPage = useIsCurrentPage("/home/users");
  return (
    <div className="flex flex-col pl-10 justify-start w-full">
      {isCurrentPage && (
        <ul className="flex gap-5">
          <ActionCard children="Add User" to="add-user" />
          <ActionCard children="Find User" to="find-user" />
        </ul>
      )}
      <Outlet />
    </div>
  );
};

export default UsersDashboardPage;
