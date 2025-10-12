// companyLoginLoader.ts
import axios from "axios";
import { AUTH_URL } from "../constants/urls";
import { redirect } from "react-router";
import { useCompanyState, useUserState } from "../../state";

export async function companyLoginLoader() {
  const state = useCompanyState.getState();

  if (state.isCompanyAuthenticated) {
    return redirect("/auth/user");
  }

  return null;
}

export async function userLoginLoader() {
  try {
    await axios.get(AUTH_URL.COMPANY_AUTH_ME, {
      withCredentials: true,
    });
  } catch {
    useUserState.getState().logoutUser();
    useCompanyState.getState().logoutCompany();
    return redirect("/auth/company");
  }
  try {
    //Verify User Login
    const user = await axios.post(
      AUTH_URL.USER_AUTH_ME,
      {},
      {
        withCredentials: true,
      }
    );

    useUserState.getState().setUser({
      email: user.data.email,
      userName: user.data.userName,
      auth: user.data.auth,
      position: user.data.position,
      _id: user.data._id,
      isUserAuthenticated: true,
    });

    return redirect("/home/dashboard");

    //User not logged in
  } catch {
    const { isCompanyAuthenticated } = useCompanyState.getState();
    if (isCompanyAuthenticated) {
      return null;
    } else {
      useUserState.getState().logoutUser();
      return redirect("/auth/company");
    }
  }
}
