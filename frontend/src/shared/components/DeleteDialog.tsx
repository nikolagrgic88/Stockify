import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DeleteDialogProps {
  open: boolean;
  dialogText: string;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteDialog = ({
  open,
  onClose,
  onDelete,
  dialogText,
}: DeleteDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableEnforceFocus
    >
      <DialogTitle id="alert-dialog-title">Delete Location</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>CANCEL</Button>
        <Button color="error" onClick={onDelete}>
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
