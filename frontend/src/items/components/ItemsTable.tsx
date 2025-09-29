import { Paper } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Item } from "../services/api";
import TableDataActionsButtons from "../../shared/components/TableDataActionButtons";
import { InventoryResponse } from "../../inventory/services/api";

type LocationInventory = {
  productId: Item;
  quantity: number;
  isInventoryData: boolean;
};

const ItemsTable = ({
  tableData,
  isInventoryData = true,
}: {
  tableData: InventoryResponse | Item[] | undefined;
  isInventoryData?: boolean;
}) => {
  const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "Id",
      flex: 1,
      valueGetter: (_, row) =>
        isInventoryData
          ? (row as LocationInventory).productId._id
          : (row as Item)._id,
    },
    {
      field: "title",
      headerName: "Product Name",
      flex: 1,
      valueGetter: (_, row) =>
        isInventoryData
          ? capitalizeFirstLetter((row as LocationInventory).productId.title)
          : capitalizeFirstLetter((row as Item).title),
    },
    {
      field: "color",
      headerName: "Color",
      flex: 1,
      valueGetter: (_, row) =>
        isInventoryData
          ? capitalizeFirstLetter((row as LocationInventory).productId.color)
          : capitalizeFirstLetter((row as Item).color),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      valueGetter: (_, row) => {
       
        return isInventoryData
          ? (row as LocationInventory).quantity
          : (row as Item).totalQuantity;
      },
    },
    {
      field: "barcode",
      headerName: "Barcode",
      flex: 1,
      valueGetter: (_, row) =>
        isInventoryData
          ? (row as LocationInventory).productId.barcode
          : (row as Item).barcode,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <TableDataActionsButtons
          data={isInventoryData ? params.row.productId : params.row}
          table="items"
          isInInventory={isInventoryData}
        />
      ),
    },
  ];

  const rows = isInventoryData
    ? (tableData as InventoryResponse)?.location?.products ?? []
    : (tableData as Item[]) ?? [];

  return (
    <Paper>
      <DataGrid
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
        }
        sx={{
          "& .even-row": {
            background: (theme) =>
              theme.palette.mode === "dark" ? "#424242" : "#f5f5f5",
          },
          "& .odd-row": {
            background: (theme) =>
              theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
          },
        }}
        getRowId={(row) => row._id}
        columns={columns}
        rows={rows}
        slots={{ toolbar: GridToolbar }}
        localeText={{ noRowsLabel: "No Products in the location" }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </Paper>
  );
};
export default ItemsTable;
