// companyLoginLoader.ts
import axios from "axios";
import { AUTH_URL } from "../constants/urls";
import { redirect } from "react-router";
import { useCompanyState, useUserState } from "../../state";

export async function companyLoginLoader() {
  try {
    const response = await axios.get(AUTH_URL.COMPANY, {
      withCredentials: true,
      validateStatus: (status) => status < 500,
    });

    if (response.status === 200) {
      const setCompany = useCompanyState.getState().setCompany;
      setCompany(response.data);

     
      return redirect("/auth/user");
    }

    // if not logged in (401) stay on login
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
