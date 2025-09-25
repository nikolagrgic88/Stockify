import { useFetchLocations } from "./hooks/useFetchedLocations";
import { inventoryLoaderById } from "./services/loaders";
import { Location } from "./services/api";
import LocationDashboardPage from "./pages/LocationDasbhoardPage";
import NewLocationPage from "./pages/NewLocationPage";
import DeleteLocationPage from "../shared/components/DeletePage";
import LocationDetailsPage from "./pages/LocationDetailsPage";
import FindLocationPage from "./pages/FindLocationPage";
import { deleteLocation, fetchLocation, removeLocation } from "./services/api";
import { deleteLocationAction, updateLocationAction } from "./services/actions";
import { createNewLocatioAction } from "./services/actions";

export {
  LocationDashboardPage,
  NewLocationPage,
  DeleteLocationPage,
  LocationDetailsPage,
  FindLocationPage,
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
