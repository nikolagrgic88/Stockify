import { FC } from "react";
import { Container, Paper, Typography } from "@mui/material";
import { BackButton, PageCard } from "../../shared";
import OrderForm from "../components/OrderForm";

export type Order = {
  items: { productId: string; quantity: number }[];
  customer: {
    email: string;
    shippingAddress: {
      streetName: string;
      streetNumber: number;
      unitNumber: number;
      postCode: number;
      country: string;
      state: string;
      city: string;
    };
    phoneNumber: string;
  };
  orderStatus: "pending" | "actioned" | "picked" | "shipped" | "fulfilled";
  dispatcher:
    | "auspost"
    | "startrack"
    | "tollgroup"
    | "couriersplease"
    | "aramex";
  _id?: string;
};

const NewOrderPage: FC = () => {
  return (
    <PageCard>
      <Container className="flex flex-col justify-center">
        <Paper className="pb-1 mb-10 w-[60rem]">
          <Container className="mb-10 ">
            <Typography variant="h5" gutterBottom>
              Create New Order
            </Typography>
            <OrderForm />
          </Container>
        </Paper>
        <BackButton styles="w-3/4" />
      </Container>
    </PageCard>
  );
};

export default NewOrderPage;
