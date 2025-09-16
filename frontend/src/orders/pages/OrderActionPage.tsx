import { FormAlert, PageCard, PDFModal, useFetchedData } from "../../shared";
import { useCallback, useState } from "react";
import { fetchUsers, User } from "../../users/services/api";

import SearchListField from "../components/SearchListField";
import OrderActionSection from "../components/OrderActionCard";
import { PRIORITY_OPTIONS } from "../../shared/constants/dialogText";
import { Container, TextField } from "@mui/material";
import OrdersList from "../components/OrdersList";
import { useActionData, useLocation } from "react-router";
import { Order } from "./NewOrderPage";

const OrderActionPage = () => {
  const { state } = useLocation();
  const orderArray = state ? (Object.values(state) as unknown as Order[]) : [];
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [order, setOrder] = useState<Order[]>(orderArray);

  const actionData = useActionData();

  // const { data } = useQuery({
  //   queryKey: ["picking-lists"],
  //   queryFn: ({ signal }: { signal: AbortSignal }) => fetchItems({ signal }),
  // });
  const fetchUsersCallback = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      const response = await fetchUsers({ signal });
      return response.users;
    },
    []
  );

  const { data: userData, error: userError } = useFetchedData<User[]>({
    queryKey: "users",
    fetcher: fetchUsersCallback,
  });

  const handleRemoveOrder = (order: Order) => {
    setOrder((prev) => prev.filter((o) => o._id !== order._id));
  };

  return (
    <PageCard>
      <Container>
        {actionData && actionData.success && <PDFModal data={actionData} />}
        <OrderActionSection formName="Action Order" style="w-[50rem]">
          {userError.length > 0 && (
            <FormAlert
              message={userError}
              severity={false}
              autoHideDuration={99999999}
              styles="absolute "
            />
          )}
          <SearchListField
            label={"Asign To"}
            options={userData || []}
            value={selectedUser}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            onChange={(newValue) => {
              setSelectedUser(newValue || null);
            }}
            getOptionLabel={(option) =>
              (option.firstName && option.lastName
                ? `${option.firstName} ${option.lastName}`
                : option.email) || ""
            }
            getOptionKey={(option) => option._id}
          />
          <SearchListField
            label={"Priority"}
            options={PRIORITY_OPTIONS}
            value={selectedPriority}
            onChange={(newValue) => {
              setSelectedPriority(newValue || "");
            }}
            isOptionEqualToValue={(option, value) => option === value}
            getOptionLabel={(option) => option}
            getOptionKey={(option) => option}
          />
          <TextField
            label="Notes"
            id="notes"
            value={notes}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            onChange={(e) => setNotes(e.currentTarget.value)}
          />
          <input type="hidden" name="asignTo" value={selectedUser?._id || ""} />
          <input type="hidden" name="priority" value={selectedPriority || ""} />
          <input type="hidden" name="notes" value={notes || ""} />
          <input
            type="hidden"
            name="order"
            value={JSON.stringify(order.map((order) => order._id))}
          />
        </OrderActionSection>
        <OrdersList
          actionable={false}
          data={order}
          style="w-full mt-10"
          onRemoveOrder={handleRemoveOrder}
        />
      </Container>
    </PageCard>
  );
};

export default OrderActionPage;
