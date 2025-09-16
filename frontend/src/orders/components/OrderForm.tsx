import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Form, useActionData } from "react-router";
import { DISPATCHERS, ORDER_STATUS } from "../../shared/constants/dialogText";
import { Order } from "../pages/NewOrderPage";
import { useFetchedItems } from "../../items";
import { useEffect, useState } from "react";
import AddedItemsBox from "./AddedItemsBox";

export type NewOrderActionData = {
  errors: string[];
  success: boolean;
  message: string;
  createdOrder: [];
};

const OrderForm = () => {
  const { items } = useFetchedItems();
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(1);

  const [order, setOrder] = useState<Order>({
    items: [],
    customer: {
      email: "",
      shippingAddress: {
        streetName: "",
        streetNumber: 0,
        unitNumber: 0,
        postCode: 0,
        country: "",
        state: "",
        city: "",
      },
      phoneNumber: "",
    },
    orderStatus: "pending",
    dispatcher: "auspost",
  });

  const actionData = useActionData() as NewOrderActionData;

  useEffect(() => {
    if (actionData) {
      setOrder({
        items: [],
        customer: {
          email: "",
          shippingAddress: {
            streetName: "",
            streetNumber: 0,
            unitNumber: 0,
            postCode: 0,
            country: "",
            state: "",
            city: "",
          },
          phoneNumber: "",
        },
        orderStatus: "pending",
        dispatcher: "auspost",
      });
    }
  }, [actionData]);

  const handleCustomerChange = (
    value: string,
    field: string,
    subField?: string
  ) => {
    if (subField) {
      setOrder({
        ...order,
        customer: {
          ...order.customer,
          shippingAddress: {
            ...order.customer.shippingAddress,
            [subField]: value,
          },
        },
      });
    } else {
      setOrder({ ...order, customer: { ...order.customer, [field]: value } });
    }
  };

  return (
    <Form method="POST" className="flex gap-4 relative ">
      {/* <FormAlert
        message={actionData?.message}
        severity={actionData?.success}
        styles="left-48 -top-20"
      /> */}

      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">Customer Info</Typography>
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={order.customer.email}
          onChange={(e) => handleCustomerChange(e.target.value, "email")}
          fullWidth
          sx={{ mb: 1 }}
          size="small"
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          autoComplete="tel"
          required
          value={order.customer.phoneNumber}
          onChange={(e) => handleCustomerChange(e.target.value, "phoneNumber")}
          fullWidth
          sx={{ mb: 1 }}
          size="small"
        />
        <TextField
          label="Street Name"
          name="streetName"
          autoComplete="street-address"
          required
          value={order.customer.shippingAddress.streetName || ""}
          onChange={(e) =>
            handleCustomerChange(
              e.target.value,
              "shippingAddress",
              "streetName"
            )
          }
          fullWidth
          sx={{ mb: 1 }}
          size="small"
        />
        <TextField
          label="Street Number"
          name="streetNumber"
          type="number"
          autoComplete="address-line1"
          required
          value={order.customer.shippingAddress.streetNumber || ""}
          onChange={(e) =>
            handleCustomerChange(
              e.target.value,
              "shippingAddress",
              "streetNumber"
            )
          }
          fullWidth
          sx={{ mb: 1 }}
          size="small"
        />
        <TextField
          label="Unit Number"
          name="unitNumber"
          type="number"
          autoComplete=""
          required
          value={order.customer.shippingAddress.unitNumber || ""}
          onChange={(e) =>
            handleCustomerChange(
              e.target.value,
              "shippingAddress",
              "unitNumber"
            )
          }
          fullWidth
          sx={{ mb: 1 }}
          size="small"
        />
        <TextField
          label="Post Code"
          name="postCode"
          type="number"
          required
          value={order.customer.shippingAddress.postCode || ""}
          onChange={(e) =>
            handleCustomerChange(e.target.value, "shippingAddress", "postCode")
          }
          fullWidth
          sx={{ mb: 1 }}
          size="small"
        />
        <TextField
          label="Country"
          name="country"
          required
          value={order.customer.shippingAddress.country || ""}
          onChange={(e) =>
            handleCustomerChange(e.target.value, "shippingAddress", "country")
          }
          fullWidth
          sx={{ mb: 1 }}
          size="small"
        />
        <TextField
          label="State"
          name="state"
          required
          value={order.customer.shippingAddress.state || ""}
          onChange={(e) =>
            handleCustomerChange(e.target.value, "shippingAddress", "state")
          }
          fullWidth
          sx={{ mb: 1 }}
          size="small"
        />
        <TextField
          label="City"
          name="city"
          required
          value={order.customer.shippingAddress.city || ""}
          onChange={(e) =>
            handleCustomerChange(e.target.value, "shippingAddress", "city")
          }
          fullWidth
          sx={{ mb: 1 }}
          size="small"
        />

        <Typography variant="h6">Items</Typography>

        <Box display={"flex"} gap={1} marginBottom={2}>
          <Autocomplete
            options={items}
            getOptionLabel={(option) => option.title}
            value={items.find((i) => i._id === selectedProductId) || null}
            onChange={(_, newValue) => {
              setSelectedProductId(newValue?._id || "");
              setMaxQuantity(newValue?.availableQuantity || 0);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Product"
                variant="outlined"
                fullWidth
                helperText="Start typing to search"
              />
            )}
            sx={{ flex: 1 }}
            size="small"
          />

          <TextField
            label="Quantity"
            type="number"
            name="quantity"
            value={selectedQuantity}
            error={selectedQuantity > maxQuantity}
            slotProps={{
              input: { inputProps: { max: maxQuantity, min: 1 } },
            }}
            onChange={(e) => setSelectedQuantity(Number(e.target.value))}
            sx={{
              width: "25%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    selectedQuantity > maxQuantity ? "red" : undefined,
                },
              },
            }}
            size="small"
            helperText={selectedProductId && `Max Value: ${maxQuantity}`}
          />
        </Box>

        <Button
          variant="outlined"
          onClick={() => {
            if (selectedProductId && selectedQuantity > 0) {
              setOrder((prev) => {
                const updatedItems = [...prev.items];
                const index = prev.items.findIndex(
                  (item) => item.productId === selectedProductId
                );

                if (index !== -1) {
                  updatedItems[index] = {
                    ...updatedItems[index],
                    quantity: updatedItems[index].quantity + selectedQuantity,
                  };
                } else {
                  updatedItems.push({
                    productId: selectedProductId,
                    quantity: selectedQuantity,
                  });
                }

                return {
                  ...prev,
                  items: updatedItems,
                };
              });

              setSelectedProductId("");
              setSelectedQuantity(1);
            }
          }}
          sx={{ mb: 2 }}
        >
          Add Item to Order
        </Button>

        <FormControl fullWidth sx={{ mb: 2 }} size="small">
          <InputLabel>Order Status</InputLabel>
          <Select
            value={order.orderStatus}
            label="Order Status"
            name="orderStatus"
            onChange={(e) =>
              setOrder({
                ...order,
                orderStatus: e.target.value as Order["orderStatus"],
              })
            }
          >
            {ORDER_STATUS.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }} size="small">
          <InputLabel>Dispatcher</InputLabel>
          <Select
            value={order.dispatcher}
            label="Dispatcher"
            name="dispatcher"
            onChange={(e) =>
              setOrder({
                ...order,
                dispatcher: e.target.value as Order["dispatcher"],
              })
            }
          >
            {DISPATCHERS.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={order.items.length === 0}
        >
          Submit Order
        </Button>
      </Box>

      <AddedItemsBox order={order} items={items} />
      <input
        type="hidden"
        value={JSON.stringify(order.items)}
        name="items"
      ></input>
      <input
        type="hidden"
        name="shippingAddress"
        value={JSON.stringify(order.customer.shippingAddress)}
      />
    </Form>
  );
};

export default OrderForm;
