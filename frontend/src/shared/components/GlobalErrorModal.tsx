import { Dialog, Button, Alert, AlertTitle } from "@mui/material";
import { useErrorState } from "../../state/errorState";
import { useNavigate } from "react-router";

const GlobalErrorModal = () => {
  const { message, clearError, type, statusCode, error } = useErrorState();
  const navigate = useNavigate();
  function handleClose() {
    clearError();
    if (statusCode === 401) {
      navigate("/auth/company");
    }
  }
  return (
    <Dialog open={!!message} onClose={handleClose}>
      <Alert sx={{ margin: "0.5rem", minWidth: "25rem" }} severity={type}>
        <AlertTitle marginBottom={"1rem"}>
          {type.charAt(0).toUpperCase() + type.slice(1)} : {error}
        </AlertTitle>
        <p>{message}</p>

        <Button
          onClick={handleClose}
          variant="outlined"
          size="small"
          color={type}
          sx={{ marginTop: "2rem" }}
        >
          Close
        </Button>
      </Alert>
    </Dialog>
  );
};

export default GlobalErrorModal;
