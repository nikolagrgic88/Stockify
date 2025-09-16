import { useQuery } from "@tanstack/react-query";
import { fetchPickingLists } from "../services/api";
import { Paper } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import ViewButton from "../components/ViewButton";
import { Outlet } from "react-router";
import { BackButton, PageCard } from "../../shared";

const ActionedOrdersPage = () => {
  const { data } = useQuery({
    queryKey: ["picking-lists"],
    queryFn: () => fetchPickingLists(),
  });
  const rows = data ? data.pickingList : [];

  const columns: GridColDef[] = [
    { field: "_id", headerName: "List Id", headerAlign: "center", width: 250 },
    {
      field: "quantity",
      headerName: "Items in the list",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Created on",
      width: 150,
      type: "date",
      valueGetter: (_, r) => new Date(r.createdAt),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      type: "string",
    },
    {
      field: "staff",
      headerName: "Assigned To",
      width: 150,
      type: "string",
      valueGetter: (_, r) => r.staff.userName,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 150,
      type: "string",
      valueGetter: (_, r) => r.priority,
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 250,
      type: "string",
    },
    {
      field: "Details",
      renderCell: (params: GridRenderCellParams) => (
        <ViewButton data={params.row} />
      ),
    },
  ];

  return (
    <PageCard >
      <div className="w-[85rem]">
        <h3 className="text-2xl mb-2">Actioned Orders List</h3>
        <Paper>
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
            }}
            getRowId={(row) => row._id}
            columns={columns}
            rows={rows}
            pageSizeOptions={[5, 10, 15]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            slots={{ toolbar: GridToolbar }}
            localeText={{ noRowsLabel: "No Picking Lists" }}
          />
        </Paper>
        <Outlet />
        <BackButton />
      </div>
    </PageCard>
  );
};

export default ActionedOrdersPage;
