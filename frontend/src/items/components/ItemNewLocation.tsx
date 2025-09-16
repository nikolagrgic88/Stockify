import { LocationEntry } from "./ItemsLocationForm";
import { ItemsLocationFormFields } from "./ItemsLocationFormFields";

type ItemNewLocationProps = {
  newLocationEntries: LocationEntry[];
  handleNewLocationRemove: (id: string, quantity: number) => void;
};

const ItemNewLocation: React.FC<ItemNewLocationProps> = ({
  newLocationEntries,
  handleNewLocationRemove,
}) => {
  return (
    <div className="mt-10">
      {newLocationEntries.length > 0 && <h3>New Locations</h3>}
      {newLocationEntries &&
        newLocationEntries.map((loc, i) => (
          <div key={i} className="mt-2 ">
            <ItemsLocationFormFields
              key={i}
              addingNewItem={false}
              savedLocation={loc}
              handleNewLocationRemove={(id) =>
                handleNewLocationRemove(id, loc.quantity)
              }
            />
          </div>
        ))}
    </div>
  );
};

export default ItemNewLocation;
