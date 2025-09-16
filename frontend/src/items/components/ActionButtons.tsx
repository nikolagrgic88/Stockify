import { Button } from "@mui/material";

type ActionButtonsProps = {
  update: boolean;
  setUpdate: (value: boolean) => void;
  onSave: () => void;
  isNewItem: boolean;
};

const ActionButtons = ({
  update,
  setUpdate,
  onSave,
  isNewItem,
}: ActionButtonsProps) => {
  return (
    <div className="col-span-2 flex justify-end gap-4 mt-4">
      {update ? (
        <div className="w-full flex justify-between">
          <Button
            variant="outlined"
            color="error"
            onClick={() => setUpdate(false)}
            size="small"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            form="itemsContainer"
            onClick={onSave}
            size="small"
          >
            Save
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => setUpdate(true)}
          variant="contained"
          color="success"
          size="small"
        >
          {isNewItem ? "Add Details" : "Edit Item"}
        </Button>
      )}
    </div>
  );
};
export default ActionButtons;
