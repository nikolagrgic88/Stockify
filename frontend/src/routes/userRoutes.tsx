import { queryClient } from "../shared";
import {
  AddNewUserAction,
  UserFilterAction,
  UserLoader,
  UserUpdateAction,
} from "../users";

import {
  AddUserPage,
  EditUserPage,
  UserListPage,
  UsersDashboardPage,
} from "./components/usersComponents";

export const userRoutes = {
  path: "users",
  element: <UsersDashboardPage />,
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
          element: <EditUserPage />,
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
