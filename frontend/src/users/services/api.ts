
import { BASE_URL } from "../../shared";
import api from "../../shared/services/axiosInstance";

export type User = {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  position?: string;
  isActive: boolean;
  auth: "admin" | "manager" | "staff" | "";
};
type UsersResponse = {
  message: string;
  users: User[];
};

type UserResponse = {
  message: string;
  user: User;
};

export const updateUser = async ({
  userId,
  userData,
}: {
  userId: string;
  userData: User;
}) => {
  const url = `${BASE_URL}/users/${userId}`;
  const updatedUser = await api.patch<UserResponse>(url, userData, {
    withCredentials: true,
  });

  return updatedUser.data;
};

export const addUser = async (userData: User) => {
  const url = `${BASE_URL}/users/new-user`;
  const newUser = await api.post<UserResponse>(url, userData, {
    withCredentials: true,
  });
  return newUser;
};

export const fetchUsers = async ({
  signal,
  queryString,
}: {
  signal: AbortSignal;
  queryString?: object;
}) => {
  const url = `${BASE_URL}/users`;
  const response = await api.get<UsersResponse>(url, {
    withCredentials: true,
    signal,
    params: queryString,
  });

  return response.data;
};
