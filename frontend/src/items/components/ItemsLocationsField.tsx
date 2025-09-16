import { Button, TextField } from "@mui/material";
import { toBeDeletedTextField } from "../../shared/components/disabledTextField";

type LocationsFieldProps = {
  location: { locationId: { name: string; _id: string }; quantity: number };
  update: boolean;
  onRemoveLocation: (_id: string) => void;
  toBeDeleted: boolean;
};

const ItemsLocationsField = ({
  location,
  update,
  onRemoveLocation,
  toBeDeleted,
}: LocationsFieldProps) => {
  return (
    <div className="flex gap-2 mb-2 mt-2 flex-1 items-center ">
      <TextField
        label="Location ID"
        value={location.locationId.name}
        variant="outlined"
        fullWidth
        disabled
        sx={toBeDeleted ? toBeDeletedTextField : undefined}
      />
      <TextField
        label="Quantity"
        value={location.quantity || 0}
        type="number"
        variant="outlined"
        fullWidth
        disabled
        sx={toBeDeleted ? toBeDeletedTextField : undefined}
      />
      {update && (
        <Button
          color="error"
          variant="outlined"
          onClick={() => onRemoveLocation(location.locationId._id)}
        >
          Delete
        </Button>
      )}
    </div>
  );
};

export default ItemsLocationsField;
