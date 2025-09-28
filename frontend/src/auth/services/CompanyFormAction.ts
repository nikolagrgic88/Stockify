import axios from "axios";
import { ActionFunctionArgs, redirect } from "react-router";
import { AUTH_URL } from "../constants/urls";
import { useCompanyState } from "../../state";
import { handleAxiosError } from "../../shared/utils/handleAxiosError";

interface CompanyData {
  name: string;
  dbURI: string;
}

const CompanyFormAction = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const companyData = Object.fromEntries(formData.entries());
    console.log("CALLING auth1");

    const auth1 = await axios.post(AUTH_URL.COMPANY_LOGIN, companyData, {
      withCredentials: true,
      validateStatus: () => true,
    });
    console.log("AUTH1", auth1);

    const response = await axios.get(AUTH_URL.COMPANY_AUTH_ME, {
      withCredentials: true,
      validateStatus: () => true,
    });
    console.log("AUTH2", response);

    const data = response.data as CompanyData;
    const setCompany = useCompanyState.getState().setCompany;

    setCompany(data);

    return redirect("/auth/user");
  } catch (error) {
    return handleAxiosError(error);
  }
};

export default CompanyFormAction;
