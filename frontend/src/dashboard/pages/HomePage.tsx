import { Navigate, Outlet } from "react-router";
import { Aside, useIsCurrentPage } from "../../shared";

import { useUserState } from "../../state";

const HomePage: React.FC = () => {
  const user = useUserState((state) => state);
  const currentPage = useIsCurrentPage("/home");

  if (!user) {
 
    return <Navigate to="/auth/user" replace />;
  }

  if (currentPage) {

    return <Navigate to="/home/dashboard" replace />;
  }
  return (
    <div className="w-full flex flex-row">
      <Aside />
      <div className="pt-10  flex justify-center align-middle flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
