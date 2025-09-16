import { Button } from "@mui/material";
import { ItemsLocationFormFields } from "./ItemsLocationFormFields";
import ItemNewLocation from "./ItemNewLocation";
import { useItemLocationState } from "../../state/itemLocationStore";
import { useFetchLocations } from "../../locations/hooks/useFetchedLocations";
import { useState } from "react";

export type LocationOption = {
  _id: string;
  name: string;
};

export type LocationEntry = {
  _id: string;
  quantity: number;
  name: string;
};

type LocationFormProps = {
  addingNewItem: boolean;
};

const ItemsLocationForm = ({ addingNewItem }: LocationFormProps) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationOption>({
    _id: "",
    name: "",
  });
  const [quantity, setQuantity] = useState<number>(0);
  const [newLocationEntries, setNewLocationEntries] = useState<LocationEntry[]>(
    []
  );
  const { locations, error, setError } = useFetchLocations();

  const { addLocation, removeLocation, removeQuantity } = useItemLocationState(
    (state) => state
  );

  const handleAdd = () => {
    setError("");
    if (!selectedLocation || quantity <= 0) return;
    const exists = newLocationEntries.some(
      (entry) => entry._id === selectedLocation._id
    );
    if (exists) {
      setError("Location already added.");
      return;
    }

    const newEntry: LocationEntry = {
      _id: selectedLocation._id,
      quantity,
      name: selectedLocation.name,
    };

    setNewLocationEntries((prev) => [...prev, newEntry]);
    addLocation({ locationId: newEntry._id, quantity: newEntry.quantity });

    // Reset selection
    setSelectedLocation({
      _id: "",
      name: "",
    });
    setQuantity(0);
  };

  const handleNewLocationRemove = (id: string, quantity: number) => {
    setNewLocationEntries((prev) => prev.filter((loc) => loc._id !== id));
    removeLocation(id);
    removeQuantity(quantity);
  };

  return (
    <div className="col-span-2">
      <div className="flex gap-4 mb-2 items-center justify-between">
        <ItemsLocationFormFields
          addingNewItem={addingNewItem}
          selectedLocation={selectedLocation}
          locations={locations}
          setSelectedLocation={setSelectedLocation}
          setQuantity={setQuantity}
          quantity={quantity}
        />
        <Button variant="outlined" onClick={handleAdd} size="small">
          Add
        </Button>
      </div>
      <p className="text-red-600">{error}</p>
      <ItemNewLocation
        handleNewLocationRemove={handleNewLocationRemove}
        newLocationEntries={newLocationEntries}
      />
    </div>
  );
};
export default ItemsLocationForm;
