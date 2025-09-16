import { Box, Fab, Modal, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
// import { useModalState } from "../../state";
import { ReactNode } from "react";
import { useNavigate } from "react-router";

interface AppModalProps {
  children: ReactNode;
  modalTitle: string;
  onCloseNavigateTo: string;
}

const AppModal: React.FC<AppModalProps> = ({
  children,
  modalTitle,
  onCloseNavigateTo,
}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(onCloseNavigateTo);
  };
  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    maxHeight: "90vh",
    bgcolor: "background.paper",
    border: "1px solid grey",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    padding: 3,
    overflow: "auto",
    // backgroundColor: "inherit",
  };

  return (
    <Modal open onClose={handleClose} className="mt-10">
      <Box sx={style}>
        <Typography
          className=" pb-10 flex justify-between"
          id="user-update-modal"
          variant="h6"
          component="h2"
        >
          <Box display="flex" alignItems="center">
            {modalTitle}
          </Box>
          <Fab
            size="small"
            color="error"
            aria-label="close"
            onClick={handleClose}
          >
            <ClearIcon />
          </Fab>
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default AppModal;
