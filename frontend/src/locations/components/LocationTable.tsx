import { Paper, Typography } from "@mui/material";
import { Location } from "../services/api";
import {
  DataGrid,
  GridRenderCellParams,
  GridValueGetter,
  GridToolbar,
  GridColDef,
} from "@mui/x-data-grid";

import TableDataActionsButtons from "../../shared/components/TableDataActionButtons";

type LocationTableProps = {
  locationData: Location[];
};

const LocationTable: React.FC<LocationTableProps> = ({ locationData }) => {
  const getProductsLength: GridValueGetter<Location> = (_, row) => {
    return row.products.length;
  };

  const getProductsAmount: GridValueGetter<Location> = (_, row) => {
    return row.products.reduce((acc, product) => acc + product.quantity, 0);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Location", width: 160 },
    {
      field: "productsLength",
      headerName: "Products in location",
      width: 160,
      valueGetter: getProductsLength,
    },
    {
      field: "productsLengths",
      headerName: "Number of products in location",
      width: 160,
      valueGetter: getProductsAmount,
    },
    { field: "barcode", headerName: "Barcode", width: 160 },
    { field: "_id", headerName: "ID", width: 200 },
    { field: "remarcs", headerName: "Remarks", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params: GridRenderCellParams) => (
        <TableDataActionsButtons data={params.row} table="location" />
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 15 };

  return (
    <div className="w-[90rem]">
      <Typography variant="h4" className="p-10 text-center">
        Locations
      </Typography>
      <Paper>
        <DataGrid
          getRowId={(row) => row._id}
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
          rows={locationData}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[15, 20, 25]}
          slots={{ toolbar: GridToolbar }}
        />
      </Paper>
    </div>
  );
};

export default LocationTable;
