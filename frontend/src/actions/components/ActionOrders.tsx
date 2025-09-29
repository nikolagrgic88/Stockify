import { FormAlert, useIsCurrentPage } from "../../shared";
import { useState } from "react";
import { fetchUsers, User } from "../../users/services/api";

import {
  DISPATCHERS,
  PRIORITY_OPTIONS,
  SECTION,
} from "../../shared/constants/dialogText";
import { TextField } from "@mui/material";
import { OrderActionCard, SearchListField } from "../../orders";
import { useQuery } from "@tanstack/react-query";

type ActionOrdersProps = {
  formName: string;
};

const ActionOrders = ({ formName }: ActionOrdersProps) => {
  const isCurrentPage = useIsCurrentPage("/home/actions/orders/single");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [notes, setNotes] = useState<string>("");
  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [selectedDispatcher, setSelectedDispatcher] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [numberOfItems, setNumberOfItems] = useState<number | string>("");
  const [numberOfOrders, setNumberOfOrders] = useState<number | string>("");

  const { data: userData, error } = useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }: { signal: AbortSignal }) => fetchUsers({ signal }),
  });
 
  return (
    <OrderActionCard formName={formName}>
      {error && (
        <FormAlert
          message={error.message}
          severity={false}
          styles="absolute "
        />
      )}
      <SearchListField
        label={"Asign To"}
        options={userData?.users || []}
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
        label={"From Section"}
        options={SECTION}
        value={fromLocation}
        onChange={(newValue) => {
          setFromLocation(newValue || "");
        }}
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option) => option}
        getOptionKey={(option) => option}
      />
      <SearchListField
        label={"To Section"}
        options={SECTION.slice(fromLocation.charCodeAt(0) - 64)}
        value={toLocation}
        onChange={(newValue) => {
          setToLocation(newValue || "");
        }}
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option) => option}
        getOptionKey={(option) => option}
      />

      <SearchListField
        label={"Dispatcher"}
        options={DISPATCHERS}
        value={selectedDispatcher}
        onChange={(newValue) => {
          setSelectedDispatcher(newValue || "");
        }}
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option) => option}
        getOptionKey={(option) => option}
      />
      <div className="flex gap-1">
        <TextField
          id="from date"
          type="date"
          value={fromDate}
          variant="outlined"
          onChange={(e) => setFromDate(e.currentTarget.value)}
          helperText="From Date"
          size="small"
        />{" "}
        <TextField
          id="to date"
          type="date"
          value={toDate}
          variant="outlined"
          onChange={(e) => setToDate(e.currentTarget.value)}
          helperText="To Date"
          disabled={!fromDate}
          size="small"
          error={
            fromDate
              ? new Date(fromDate).getTime() > new Date(toDate).getTime()
              : true
          }
        />
      </div>

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

      {isCurrentPage ? (
        <TextField
          label="Number of Items"
          id="number of items"
          type="number"
          value={numberOfItems}
          variant="outlined"
          onChange={(e) => setNumberOfItems(parseInt(e.currentTarget.value))}
          size="small"
        />
      ) : (
        <TextField
          label="Number of Orders"
          id="number of orders"
          type="number"
          value={numberOfOrders}
          variant="outlined"
          onChange={(e) => setNumberOfOrders(parseInt(e.currentTarget.value))}
          size="small"
        />
      )}
      <TextField
        label="Notes"
        id="notes"
        value={notes}
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        onChange={(e) => setNotes(e.currentTarget.value)}
        size="small"
      />
      <input
        type="hidden"
        name="assignedTo"
        value={selectedUser ? JSON.stringify(selectedUser._id) : ""}
      />
      <input
        type="hidden"
        name="priority"
        value={
          JSON.stringify(selectedPriority) ||
          JSON.stringify({ label: "", value: "" })
        }
      />
      <input type="hidden" name="notes" value={JSON.stringify(notes) || ""} />
      <input
        type="hidden"
        name="fromLocation"
        value={JSON.stringify(fromLocation) || ""}
      />
      <input
        type="hidden"
        name="toLocation"
        value={JSON.stringify(toLocation) || ""}
      />
      <input
        type="hidden"
        name="dispatcher"
        value={JSON.stringify(selectedDispatcher) || ""}
      />
      <input
        type="hidden"
        name="fromDate"
        value={JSON.stringify(fromDate) || ""}
      />
      <input type="hidden" name="toDate" value={JSON.stringify(toDate) || ""} />
      {isCurrentPage ? (
        <input
          type="hidden"
          name="numberOfItems"
          value={JSON.stringify(numberOfItems) || 0}
        />
      ) : (
        <input
          type="hidden"
          name="numberOfOrders"
          value={JSON.stringify(numberOfOrders) || 0}
        />
      )}
    </OrderActionCard>
  );
};
export default ActionOrders;
