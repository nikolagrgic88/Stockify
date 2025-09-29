import { useFetchLocations } from "./hooks/useFetchedLocations";
import { inventoryLoaderById } from "./services/loaders";
import { Location } from "./services/api";
import { deleteLocation, fetchLocation, removeLocation } from "./services/api";
import { deleteLocationAction, updateLocationAction } from "./services/actions";
import { createNewLocatioAction } from "./services/actions";

export {
  inventoryLoaderById,
  deleteLocation,
  deleteLocationAction,
  updateLocationAction,
  createNewLocatioAction,
  fetchLocation,
  useFetchLocations,
  removeLocation,
};
export type { Location };
