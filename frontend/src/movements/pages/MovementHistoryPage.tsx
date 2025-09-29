import React from "react";
import { Paper } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { fetchMovements } from "../services/api";

import { BackButton, PageCard } from "../../shared";
import { Item } from "../../items";

export type MovedItemsProps = {
  product: Item;
  quantity: number;
};

const MovementHistoryPage: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["movements"],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      fetchMovements({ signal }),
  });

  const movements = data.movements;
  const columns: GridColDef[] = [
    {
      field: "fromLocationId",
      headerName: "From Location",
      width: 250,
      valueGetter: (_, row) => row.fromLocation?.name,
    },
    {
      field: "toLocationId",
      headerName: "To Location",
      width: 200,
      valueGetter: (_, row) => row.toLocation?.name,
    },
    {
      field: "itemsMoved",
      headerName: "Items Moved",
      width: 250,
      valueGetter: (_, row) =>
        row.itemsMoved
          .map((item: MovedItemsProps) => item.product?.title || "")
          .join(", "),
    },
    {
      field: "quantity",
      headerName: "Quantity Moved",
      type: "number",
      width: 200,
      valueGetter: (_, row) =>
        row.itemsMoved.map((item: MovedItemsProps) => item.quantity).join(", "),
    },
    {
      field: "userId",
      headerName: "User",
      width: 150,
      valueGetter: (_, row) => row.user?.userName || "Unknown",
    },
    {
      field: "createdAt",
      headerName: "Date and Time",
      width: 200,
      type: "dateTime",
      valueGetter: (_, row) => new Date(row.createdAt),
      valueFormatter: (value) =>
        new Date(value).toLocaleString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
    },
  ];

  return (
    <PageCard>
      <div className="w-[80rem]">
        <h3 className="text-2xl mb-10">Movement History</h3>
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
            rows={movements}
            slots={{ toolbar: GridToolbar }}
            localeText={{ noRowsLabel: "No Products in the location" }}
          />
        </Paper>
        <BackButton />
      </div>
    </PageCard>
  );
};

export default MovementHistoryPage;
