import React, { useState } from "react";
import { useNavigate, useSubmit } from "react-router";
import DeleteDialog from "./DeleteDialog";

interface DeletePageProps {
  dialogText: string;
}

const DeletePage: React.FC<DeletePageProps> = ({ dialogText }) => {
  const submit = useSubmit();
  const [isDialogOpen, setDialogOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setDialogOpen(false);
    navigate(-1);
  };
  const handleDelete = () => {
    submit(null, { method: "DELETE" });
    setDialogOpen(false);
    navigate(-1);
  };

  return (
    <DeleteDialog
      dialogText={dialogText}
      onClose={handleClose}
      onDelete={handleDelete}
      open={isDialogOpen}
    />
  );
};

export default DeletePage;
