import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { LocationOption } from "../../locations/hooks/useFetchedLocations";
import { ItemOption } from "../pages/NewMovementPage";
import { useEffect, useState } from "react";
import { useUserState } from "../../state";

type LocationFormFieldsProps = {
  selectedFromLocation: LocationOption;
  selectedToLocation: LocationOption;
  locations: LocationOption[];
  items: ItemOption[] | undefined;
  item: ItemOption | undefined;
  setFromSelectedLocation: (location: LocationOption) => void;
  setToSelectedLocation: (location: LocationOption) => void;
  setItem: (item: ItemOption) => void;
  setQuantity: (value: number) => void;
  maxQuantity: number;
  quantity: number;
  handleNewLocationRemove?: (id: string) => void;
};

export const MovementForm = ({
  selectedFromLocation,
  selectedToLocation,
  locations,
  items,
  item,
  setFromSelectedLocation,
  setToSelectedLocation,
  setItem,
  maxQuantity,
  quantity,
  setQuantity,
}: LocationFormFieldsProps) => {
  const [isItemInLocation, setIsItemInLocation] = useState(!items?.length);
  const { _id } = useUserState((state) => state);
  console.log(_id);

  const handleSelectedItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const itemId = e.target.value;
    const item = items!.find((item) => item.productId._id === itemId);
    if (item) {
      setItem({
        productId: { _id: item.productId._id, title: item.productId.title },
        quantity: item.quantity,
      });
    }
  };
  useEffect(() => {
    if (items) {
      setIsItemInLocation(!items?.length);
    }
  }, [items]);

  return (
    <div className="flex flex-col flex-1 gap-1 items-start">
      <Autocomplete
        options={locations}
        getOptionLabel={(option) => option.name}
        value={selectedFromLocation || ""}
        onChange={(_, newValue) => {
          if (newValue) {
            setFromSelectedLocation({
              _id: newValue._id,
              name: newValue.name.toUpperCase(),
            });
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Location"
            variant="outlined"
            fullWidth
            helperText="Start typing to search"
            value={params.id}
            size="small"
          />
        )}
        sx={{ width: "100%" }}
      />
      <TextField
        select={!isItemInLocation}
        label="Item"
        variant="outlined"
        name="item"
        fullWidth
        value={item?.productId._id || ""}
        onChange={handleSelectedItem}
        disabled={isItemInLocation}
        helperText={isItemInLocation && "No Items In Location!"}
        size="small"
      >
        {(items || []).map((item) => (
          <MenuItem key={item.productId._id} value={item.productId._id}>
            {item.productId.title}
          </MenuItem>
        ))}
      </TextField>
      <div className="flex gap-2 w-full">
        <TextField
          label="Quantity"
          type="number"
          variant="outlined"
          name="quantity"
          fullWidth
          disabled={isItemInLocation}
          value={quantity || ""}
          onChange={(e) => setQuantity(Number(e.target.value))}
          error={quantity > maxQuantity}
          helperText={
            quantity > maxQuantity ? `Cannot exceed max: ${maxQuantity}` : ""
          }
          sx={{
            "& .MuiFormHelperText-root": {
              position: "absolute",
              bottom: -20,
            },
            "& .MuiFormControl-root": {
              position: "relative",
              paddingBottom: "24px",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: quantity > maxQuantity ? "red" : undefined,
              },
            },
          }}
          size="small"
          slotProps={{
            input: {
              inputProps: { max: maxQuantity, min: 1 },
            },
          }}
        />
        <TextField
          label="Available"
          type="text"
          variant="outlined"
          sx={{ width: "8rem" }}
          value={maxQuantity || 0}
          slotProps={{ input: { readOnly: true } }}
          disabled={isItemInLocation}
          size="small"
        />
      </div>
      <h2>To</h2>
      <Autocomplete
        options={locations}
        getOptionLabel={(option) => option.name}
        value={selectedToLocation || ""}
        onChange={(_, newValue) => {
          if (newValue) {
            setToSelectedLocation({
              _id: newValue._id,
              name: newValue.name.toUpperCase(),
            });
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="To Location"
            variant="outlined"
            fullWidth
            helperText="Start typing to search"
            size="small"
          />
        )}
        sx={{ width: "100%" }}
      />
      <input
        type="hidden"
        name="fromLocationId"
        value={selectedFromLocation?._id || ""}
      />
      <input
        type="hidden"
        name="toLocationId"
        value={selectedToLocation?._id || ""}
      />
      <input type="hidden" name="userId" value={_id} />
    </div>
  );
};
