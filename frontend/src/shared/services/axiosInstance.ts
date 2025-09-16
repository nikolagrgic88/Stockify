import axios from "axios";
import { useErrorState } from "../../state/errorState";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const errorState = useErrorState.getState();
    const message =
      err.response?.data?.message || "Something went wrong. Try again.";
    const status = err.response?.status;
    const error = err.response?.data?.error || "";

    if (status === 401 || status === 403) {
      errorState.setError(message, "error", status, error);
    }

    return Promise.reject(err);
  }
);

export default api;
