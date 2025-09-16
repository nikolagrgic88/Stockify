import { ChangeEvent, useEffect, useState } from "react";
import { LinearProgress, Paper, SelectChangeEvent, Typography } from "@mui/material";
import { useActionData, useNavigate } from "react-router";
import { Item } from "../services/api";
import { BackButton, FormAlert } from "../../shared";

import AlertDialog from "./AlertDialog";

import LocationsSection from "./ItemsLocationsSection";
import ItemDetailsForm from "./ItemDetailsForm";
import { useItemLocationState } from "../../state/itemLocationStore";

type ItemsContainerProps = {
  form: "POST" | "PATCH";
  state?: Item;
  isLoading?: boolean;
  isNewItem: boolean;
};
type ItemResponse = {
  success: true;
  message: string;
  item: Item;
};

const ItemsContainer = ({
  form,
  state,
  isLoading,
  isNewItem,
}: ItemsContainerProps) => {
  const [update, setUpdate] = useState<boolean>(form === "PATCH");
  const [formState, setFormState] = useState<Item | undefined>(state);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categoryError, setCategoryError] = useState<boolean>(false);
  const [categoryErrorMessage, setCategoryErrorMessage] = useState<string>("");
  const [toBeDeleted, setToBeDeleted] = useState<string[]>([]);
  const actionData = useActionData() as ItemResponse;
  const { removeLocation } = useItemLocationState();
  const navigate = useNavigate();

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
        } as Item)
    );
  };

  const handleCategoryRemove = (category: string) => {
    setFormState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        category: prev.category?.filter((cat) => cat !== category),
      };
    });
  };

  const handleAddNewCategory = () => {
    const categories = formState?.category || [];
    if (newCategory) {
      const exists = categories?.some(
        (cat) => newCategory.toLowerCase() === cat.toLowerCase()
      );
      if (!exists) {
        setFormState(
          (prev) =>
            ({
              ...prev,
              category: [...(prev?.category || []), newCategory],
            } as Item)
        );
        setNewCategory("");
        setAlertDialogOpen(false);
      } else {
        setCategoryError(true);
        setCategoryErrorMessage("Category already exists!");
      }
    }
  };

  const handleRemoveLocation = (_id: string) => {
    removeLocation(_id);
    setToBeDeleted((prev) => [...prev, _id]);
  };

  const handleCloseAlertDialog = () => {
    setNewCategory("");
    setAlertDialogOpen(false);
    setCategoryError(false);
    setCategoryErrorMessage("");
  };

  const handleCancelOrSaveUpdate = (update: boolean) => {
    if (!update) {
      setUpdate(false);
      setFormState(state);
    } else {
      setUpdate(true);
    }
    setToBeDeleted([]);
  };
  useEffect(() => {
    if (actionData?.success && isNewItem) {
      navigate("../find-item");
    }
  }, [actionData, isNewItem, navigate]);

  useEffect(() => {
    if (state) {
      setFormState((prev) => ({
        ...prev,
        ...state,
      }));
    }
  }, [state]);

  useEffect(() => {
    if (actionData && actionData.success) {
      setUpdate(false);
    }
  }, [actionData]);

  return (
    <div className="flex flex-col w-[45rem]">
      <AlertDialog
        open={alertDialogOpen}
        onClose={handleCloseAlertDialog}
        onAddCategory={handleAddNewCategory}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        error={categoryError}
        errorMessage={categoryErrorMessage}
      />
      {isLoading && <LinearProgress />}
      <Typography
        variant="h1"
        typography="h4"
        textAlign="center"
        marginBottom={5}
      >
        Items
      </Typography>
      <Paper className="p-4 mb-6">
        <div className="flex flex-row justify-between">
          <h3 className="text-xl mb-4">Item Details</h3>
        </div>
        {actionData && actionData.message && (
          <FormAlert
            message={actionData.message}
            severity={actionData.success}
          />
        )}
        <ItemDetailsForm
          form={form}
          formState={formState}
          update={update}
          handleFieldChange={handleFieldChange}
          setAlertDialogOpen={setAlertDialogOpen}
          handleCategoryRemove={handleCategoryRemove}
          
        />
        <LocationsSection
          onRemoveLocation={handleRemoveLocation}
          isNewItem={isNewItem}
          formState={formState}
          update={update}
          setUpdate={handleCancelOrSaveUpdate}
          onSave={() => console.log("log")}
          toBeDeleted={toBeDeleted}
        />
      </Paper>
      <BackButton />
    </div>
  );
};

export default ItemsContainer;
