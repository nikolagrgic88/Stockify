import { queryClient } from "../shared";
import {
  AddNewUserAction,
  AddUserPage,
  EditUser,
  UserFilterAction,
  UserListPage,
  UserLoader,
  UsersPage,
  UserUpdateAction,
} from "../users";

export const userRoutes = {
  path: "users",
  element: <UsersPage />,
  action: UserFilterAction,
  children: [
    {
      path: "find-user/:userId?",
      element: <UserListPage />,
      loader: UserLoader(queryClient),
      action: UserFilterAction,
      children: [
        {
          path: "edit",
          element: <EditUser />,
          action: UserUpdateAction(queryClient),
        },
      ],
    },
    {
      path: "add-user",
      element: <AddUserPage />,
      action: AddNewUserAction(queryClient),
    },
  ],
};
