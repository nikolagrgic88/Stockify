import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent } from "react";
import { Form } from "react-router";
import { Inventory } from "../../inventory/services/api";

type LocationFormProps = {
  form: "POST" | "PATCH";
  state?: Inventory;
  update: boolean;
  isNewLocation: boolean;
  handleFieldChange: (
    e:
      | SelectChangeEvent<string>
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setOpenDeleteDialog: (open: boolean) => void;
  setUpdate: (update: boolean) => void;
};

const menuItem = (
  name: string,
  defaultValue?: string,
  handleFieldChange?: (e: SelectChangeEvent<string>) => void
) => (
  <Select name={name} value={defaultValue ?? ""} onChange={handleFieldChange}>
    {Array.from({ length: 26 }, (_, i) => {
      const char = String.fromCharCode(65 + i);
      return (
        <MenuItem key={i} value={char}>
          {char}
        </MenuItem>
      );
    })}
  </Select>
);

const LocationForm = ({
  form,
  state,
  update,
  isNewLocation,
  handleFieldChange,
  setOpenDeleteDialog,
  setUpdate,
}: LocationFormProps) => {
  return (
    <Form method={form} className="grid grid-cols-2 gap-3 mt-2">
      <FormControl fullWidth disabled={!update} required size="small">
        <InputLabel>Aisle Location</InputLabel>
        <Select
          name="aisle"
          value={state?.aisle ?? ""}
          onChange={handleFieldChange}
        >
          <MenuItem value="aisle">Aisle</MenuItem>
          <MenuItem value="giw">GIW</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth disabled={!update} required size="small">
        <InputLabel>Section</InputLabel>
        {menuItem("section", state?.section, handleFieldChange)}
      </FormControl>

      <TextField
        label="Section Number"
        id="sectionNumber"
        name="sectionNumber"
        type="number"
        value={state?.sectionNumber ?? ""}
        variant="outlined"
        fullWidth
        onChange={handleFieldChange}
        disabled={!update}
        required
        size="small"
      />

      <FormControl
        fullWidth
        margin="none"
        disabled={!update}
        required
        size="small"
      >
        <InputLabel>Column</InputLabel>
        {menuItem("column", state?.column, handleFieldChange)}
      </FormControl>

      <TextField
        label="Row"
        id="row"
        name="row"
        type="number"
        value={state?.row ?? ""}
        variant="outlined"
        fullWidth
        disabled={!update}
        onChange={handleFieldChange}
        required
        size="small"
      />

      {!isNewLocation && (
        <TextField
          label="Name"
          id="name"
          name="name"
          value={state?.name}
          variant="outlined"
          fullWidth
          disabled={!update}
          onChange={handleFieldChange}
          slotProps={{ input: { readOnly: true } }}
          size="small"
        />
      )}

      <TextField
        label="Remarks"
        id="remarks"
        name="remarks"
        value={state?.remarks ?? ""}
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        disabled={!update}
        onChange={handleFieldChange}
        size="small"
      />

      {!isNewLocation ? (
        <div className="flex flex-col gap-6">
          <TextField
            label="Barcode"
            id="barcode"
            name="barcode"
            value={state?.barcode}
            variant="outlined"
            fullWidth
            disabled={!update}
            onChange={handleFieldChange}
            size="small"
          />
          {update ? (
            <div className="w-full flex flex-col gap-5 justify-end ">
              <div className="flex justify-around">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ width: "10rem" }}
                  size="small"
                >
                  Update
                </Button>
                <Button
                  onClick={() => setOpenDeleteDialog(true)}
                  variant="contained"
                  color="error"
                  sx={{ width: "10rem" }}
                  size="small"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => setUpdate(false)}
                  variant="outlined"
                  color="warning"
                  sx={{ width: "10rem" }}
                  size="small"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setUpdate(true)}
              type="submit"
              variant="contained"
              color="success"
              fullWidth
            >
              Edit Location
            </Button>
          )}
        </div>
      ) : (
        <div className=" col-span-2">
          <Button
            variant="contained"
            color="success"
            fullWidth
            type="submit"
            sx={{ flex: 1 }}
          >
            Add Location
          </Button>
        </div>
      )}
    </Form>
  );
};

export default LocationForm;
