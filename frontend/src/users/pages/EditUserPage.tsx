import { Typography } from "@mui/material";
import { PageCard } from "../../shared";

import UpdateUser from "../components/UpdateUser";

const EditUserPage = () => {
  return (
    <PageCard>
      <Typography variant="h1" typography={"h4"} marginBottom={"1rem"}>
        User Details
      </Typography>
      <UpdateUser method="PATCH" />
    </PageCard>
  );
};

export default EditUserPage;
