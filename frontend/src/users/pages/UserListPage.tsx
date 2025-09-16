import { Outlet, useActionData } from "react-router";
import { useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import UserForm from "../components/UserForm";

import { useUserFilteredResultsState } from "../../state";
import { BackButton, PageCard, useIsCurrentPage } from "../../shared";
import { fetchUsers, User } from "../services/api";
import UserTableDataHeader from "../components/UserTableDataHeader";

const UserListPage = () => {
  const isCurrentPage = useIsCurrentPage("/home/users/find-user");
  const actionData = useActionData();
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }: { signal: AbortSignal }) => fetchUsers({ signal }),
  });

  const users = data?.users;
  const { userFilteredSearch, setUserFilteredSearch } =
    useUserFilteredResultsState((state) => state);

  useEffect(() => {
    if (actionData && users) {
      const filteredUsers =
        users?.filter((user) =>
          Object.entries(actionData)
            .filter(([, value]) => value && value !== "")
            .every(([key, value]) => {
              const userValue = user[key as keyof User];

              if (typeof userValue === "boolean") {
                return userValue === (value === "true");
              }

              if (typeof userValue === "string") {
                return userValue
                  .toLowerCase()
                  .includes((value as string).toString().toLowerCase());
              }

              return false;
            })
        ) ?? [];

      setUserFilteredSearch(filteredUsers);
    }
  }, [actionData, users, setUserFilteredSearch]);
  console.log(isCurrentPage);
  useEffect(() => {
    if (data?.users && userFilteredSearch.length > 0) {
      const filteredUsers = data.users.filter((user) =>
        userFilteredSearch.some((filteredUser) => user._id === filteredUser._id)
      );
      setUserFilteredSearch(filteredUsers);
    }
    //eslint-disable-next-line
  }, [data, setUserFilteredSearch]);

  return (
    <PageCard>
      <Container className=" min-w-[85rem]">
        <div>
          {isCurrentPage ? (
            <div>
              <Typography variant="h1" typography={"h4"} textAlign={"center"}>
                Users
              </Typography>
              <UserForm
                className="flex flex-col"
                id="search-form"
                isSearchForm={true}
                isDisabled={false}
                method="POST"
              >
                <div className="flex justify-end gap-1">
                  <Button
                    form="search-form"
                    variant="contained"
                    color="info"
                    type="submit"
                  >
                    Search
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => setUserFilteredSearch(users || [])}
                  >
                    Clear
                  </Button>
                </div>
              </UserForm>
              <UserTableDataHeader usersData={userFilteredSearch} />
            </div>
          ) : (
            <Outlet />
          )}
        </div>
        <BackButton />
      </Container>
    </PageCard>
  );
};

export default UserListPage;
