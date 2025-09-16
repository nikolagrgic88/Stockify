import { HTMLFormMethod, useNavigation } from "react-router";

import { useEffect, useState } from "react";
import { useSelectedUserStore } from "../../state";
import UserForm from "./UserForm";
import UpdateStatusMessage from "./UpdateStatusMessage";
import UpdateButtons from "./UpdateButtons";
import { User } from "../services/api";
import { Paper } from "@mui/material";

interface UserFormProps {
  userDetails?: User | null;
  className?: string;
  method: HTMLFormMethod;
}
const UpdateUser: React.FC<UserFormProps> = ({ method }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { selectedUser } = useSelectedUserStore((state) => state);
  const handleEdit = () => {
    setIsDisabled((prevState) => !prevState);
  };
  const { state } = useNavigation();

  useEffect(() => {
    if (state === "submitting") {
      setIsDisabled(true);
    }
  }, [state]);

  return (
    <Paper>
      <UserForm
        isDisabled={isDisabled}
        method={method}
        className="flex-col mr-5 w-[40rem]"
        userDetails={selectedUser}
        id="update-user"
      >
        <UpdateStatusMessage />
        <UpdateButtons
          formId="update-user"
          isDisabled={isDisabled}
          onEdit={handleEdit}
          buttonActionName="Update"
        />
      </UserForm>
    </Paper>
  );
};
export default UpdateUser;
