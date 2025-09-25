import { API_DASHBOARD_PAGE_URL } from "../../shared/constants/urls";
import api from "../../shared/services/axiosInstance";

export const fetchDashboardStats = async (signal: AbortSignal) => {
  const res = await api.get(API_DASHBOARD_PAGE_URL, {
    withCredentials: true,
    signal,
  });

  return res.data;
};
