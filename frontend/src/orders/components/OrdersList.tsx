import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Order } from "../pages/NewOrderPage";
import { Checkbox, Fab, Paper } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type OrderListPros = {
  data: Order[] | undefined;
  actionable: boolean;
  selectedOrders?: Order[];
  onActionCheckbox?: (order: Order) => void;
  onRemoveOrder?: (order: Order) => void;
  style?: string;
};

const OrdersList = ({
  data,
  selectedOrders,
  onActionCheckbox,
  onRemoveOrder,
  actionable,
  style,
}: OrderListPros) => {
  const columns: GridColDef[] = [
    { field: "_id", headerName: "Order ID", flex: 1 },
    {
      field: "dateCreated",
      headerName: "Date Created",
      type: "dateTime",
      flex: 1,
      valueGetter: (_, row) => new Date(row.dateCreated),
    },
    { field: "orderStatus", headerName: "Status", flex: 1 },
    { field: "dispatcher", headerName: "Dispatcher", flex: 1 },
    {
      field: "totalItems",
      headerName: "Total Items",
      align: "center",
      flex: 1,
      valueGetter: (_, row) =>
        row.items?.reduce(
          (total: number, item: { quantity: number }) => total + item.quantity,
          0
        ),
    },
    {
      field: "shippingAddress",
      headerName: "Shipping Address",
      flex: 1,
      valueGetter: (_, row) => row.customer?.shippingAddress,
      valueFormatter: (value) => {
        const address = value as Order["customer"]["shippingAddress"];
        return address?.streetName
          ? `${address.streetNumber} ${address.streetName}, ${address.city}, ${address.state} ${address.postCode}`
          : "";
      },
    },
    {
      field: "email",
      headerName: "Customers email",
      flex: 1,
      valueGetter: (_, row) => row.customer?.email,
    },
    {
      field: "actions",
      headerName: "Action Order",
      flex: 1,

      renderCell: (params) => {
        const order = params.row as Order;
        return (
          <Checkbox
            checked={
              !!(selectedOrders ?? []).find(
                (selectedOrder) => selectedOrder._id === order._id
              )
            }
            onChange={() => onActionCheckbox && onActionCheckbox(order)}
            disabled={order.orderStatus !== "pending"}
          />
        );
      },
    },
    {
      field: "remove",
      headerName: "Remove Order",

      flex: 1,
      align: "center",
      renderCell: (params) => {
        const order = params.row as Order;
        return (
          <Fab
            size="small"
            color="default"
            aria-label="close"
            onClick={() => onRemoveOrder && onRemoveOrder(order)}
            onMouseEnter={(event) => {
              const target = event.currentTarget;
              target.style.backgroundColor = "#f44336";
            }}
            onMouseLeave={(event) => {
              const target = event.currentTarget;
              target.style.backgroundColor = "";
            }}
          >
            <DeleteOutlineIcon />
          </Fab>
        );
      },
    },
  ];
  return (
    <Paper>
      <DataGrid
        getRowId={(row) => row._id}
        columnVisibilityModel={{
          actions: actionable,
          email: actionable,
          shippingAddress: actionable,
          remove: !actionable,
        }}
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

          width: "100%",
        }}
        className={style}
        rows={data}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
      />
    </Paper>
  );
};

export default OrdersList;
