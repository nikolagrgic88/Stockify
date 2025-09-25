import { Paper, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useActionData, useNavigate } from "react-router";
import { Inventory } from "../../inventory/services/api";

import { FormAlert } from "../../shared";
import DeleteDialog from "../../shared/components/DeleteDialog";
import DeleteAlert from "../../shared/components/DeleteAlert";
import LocationForm from "./LocationForm";
import { DELETE_LOCATION } from "../../shared/constants/dialogText";
import { removeLocation } from "../services/api";

type LocationFormProps = {
  data?: Inventory;
  form: "POST" | "PATCH";
};
export type ActionData = {
  success: boolean;
  message: string;
  location: Inventory;
};

const LocationDetails = ({ data, form }: LocationFormProps) => {
  const [update, setUpdate] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [originalState] = useState(data);
  const [formState, setFormState] = useState(data);
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState<"success" | "error">("error");

  const navigate = useNavigate();
  const actionData = useActionData() as ActionData;
  const isNewLocation = useMemo(() => form === "POST", [form]);

  const handleDelete = async () => {
    if (!formState?._id) return;

    try {
      const deletedLocation = await removeLocation(formState._id); // use removeLocation
      setSuccess("success");
      setAlertMessage(
        deletedLocation.message || "Location deleted successfully"
      );

      setTimeout(() => navigate(-1), 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSuccess("error");
        setAlertMessage(error.message || "Something went wrong!");
      } else {
        setSuccess("error");
        setAlertMessage("Something went wrong!");
      }
    }
  };
  useEffect(() => {
    if (actionData) {
      if (!actionData.success) {
        setFormState(originalState);
      } else {
        setUpdate(false);
        setFormState(actionData.location);
        if (isNewLocation) {
          setTimeout(() => {
            navigate(`../${actionData.location._id}/details`);
          }, 1800);
        }
      }
    }

    if (!actionData) {
      setFormState(data);
    }
  }, [actionData, data, originalState, isNewLocation, navigate]);

  useEffect(() => {
    if (isNewLocation) {
      setUpdate(true);
    }
  }, [isNewLocation]);

  const handleFieldChange = (
    e:
      | SelectChangeEvent<string>
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState(
      (prev) =>
        ({
          ...prev,
          [name as string]: value,
        } as Inventory)
    );
  };

  return (
    <Paper className="p-4 mb-6 relative bg-inherit ">
      {!isNewLocation && <h3 className="text-2xl mb-4 ">Location Details</h3>}
      <DeleteAlert
        alertMessage={alertMessage}
        success={success}
        styles="-top-3"
      />
      <DeleteDialog
        dialogText={DELETE_LOCATION}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onDelete={handleDelete}
      />
      {actionData && (
        <FormAlert
          message={actionData.message}
          severity={actionData.success}
          styles="-top-14"
        />
      )}
      <LocationForm
        form={form}
        state={formState}
        update={update}
        isNewLocation={isNewLocation}
        handleFieldChange={handleFieldChange}
        setOpenDeleteDialog={setOpenDeleteDialog}
        setUpdate={setUpdate}
      />
    </Paper>
  );
};

export default LocationDetails;
