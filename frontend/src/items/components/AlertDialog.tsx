import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ChangeEvent } from "react";

const AlertDialog = ({
  open,
  onClose,
  onAddCategory,
  newCategory,
  setNewCategory,
  error,
  errorMessage,
}: {
  open: boolean;
  error: boolean;
  errorMessage: string;
  onClose: () => void;
  onAddCategory: () => void;
  newCategory: string;
  setNewCategory: (value: string) => void;
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          component: "form",
        },
      }}
    >
      <DialogTitle>Add New Category</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the name of the new category you want to add.
        </DialogContentText>
        <TextField
          helperText={errorMessage}
          error={error}
          autoFocus
          required
          margin="dense"
          id="new-category"
          name="new-category"
          label="New Category"
          type="text"
          fullWidth
          variant="standard"
          value={newCategory}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onAddCategory}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
