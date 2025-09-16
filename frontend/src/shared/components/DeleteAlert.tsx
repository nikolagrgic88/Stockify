import { Alert } from "@mui/material";

type DeleteAlertProps = {
  alertMessage: string;
  success: "success" | "error";
  styles?: string;
};

const DeleteAlert = ({ alertMessage, success, styles }: DeleteAlertProps) => {
  return (
    <div className={`h-12 w-full flex justify-center absolute ${styles} `}>
      {alertMessage && (
        <Alert sx={{ minWidth: "30rem" }} severity={success}>
          {alertMessage}
        </Alert>
      )}
    </div>
  );
};

export default DeleteAlert;
