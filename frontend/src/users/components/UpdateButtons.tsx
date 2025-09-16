import { Button } from "@mui/material";
import { useFormStatus } from "react-dom";

const UpdateButtons = ({
  isDisabled,
  onEdit,
  buttonActionName,
  formId,
}: {
  isDisabled: boolean;
  onEdit?: () => void;

  buttonActionName: string;
  formId: "add-user" | "update-user";
}) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex items-center justify-center gap-1 m-1">
      <div className="mt-4">
        <Button
          form={formId}
          type="submit"
          disabled={isDisabled}
          variant="contained"
          color="primary"
          size="small"
        >
          {pending ? "Submiting..." : buttonActionName}
        </Button>
      </div>
      {formId !== "add-user" && (
        <div className="mt-4">
          <Button
            form={formId}
            variant="outlined"
            color="secondary"
            size="small"
            onClick={onEdit}
            disabled={pending}
          >
            {isDisabled ? "Edit" : "Cancel"}
          </Button>
        </div>
      )}
    </div>
  );
};
export default UpdateButtons;
