import { FC, useEffect, useState } from "react";
import {
  LocationOption,
  useFetchLocations,
} from "../../locations/hooks/useFetchedLocations";
import { useQuery } from "@tanstack/react-query";
import {
  fetchInventoryById,
  InventoryResponse,
} from "../../inventory/services/api";
import { Button, Paper, Typography } from "@mui/material";
import { MovementForm } from "../components/MovementForm";
import { Form, useActionData } from "react-router";
import { MovementResponse } from "../services/api";
import { BackButton, FormAlert, PageCard } from "../../shared";

export type ItemOption = {
  productId: {
    _id: string;
    title: string;
  };
  quantity: number;
};

const NewMovementPage: FC = () => {
  const { locations } = useFetchLocations();
  const [fromLocation, setFromLocation] = useState<LocationOption>({
    _id: "",
    name: "",
  });
  const [toLocation, setToLocation] = useState<LocationOption>({
    _id: "",
    name: "",
  });
  const [item, setItem] = useState<ItemOption>({
    productId: { _id: "", title: "" },
    quantity: 0,
  });
  const [quantity, setQuantity] = useState(0);
  const actionData = useActionData() as unknown as MovementResponse;

  const { data } = useQuery<InventoryResponse>({
    queryKey: ["location", fromLocation._id],
    queryFn: ({ signal }: { signal: AbortSignal }) => {
      if (!fromLocation._id) {
        throw new Error("Location ID is missing");
      }
      return fetchInventoryById({ signal, locationId: fromLocation._id });
    },
  });
  const items = data?.location.products as unknown as ItemOption[];

  const isMoveButtonDisabled =
    !fromLocation._id ||
    !toLocation._id ||
    !item.productId._id ||
    quantity <= 0;

  useEffect(() => {
    setQuantity(0);
    setItem({
      productId: { _id: "", title: "" },
      quantity: 0,
    });
  }, [fromLocation]);
  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        setQuantity(0);
        setItem({
          productId: { _id: "", title: "" },
          quantity: 0,
        });
        setFromLocation({
          _id: "",
          name: "",
        });
        setToLocation({
          _id: "",
          name: "",
        });
      }
    }
  }, [actionData]);

  return (
    <PageCard>
      <div className="w-[40rem]">
        <Typography
          variant="h1"
          typography="h4"
          textAlign="center"
          marginBottom={5}
        >
          Movement
        </Typography>
        <Paper className="p-4 bg-inherit">
          <h1 className="text-2xl">Create New Movement</h1>
          <Form
            method="POST"
            id="movement-form"
            className="flex flex-col items-stretch pt-5"
          >
            {actionData && actionData.message && (
              <FormAlert
                message={actionData.message}
                severity={actionData.success}
                styles="left-10"
              />
            )}

            <MovementForm
              locations={locations}
              setFromSelectedLocation={setFromLocation}
              setToSelectedLocation={setToLocation}
              selectedFromLocation={fromLocation}
              selectedToLocation={toLocation}
              items={items}
              setItem={setItem}
              item={item}
              maxQuantity={item.quantity}
              setQuantity={setQuantity}
              quantity={quantity}
            />
            <Button
              type="submit"
              id="movement-form"
              disabled={isMoveButtonDisabled}
              variant="contained"
              color="primary"
              sx={{ width: "100%", marginTop: "1rem", padding: "10px" }}
              size="small"
            >
              Move
            </Button>
          </Form>
        </Paper>
        <BackButton />
      </div>
    </PageCard>
  );
};

export default NewMovementPage;
