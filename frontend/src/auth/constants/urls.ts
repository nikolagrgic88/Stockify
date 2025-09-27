import { BASE_URL } from "../../shared";

export const AUTH_COMPANY = "/auth/company";
export const AUTH_USER = "/auth/user";

export const AUTH_URL = {
  COMPANY_LOGIN: BASE_URL + AUTH_COMPANY + "/login",
  COMPANY_LOGOUT: BASE_URL + AUTH_COMPANY + "/logout",
  USER_LOGIN: BASE_URL + AUTH_USER + "/login",
  USER_LOGOUT: BASE_URL + AUTH_USER + "/logout",
  USER_REGISTER: BASE_URL + AUTH_USER + "/register",
  USER: BASE_URL + AUTH_USER,
  COMPANY_AUTH_ME: BASE_URL + AUTH_COMPANY + "/me",
  USER_AUTH_ME: BASE_URL + AUTH_USER + "/current-user",
};
