import { Button } from "@mui/material";
import { useCompanyState, useUserState } from "../../state";
import ThemeButton from "./ThemeButton";
import axios from "axios";
import { AUTH_URL } from "../../auth/constants/urls";
import { handleAxiosError } from "../utils/handleAxiosError";
import { useNavigate } from "react-router";

const MainHeader: React.FC = () => {
  const { companyName } = useCompanyState((state) => state);
  const { isUserAuthenticated, logoutUser } = useUserState((state) => state);
  const navigate = useNavigate();
  const handleUserLogout = async () => {
    try {
      await axios.post(
        AUTH_URL.USER_LOGOUT,
        {},
        {
          withCredentials: true,
        }
      );
      logoutUser();
      navigate("auth/user");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <header className="h-20 w-full fixed top-0 left-0 bg-[#011b4d] text-white py-4 flex flex-row justify-between px-10 z-10">
      <div>
        <h1 className="text-xl">Stockify</h1>
        <h2 className="text-md pl-4">{companyName}</h2>
      </div>
      <div className="flex gap-5">
        <ThemeButton />
        {isUserAuthenticated && (
          <Button variant="outlined" onClick={handleUserLogout}>
            Logout
          </Button>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
