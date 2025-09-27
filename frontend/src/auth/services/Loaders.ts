// companyLoginLoader.ts
import axios from "axios";
import { AUTH_URL } from "../constants/urls";
import { redirect } from "react-router";
import { useCompanyState, useUserState } from "../../state";

export async function companyLoginLoader() {
  try {
    const response = await axios.get(AUTH_URL.COMPANY_LOGIN, {
      withCredentials: true,
      validateStatus: () => true,
    });
    if (response.status === 200) {
      // Logged in → update Zustand + redirect
      useCompanyState.getState().setCompany(response.data);
      return redirect("/auth/user");
    }

    if (response.status === 401) {
      // Not logged in yet → just show login page
      return null;
    }

    // Any other unexpected status
    useUserState.getState().logoutUser();
    useCompanyState.getState().logoutCompany();
    return null;
  } catch {
    useUserState.getState().logoutUser();
    useCompanyState.getState().logoutCompany();

    return null;
  }
}

export async function userLoginLoader() {
  try {
    await axios.get(AUTH_URL.COMPANY_AUTH_ME, {
      withCredentials: true,
    });
    console.log("pass");
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
      console.log("fail");

      return null;
    } else {
      console.log("secongd");

      return redirect("/auth/company");
    }
  }
}
