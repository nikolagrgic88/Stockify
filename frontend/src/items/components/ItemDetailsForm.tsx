import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Form } from "react-router";
import CategoriesField from "./CategoriesField";
import { ChangeEvent } from "react";
import { Item } from "../services/api";
import { useItemLocationState } from "../../state/itemLocationStore";

type ItemDetailsFormProps = {
  form: "POST" | "PATCH";
  formState: Item | undefined;
  update: boolean;
  handleFieldChange: (
    e:
      | SelectChangeEvent<string>
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setAlertDialogOpen: (value: boolean) => void;
  handleCategoryRemove: (category: string) => void;
};

const ItemDetailsForm = ({
  form,
  formState,
  update,
  handleFieldChange,
  setAlertDialogOpen,
  handleCategoryRemove,
}: ItemDetailsFormProps) => {
  const { locations } = useItemLocationState((state) => state);

  return (
    <Form method={form} className="grid grid-cols-4 gap-4" id="itemsContainer">
      <TextField
        label="Title"
        id="title"
        name="title"
        value={formState?.title ?? ""}
        variant="outlined"
        fullWidth
        disabled={!update}
        onChange={handleFieldChange}
        required
        size="small"
      />
      <TextField
        label="SKU"
        id="sku"
        name="sku"
        type="number"
        value={formState?.sku ?? ""}
        variant="outlined"
        fullWidth
        disabled={!update}
        onChange={handleFieldChange}
        required
        size="small"
      />

      <FormControl fullWidth margin="none" disabled={!update}>
        <InputLabel required>Size</InputLabel>
        <Select
          value={formState?.size?.toLowerCase() || ""}
          name="size"
          onChange={handleFieldChange}
          size="small"
        >
          <MenuItem value="xxs">XXS</MenuItem>
          <MenuItem value="xs">XS</MenuItem>
          <MenuItem value="s">S</MenuItem>
          <MenuItem value="m">M</MenuItem>
          <MenuItem value="l">L</MenuItem>
          <MenuItem value="xl">XL</MenuItem>
          <MenuItem value="xxl">XXL</MenuItem>
          <MenuItem value="XXS">XXS</MenuItem>
          <MenuItem value="XS">XS</MenuItem>
          <MenuItem value="S">S</MenuItem>
          <MenuItem value="M">M</MenuItem>
          <MenuItem value="L">L</MenuItem>
          <MenuItem value="XL">XL</MenuItem>
          <MenuItem value="XXL">XXL</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Barcode"
        id="barcode"
        name="barcode"
        type="number"
        value={formState?.barcode ?? ""}
        variant="outlined"
        fullWidth
        disabled={!update}
        onChange={handleFieldChange}
        size="small"
      />

      <TextField
        label="Color"
        id="color"
        name="color"
        value={formState?.color ?? ""}
        variant="outlined"
        fullWidth
        disabled={!update}
        onChange={handleFieldChange}
        required
        size="small"
      />

      <TextField
        label="Total Quantity"
        id="totalQuantity"
        // name="totalQuantity"
        type="number"
        value={formState?.totalQuantity ?? 0}
        variant="outlined"
        fullWidth
        disabled={!update}
        slotProps={{ input: { readOnly: true } }}
        onChange={handleFieldChange}
        size="small"
      />
      <CategoriesField
        categories={formState?.category || []}
        disabled={!update}
        onAddNewCategory={() => setAlertDialogOpen(true)}
        onCategoryRemove={handleCategoryRemove}
      />
      <TextField
        label="Description"
        id="description"
        name="description"
        value={formState?.description ?? ""}
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        disabled={!update}
        onChange={handleFieldChange}
        size="small"
      />
      <input type="hidden" name="locations" value={JSON.stringify(locations)} />
    </Form>
  );
};

export default ItemDetailsForm;
