import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useActionData } from "react-router";


const UpdateStatusMessage = () => {
  const [open, setOpen] = useState(false);
  const actionData = useActionData();

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (actionData) {
      setOpen(true);
    }
  }, [actionData]);
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert severity={actionData?.success === true ? "success" : "error"}>
        {actionData?.message}
      </Alert>
    </Snackbar>
  );
};
export default UpdateStatusMessage;
