import { redirect } from "react-router";
import { AUTH_URL } from "../../auth";
import api from "../../shared/services/axiosInstance";

export async function requireAuthLoader() {
  try {
    await api.post(AUTH_URL.USER_AUTH_ME);
    return null;
  } catch {
    return redirect("/auth/user");
  }
}
