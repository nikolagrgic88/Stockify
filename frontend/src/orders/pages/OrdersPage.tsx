import { useState, FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllOrders } from "../services/api";
import { Order } from "./NewOrderPage";
import { BackButton, PageCard, useIsCurrentPage } from "../../shared";
import { Button, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router";
import OrdersList from "../components/OrdersList";

const OrdersPage: FC = () => {
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      fetchAllOrders({ signal }),
  });

  const orders = data?.orders;
  const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);
  const navigate = useNavigate();
  const isCurrentPage = useIsCurrentPage("/home/orders/all-orders");

  const handleActionCheckbox = (order: Order) => {
    setSelectedOrders((prev) =>
      prev.some((o) => o._id === order._id)
        ? prev.filter((o) => o._id !== order._id)
        : [...prev, order]
    );
  };

  const handleActionOrder = () => {
    navigate("new-action", { state: { ...selectedOrders } });
  };
  
  return (
    <PageCard>
      {isCurrentPage && (
        <div className="w-[75rem]">
          <Typography variant="h4" gutterBottom marginBottom={5}>
            Orders
          </Typography>

          <OrdersList
            actionable={true}
            data={orders}
            onActionCheckbox={handleActionCheckbox}
            selectedOrders={selectedOrders}
          />
          <div className="flex justify-between mx-4 h-10 mt-5 ">
            <BackButton styles="-mt-0" />
            {selectedOrders.length > 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleActionOrder}
              >
                Action
              </Button>
            )}
          </div>
        </div>
      )}
      <Outlet />
    </PageCard>
  );
};

export default OrdersPage;
