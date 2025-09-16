import { ActionFunctionArgs } from "react-router";
import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { addUser, updateUser, User } from "./api";

export const UserUpdateAction =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    const userId = params.userId as string;
    try {
      const data = await request.formData();
      const updatedUsersData = Object.fromEntries(
        data.entries()
      ) as unknown as User;
      const updatedUser = await updateUser({
        userId,
        userData: updatedUsersData,
      });
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      return new Response(
        JSON.stringify({
          success: true,
          message: updatedUser.message,
          formData: data,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
      // return redirect("/home/users");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error response from server:", error.response?.data);
        return new Response(
          JSON.stringify({
            success: false,
            message: error.response?.data?.message || "Something went wrong",
            errors: error.response?.data || [],
          }),
          {
            status: error.response?.status || 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        console.error("Unknown error:", error);
        return new Response(
          JSON.stringify({
            success: false,
            message: "An unknown error occurred",
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }
  };

export const AddNewUserAction =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    try {
      const data = await request.formData();
      const newUserData = Object.fromEntries(data) as unknown as User;

      const newUser = await addUser(newUserData);
      await queryClient.invalidateQueries({ queryKey: ["users"] });

      return new Response(
        JSON.stringify({
          success: true,
          message: newUser.data.message,
          userId: newUser.data.user._id,
        }),
        {
          status: newUser.status || 200,
          headers: new Headers(
            (newUser.headers as Record<string, string>) ?? {}
          ),
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error response from server:", error.response?.data);
        return new Response(
          JSON.stringify({
            success: false,
            message: error.response?.data?.message || "Something went wrong",
            errors: error.response?.data?.errors || [],
          }),
          {
            status: error.response?.status || 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        console.error("Unknown error:", error);
        return new Response(
          JSON.stringify({
            success: false,
            message: "An unknown error occurred",
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }
  };

export const UserFilterAction = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();
  const filterData = Object.fromEntries(data.entries());
  // try {
  // await queryClient.fetchQuery({
  //   queryKey: ["users", filterData],
  //   queryFn: ({ signal }: { signal: AbortSignal }) =>
  //     fetchUsers({
  //       signal,
  //       queryString: filterData,
  //     }),
  // });
  return filterData;
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     console.error("Error response from server:", error.response?.data);
  //     return new Response(JSON.stringify(error.response?.data), {
  //       status: error.response?.status || 500,
  //       headers: { "Content-Type": "application/json" },
  //     });
  //   } else {
  //     console.error("Unknown error:", error);
  //     return new Response(
  //       JSON.stringify({ message: "An unknown error occurred" }),
  //       { status: 500, headers: { "Content-Type": "application/json" } }
  //     );
  //   }
  // }
};
