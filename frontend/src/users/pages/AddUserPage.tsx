import { useActionData, useNavigate } from "react-router";
import { BackButton, PageCard } from "../../shared";
import UpdateButtons from "../components/UpdateButtons";
import UserForm from "../components/UserForm";
import UpdateStatusMessage from "../components/UpdateStatusMessage";
import { Paper, Typography } from "@mui/material";

const AddUserPage: React.FC = () => {
  const navigate = useNavigate();
  const actionData = useActionData() as {
    success: boolean;
    message: string;
    errors: { msg: string; path: string }[];
    userId: string;
  };
  if (actionData?.success) {
    setTimeout(
      () => navigate(`/home/users/find-user/${actionData.userId}/edit`),
      3000
    );
  }
  return (
    <PageCard>
      <div>
        <Typography
          variant="h1"
          typography={"h4"}
          marginBottom={5}
          textAlign={"center"}
        >
          Add User
        </Typography>
        <Paper className="p-2">
          <UserForm
            className="flex flex-col mr-5"
            id="add-user"
            isDisabled={false}
            isAddUser={true}
            method="POST"
            errors={actionData?.errors}
          >
            <UpdateStatusMessage />
            <UpdateButtons
              buttonActionName="Add User"
              formId="add-user"
              isDisabled={false}
            />
          </UserForm>
        </Paper>
        <BackButton />
      </div>
    </PageCard>
  );
};

export default AddUserPage;
