import { Button } from "@mui/material";
import { FC } from "react";
import { useNavigate, useParams } from "react-router";
import { Item } from "../../items";
import { Location } from "../../locations";
type TableDataActionButtonsProps = {
  data: Location | Item;
  table: "location" | "items";
  isInInventory?: boolean;
};

const TableDataActionsButtons: FC<TableDataActionButtonsProps> = ({
  data,
  table,
  isInInventory,
}) => {
  const navigate = useNavigate();
  const params = useParams();

  const handleDetails = (data: Location | Item) => {
    navigate(`../../${table}/${data._id}/details`, { state: data });
  };

  const handleDelete = (rowData: Location | Item) => {
    if (isInInventory) {
      const locationId = params.locationId ?? data._id;
      navigate(`../../inventory/${locationId}/delete-product/${rowData._id}`, {
        state: rowData,
      });
    } else {
      navigate(`../../${table}/${rowData._id}/delete`, { state: rowData });
    }
  };

  return (
    <div className="h-full flex items-center justify-center gap-10">
      <Button
        sx={{ background: "#0cea686e " }}
        variant="outlined"
        color="secondary"
        size="small"
        onClick={() => handleDetails(data)}
      >
        Details
      </Button>

      <Button
        sx={{ background: "#e4132857" }}
        variant="outlined"
        color="secondary"
        onClick={() => handleDelete(data)}
        size="small"
      >
        Delete
      </Button>
    </div>
  );
};
export default TableDataActionsButtons;
