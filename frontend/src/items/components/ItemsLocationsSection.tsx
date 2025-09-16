import { Item } from "../services/api";
import LocationForm from "./ItemsLocationForm";
import { useEffect } from "react";
import {
  ItemLocation,
  useItemLocationState,
} from "../../state/itemLocationStore";
import LocationsField from "./ItemsLocationsField";
import ActionButtons from "./ActionButtons";

type LocationsSectionProps = {
  isNewItem: boolean;
  formState: Item | undefined;
  update: boolean;
  setUpdate: (value: boolean) => void;
  onRemoveLocation: (_id: string) => void;
  onSave: () => void;
  toBeDeleted: string[];
};

const ItemsLocationsSection = ({
  isNewItem,
  formState,
  update,
  setUpdate,
  onRemoveLocation,
  onSave,
  toBeDeleted,
}: LocationsSectionProps) => {
  const { setLocations } = useItemLocationState();

  useEffect(() => {
    const location: ItemLocation[] = [];

    if (formState?.locations && formState.locations.length > 0) {
      formState.locations.forEach((loc) =>
        location.push({
          locationId: loc.locationId._id,
          quantity: loc.quantity,
        })
      );
    }
    setLocations(location);
  }, [setLocations, formState]);

  return (
    <div className="">
      <h4 className="text-lg mb-2 ">Locations</h4>
      {update && <LocationForm addingNewItem={true} />}
      {(formState?.locations?.length ?? 0) > 0
        ? formState!.locations.map((location, index) => (
            <LocationsField
              toBeDeleted={toBeDeleted.some(
                (item) => item === location.locationId._id
              )}
              key={index}
              location={location}
              update={update}
              onRemoveLocation={onRemoveLocation}
            />
          ))
        : isNewItem || (!update && <p>Item doesn't have a location</p>)}
      <ActionButtons update={update} isNewItem={isNewItem} setUpdate={setUpdate} onSave={onSave} />
    </div>
  );
};

export default ItemsLocationsSection;
