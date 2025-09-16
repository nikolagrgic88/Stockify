import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

type CategoriesFieldProps = {
  categories: string[];
  onCategoryRemove: (category: string) => void;
  onAddNewCategory: () => void;
  disabled: boolean;
};

const CategoriesField = ({
  categories,
  onCategoryRemove,
  onAddNewCategory,
  disabled,
}: CategoriesFieldProps) => {
  return (
    <FormControl fullWidth margin="none" disabled={disabled} required>
      <InputLabel>Category</InputLabel>
      <Select
        multiple
        value={categories}
        renderValue={(selected) => selected.join(", ")}
        name="category"
        size="small"
      
      >
        {categories.map((category) => (
          <MenuItem
            key={category}
            value={category}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {category}
            <Button
              sx={{
                marginRight: "-20px",
              }}
              onClick={() => onCategoryRemove(category)}
            >
              <ClearIcon color="error" />
            </Button>
          </MenuItem>
        ))}
        <MenuItem value="add-new-category" onClick={onAddNewCategory}>
          + Add New Category
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default CategoriesField;
