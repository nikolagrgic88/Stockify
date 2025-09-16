import { Button, MenuItem, TextField } from "@mui/material";
import { LocationEntry, LocationOption } from "./ItemsLocationForm";
import { disabledTextField } from "../../shared/components/disabledTextField";

type LocationFormFieldsProps = {
  addingNewItem: boolean;
  selectedLocation?: LocationOption;
  locations?: LocationOption[];
  setSelectedLocation?: (location: LocationOption) => void;
  setQuantity?: (value: number) => void;
  quantity?: number;
  savedLocation?: LocationEntry;
  handleNewLocationRemove?: (id: string) => void;
};

export const ItemsLocationFormFields = ({
  addingNewItem,
  selectedLocation,
  savedLocation,
  locations,
  setSelectedLocation,
  quantity,
  setQuantity,
  handleNewLocationRemove,
}: LocationFormFieldsProps) => {
  const handleSelectLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const locationId = e.target.value;
    const location = locations!.find((loc) => loc._id === locationId);
    if (location) {
      setSelectedLocation!({
        _id: location._id,
        name: location.name.toUpperCase(),
      });
    }
  };
  return (
    <div className="flex flex-1 gap-2 items-center w-full ">
      <TextField
        select={addingNewItem}
        label="Location"
        variant="outlined"
        fullWidth
        value={selectedLocation?._id || savedLocation?.name || ""}
        onChange={handleSelectLocation}
        disabled={!addingNewItem}
        sx={disabledTextField}
        size="small"
      >
        {addingNewItem &&
          locations?.map((location) => (
            <MenuItem key={location._id} value={location._id}>
              {location.name}
            </MenuItem>
          ))}
      </TextField>

      <TextField
        label="Quantity"
        type="number"
        variant="outlined"
        fullWidth
        value={quantity || savedLocation?.quantity || ""}
        onChange={(e) => setQuantity!(Number(e.target.value))}
        disabled={!addingNewItem}
        sx={disabledTextField}
        size="small"
      />
      {!addingNewItem && (
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleNewLocationRemove!(savedLocation!._id)}
          size="small"
        >
          DELETE
        </Button>
      )}
    </div>
  );
};
