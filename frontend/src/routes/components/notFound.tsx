import { redirect } from "react-router";

export const notFound = async () => {
  return redirect("/auth/company");
};
