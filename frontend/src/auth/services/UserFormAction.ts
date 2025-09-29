import axios from "axios";
import { ActionFunctionArgs, redirect } from "react-router";
import { AUTH_URL } from "../constants/urls";
import { useUserState } from "../../state";
import { handleAxiosError } from "../../shared/utils/handleAxiosError";

const UserFormAction = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const userData = Object.fromEntries(formData.entries());

    await axios.post(AUTH_URL.USER_LOGIN, userData, {
      withCredentials: true,
    });
    const response = await axios.post(
      AUTH_URL.USER_AUTH_ME,
      {},
      {
        withCredentials: true,
      }
    );

    const setUser = useUserState.getState().setUser;

    setUser(response.data.user);
    return redirect("/home/dashboard");
  } catch (error) {
    return handleAxiosError(error);
  }
};
export default UserFormAction;
