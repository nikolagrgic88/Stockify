import { Box, Typography } from "@mui/material";
import { Order } from "../pages/NewOrderPage";
import { ItemOption } from "../../items/hooks/useFetchedItems";

interface AddedItemsBoxProps {
  order: Order;
  items: ItemOption[];
}
const AddedItemsBox = ({ order, items }: AddedItemsBoxProps) => {
  return (
    <Box width={"35%"} bgcolor={"#f5f5f5"} padding={2} marginTop={4}>
      <Typography variant="h6" gutterBottom>
        Added Items
      </Typography>
      {order.items.map((item, i) => {
        const found = items.find((itm) => itm._id === item.productId);
        return (
          <Box key={i} marginBottom={1}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" fontSize={17}>
                {found?.title || "Unknown"}
              </Typography>
              <Typography variant="body2" fontSize={17}>
                {item.quantity}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default AddedItemsBox;
