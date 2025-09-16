import { Button, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useLocation } from "react-router";

import { PDFDownloadLink } from "@react-pdf/renderer";
import PickingListPDF from "../../shared/components/PickingListPDF";
import { compareSortKeys } from "../util/compareSortKeys";
import { BackButton, PageCard } from "../../shared";

const PickingListPage = () => {
  const { state } = useLocation();
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Item",
      width: 200,
      valueGetter: (_, r) => r.item.title,
    },
    {
      field: "sku",
      headerName: "SKU",
      valueGetter: (_, r) => r.item.sku,
    },
    {
      field: "size",
      headerName: "Size",
      valueGetter: (_, r) => r.item.size,
    },
    {
      field: "location",
      headerName: "Location",
      width: 200,
      valueGetter: (_, r) => r.locations[0].location.name,
    },
    {
      field: "quantity",
      headerName: "Quantity",
    },
  ];
  //sorting the list

  const sortedState = [...state.listItems];

  const rows = sortedState.sort((a, b) => {
    const keyA = a.locations[0]?.location?.sortKey || "";
    const keyB = b.locations[0]?.location?.sortKey || "";
    return compareSortKeys(keyA, keyB);
  });
  return (
    <PageCard>
      <div>
        <Typography variant="h1" typography="h4" textAlign={"center"}>
          Picking List
        </Typography>
        <Typography variant="h2" typography="h6" className="text-2xl mb-2">
          Assigned to: {state.staff.userName}
        </Typography>

        <Paper className="pb-10">
          <PDFDownloadLink
            document={<PickingListPDF pickingList={state} />}
            fileName="picking-list.pdf"
          >
            {({ loading }) => (
              <Button variant="contained" disabled={loading}>
                {loading ? "Preparing PDF..." : "Generate PDF"}
              </Button>
            )}
          </PDFDownloadLink>
          <DataGrid
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? "even-row"
                : "odd-row"
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
              "& .MuiTablePagination-displayedRows": {
                display: "none",
              },
              // Optional: keep spacing tidy
              "& .MuiTablePagination-spacer": {
                display: "none",
              },
              "& .MuiTablePagination-actions": {
                display: "none",
              },
            }}
            getRowId={(row) => row._id}
            columns={columns}
            rows={rows}
            initialState={{
              pagination: {
                paginationModel: { pageSize: state.quantity, page: 0 },
              },
            }}
            localeText={{ noRowsLabel: "No Picking Lists" }}
          />
        </Paper>
        <BackButton />
      </div>
    </PageCard>
  );
};

export default PickingListPage;
